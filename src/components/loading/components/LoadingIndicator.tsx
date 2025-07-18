import './LoadingIndicator.css'

interface Props {
    stylings: string,
    secondaryColor: boolean
}

export default function LoadingIndicator({ stylings, secondaryColor }: Props) {
    let classString = 'loader'
    secondaryColor ? classString += ' secondaryColor' : null
    
    return (
        <div className={`${stylings} loading-indicator-shell`}>
            <span className={classString}></span>
        </div>
    )
}