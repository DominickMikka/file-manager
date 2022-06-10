import { dirname, resolve} from 'path';
import { readdir, access } from 'fs/promises';

export const goPreviousDirectory = (currentDirectory) => {
  return dirname(currentDirectory)
}

export const goToDirectory = async (path, currentDirectory) => {
  path = path.slice(3, path.length).trim();

  try {
    await access(resolve(currentDirectory, path));
    return resolve(currentDirectory, path)
  } catch(err) {
    console.log('Invalid input! This directory is not exists!')
    return currentDirectory
  }
}

export const getElements = async (path) => {
  const elements = await readdir(path, {withFileTypes: true});
  console.table(elements);
}