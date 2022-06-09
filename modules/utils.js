import { sep } from 'path';
import { readdir } from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

export const getHomeDirectory = () => {
  return `${process.env.HOME || process.env.USERPROFILE}`;
}

export const goPreviousDirectory = (currentDirectory) => {
  
  try {
    currentDirectory = currentDirectory.split(sep);
    if (currentDirectory.length > 1) {
      currentDirectory.pop();
      currentDirectory = currentDirectory.join(sep);
      console.log(`You are currently in ${currentDirectory}`);
    }
  } catch(err) {
    console.log(`You are currently in ${currentDirectory}`);
  }
  
  return currentDirectory
}

export const goToDirectory = (path, currentDirectory) => {
  path = path.slice(3, path.length).trim();

  if (isAbsolute(path)) {
    console.log(`You are currently in ${path}`);
    return path
  } else {
    currentDirectory.push(path);
  }

  if (!path.includes(':')) {
    
    console.log(`You are currently in ${currentDirectory.join(sep)}${sep}`);
  } else {
    

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

export const getCpuInfo = () => {
  const cpuInfo = os.cpus();
  const newCpuInfo = cpuInfo.map(cpu => {
    const model = cpu.model.trim();
    const speed = `${cpu.speed * 0.001} GHz`;
    return [model, speed]
  })
  console.log(`Counts cpus in your computer is ${cpuInfo.length}`);
  console.log(newCpuInfo);
}