import { StopPropagationAndCaptureQuery } from "../../AdvancedSearchInnards";
import { skullSearchDictionary } from "../../utilities/searchDictionaries";
import SearchSelect from "../SearchSelect";

interface Props {
    stopPropagationAndCaptureQuery: StopPropagationAndCaptureQuery,
}

export default function SkullSearch({ stopPropagationAndCaptureQuery }: Props) {
    return (
        <div className='inner-searches-shell'>
            <div className='rating-shell'>
                <p>Confrontation Skulls</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='minConfrontationRate' dictionary={skullSearchDictionary} />
                <p>-</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='maxConfrontationRate' dictionary={skullSearchDictionary} />
            </div>

            <div className='rating-shell'>
                <p>Combat Skulls</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='minCombatRate' dictionary={skullSearchDictionary} />
                <p>-</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='maxCombatRate' dictionary={skullSearchDictionary} />
            </div>

            <div className='rating-shell'>
                <p>Skill Skulls</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='minChallengeRate' dictionary={skullSearchDictionary} />
                <p>-</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='maxChallengeRate' dictionary={skullSearchDictionary} />
            </div>
        </div>
    )
}