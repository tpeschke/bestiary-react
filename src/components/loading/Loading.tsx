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

    function setLoading(showPageCondition: boolean) {
        if (isLoading && !showPageCondition) {
            setIsLoading(showPageCondition)
        }
    }

    return (
        <>
            <LoadingIndicator stylings={isLoading ? '' : 'display-none'} secondaryColor={secondaryColor}/>
            <div className={isLoading ? 'display-none' : ''}>
                {children && cloneElement(children, {setLoading})}
            </div>
        </>
    )
}