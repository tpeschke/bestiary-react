export default function createHash(): string {
    const possibleLetters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let hash: string = "";

    let x: number = 0;
    while (x < 10) {
        hash += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
        x++;
    }

    return hash;
}