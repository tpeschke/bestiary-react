import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { randomFromListURL } from "../../frontend-config";
export default function ListHome({ setLoading }) {
    document.title = 'Bonfire Bestiary';
    const { listId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (setLoading) {
            setLoading(false);
        }
        axios.get(randomFromListURL + listId).then(({ data }) => {
            navigate(`/beast/${data.beastid}`);
        });
    });
    return (_jsx("div", { children: ":)" }));
}
