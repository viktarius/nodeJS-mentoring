import { consoleOutput, consoleRead, reverse } from "./task1.modules";

consoleOutput(`task 1 started\n`);
process.stdin.on('readable', () => {
    const chunk = consoleRead();
    if (chunk !== null) {
        const result = reverse(chunk.toString());
        consoleOutput(`${result}\n`);
        process.stdin.resume();
    }
});
