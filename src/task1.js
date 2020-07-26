process.stdout.write(`enter your string: `);
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
        const result = chunk.toString().split("").reverse().join("");
        process.stdout.write(`result: ${result}`);
    }
});
