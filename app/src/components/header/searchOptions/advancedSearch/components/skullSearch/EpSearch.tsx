import { StopPropagationAndCaptureQuery } from "../../AdvancedSearchInnards";
import { epSearchDictionary } from "../../utilities/searchDictionaries";
import SearchSelect from "../SearchSelect";

interface Props {
    stopPropagationAndCaptureQuery: StopPropagationAndCaptureQuery,
}

export default function EpSearch({ stopPropagationAndCaptureQuery }: Props) {
    return (
        <div className='inner-searches-shell'>
            <div className='rating-shell'>
                <p>Social EPs</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='minSocialEPs' dictionary={epSearchDictionary} />
                <p>-</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='maxSocialEPs' dictionary={epSearchDictionary} />
            </div>

            <div className='rating-shell'>
                <p>Combat EPs</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='minCombatEPs' dictionary={epSearchDictionary} />
                <p>-</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='maxCombatEPs' dictionary={epSearchDictionary} />
            </div>

            <div className='rating-shell'>
                <p>Skill EPs</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='minChallengeEP' dictionary={epSearchDictionary} />
                <p>-</p>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='maxChallengeEP' dictionary={epSearchDictionary} />
            </div>
        </div>
    )
}