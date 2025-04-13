import beastHooks from "./hooks/beastHooks";

import PlayerView from "./components/playerView/playerView";
import GMView from "./components/gmView";

export default function View(setLoading: Function) {
    const { beast, playerBeast } = beastHooks();

    setLoading(!beast && !playerBeast)

    return (
        <div className='card-background'>
            {beast ? <GMView beast={beast} /> : <></>}
            {playerBeast ? <PlayerView beast={playerBeast} /> : <></>}
        </div>
    )
}
