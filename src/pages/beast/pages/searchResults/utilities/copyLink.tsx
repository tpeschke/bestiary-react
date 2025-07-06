import alertInfo from "../../../../../components/alert/alerts";

export function copyLink(): void {
    let textArea = getTextArea()
    const url = getURL()

    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        alertInfo({ color: "green", message: `Link successfully copied`, type: 'message' })
    } catch (err) {
        alertInfo({ color: "red", message: `Unable to copy link`, type: 'message' })
    }
    document.body.removeChild(textArea);
}

function getTextArea() {
    let textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';

    return textArea
}

function getURL(): string {
    return `${window.location.href}&goDirectlyTo=true`
}