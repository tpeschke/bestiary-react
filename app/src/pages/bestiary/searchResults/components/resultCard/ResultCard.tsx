import './ResultCard.css'
import ImageNotFound from '../../../../../assets/images/404.png'

import { SearchResult } from '@bestiary/common/interfaces/search'
import { Link } from 'react-router-dom'
import { imageBase } from '../../../../../frontend-config'
import HTMLDisplay from '../../../../bestiary/beast/components/UI/htmlDisplay/htmlDisplay'
import Pair, { PairIconSettings } from '../../../../bestiary/beast/components/UI/pair/Pair'
import TileIcon from '../../../../bestiary/catalog/components/tile/components/TileIcon'
import { useSelector } from 'react-redux'
import { getSystemPreference } from '../../../../../redux/slices/userSlice'
import { BONFIRE } from '@bestiary/common/utilities/get/getSystemString'

interface Props {
    searchResult: SearchResult
}

export default function ResultCard({ searchResult }: Props) {
    const systemPreference = useSelector(getSystemPreference) as 0 | 1 | 2 | undefined

    const { id, name, thumbnail, intro, rarity, size,
        mincombatskull, maxcombatskull, minskillskull, maxskillskull, minsocialskull, maxsocialskull,
        mincombatep, maxcombatep, minskillep, maxskillep, minsocialep, maxsocialep,
        canplayerview, patreon } = searchResult

    function handleImageError({ currentTarget }: any) {
        currentTarget.onerror = null
        currentTarget.src = ImageNotFound
    }

    const isBonfire = systemPreference === BONFIRE

    const skullIconFormat: PairIconSettings | null = isBonfire ? {
        iconName: 'skull'
    } : null

    const confrontationOrSocial = isBonfire ? 'Confrontation' : 'Social'
    const socialEPSkull = isBonfire ? formatSkullRating(minsocialskull, maxsocialskull) : formatEPs(minsocialep, maxsocialep)
    const combatEPSkull = isBonfire ? formatSkullRating(mincombatskull, maxcombatskull) : formatEPs(mincombatep, maxcombatep)
    const skillEPSkull = isBonfire ? formatSkullRating(minskillskull, maxskillskull) : formatEPs(minskillep, maxskillep)

    return (
        <Link to={`/beast/${id}`} className='card-background result-card'>
            <div className='image-shell'>
                <img src={imageBase + id} style={{ 'objectPosition': thumbnail ?? 'top' }} onError={handleImageError}></img>
            </div>
            <div className='info-shell'>
                <div className='name-shell'>
                    <TileIcon canplayerview={canplayerview} patreon={patreon} />
                    <h3>{name}</h3>
                </div>
                <div className='inner-info-shell'>
                    <div className='intro-shell'>
                        <HTMLDisplay html={intro} />
                    </div>
                    <div className='misc-info-shell'>
                        <Pair title={confrontationOrSocial} info={socialEPSkull} format={{ position: 'opposite' }} icon={skullIconFormat} />
                        <Pair title='Combat' info={combatEPSkull} format={{ position: 'opposite' }} icon={skullIconFormat} />
                        <Pair title='Skill' info={skillEPSkull} format={{ position: 'opposite' }} icon={skullIconFormat} />
                        {size && <Pair title='Size' info={size} format={{ position: 'opposite' }} />}
                        <Pair title='Rarity' info={rarity.rarityName} format={{ position: 'opposite' }} />
                    </div>
                </div>
            </div>
        </Link>
    )
}

function formatSkullRating(min: number, max: number): string {
    if (min === max) {
        return `${getSkullNumber(min)}`
    } else {
        return `${getSkullNumber(min)} - ${getSkullNumber(max)}`
    }
}

function formatEPs(min: number, max: number): string {
    if (min === max) {
        return `${min} EPs`
    } else {
        return `${min} - ${max} EPs`
    }
}

function getSkullNumber(points: number): number {
    if (points <= 3) {
        return 0
    } else if (points <= 8) {
        return 1
    } else if (points <= 13) {
        return 2
    } else if (points <= 18) {
        return 3
    } else if (points <= 23) {
        return 4
    } else if (points <= 28) {
        return 5
    } else if (points <= 33) {
        return 6
    } else {
        return 7
    }
}