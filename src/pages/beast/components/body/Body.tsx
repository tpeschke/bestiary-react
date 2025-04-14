import { JSX } from "react"
import "./Body.css"

type Format = 'gray-card'

interface Props {
    children: JSX.Element,
    format?: Format
}

export default function Body({ children, format }: Props) {
    return (
        <div className={"body-shell " + format}>
            {children}
        </div>
    )
}
