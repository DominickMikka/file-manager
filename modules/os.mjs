import { EOL, homedir, userInfo, arch, cpus } from 'os';

export const getHomeDirectory = () => {
  return homedir();
}

export const printOsEol = () => {
  console.log(JSON.stringify(EOL));
}

export const printOsHomedir = () => {
  console.log(homedir());
}

export const printOsUsername = () => {
  console.log(userInfo().username);
}

export const printOsArch = () => {
  console.log(arch());
}

export const getCpuInfo = () => {
  const cpuInfo = cpus();
  const newCpuInfo = cpuInfo.map(cpu => {
    const model = cpu.model.trim();
    const speed = `${cpu.speed * 0.001} GHz`;
    return [model, speed]
  })
  console.log(`Counts cpus in your computer is ${cpuInfo.length}`);
  console.log(newCpuInfo);
}