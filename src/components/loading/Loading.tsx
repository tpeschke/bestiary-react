import { useState } from 'react'
import './Loading.css'
import LoadingIndicator from './components/LoadingIndicator'

interface Props {
    component: Function,
    componentProps?: Object,
    secondaryColor?: boolean
}

export default function Loading({ component, componentProps, secondaryColor = false }: Props) {
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
                {component(setLoading, componentProps)}
            </div>
        </>
    )
}