import { useState } from 'react'
import './Loading.css'
import LoadingIndicator from './components/LoadingIndicator'

interface Props {
    component: Function
}

export default function Loading({ component }: Props) {
    const [isLoading, setIsLoading] = useState(true)

    function setLoading(showPageCondition: boolean) {
        if (isLoading && !showPageCondition) {
            setIsLoading(showPageCondition)
        }
    }

    return (
        <>
            <LoadingIndicator stylings={isLoading ? '' : 'display-none'}/>
            <div className={isLoading ? 'display-none' : ''}>
                {component(setLoading)}
            </div>
        </>
    )
}