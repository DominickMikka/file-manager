import { getHomeDirectory, goPreviousDirectory, getCurrentDirectoryString, getElements, goToDirectory, getCpuInfo } from './modules/utils.js';
import * as readline from 'readline';
import { sep } from 'path';
import * as os from 'os';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lastArgument = process.argv.slice(3).toString();
let userName = lastArgument.slice(11, lastArgument.length);
let currentDirectory = getHomeDirectory();
console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`You are currently in ${currentDirectory}`);

//let currentDirectory = homeDirectory.split(sep);
//join(currentDirectory);
//console.log(process.chdir(currentDirectory));
//console.log(process.cwd(currentDirectory));
//console.log(process.chdir('./rsschool'));

try {
  rl.on('line', (command) => {
    if (command === 'up') {
      currentDirectory = goPreviousDirectory(currentDirectory);
    } else
  
    if (command === 'ls') {
      getElements(currentDirectory);
    } else

    if (command === 'os --EOL') {
      console.log(JSON.stringify(os.EOL));
      console.log(`You are currently in ${currentDirectory}`);
    } else

    if (command === 'os --cpus') {
      getCpuInfo();
      console.log(`You are currently in ${currentDirectory}`);
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