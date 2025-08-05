import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './ResultCard.css';
import ImageNotFound from '../../../../assets/images/404.png';
import { Link } from 'react-router-dom';
import { imageBase } from '../../../../frontend-config';
import HTMLDisplay from '../../../beast/components/UI/htmlDisplay/htmlDisplay';
import Pair from '../../../beast/components/UI/pair/Pair';
import TileIcon from '../../../catalog/components/tile/components/TileIcon';
export default function ResultCard({ searchResult }) {
    const { id, name, thumbnail, intro, rarity, size, mincombat, maxcombat, minskill, maxskill, minsocial, maxsocial, canplayerview, patreon } = searchResult;
    function handleImageError({ currentTarget }) {
        currentTarget.onerror = null;
        currentTarget.src = ImageNotFound;
    }
    const skullIconFormat = {
        iconName: 'skull'
    };
    return (_jsxs(Link, { to: `/beast/${id}`, className: 'card-background result-card', children: [_jsx("div", { className: 'image-shell', children: _jsx("img", { src: imageBase + id, style: { 'objectPosition': thumbnail ?? 'top' }, onError: handleImageError }) }), _jsxs("div", { className: 'info-shell', children: [_jsxs("div", { className: 'name-shell', children: [_jsx(TileIcon, { canplayerview: canplayerview, patreon: patreon }), _jsx("h3", { children: name })] }), _jsxs("div", { className: 'inner-info-shell', children: [_jsx("div", { className: 'intro-shell', children: _jsx(HTMLDisplay, { html: intro }) }), _jsxs("div", { className: 'misc-info-shell', children: [_jsx(Pair, { title: 'Confrontation', info: formatSkullRating(minsocial, maxsocial), format: { position: 'opposite' }, icon: skullIconFormat }), _jsx(Pair, { title: 'Combat', info: formatSkullRating(mincombat, maxcombat), format: { position: 'opposite' }, icon: skullIconFormat }), _jsx(Pair, { title: 'Skill', info: formatSkullRating(minskill, maxskill), format: { position: 'opposite' }, icon: skullIconFormat }), size && _jsx(Pair, { title: 'Size', info: size, format: { position: 'opposite' } }), _jsx(Pair, { title: 'Rarity', info: rarity.rarityName, format: { position: 'opposite' } })] })] })] })] }));
}
function formatSkullRating(min, max) {
    if (min === max) {
        return `${getSkullNumber(min)}`;
    }
    else {
        return `${getSkullNumber(min)} - ${getSkullNumber(max)}`;
    }
}
function getSkullNumber(points) {
    if (points <= 3) {
        return 1;
    }
    else if (points <= 8) {
        return 2;
    }
    else if (points <= 13) {
        return 3;
    }
    else if (points <= 18) {
        return 4;
    }
    else if (points <= 23) {
        return 5;
    }
    else if (points <= 28) {
        return 6;
    }
    else if (points <= 33) {
        return 7;
    }
    else {
        return 8;
    }
}
