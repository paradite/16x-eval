import { describe, it, expect } from 'vitest';
import { composePrompt, TASK_ENUM } from '../src/composePrompt';
import fs from 'fs';
import path from 'path';

describe('composePrompt function', () => {
  it('should compose prompt correctly with all parameters', () => {
    const fileContent = fs.readFileSync(path.join(__dirname, 'fixtures/db.ts'), 'utf8');
    const selectedFiles = [{ path: 'db.ts', includeInCodeContext: true }];
    const task = TASK_ENUM.Feature;
    const rawPrompt = 'Solve the task';
    const customInstructions = [
      { id: '1', content: 'Follow the instructions', name: '123' },
    ];
    const activeCustomInstructionId = '1';
    const config = { stripComments: false, removeEmptyLines: false };
    const sourceCodePositionTop = true;
    const includeCustomInstructions = true;
    const includeTaskType = true;

    const result = composePrompt(
      selectedFiles,
      [fileContent],
      task,
      rawPrompt,
      customInstructions,
      activeCustomInstructionId,
      config,
      sourceCodePositionTop,
      includeCustomInstructions,
      includeTaskType
    );

    expect(result).toContain(
      'You are tasked to implement a feature. Instructions are as follows:'
    );
    expect(result).toContain('Solve the task');
    expect(result).toContain('Follow the instructions');
    expect(result).toContain('db.ts');
    expect(result).toContain(fileContent);
  });
});
