import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './fullImage.css';
import ImageNotFound from '../../../../../assets/images/404.png';
import { imageBase } from '../../../../../frontend-config';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function FullImage({ imageParam, altText, artistInfo, roleID = '' }) {
    const [hasRoleArt, setHasRoleArt] = useState(false);
    const link = artistInfo?.link;
    const tooltip = artistInfo?.tooltip;
    const artist = artistInfo?.artist;
    const roleImage = imageBase + imageParam + roleID;
    const normalImage = imageBase + imageParam;
    const notFoundImage = ImageNotFound;
    useEffect(() => {
        axios.get(roleImage).then(result => setHasRoleArt(result.status === 200)).catch(_ => { setHasRoleArt(false); });
    }, [roleID]);
    function handleImageError({ currentTarget }) {
        currentTarget.onerror = null;
        if (currentTarget.src === roleImage) {
            currentTarget.src = normalImage;
        }
        else if (currentTarget.src === normalImage) {
            currentTarget.src = notFoundImage;
        }
    }
    return (_jsxs(_Fragment, { children: [_jsx("img", { src: hasRoleArt ? roleImage : normalImage, alt: altText, onError: handleImageError }), _jsx("div", { className: 'artist-frame', children: link ?
                    _jsx("a", { target: "_blank", href: link, "data-tooltip-id": "my-tooltip", "data-tooltip-content": tooltip, children: artist })
                    :
                        _jsx("p", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": tooltip, children: artist }) })] }));
}
