export const IGNORE_BLOCKS = [
  {start: '// start-ignore', end: '// end-ignore'},
  {start: '/* start-ignore */', end: '/* end-ignore */'},
  {start: '# start-ignore', end: '# end-ignore'},
  {start: "''' start-ignore '''", end: "''' end-ignore '''"},
  {start: '""" start-ignore """', end: '""" end-ignore """'},
];

const generateIgnorePattern = (block: {start: string; end: string}) => {
  return `${escapeRegExp(block.start)}[^]*?${escapeRegExp(block.end)}`;
};

export type ProcessFileContentConfig = {
  stripComments: boolean;
  removeEmptyLines: boolean;
};

export const processFileContent = (content: string, config: ProcessFileContentConfig) => {
  IGNORE_BLOCKS.forEach(block => {
    const pattern = generateIgnorePattern(block);
    content = content.replace(new RegExp(pattern, 'gm'), '');
  });

  if (config.stripComments) {
    // Removes single-line and multi-line comments
    content = content.replace(/\/\/(?![^\r\n]*http:\/\/|[^ \r\n]*https:\/\/).*|\/\*[^]*?\*\//g, '');

    // Removes single-line comments for Python, but not newlines
    // # This is a comment
    content = content.replace(/(?:^|\s)#.*\n/g, '\n');
  }
  // Removes empty lines
  if (config.removeEmptyLines) {
    content = content.replace(/^\s*[\r\n]/gm, '');
  }
  return content;
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
