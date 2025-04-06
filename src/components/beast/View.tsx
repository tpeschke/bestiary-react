import beastHooks from "./hooks/beastHooks";

import PlayerView from "./modules/playerView/playerView";
import GMView from "./modules/gmView";

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
