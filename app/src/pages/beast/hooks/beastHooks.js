import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import PlayerBeastClass from "../models/PlayerBeastClass";
import GMBeastClass from "../models/gmBeastClass/GMBeastClass";
import { beastURL } from "../../../frontend-config";
import alertInfo, { showPendingAlert } from "../../../components/alert/alerts";
import { cacheMonster, removeMonsterFromCache } from "../../../redux/slices/beastCacheSlice";
import { savePlayerNotes, updateFavoriteStatus } from "./playerHooks";
import { shiftAttackOrder } from "./utilities/updateAttacks";
import { shiftDefenseOrder } from "./utilities/updateDefenses";
export default function beastHooks() {
    const [currentBeastId, setCurrentBeastId] = useState('0');
    const [beast, setBeast] = useState();
    const [playerBeast, setPlayerBeast] = useState();
    const { beastId, param1, param2 } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const beastCache = useSelector((state) => state.beastCache.cache);
    useEffect(() => {
        handleBackwardsCompatibilityWithOldUrl();
        const idHasChanged = beastId && beastId !== currentBeastId;
        if (idHasChanged || beastId && !beast) {
            const roleId = searchParams.get("roleId");
            const modifier = searchParams.get("modifier");
            const beast = getBeastFromCache(beastId, roleId, modifier);
            if (beast) {
                document.title = `${beast.generalInfo.name} - Bonfire Bestiary`;
                setBeast(beast);
                scrollToTop();
            }
            else {
                axios.get(beastURL + '/' + beastId).then(({ data }) => {
                    if (data.generalInfo) {
                        document.title = `${data.generalInfo.name} - Bonfire Bestiary`;
                        setBeast(new GMBeastClass(data, roleId, modifier));
                        dispatch(cacheMonster(data));
                        scrollToTop();
                    }
                    else {
                        document.title = `${data.name} - Bonfire Bestiary`;
                        setPlayerBeast(new PlayerBeastClass(data));
                        scrollToTop();
                    }
                    if (data.color === 'red') {
                        alertInfo(data);
                        navigate(`/`);
                    }
                });
            }
            setCurrentBeastId(beastId);
        }
    }, [beastId, searchParams]);
    function scrollToTop() {
        window.scrollTo(0, 0);
    }
    function handleBackwardsCompatibilityWithOldUrl() {
        let queryParams = {};
        const modifierIndexDictionary = ['NONE', 'UNIQUE', 'GREATER', 'DREAD', 'THE'];
        if (window.location.pathname.includes('gm')) {
            if (param1 && param2) {
                queryParams = {
                    roleId: param1,
                    modifier: param2
                };
            }
            else if (param1 && modifierIndexDictionary.includes(param1)) {
                queryParams = {
                    modifier: param2
                };
            }
            else if (param1) {
                queryParams = {
                    roleId: param1,
                };
            }
            navigate({
                pathname: `/beast/${beastId}`,
                search: createSearchParams(queryParams).toString()
            });
        }
    }
    /**
    * Redux returns the CastingInfo as a JSON object, instead of the CastingInfo Class, which can cause errors
    * So you have to retrieve the data and then transfer it to the GMBeastClass
    */
    function getBeastFromCache(beastId, roleId, modifier) {
        const beastFromCache = beastCache[beastId];
        if (beastFromCache) {
            return new GMBeastClass(beastFromCache, roleId, modifier);
        }
        return null;
    }
    const updateSelectedRole = (newRoleId) => {
        const beastInfo = beast?.beastInfo;
        if (beastInfo) {
            const modifiedBeastInfo = {
                ...beastInfo,
                roleInfo: {
                    ...beastInfo.roleInfo,
                    defaultrole: newRoleId
                }
            };
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null));
        }
    };
    const updateRoleModifier = (newRoleModifier) => {
        const beastInfo = beast?.beastInfo;
        if (beastInfo) {
            const modifiedBeastInfo = {
                ...beastInfo,
                roleModifier: newRoleModifier * 5
            };
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null));
        }
    };
    const updateNotes = async (value) => {
        let notes = { notes: value };
        if (beast && !beast?.notes.id) {
            const id = await saveNotes(beast.id, notes);
            notes = { ...notes, id };
        }
        else if (beast && value !== beast?.notes.notes) {
            notes = { ...beast.notes, ...notes };
            await saveNotes(beast.id, notes);
        }
        if (beast) {
            const modifiedBeastInfo = {
                ...beast.beastInfo,
                playerInfo: {
                    ...beast.playerInfo,
                    notes
                },
            };
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null));
        }
    };
    const saveNotes = async (beastId, notes) => {
        return await savePlayerNotes(beastId, notes);
    };
    const updateFavorite = async () => {
        if (beast) {
            const favoriteReturn = await updateFavoriteStatus(beast.id, !beast.favorite);
            const modifiedBeastInfo = {
                ...beast.beastInfo,
                playerInfo: {
                    ...beast.playerInfo,
                    favorite: !beast.favorite
                },
            };
            dispatch(cacheMonster(modifiedBeastInfo));
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null));
            return favoriteReturn;
        }
        return null;
    };
    const updateAttackInfo = (key, value, overAllIndex) => {
        if (beast) {
            const modifiedBeastInfo = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    attacks: beast.beastInfo.combatInfo.attacks.reduce((attacks, attack, index) => {
                        if (index == overAllIndex) {
                            const valueToChangeTo = value === attack[key] ? null : value;
                            attacks.push({
                                ...attack,
                                [key]: valueToChangeTo
                            });
                        }
                        else {
                            attacks.push(attack);
                        }
                        return attacks;
                    }, [])
                }
            };
            dispatch(cacheMonster(modifiedBeastInfo));
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null));
        }
    };
    const addAttack = (newAttack) => {
        if (beast) {
            const modifiedBeastInfo = {
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
            };
            dispatch(cacheMonster(modifiedBeastInfo));
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null));
        }
    };
    const removeAttack = (indexToRemove) => {
        if (beast) {
            const attacks = beast.beastInfo.combatInfo.attacks.reduce((attacks, attack) => {
                if (attack.overAllIndex !== indexToRemove) {
                    attacks.push({
                        ...attack,
                        overAllIndex: attacks.length
                    });
                }
                return attacks;
            }, []);
            const modifiedBeastInfo = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    attacks
                },
            };
            dispatch(cacheMonster(modifiedBeastInfo));
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null));
        }
    };
    const updateAttackOrder = (overAllIndex, overAllIndexToMoveTo) => {
        if (beast) {
            const modifiedBeastInfo = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    attacks: shiftAttackOrder(overAllIndex, overAllIndexToMoveTo, beast.beastInfo.combatInfo.attacks)
                }
            };
            dispatch(cacheMonster(modifiedBeastInfo));
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null));
        }
    };
    const updateDefenseInfo = (key, value, overAllIndex) => {
        if (beast) {
            const modifiedBeastInfo = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    defenses: beast.beastInfo.combatInfo.defenses.reduce((defenses, defense, index) => {
                        if (index == overAllIndex) {
                            defenses.push({
                                ...defense,
                                [key]: value
                            });
                        }
                        else {
                            defenses.push(defense);
                        }
                        return defenses;
                    }, [])
                }
            };
            dispatch(cacheMonster(modifiedBeastInfo));
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null));
        }
    };
    const updateDefenseOrder = (overAllIndex, overAllIndexToMoveTo) => {
        if (beast) {
            const modifiedBeastInfo = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    defenses: shiftDefenseOrder(overAllIndex, overAllIndexToMoveTo, beast.beastInfo.combatInfo.defenses)
                }
            };
            dispatch(cacheMonster(modifiedBeastInfo));
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null));
        }
    };
    const removeDefense = (indexToRemove) => {
        if (beast) {
            const defenses = beast.beastInfo.combatInfo.defenses.reduce((defenses, defense) => {
                if (defense.overAllIndex !== indexToRemove) {
                    defenses.push({
                        ...defense,
                        overAllIndex: defenses.length
                    });
                }
                return defenses;
            }, []);
            const modifiedBeastInfo = {
                ...beast.beastInfo,
                combatInfo: {
                    ...beast.beastInfo.combatInfo,
                    defenses
                },
            };
            dispatch(cacheMonster(modifiedBeastInfo));
            setBeast(new GMBeastClass(modifiedBeastInfo, null, null));
        }
    };
    const updateBeast = async () => {
        if (beast) {
            showPendingAlert(async () => {
                const { data } = await axios.post(beastURL + '/save', beast.beastInfo);
                if (data.color === 'red') {
                    navigate(`/`);
                }
                else if (data.beastID) {
                    dispatch(removeMonsterFromCache(beast.id));
                    navigate(`/beast/${beast.id}`);
                    return { data: { color: 'green', type: 'message', message: 'Entry Saved' } };
                }
                return { data };
            });
        }
    };
    return {
        beast,
        playerBeast,
        updateSelectedRole,
        updateRoleModifier,
        updateNotes,
        updateFavorite,
        updateCombatInfoFunctions: {
            updateAttackOrder,
            updateAttackInfo,
            addAttack,
            updateDefenseOrder,
            removeDefense,
            updateDefenseInfo,
            removeAttack
        },
        updateBeast,
    };
}
