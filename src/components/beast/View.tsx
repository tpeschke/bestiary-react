import beastHooks from "./hooks/beastHooks";

import PlayerView from "./modules/playerView/playerView";
import GMView from "./modules/gmView";

export default function View() {
    const { beast, playerBeast, playerSetInfo } = beastHooks();

    return (
        (beast || playerBeast ?
            <div className='card-background'>
                {beast ?
                    <GMView beast={beast} />
                    :
                    <PlayerView beast={playerBeast} setInfo={playerSetInfo} />
                }
            </div>
            :
            <div>
                LOADING
            </div>
        )
    )
}
