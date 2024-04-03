import { describe, it, expect } from 'vitest';
import { processFileContent } from '../src/processFileContent';
import fs from 'fs';
import path from 'path';

describe('processFileContent function', () => {
  describe('js', () => {
    it('should return original content when all config options are false', () => {
      const originalContent = fs.readFileSync(
        path.join(__dirname, 'fixtures/db.ts'),
        'utf8'
      );
      const config = { stripComments: false, removeEmptyLines: false };

      const processedContent = processFileContent(originalContent, config);

      expect(processedContent).toEqual(originalContent);
      expect(processedContent).toContain('//');
      expect(processedContent).toContain('#preload');
    });

    it('should process content according to the config true', async () => {
      const content = fs.readFileSync(path.join(__dirname, 'fixtures/db.ts'), 'utf8');
      const config = { stripComments: true, removeEmptyLines: true };

      const processedContent = processFileContent(content, config);

      expect(processedContent).not.toEqual(content);

      expect(processedContent).not.toContain('//');
      expect(processedContent).not.toMatch(/^\s*[\r\n]/gm);
      expect(processedContent).toContain('#preload');
    });

    it('should process content according to the config stripComments true js', async () => {
      const content = fs.readFileSync(path.join(__dirname, 'fixtures/db.ts'), 'utf8');
      const config = { stripComments: true, removeEmptyLines: false };

      const processedContent = processFileContent(content, config);

      expect(processedContent).not.toEqual(content);
      expect(processedContent).not.toContain('//');
      expect(processedContent).toContain('#preload');
    });

    it('should process content according to the config removeEmptyLines true', async () => {
      const content = fs.readFileSync(path.join(__dirname, 'fixtures/db.ts'), 'utf8');
      const config = { stripComments: false, removeEmptyLines: true };

      const processedContent = processFileContent(content, config);

      expect(processedContent).not.toEqual(content);
      expect(processedContent).not.toMatch(/^\s*[\r\n]/gm);
      expect(processedContent).not.toMatch(/^\s*[\n]/gm);
    });

    it('should process content according to the config removeEmptyLines false', async () => {
      const content = fs.readFileSync(path.join(__dirname, 'fixtures/db.ts'), 'utf8');
      const config = { stripComments: false, removeEmptyLines: false };

      const processedContent = processFileContent(content, config);

      expect(processedContent).toEqual(content);
      expect(processedContent).toMatch(/^\s*[\n]/gm);
      expect(processedContent).toMatch(/^\s*[\r\n]/gm);
    });
  });

  describe('python', () => {
    it('should process content according to the config all false', async () => {
      const content = fs.readFileSync(path.join(__dirname, 'fixtures/script.py'), 'utf8');
      const config = { stripComments: false, removeEmptyLines: false };

      const processedContent = processFileContent(content, config);

      expect(processedContent).toEqual(content);
      expect(processedContent).toContain('#');
      expect(processedContent).toMatch(/^\s*[\n]/gm);
      expect(processedContent).toMatch(/^\s*[\r\n]/gm);
    });

    it('should process content according to the config stripComments true', async () => {
      const content = fs.readFileSync(path.join(__dirname, 'fixtures/script.py'), 'utf8');
      const config = { stripComments: true, removeEmptyLines: false };

      const processedContent = processFileContent(content, config);

      expect(processedContent).not.toEqual(content);
      expect(processedContent).not.toContain('#');
      expect(processedContent).toMatch(/^\s*[\n]/gm);
      expect(processedContent).toMatch(/^\s*[\r\n]/gm);
    });

    it('should process content according to the config removeEmptyLines true', async () => {
      const content = fs.readFileSync(path.join(__dirname, 'fixtures/script.py'), 'utf8');
      const config = { stripComments: false, removeEmptyLines: true };

      const processedContent = processFileContent(content, config);

      expect(processedContent).not.toEqual(content);
      expect(processedContent).toContain('#');
      expect(processedContent).not.toMatch(/^\s*[\n]/gm);
      expect(processedContent).not.toMatch(/^\s*[\r\n]/gm);
    });
  });
});
