import { JSX } from "react"
import "./Card.css"

interface Props {
    children: JSX.Element,
}

export default function Card({ children }: Props) {
    return (
        <div className="card-shell">
            {children}
        </div>
    )
}
