import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';

export const decompress = async (currentDirectory, path) => {

  let [command, ...args] = path.split(' ');

  let sourcePath = resolve(currentDirectory, args[0]);
  let destPath = resolve(currentDirectory, args[1]);

  const sourceFile = createReadStream(sourcePath);
  const destFile = createWriteStream(destPath);

  console.log(sourcePath);
  console.log(destPath);

  const brDecompress = createBrotliDecompress();

  pipeline(sourceFile, brDecompress, destFile, (err) => {
    if (err) {
      console.log(err);
      process.exitCode = 1;
    }
  });
}