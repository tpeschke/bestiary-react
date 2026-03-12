import "./Body.css"

import { JSX, Children } from "react"

interface Props {
    children: JSX.Element | JSX.Element[],
}

export default function Body({ children }: Props) {
    return (
        <div className="body-shell">
            {Children.map(children, (child) => {
                return child
            })}
        </div>
    )
}
