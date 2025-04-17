import { JSX } from "react"
import "./Body.css"


interface Props {
    children: JSX.Element,
}

export default function Body({ children }: Props) {
    return (
        <div className="body-shell">
            {children}
        </div>
    )
}
