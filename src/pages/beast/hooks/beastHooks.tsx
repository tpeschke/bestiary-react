import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import PlayerBeastClass from "../models/PlayerBeastClass";
import GMBeastClass from "../models/GMBeastClass";

import { beastURL } from "../../../frontend-config";
import alertInfo from "../../../components/alert/alerts";

import { cacheMonster, getBeastCache } from "../../../redux/slices/beastCacheSlice";
import { BeastInfo } from "../interfaces/viewInterfaces";

export type UpdateSelectedRoleFunction = (newRoleId: string) => void
export type UpdateRoleModifierFunction = (newRoleModifier: number) => void

interface Return {
    beast?: GMBeastClass,
    playerBeast?: PlayerBeastClass,
    updateSelectedRole: UpdateSelectedRoleFunction,
    updateRoleModifier: UpdateRoleModifierFunction
}

export default function beastHooks(): Return {
    const [currentBeastId, setCurrentBeastId] = useState('0')

    const [beast, setBeast] = useState<GMBeastClass>()
    const [playerBeast, setPlayerBeast] = useState<PlayerBeastClass>()

    const { beastId } = useParams()

    const [searchParams] = useSearchParams();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const beastCache = useSelector(getBeastCache)

    useEffect(() => {
        const idHasChanged = beastId && beastId !== currentBeastId
        if (idHasChanged || beastId && !beast) {
            const roleId = searchParams.get("roleId")
            const modifier = searchParams.get("modifier")

            const beast = getBeastFromCache(beastCache, roleId, modifier)

            if (beast) {
                setBeast(beast)
                scrollToTop()
            } else {
                axios.get(beastURL + '/' + beastId).then(({ data }) => {
                    if (data.generalInfo) {
                        setBeast(new GMBeastClass(data, roleId, modifier))
                        dispatch(cacheMonster(data))
                        scrollToTop()
                    } else {
                        setPlayerBeast(new PlayerBeastClass(data))
                        scrollToTop()
                    }
                    if (data.color === 'red') {
                        alertInfo(data)
                        navigate(`/`)
                    }
                })
            }
            setCurrentBeastId(beastId)
        }
    }, [beastId]);

    function scrollToTop() {
        window.scrollTo(0, 0)
    }

    /**
    * Redux returns the CastingInfo as a JSON object, instead of the CastingInfo Class, which can cause errors
    * So you have to retrieve the data and then transfer it to the GMBeastClass
    */
    function getBeastFromCache(beastId: number, roleId: string | null, modifier: string | null): null | GMBeastClass {
        const beastFromCache = beastCache[beastId]
        if (beastFromCache) {
            return new GMBeastClass(beastFromCache, roleId, modifier)
        }
        return null
    }

    const updateSelectedRole = (newRoleId: string): void => {
        const beastInfo = beast?.beastInfo

        if (beastInfo) {
            const modifiedBeastInfo: BeastInfo = {
                ...beastInfo,
                roleInfo: {
                    ...beastInfo.roleInfo,
                    defaultrole: newRoleId
                }
            }

            setBeast(new GMBeastClass(modifiedBeastInfo, null, null))
        }
    }

    const updateRoleModifier = (newRoleModifier: number): void => {
        const beastInfo = beast?.beastInfo

        if (beastInfo) {
            const modifiedBeastInfo: BeastInfo = {
                ...beastInfo,
                roleModifier: newRoleModifier * 5
            }

            setBeast(new GMBeastClass(modifiedBeastInfo, null, null))
        }
    }

    return {
        beast,
        playerBeast,
        updateSelectedRole,
        updateRoleModifier
    }
}