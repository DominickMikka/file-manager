import { goPreviousDirectory, goToDirectory, getElements } from './modules/navigate.mjs';
import { calculateHash } from './modules/hash.mjs';
import { 
         getHomeDirectory, 
         printOsEol, 
         getCpuInfo, 
         printOsHomedir, 
         printOsUsername, 
         printOsArch 
        } from './modules/os.mjs';
import { exitFileManager } from './modules/exit.mjs';

import * as readline from 'readline';

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
//resolve
//console.log(process.chdir(currentDirectory));
//console.log(process.cwd(currentDirectory));
//console.log(process.chdir('./rsschool'));

try {
  rl.on('line', async (command) => {
    if (command === 'up') currentDirectory = goPreviousDirectory(currentDirectory);
    else if (command === 'ls') await getElements(currentDirectory);
    else if (command.startsWith('hash ')) calculateHash(command);
    else if (command === 'os --EOL') printOsEol();
    else if (command === 'os --cpus') getCpuInfo();
    else if (command === 'os --homedir') printOsHomedir(); 
    else if (command === 'os --username') printOsUsername();
    else if (command === 'os --architecture') printOsArch();
    else if (command.startsWith('cd ')) currentDirectory = await goToDirectory(command, currentDirectory);
    else if (command === '.exit') {
      exitFileManager(userName);
      rl.close();
      return
    }
    else console.log('Invalid input');

    console.log(`You are currently in ${currentDirectory}`);
  });
} catch(err) {
  console.log('Operation failed');
}

rl.on('SIGINT', () => {
  exitFileManager(userName);
  rl.close();
});