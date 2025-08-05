import beastHooks from "../../hooks/beastHooks";

import { SetLoadingFunction } from "../../../../components/loading/Loading";
import { useEffect } from "react";
import GMView from "./gmView/gmView";
import PlayerView from "./playerView/playerView";

interface Props {
    setLoading?: SetLoadingFunction
}

export default function View({ setLoading }: Props) { 
    const { beast, playerBeast, updateSelectedRole, updateRoleModifier, updateNotes, updateFavorite } = beastHooks();

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
