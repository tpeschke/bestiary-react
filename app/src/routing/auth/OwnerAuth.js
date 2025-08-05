import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isOwner, infoHasBeenFetched } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
export default function OwnerAuth({ children }) {
    const userIsOwner = useSelector(isOwner);
    const userInfoHasBeenFetched = useSelector(infoHasBeenFetched);
    const navigate = useNavigate();
    useEffect(() => {
        if (userInfoHasBeenFetched && !userIsOwner) {
            navigate('/');
        }
    }, [children, userInfoHasBeenFetched]);
    return (_jsx(Loading, { children: children }));
}
