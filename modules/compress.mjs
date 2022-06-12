import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';

export const compress = async (currentDirectory, path) => {

  let [command, ...args] = path.split(' ');

  let sourcePath = resolve(currentDirectory, args[0]);
  let destPath = resolve(currentDirectory, args[1]);

  const sourceFile = createReadStream(sourcePath);
  const destFile = createWriteStream(destPath + '.br');
  const brCompress = createBrotliCompress();

  pipeline(sourceFile, brCompress, destFile,  (err) => {
    if (err) {
      console.log(err);
      process.exitCode = 1;
    }
  });
}