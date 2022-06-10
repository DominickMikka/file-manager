import { open } from 'fs/promises';
import { resolve } from 'path';

export const readFile = async (currentDirectory, path) => {
  path = path.slice(4, path.length).trim();
  
  const file = await open(resolve(currentDirectory, path), 'r');
  const stream = file.createReadStream();

  stream.on('data', (chunk) => {
    process.stdout.write(chunk.toString());
  });

  stream.on('end', () => {
    console.log(`\nYou are currently in ${currentDirectory}`);
  });
};