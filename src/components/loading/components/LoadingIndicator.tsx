import './LoadingIndicator.css'

interface Props {
    stylings: string
}

export default function LoadingIndicator({ stylings }: Props) {
    return (
        <div className={stylings}>
            <span className={"loader"}></span>
        </div>
    )
}