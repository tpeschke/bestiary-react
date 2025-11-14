import { useEffect } from "react";
import { SetLoadingFunction } from "../../../../components/loading/Loading";
import beastHooks from "../../hooks/beastHooks";
import EditBody from "./components/editBody/EditBody";

interface Props {
    setLoading?: SetLoadingFunction
}

export default function EditView({ setLoading }: Props) {
    const { beast, updateSelectedRole, saveBeast, updateSocialInfoFunctions, updateCombatInfoFunctions, updateSkillInfoFunctions } = beastHooks();

    useEffect(() => {
        if (setLoading) {
            setLoading(!!beast)
        }
    }, [beast])

    return (
        <div className='card-background'>
            {beast &&
                <EditBody
                    beast={beast}
                    updateSelectedRole={updateSelectedRole}
                    saveBeast={saveBeast}
                    updateSocialInfoFunctions={updateSocialInfoFunctions}
                    updateCombatInfoFunctions={updateCombatInfoFunctions}
                    updateSkillInfoFunctions={updateSkillInfoFunctions}
                />
            }
        </div>
    )
} 