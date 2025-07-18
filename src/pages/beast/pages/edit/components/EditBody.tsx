import NameHeader from "../../../components/UI/nameHeader/nameHeader";
import GMBeastClass from "../../../models/GMBeastClass";

interface Props {
    beast: GMBeastClass
}

export default function EditBody({ beast }: Props) {
    const { generalInfo } = beast
    const { name } = generalInfo

    return (
        <>
            <NameHeader name={name} />
        </>
    )
}