import "./Body.css"

import { JSX } from "react"

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
