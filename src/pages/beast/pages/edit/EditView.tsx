import { useEffect } from "react";
import { SetLoadingFunction } from "../../../../components/loading/Loading";

interface Props {
    setLoading?: SetLoadingFunction
}

export default function EditView({ setLoading }: Props) {

    useEffect(() => {
        if (setLoading) {
            setLoading(true)
        }
    }, [])

    return (
        <div className='card-background'>
            Ready to Edit!
        </div>
    )
} 