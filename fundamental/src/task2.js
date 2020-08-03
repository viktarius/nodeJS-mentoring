import csv from "csvtojson";
import { pipeline } from 'stream';
import { csvFilePath, readStream, writeJsonSync, writeStreamTxt } from "./task2.modules";


csv(csvFilePath)
    .fromFile(csvFilePath)
    .then((jsonObj) => {
            const content = JSON.stringify(jsonObj);
            writeJsonSync(content);
        }
    ).then(() => console.log("JSON file successfully created"));

pipeline(
    readStream,
    csv(),
    writeStreamTxt,
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded: TXT file successfully created');
        }
    }
);
