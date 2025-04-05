import beastHooks from "./hooks/beastHooks";

import PlayerView from "./modules/playerView/playerView";
import GMView from "./modules/gmView";

export default function View() {
    const { beast } = beastHooks();

    return (
        (beast ?
            <div className='card-background'>
                {beast.generalInfo ?
                    <GMView beast={beast} />
                    :
                    <PlayerView beast={beast} />
                }
            </div>
            :
            <div>
                LOADING
            </div>
        )
    )
}
