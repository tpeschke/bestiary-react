export default function makeID(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return [...Array(length)].reduce((previousString) => {
        return previousString += characters.charAt(Math.floor(Math.random() * characters.length));
    }, "")
}