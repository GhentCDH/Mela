import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Merges multiple files into one file
 * @param {string[]} inputFiles - Array of relative file paths to merge
 * @param {string} outputFile - Relative path for the output file
 * @param {string} separator - Optional separator between file contents (default: '\n\n')
 */
export function mergeFiles(inputFiles, outputFile, separator = '\n\n') {
  try {
    let mergedContent = '';

    for (let i = 0; i < inputFiles.length; i++) {
      const filePath = join(__dirname, inputFiles[i]);
      console.log(filePath);
      const content = readFileSync(filePath, 'utf-8');

      mergedContent += `-- ${inputFiles[i]}${separator}`;
      mergedContent += content;

      // Add separator between files (but not after the last file)
      if (i < inputFiles.length - 1) {
        mergedContent += separator;
      }
    }

    const outputPath = join(__dirname, outputFile);
    writeFileSync(outputPath, mergedContent, 'utf-8');

    console.log(
      `Successfully merged ${inputFiles.length} files into ${outputFile}`,
    );
  } catch (error) {
    console.error('Error merging files:', error.message);
    throw error;
  }
}

// Get all files in the current directory (excluding this script)
const allFiles = [
  // standalone
  'author.sql',
  'register.sql',
  'speech.sql',

  // initiate work
  'work.sql',
  'section.sql',

  'text.sql',
  'text_content.sql',

  'example.sql',
  'lemma.sql',

  'annotation.sql',
  'annotation_body.sql',
  'annotation_target.sql',

  '_example_lemma.sql',
];

// Merge all files in the current directory
mergeFiles(allFiles, `${new Date().toISOString().split('T')[0]}.demo.sql`);
