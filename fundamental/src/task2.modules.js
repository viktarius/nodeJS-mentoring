import fs from "fs";

export const csvFilePath = './csv/data.csv';
export const readStream = fs.createReadStream(csvFilePath);
export const writeStreamTxt = fs.createWriteStream('./csv/data_RAM.txt');
export const writeJsonSync = (content) => fs.writeFileSync('./csv/data.json', content);
