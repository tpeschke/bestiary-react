import { useEffect } from "react";
import { SetLoadingFunction } from "../../../../components/loading/Loading";
import beastHooks from "../../hooks/beastHooks";
import EditBody from "./components/editBody/EditBody";

interface Props {
    setLoading?: SetLoadingFunction
}

export default function EditView({ setLoading }: Props) {
    const { beast, updateAttackOrder, updateSelectedRole } = beastHooks();
    
    useEffect(() => {
        if (setLoading) {
            setLoading(!!beast)
        }
    }, [beast])

    return (
        <div className='card-background'>
            {beast && 
                <EditBody beast={beast} updateAttackOrder={updateAttackOrder} updateSelectedRole={updateSelectedRole} />
            }
        </div>
    )
} 