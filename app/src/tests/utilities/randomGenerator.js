export function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
export function getRandomString() {
    const possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    let x = 0;
    while (x < 10) {
        randomString += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
        x++;
    }
    return randomString;
}
