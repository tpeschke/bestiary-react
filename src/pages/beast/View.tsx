import beastHooks from "./hooks/beastHooks";

import PlayerView from "./pages/playerView/playerView";
import GMView from "./pages/gmView/gmView";
import { SetLoadingFunction } from "../../components/loading/Loading";

interface Props {
    setLoading?: SetLoadingFunction
}

export default function View({ setLoading }: Props) {
    const { beast, playerBeast, updateSelectedRole, updateRoleModifier, updateNotes, updateFavorite } = beastHooks();

    if (setLoading) {
        setLoading(!beast && !playerBeast)
    }

    return (
        <div className='card-background'>
            {beast && <GMView beast={beast} updateSelectedRole={updateSelectedRole} updateRoleModifier={updateRoleModifier} updateNotes={updateNotes} updateFavorite={updateFavorite} />}
            {playerBeast && <PlayerView beast={playerBeast} />}
        </div>
    )
}
