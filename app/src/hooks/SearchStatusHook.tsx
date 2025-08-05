import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

interface SearchStatusReturn {
    isOnSearch: boolean
}

export default function SearchStatusHook(): SearchStatusReturn { 
    const [isOnSearch, setIsOnSearch] = useState(true)

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/search') {
            setIsOnSearch(true)
        } else if (isOnSearch) {
            setIsOnSearch(false)
        }
    }, [location])

    return {
        isOnSearch
    }
}