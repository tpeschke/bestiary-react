import { useEffect } from "react";
import { SetLoadingFunction } from "../../components/loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { randomFromListURL } from "../../frontend-config";

interface Props {
    setLoading?: SetLoadingFunction
}

export default function ListHome({ setLoading }: Props) {
    document.title = 'Bonfire Bestiary'
    
    const { listId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (setLoading) {
            setLoading(false)
        }

        axios.get(randomFromListURL +  listId).then(({ data }) => {
            navigate(`/beast/${data.beastid}`)
        })
    })


    return (
        <div>
            :)
        </div>
    )
}