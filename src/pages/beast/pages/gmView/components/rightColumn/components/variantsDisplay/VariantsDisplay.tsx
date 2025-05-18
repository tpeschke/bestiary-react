import Body from "../../../../../../components/UI/body/Body"
import { Variant } from "../../../../../../interfaces/infoInterfaces/linkedInfoInterfaces"
import VariantDisplay from "./components/VariantDisplay"

interface Props {
    variantsInfo: Variant[]
}

export default function VariantsDisplay({ variantsInfo }: Props) {

    return (
        <div className='variants-shell'>
            <h2 className='border'>Variants</h2>
            <Body>
                <div>
                    {variantsInfo.map((variant, index) => <VariantDisplay key={index} variantInfo={variant} />)}
                </div>
            </Body>
        </div>
    )
}