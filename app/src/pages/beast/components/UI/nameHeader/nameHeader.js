import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './nameHeader.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from '../../../../../components/icon/Icon';
import { imageBase } from '../../../../../frontend-config';
import { useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../../../../redux/slices/catalogSlice';
export default function NameHeader({ name, beastID, roleID, roleName, roleNameOrder, favorite = false, updateFavorite }) {
    const [roleTokenID, setRoleTokenID] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (roleID) {
            axios.get(imageBase + beastID + roleID + '-token')
                .then(_ => {
                setRoleTokenID(roleID);
            }).catch(_ => {
                setRoleTokenID(null);
            });
        }
    }, [roleID]);
    function forceDownload() {
        if (beastID) {
            const idBase = roleTokenID ? beastID + roleTokenID : beastID;
            const beastName = processName(name, roleTokenID, roleName, roleNameOrder);
            let xhr = new XMLHttpRequest();
            xhr.open("GET", imageBase + idBase + '-token', true);
            xhr.responseType = "blob";
            xhr.onload = function () {
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(this.response);
                let tag = document.createElement('a');
                tag.href = imageUrl;
                tag.download = beastName + '.png';
                document.body.appendChild(tag);
                tag.click();
                document.body.removeChild(tag);
            };
            xhr.send();
        }
    }
    async function updateFavoriteAndCatalog() {
        if (updateFavorite) {
            const favoriteReturn = await updateFavorite();
            if (favoriteReturn?.type === 'add') {
                dispatch(addToFavorites(favoriteReturn.beastInfo));
            }
            else if (favoriteReturn?.type === 'delete') {
                dispatch(removeFromFavorites(favoriteReturn.beastID));
            }
        }
    }
    return (_jsxs("div", { className: 'Name-Header', children: [_jsxs("span", { className: 'title-span', children: [updateFavorite &&
                        _jsx(Icon, { onClick: updateFavoriteAndCatalog, iconName: favorite ? 'star' : 'star-hollow', color: 'yellow', margin: "right", iconSize: 'h1', tooltip: "Click to Favorite this Entry" }), _jsx("h1", { children: name })] }), beastID && _jsxs("button", { onClick: forceDownload, className: 'transparent-white', children: [_jsx(Icon, { iconName: 'download', color: 'white', margin: 'right' }), "Download Token"] })] }));
}
function processName(name, roleTokenID, roleName, roleNameOrder = '1') {
    if (roleTokenID && roleName && roleName.toUpperCase() !== "NONE") {
        if (!roleNameOrder || roleNameOrder === '1') {
            return name + " " + roleName;
        }
        else if (roleNameOrder === '3') {
            return roleName;
        }
        else {
            return roleName + " " + name;
        }
    }
    return name;
}
