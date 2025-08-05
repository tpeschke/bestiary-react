import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function SearchStatusHook() {
    const [isOnSearch, setIsOnSearch] = useState(true);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/search') {
            setIsOnSearch(true);
        }
        else if (isOnSearch) {
            setIsOnSearch(false);
        }
    }, [location]);
    return {
        isOnSearch
    };
}
