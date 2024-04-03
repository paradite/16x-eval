import { processFileContent } from './processFileContent';
import { getPathBaseName } from './fileManager';
import type { ProcessFileContentConfig } from './processFileContent';

export const enum TASK_ENUM {
  Feature = 'Feature',
  Fix = 'Fix',
  Refactor = 'Refactor',
  Question = 'Question',
  Others = 'Others',
}

export const TASK_OPTIONS = [
  TASK_ENUM.Feature,
  TASK_ENUM.Fix,
  TASK_ENUM.Refactor,
  TASK_ENUM.Question,
  TASK_ENUM.Others,
];

export type FileObj = {
  name?: string;
  file: File | null;
  includeInCodeContext: boolean;
  path: string;
};

export type CustomInstruction = {
  id: string;
  name: string;
  content: string;
};

export const taskPromptMap = {
  [TASK_ENUM.Feature]:
    'You are tasked to implement a feature. Instructions are as follows:',
  [TASK_ENUM.Fix]: 'You are tasked to fix a bug. Instructions are as follows:',
  [TASK_ENUM.Refactor]:
    'You are tasked to do a code refactoring. Instructions are as follows:',
  [TASK_ENUM.Question]: 'You are tasked to answer a question:',
  [TASK_ENUM.Others]: '',
};

type FileObjSimple = Omit<FileObj, 'file'>;

export function composePrompt(
  selectedFiles: FileObjSimple[],
  filesContent: string[],
  task: TASK_ENUM,
  rawPrompt: string,
  customInstructions: CustomInstruction[],
  activeCustomInstructionId: string,
  config: ProcessFileContentConfig,
  sourceCodePositionTop: boolean,
  includeCustomInstructions: boolean,
  includeTaskType: boolean
): string {
  // iterate through selectedFiles and filesContent, exclude files that are not selected
  // add file content into fileContentArray
  const fileContentArray: string[] = [];
  selectedFiles.forEach((file, index) => {
    if (file.includeInCodeContext && file.path && filesContent[index]) {
      const fileNameWithExtension = getPathBaseName(file.path);
      const fileExtension = fileNameWithExtension.split('.').pop();

      fileContentArray.push(
        `${fileNameWithExtension}\n\`\`\`${fileExtension}\n${processFileContent(
          filesContent[index],
          config
        )}\`\`\``
      );
    }
  });
  const fileContentSection = fileContentArray.join('\n\n');
  const taskPrompt = taskPromptMap[task];

  const allSectionsArray = [];
  if (includeTaskType && taskPrompt) allSectionsArray.push(taskPrompt);
  if (rawPrompt) allSectionsArray.push(rawPrompt);
  // if (formattingOptions) allSectionsArray.push(formattingOptions);
  if (includeCustomInstructions && customInstructions) {
    const activeInstruction = customInstructions.find(
      (i) => i.id === activeCustomInstructionId
    );
    if (activeInstruction) {
      allSectionsArray.push(activeInstruction.content);
    }
  }
  if (fileContentSection) {
    if (sourceCodePositionTop) {
      allSectionsArray.unshift(fileContentSection);
    } else {
      allSectionsArray.push(fileContentSection);
    }
  }

  return allSectionsArray.join('\n\n');
}
