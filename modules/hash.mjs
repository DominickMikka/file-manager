import { createReadStream } from 'fs';
import { createHash } from 'crypto';

export const calculateHash = (path) => {
  //console.log(dirname(path));
  path = path.slice(5, path.length).trim();
  //if (isAbsolute(path)) {
    
    const file = createReadStream(path);
    let hash = createHash('sha256');

    file.on('readable', () => {
      const chunk = file.read();

      if (chunk) {
        hash = createHash('sha256');
        hash.update(chunk);
      }
    })

    console.log(`Hash this file is: ${hash.digest('hex')}`);
  //}
}