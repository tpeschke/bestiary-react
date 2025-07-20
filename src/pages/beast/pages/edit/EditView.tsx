import { useEffect } from "react";
import { SetLoadingFunction } from "../../../../components/loading/Loading";
import beastHooks, { RemoveDefenseFunction, UpdateOrderFunction } from "../../hooks/beastHooks";
import EditBody from "./components/editBody/EditBody";

interface Props {
    setLoading?: SetLoadingFunction
}

export type CombatInfoFunctions = {
    updateAttackOrder: UpdateOrderFunction, 
    updateDefenseOrder: UpdateOrderFunction, 
    removeDefense: RemoveDefenseFunction
}

export default function EditView({ setLoading }: Props) {
    const { beast, updateSelectedRole, updateBeast, updateAttackOrder, updateDefenseOrder, removeDefense } = beastHooks();

    const combatInfoFunctions: CombatInfoFunctions = {
        updateAttackOrder, updateDefenseOrder, removeDefense
    }
    
    useEffect(() => {
        if (setLoading) {
            setLoading(!!beast)
        }
    }, [beast])

    return (
        <div className='card-background'>
            {beast && 
                <EditBody beast={beast} updateSelectedRole={updateSelectedRole} updateBeast={updateBeast} combatInfoFunctions={combatInfoFunctions} />
            }
        </div>
    )
} 