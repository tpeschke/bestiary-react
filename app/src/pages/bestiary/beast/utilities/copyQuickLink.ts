import { createSearchParams } from "react-router-dom"
import alertInfo from "../../../../components/alert/alerts"

function getQuickLinkParams(selectedRoleId: string | null, selectedModifier: number): Record<string, string> {
    if (selectedRoleId && selectedModifier) {
        return {
            roleId: selectedRoleId,
            modifier: `${selectedModifier}`
        }
    } else if (selectedRoleId) {
        return {
            roleId: selectedRoleId,
        }
    } else if (selectedModifier) {
        return {
            modifier: `${selectedModifier}`
        }
    }

    return {}
}

function getURL(selectedRoleId: string | null, selectedModifier: number): string {
    const { origin, pathname } = window.location
    return `${origin}${pathname}?${createSearchParams(getQuickLinkParams(selectedRoleId, selectedModifier)).toString()}`
}

function getTextArea(): HTMLTextAreaElement {
    const textArea = document.createElement("textarea")
    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '0'

    return textArea
}

export default function copyQuickLink(selectedRoleId: string | null, selectedModifier: number): void {
    const textArea = getTextArea()
    const url = getURL(selectedRoleId, selectedModifier)

    textArea.value = url
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
        document.execCommand('copy')
        alertInfo({ color: "green", message: `${url} successfully copied`, type: 'message' })
    } catch {
        alertInfo({ color: "red", message: `Unable to copy ${url}`, type: 'message' })
    }
    document.body.removeChild(textArea)
}
