import { getHomeDirectory, goPreviousDirectory, getCurrentDirectoryString, getElements, goToDirectory } from './modules/utils.js';
import * as readline from 'readline';
import { sep } from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lastArgument = process.argv.slice(3).toString();
let userName = lastArgument.slice(11, lastArgument.length);
let homeDirectory = getHomeDirectory();
console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`You are currently in ${getHomeDirectory()}`);
let currentDirectory = homeDirectory.split(sep);

try {
  rl.on('line', (command) => {
    //command.startsWith('up')
    if (command === 'up') {
      currentDirectory = goPreviousDirectory(currentDirectory);
    } else
  
    if (command === 'ls') {
      getElements(currentDirectory);
    } else

    if (command.startsWith('cd ')) {
      currentDirectory = goToDirectory(command, currentDirectory);
    } else
  
    if (command === '.exit') {
      console.log(`Thank you for using File Manager, ${userName}!`)
      rl.close();
    } else {
      console.log('Invalid input');
    }
    
  });
} catch(err) {
  console.log('Operation failed');
}


rl.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${userName}!`)
  rl.close();
});