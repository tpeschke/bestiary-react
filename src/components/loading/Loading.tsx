import { cloneElement, JSX, useState } from 'react'
import './Loading.css'
import LoadingIndicator from './components/LoadingIndicator'

export type SetLoadingFunction = (showPageCondition: boolean) => void

interface Props {
    children: JSX.Element,
    secondaryColor?: boolean
}

export default function Loading({ children, secondaryColor = false }: Props) {
    const [isLoading, setIsLoading] = useState(true)

    const setLoading = (showPageCondition: boolean) => {
        setIsLoading(!showPageCondition)
    }

    return (
        <>
            <LoadingIndicator stylings={isLoading ? '' : 'display-none'} secondaryColor={secondaryColor} />
            <div className={isLoading ? 'display-none' : ''}>
                {cloneElement(children, { setLoading })}
            </div>
        </>
    )
}