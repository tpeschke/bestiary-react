import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import beastHooks from "../../hooks/beastHooks";
import { useEffect } from "react";
import GMView from "./gmView/gmView";
import PlayerView from "./playerView/playerView";
export default function View({ setLoading }) {
    const { beast, playerBeast, updateSelectedRole, updateRoleModifier, updateNotes, updateFavorite } = beastHooks();
    useEffect(() => {
        if (setLoading) {
            setLoading(!!beast || !!playerBeast);
        }
    }, [setLoading, beast, playerBeast]);
    return (_jsxs("div", { className: 'card-background', children: [beast && _jsx(GMView, { beast: beast, updateSelectedRole: updateSelectedRole, updateRoleModifier: updateRoleModifier, updateNotes: updateNotes, updateFavorite: updateFavorite }), playerBeast && _jsx(PlayerView, { beast: playerBeast })] }));
}
