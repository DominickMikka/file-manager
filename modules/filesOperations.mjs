import { open, rename, copyFile as copyF, rm } from 'fs/promises';
import { resolve, basename } from 'path';
import { createReadStream, createWriteStream } from 'fs';

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

export const createFile = async (currentDirectory, path) => {
  path = path.slice(4, path.length).trim();
  path = resolve(currentDirectory, path);
  const file = await open(path, 'wx');
  file.close();
}

export const renameFile = async (currentDirectory, path) => {
  let [command, ...args] = path.split(' ');

  let source = resolve(currentDirectory, args[0]);
  let dest = resolve(currentDirectory, args[1]);

  await rename(source, dest);
}

export const copyFile = async (currentDirectory, path) => {
  let [command, ...args] = path.split(' ');
  let source = resolve(currentDirectory, args[0]);
  let dest = resolve(currentDirectory, args[1]);
  dest = `${dest}\\${basename(source)}`;

  const sourceStream = createReadStream(source);
  const destStream = createWriteStream(dest);
  
  sourceStream.pipe(destStream);
}

export const moveFile = async (currentDirectory, path) => {
  let [command, ...args] = path.split(' ');
  let source = resolve(currentDirectory, args[0]);
  let dest = resolve(currentDirectory, args[1]);
  dest = `${dest}\\${basename(source)}`;

  await copyF(source, dest);
  await rm(source);
}

export const deleteFile = async (currentDirectory, path) => {
  let [command, ...args] = path.split(' ');
  let source = resolve(currentDirectory, args[0]);
  await rm(source);
}