import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import PlayerBeastClass from "../models/PlayerBeastClass";
import GMBeastClass from "../models/gmBeastClass/GMBeastClass";

import { beastURL } from "../../../frontend-config";
import alertInfo, { showPendingAlert } from "../../../components/alert/alerts";

import { cacheMonster, removeMonsterFromCache } from "../../../redux/slices/beastCacheSlice";
import { BeastInfo } from "../interfaces/viewInterfaces";
import { savePlayerNotes, updateFavoriteStatus } from "./playerHooks";
import { Notes } from "@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces";
import { SetPlayerNotes } from "../components/notes/notesDisplay";
import { CatalogTile } from "../../catalog/catalogInterfaces";
import { shiftAttackOrder } from "./updateUtilities/utilities/updateAttacks";
import { shiftDefenseOrder } from "./updateUtilities/utilities/updateDefenses";
import { AttackInfo, DefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import { RoleCombatInfo, RoleSkillInfo, RoleSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import { UpdateFunction } from "./updateUtilities/updateInterfaces";
import getUpdateSocialInfoFunctions, { UpdateSocialInfoFunctionsObject } from "./updateUtilities/updateSocialInfo";

export type UpdateSelectedRoleFunction = (newRoleId: string) => void
export type UpdateRoleModifierFunction = (newRoleModifier: number) => void

export type UpdateFavoriteFunction = () => Promise<FavoriteReturn | null>

export type UpdateOrderFunction = (overAllIndex: number, overAllIndexToMoveTo: number) => void
export type RemoveCombatFunction = (indexToRemove: number) => void
export type UpdateAttackDefenseInfoFunction = (key: string, value: string, overAllIndex: number) => void
export type AddAttackFunction = (newAttack: AttackInfo) => void

export type UpdateBeastFunction = () => void

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
    updateFavorite: UpdateFavoriteFunction,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject,
    updateSocialInfoFunctions: UpdateSocialInfoFunctionsObject,
    updateSkillInfoFunctions: UpdateSkillInfoFunctionsObject,
    updateBeast: UpdateBeastFunction
}

export type UpdateCombatInfoFunctionsObject = {
    updateCombatInfo: UpdateFunction,
    updateAttackOrder: UpdateOrderFunction,
    updateAttackInfo: UpdateAttackDefenseInfoFunction,
    addAttack: AddAttackFunction,
    updateDefenseInfo: UpdateAttackDefenseInfoFunction,
    updateDefenseOrder: UpdateOrderFunction,
    removeDefense: RemoveCombatFunction,
    removeAttack: RemoveCombatFunction
}

export type UpdateSkillInfoFunctionsObject = {
    updateSkillInfo: UpdateFunction
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

    const updateBeastInfo = (modifiedBeastInfo: any) => {
        dispatch(cacheMonster(modifiedBeastInfo))
        setBeast(new GMBeastClass(modifiedBeastInfo, null, null))
    }

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

    const [updateSocialInfoFunctions, setUpdateSocialInfoFunctions] = useState<UpdateSocialInfoFunctionsObject>(getUpdateSocialInfoFunctions(beast, updateBeastInfo))

    useEffect(() => {
        setUpdateSocialInfoFunctions(getUpdateSocialInfoFunctions(beast, updateBeastInfo))
    }, [beast])

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
                roleModifier: newRoleModifier
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

            updateBeastInfo(modifiedBeastInfo)
            return favoriteReturn
        }

        return null
    }

    const updateCombatInfo = (key: string, value: string | number) => {
        if (beast && beast.selectedRole) {
            let modifiedCombatInfo: RoleCombatInfo = {
                ...beast.selectedRole.combatInfo,
                [key]: value
            }

            if (key === 'combatSkulls' && typeof value === 'number') {
                modifiedCombatInfo.skullIndex = getSkullIndex(value)
            }

            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                roleInfo: {
                    ...beast.beastInfo.roleInfo,
                    roles: beast.beastInfo.roleInfo.roles.map((role, index) => {
                        if (index === beast.selectedRoleIndex) {
                            return {
                                ...role,
                                combatInfo: modifiedCombatInfo
                            }
                        }
                        return role
                    })
                }
            }

            updateBeastInfo(modifiedBeastInfo)
        } else if (beast) {
            let modifiedCombatInfo = {
                ...beast.beastInfo.combatInfo,
                [key]: value
            }

            if (key === 'combatSkulls' && typeof value === 'number') {
                modifiedCombatInfo.skullIndex = getSkullIndex(value)
            }

            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                combatInfo: modifiedCombatInfo
            }

            updateBeastInfo(modifiedBeastInfo)
        }
    }

    const updateAttackInfo = (key: string, value: string, overAllIndex: number) => {
        if (beast) {
            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    attacks: beast.beastInfo.combatInfo.attacks.map((attack: AttackInfo, index: number) => {
                        if (index == overAllIndex) {
                            const valueToChangeTo = value === attack[key as keyof AttackInfo] ? null : value
                            return {
                                ...attack,
                                [key]: valueToChangeTo
                            }
                        } else {
                            return attack
                        }
                    })
                }
            }

            updateBeastInfo(modifiedBeastInfo)
        }
    }

    const addAttack = (newAttack: AttackInfo) => {
        if (beast) {
            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    attacks: [
                        ...beast.beastInfo.combatInfo.attacks,
                        {
                            ...newAttack,
                            roleid: beast.selectedRoleID,
                            overAllIndex: beast.beastInfo.combatInfo.attacks.length
                        }
                    ]
                }
            }

            updateBeastInfo(modifiedBeastInfo)
        }
    }

    const removeAttack = (indexToRemove: number) => {
        if (beast) {
            const attacks = beast.beastInfo.combatInfo.attacks.reduce((attacks: AttackInfo[], attack: AttackInfo) => {
                if (attack.overAllIndex !== indexToRemove) {
                    attacks.push({
                        ...attack,
                        overAllIndex: attacks.length
                    })
                }

                return attacks
            }, [])

            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    attacks
                },
            }
            updateBeastInfo(modifiedBeastInfo)
        }
    }

    const updateAttackOrder = (overAllIndex: number, overAllIndexToMoveTo: number) => {
        if (beast) {
            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    attacks: shiftAttackOrder(overAllIndex, overAllIndexToMoveTo, beast.beastInfo.combatInfo.attacks)
                }
            }

            updateBeastInfo(modifiedBeastInfo)
        }
    }

    const updateDefenseInfo = (key: string, value: string, overAllIndex: number) => {
        if (beast) {
            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    defenses: beast.beastInfo.combatInfo.defenses.reduce((defenses: DefenseInfo[], defense: DefenseInfo, index: number) => {
                        if (index == overAllIndex) {
                            defenses.push({
                                ...defense,
                                [key]: value
                            })
                        } else {
                            defenses.push(defense)
                        }
                        return defenses
                    }, [])
                }
            }

            updateBeastInfo(modifiedBeastInfo)
        }
    }

    const updateDefenseOrder = (overAllIndex: number, overAllIndexToMoveTo: number) => {
        if (beast) {
            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    defenses: shiftDefenseOrder(overAllIndex, overAllIndexToMoveTo, beast.beastInfo.combatInfo.defenses)
                }
            }

            updateBeastInfo(modifiedBeastInfo)
        }
    }

    const removeDefense = (indexToRemove: number) => {
        if (beast) {
            const defenses = beast.beastInfo.combatInfo.defenses.reduce((defenses: DefenseInfo[], defense: DefenseInfo) => {
                if (defense.overAllIndex !== indexToRemove) {
                    defenses.push({
                        ...defense,
                        overAllIndex: defenses.length
                    })
                }

                return defenses
            }, [])

            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    defenses
                },
            }

            updateBeastInfo(modifiedBeastInfo)
        }
    }

    const updateSkillInfo = (key: string, value: string | number) => {
        if (beast && beast.selectedRole) {
            let modifiedSkillInfo: RoleSkillInfo = {
                ...beast.selectedRole.skillInfo,
                [key]: value
            }

            if (key === 'skillSkulls' && typeof value === 'number') {
                modifiedSkillInfo.skullIndex = getSkullIndex(value)
            }

            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                roleInfo: {
                    ...beast.beastInfo.roleInfo,
                    roles: beast.beastInfo.roleInfo.roles.map((role, index) => {
                        if (index === beast.selectedRoleIndex) {
                            return {
                                ...role,
                                skillInfo: modifiedSkillInfo
                            }
                        }
                        return role
                    })
                }
            }

            updateBeastInfo(modifiedBeastInfo)
        } else if (beast) {
            let modifiedSkillInfo = {
                ...beast.beastInfo.skillInfo,
                [key]: value
            }

            if (key === 'skillSkulls' && typeof value === 'number') {
                modifiedSkillInfo.skullIndex = getSkullIndex(value)
            }

            const modifiedBeastInfo: any = {
                ...beast.beastInfo,
                skillInfo: modifiedSkillInfo
            }

            updateBeastInfo(modifiedBeastInfo)
        }
    }

    const updateBeast = async () => {
        if (beast) {
            showPendingAlert(async () => {
                const { data } = await axios.post(beastURL + '/save', beast.beastInfo)

                if (data.color === 'red') {
                    navigate(`/`)
                } else if (data.beastID) {
                    dispatch(removeMonsterFromCache(beast.id))
                    navigate(`/beast/${beast.id}`)
                    return { data: { color: 'green', type: 'message', message: 'Entry Saved' } }
                }

                return { data }
            })
        }
    }

    return {
        beast,
        playerBeast,
        updateSelectedRole,
        updateRoleModifier,
        updateNotes,
        updateFavorite,
        updateSocialInfoFunctions,
        updateCombatInfoFunctions: {
            updateCombatInfo,
            updateAttackOrder,
            updateAttackInfo,
            addAttack,
            updateDefenseOrder,
            removeDefense,
            updateDefenseInfo,
            removeAttack
        },
        updateSkillInfoFunctions: {
            updateSkillInfo
        },
        updateBeast,
    }
}