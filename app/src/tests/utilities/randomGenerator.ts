export function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

export function getRandomString() {
    const possibleLetters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString: string = "";

    let x: number = 0;
    while (x < 10) {
        randomString += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
        x++;
    }

    return randomString;
}