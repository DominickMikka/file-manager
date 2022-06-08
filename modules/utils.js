import { sep } from 'path';
import { readdir } from 'fs/promises';

export const getHomeDirectory = () => {
  return `${process.env.HOME || process.env.USERPROFILE}`;
}

export const goPreviousDirectory = (path) => {
  if (path.length > 1) {
    path.pop();
  }
  
  console.log(`You are currently in ${path.join(sep)}${sep}`)
  return path
}

export const goToDirectory = (path, currentDirectory) => {
  path = path.slice(3, path.length).trim();

  if (!path.includes(':')) {
    currentDirectory.push(path);
    console.log(`You are currently in ${currentDirectory.join(sep)}${sep}`);
  } else {
    console.log(`You are currently in ${path}`);

    return path //.split(sep)
  }

  

  return currentDirectory
}

export const getCurrentDirectoryString = (path) => {
  return path.join(sep)
}

export const getElements = async (path) => {
  
  const elements = await readdir(getCurrentDirectoryString(path), {withFileTypes: true});
  console.table(elements);
  console.log(`You are currently in ${path.join(sep)}${sep}`)
}