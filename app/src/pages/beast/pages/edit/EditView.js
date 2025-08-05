import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import beastHooks from "../../hooks/beastHooks";
import EditBody from "./components/editBody/EditBody";
export default function EditView({ setLoading }) {
    const { beast, updateSelectedRole, updateBeast, updateCombatInfoFunctions } = beastHooks();
    useEffect(() => {
        if (setLoading) {
            setLoading(!!beast);
        }
    }, [beast]);
    return (_jsx("div", { className: 'card-background', children: beast &&
            _jsx(EditBody, { beast: beast, updateSelectedRole: updateSelectedRole, updateBeast: updateBeast, updateCombatInfoFunctions: updateCombatInfoFunctions }) }));
}
