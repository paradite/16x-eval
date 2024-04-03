import fs from 'fs';
import path from 'path';

export const readFile = (filePath: string) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.warn(error);
    return;
  }
};

export const getPathBaseName = (_path: string) => {
  return path.basename(_path);
};

export const getPathLastDirAndBaseName = (_path: string) => {
  return path.join(path.basename(path.dirname(_path)), path.basename(_path));
};
