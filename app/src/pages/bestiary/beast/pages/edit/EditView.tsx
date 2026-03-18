import { useEffect } from "react";
import { SetLoadingFunction } from "../../../../../components/loading/Loading";
import beastHooks from "../../hooks/beastHooks";
import EditBody from "./components/editBody/EditBody";
import { getSystemPreference } from "../../../../../redux/slices/userSlice";
import { useSelector } from "react-redux";

interface Props {
    setLoading?: SetLoadingFunction
}

export default function EditView({ setLoading }: Props) {
    const systemPreference = useSelector(getSystemPreference) as 0 | 1 | 2 | undefined

    const {
        beast, updateSelectedRole, saveBeast, updateGeneralInfoFunctions,
        updateSocialInfoFunctions, updateCombatInfoFunctions, updateSkillInfoFunctions
    } = beastHooks(systemPreference);

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
                    updateGeneralInfoFunctions={updateGeneralInfoFunctions}
                    updateSocialInfoFunctions={updateSocialInfoFunctions}
                    updateCombatInfoFunctions={updateCombatInfoFunctions}
                    updateSkillInfoFunctions={updateSkillInfoFunctions}
                />
            }
        </div>
    )
} 