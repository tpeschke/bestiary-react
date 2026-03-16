import beastHooks from "../../hooks/beastHooks";

import { SetLoadingFunction } from "../../../../../components/loading/Loading";
import { useEffect } from "react";
import GMView from "./gmView/gmView";
import PlayerView from "./playerView/playerView";
import { useSelector } from "react-redux";
import { getSystemPreference } from "../../../../../redux/slices/userSlice";

interface Props {
    setLoading?: SetLoadingFunction
}

export default function View({ setLoading }: Props) {
    const systemPreference = useSelector(getSystemPreference) as 0 | 1 | 2 | undefined
    const { beast, playerBeast, updateSelectedRole, updateRoleModifier, updateNotes, updateFavorite } = beastHooks(systemPreference);

    useEffect(() => {
        if (setLoading) {
            setLoading(!!beast || !!playerBeast)
        }
    }, [setLoading, beast, playerBeast])

    return (
        <div className='card-background'>
            {beast && <GMView beast={beast} updateSelectedRole={updateSelectedRole} updateRoleModifier={updateRoleModifier} updateNotes={updateNotes} updateFavorite={updateFavorite} />}
            {playerBeast && <PlayerView beast={playerBeast} />}
        </div>
    )
}
