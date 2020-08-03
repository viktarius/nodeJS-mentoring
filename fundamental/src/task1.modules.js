export function consoleOutput(value){
    process.stdout.write(value);
}

export function consoleRead(){
    return process.stdin.read();
}

export function reverse(value) {
    return value.split("").reverse().join("");
}
