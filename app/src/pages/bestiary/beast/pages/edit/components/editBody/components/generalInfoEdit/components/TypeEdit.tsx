import { BeastType } from "@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces";
import Body from "../../../../../../../components/UI/body/Body";
import { UpdateArrayFunction } from "../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces";

interface Props {
    types: BeastType[],
    updateLinkedInfo: UpdateArrayFunction
}

export default function TypeEdit({ types, updateLinkedInfo }: Props) {
    console.log(types)

    const deleteType = (typeid: number) => {
        const modifiedTypes = types.filter(type => type.typeid !== typeid)
        updateLinkedInfo('types', modifiedTypes)
    }

    return (
        <>
            <h2 className="border">Types</h2>
            <Body>
                <>
                    {types.map(({typeid, type}) => <button key={typeid} className="delete" onClick={_ => deleteType(typeid)}>{type} <span className="orange">X</span></button>)}
                </>
            </Body>
        </>
    )
}