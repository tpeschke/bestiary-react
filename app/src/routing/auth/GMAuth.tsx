import { JSX, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserPatreon, infoHasBeenFetched } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { PLAYER } from "@bestiary/common/utilities/get/getAccessLevel";

interface Props {
    children: JSX.Element,
    destination?: string
}

export default function GMAuth({ children, destination = '/' }: Props) {
    const userPatreon = useSelector(getUserPatreon)
    const userInfoHasBeenFetched = useSelector(infoHasBeenFetched)
    const navigate = useNavigate()

    useEffect(() => {
        if (userInfoHasBeenFetched && userPatreon === PLAYER) {
            navigate(destination)
        }
    }, [children, userInfoHasBeenFetched])

    return (
        <Loading>
            {children}
        </Loading>
    )
}