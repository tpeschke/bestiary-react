import './Weirdshaping.css'

import CastingInfo from '../../../../interfaces/infoInterfaces.ts/castingInfo'

import CastingTypeSelect from './components/CastingTypeSelect'

interface Props {
    castingInfo: CastingInfo
}

export default function Weirdshaping({ castingInfo }: Props) {
    const {casting} = castingInfo

    return (
        <>
            <h2 className='border'>Weirdshaping</h2>
            <CastingTypeSelect castingTypes={casting} />
        </>
    )
}