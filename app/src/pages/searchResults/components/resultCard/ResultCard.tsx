import './ResultCard.css'
import ImageNotFound from '../../../../assets/images/404.png'

import { SearchResult } from '@bestiary/common/interfaces/search'
import { Link } from 'react-router-dom'
import { imageBase } from '../../../../frontend-config'
import HTMLDisplay from '../../../beast/components/UI/htmlDisplay/htmlDisplay'
import Pair, { PairIconSettings } from '../../../beast/components/UI/pair/Pair'
import TileIcon from '../../../catalog/components/tile/components/TileIcon'

interface Props {
    searchResult: SearchResult
}

export default function ResultCard({ searchResult }: Props) {
    const { id, name, thumbnail, intro, rarity, size, mincombat, maxcombat, minskill, maxskill, minsocial, maxsocial, canplayerview, patreon } = searchResult

    function handleImageError({ currentTarget }: any) {
        currentTarget.onerror = null
        currentTarget.src = ImageNotFound
    }

    const skullIconFormat: PairIconSettings = {
        iconName: 'skull'
    }

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
                        <Pair title='Confrontation' info={formatSkullRating(minsocial, maxsocial)} format={{ position: 'opposite' }} icon={skullIconFormat} />
                        <Pair title='Combat' info={formatSkullRating(mincombat, maxcombat)} format={{ position: 'opposite' }} icon={skullIconFormat} />
                        <Pair title='Skill' info={formatSkullRating(minskill, maxskill)} format={{ position: 'opposite' }} icon={skullIconFormat} />
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

function getSkullNumber(points: number): number {
    if (points <= 3) {
        return 1
    } else if (points <= 8) {
        return 2
    } else if (points <= 13) {
        return 3
    } else if (points <= 18) {
        return 4
    } else if (points <= 23) {
        return 5
    } else if (points <= 28) {
        return 6
    } else if (points <= 33) {
        return 7
    } else {
        return 8
    }
}