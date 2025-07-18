import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import PlayerBeastClass from "../models/PlayerBeastClass";
import GMBeastClass from "../models/gmBeastClass/GMBeastClass";

import { beastURL } from "../../../frontend-config";
import alertInfo from "../../../components/alert/alerts";

import { cacheMonster } from "../../../redux/slices/beastCacheSlice";
import { BeastInfo } from "../interfaces/viewInterfaces";
import { savePlayerNotes, updateFavoriteStatus } from "./playerHooks";
import { Notes } from "../../../../common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces";
import { SetPlayerNotes } from "../components/notes/notesDisplay";
import { CatalogTile } from "../../catalog/catalogInterfaces";

export type UpdateSelectedRoleFunction = (newRoleId: string) => void
export type UpdateRoleModifierFunction = (newRoleModifier: number) => void
export type UpdateFavoriteFunction = () => Promise<FavoriteReturn | null>

interface UpdateFavoriteReturnBase {
    type: 'delete' | 'add'
}

interface DeleteFavoriteReturn extends UpdateFavoriteReturnBase {
    type: 'delete',
    beastID: number
}

interface AddFavoriteReturn extends UpdateFavoriteReturnBase {
    type: 'add',
    beastInfo: CatalogTile
}

export type FavoriteReturn = DeleteFavoriteReturn | AddFavoriteReturn

interface Return {
    beast?: GMBeastClass,
    playerBeast?: PlayerBeastClass,
    updateSelectedRole: UpdateSelectedRoleFunction,
    updateRoleModifier: UpdateRoleModifierFunction,
    updateNotes: SetPlayerNotes,
    updateFavorite: UpdateFavoriteFunction
}

export default function beastHooks(): Return {
    const [currentBeastId, setCurrentBeastId] = useState('0')

    const [beast, setBeast] = useState<GMBeastClass>()
    const [playerBeast, setPlayerBeast] = useState<PlayerBeastClass>()

    const { beastId, param1, param2 } = useParams()

    const [searchParams] = useSearchParams();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const beastCache = useSelector((state: any) => state.beastCache.cache)

    useEffect(() => {
        handleBackwardsCompatibilityWithOldUrl()

        const idHasChanged = beastId && beastId !== currentBeastId

        if (idHasChanged || beastId && !beast) {
            const roleId = searchParams.get("roleId")
            const modifier = searchParams.get("modifier")

            const beast = getBeastFromCache(beastId, roleId, modifier)

            if (beast) {
                document.title = `${beast.generalInfo.name} - Bonfire Bestiary`
                setBeast(beast)
                scrollToTop()
            } else {
                axios.get(beastURL + '/' + beastId).then(({ data }) => {
                    if (data.generalInfo) {
                        document.title = `${data.generalInfo.name} - Bonfire Bestiary`
                        setBeast(new GMBeastClass(data, roleId, modifier))
                        dispatch(cacheMonster(data))
                        scrollToTop()
                    } else {
                        document.title = `${data.name} - Bonfire Bestiary`
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
    }, [beastId, searchParams]);

    function scrollToTop() {
        window.scrollTo(0, 0)
    }

    function handleBackwardsCompatibilityWithOldUrl() {
        let queryParams: any = {}
        const modifierIndexDictionary = ['NONE', 'UNIQUE', 'GREATER', 'DREAD', 'THE']

        if (window.location.pathname.includes('gm')) {
            if (param1 && param2) {
                queryParams = {
                    roleId: param1,
                    modifier: param2
                }
            } else if (param1 && modifierIndexDictionary.includes(param1)) {
                queryParams = {
                    modifier: param2
                }
            } else if (param1) {
                queryParams = {
                    roleId: param1,
                }
            }

            navigate({
                pathname: `/beast/${beastId}`,
                search: createSearchParams(queryParams).toString()
            })
        }
    }

    /**
    * Redux returns the CastingInfo as a JSON object, instead of the CastingInfo Class, which can cause errors
    * So you have to retrieve the data and then transfer it to the GMBeastClass
    */
    function getBeastFromCache(beastId: string, roleId: string | null, modifier: string | null): null | GMBeastClass {
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

    const updateNotes = async (value: string): Promise<void> => {
        let notes: Notes = { notes: value }

        if (beast && !beast?.notes.id) {
            const id = await saveNotes(beast.id, notes)
            notes = { ...notes, id }
        } else if (beast && value !== beast?.notes.notes) {
            notes = { ...beast.notes, ...notes }
            await saveNotes(beast.id, notes)
        }

        if (beast) {
            const modifiedBeastInfo: BeastInfo = {
                ...beast.beastInfo,
                playerInfo: {
                    ...beast.playerInfo,
                    notes
                },
            }

            setBeast(new GMBeastClass(modifiedBeastInfo, null, null))
        }
    }

    const saveNotes = async (beastId: number, notes: Notes): Promise<number> => {
        return await savePlayerNotes(beastId, notes)
    }

    const updateFavorite = async (): Promise<FavoriteReturn | null> => {
        if (beast) {
            const favoriteReturn = await updateFavoriteStatus(beast.id, !beast.favorite)

            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                playerInfo: {
                    ...beast.playerInfo,
                    favorite: !beast.favorite
                },
            }

            dispatch(cacheMonster(modifiedBeastInfo))
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null))
            return favoriteReturn
        }

        return null
    }

    return {
        beast,
        playerBeast,
        updateSelectedRole,
        updateRoleModifier,
        updateNotes,
        updateFavorite
    }
}