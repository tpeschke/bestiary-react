import beastHooks from "./hooks/beastHooks";

import PlayerView from "./pages/playerView/playerView";
import GMView from "./pages/gmView/gmView";

export default function View(setLoading: Function) {
    const { beast, playerBeast, updateSelectedRole } = beastHooks();

    setLoading(!beast && !playerBeast)

    return (
        <div className='card-background'>
            {beast && <GMView beast={beast} updateSelectedRole={updateSelectedRole} />}
            {playerBeast && <PlayerView beast={playerBeast} />}
        </div>
    )
}
