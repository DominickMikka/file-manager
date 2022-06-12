import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { resolve } from 'path';

export const calculateHash = async (currentDirectory, path) => {
  
  path = path.slice(5, path.length).trim();
  path = resolve(currentDirectory, path);

  const file = createReadStream(path);
  let hash = createHash('sha256');

  file.on('readable', () => {
    const chunk = file.read();

    if (chunk) {
      hash = createHash('sha256');
      hash.update(chunk);
    }
  });

  console.log(`Hash this file is: ${hash.digest('hex')}`);

  return currentDirectory
}