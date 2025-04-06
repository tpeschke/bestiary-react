import beastHooks from "./hooks/beastHooks";

import PlayerView from "./components/playerView/playerView";
import GMView from "./components/gmView";

export default function View() {
    const { beast, playerBeast } = beastHooks();

    const showPage = beast || playerBeast

    return (
        (showPage ?
            <div className='card-background'>
                {beast ? <GMView beast={beast} /> : <></>}
                {playerBeast ? <PlayerView beast={playerBeast} /> : <></>}
            </div>
            :
            <div>
                LOADING
            </div>
        )
    )
}
