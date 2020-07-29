import { consoleOutput, consoleRead, reverse } from "./task1.modules";

consoleOutput(`enter your string: `);
process.stdin.on('readable', () => {
    const chunk = consoleRead();
    if (chunk !== null) {
        const result = reverse(chunk.toString());
        consoleOutput(`result: ${result}`);
    }
});
