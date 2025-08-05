import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Icon from "../../../../../components/icon/Icon";
export default function TileIcon({ canplayerview, patreon }) {
    if (canplayerview) {
        return _jsx(Icon, { tooltip: "Anyone can view this entry", iconName: 'eye' });
    }
    else if (patreon === 3) {
        return _jsx(Icon, { tooltip: "This entry uses the Deluxe rules", iconName: 'plus' });
    }
    else if (patreon === 20) {
        return _jsx(Icon, { tooltip: "Early Access", iconName: 'd20' });
    }
    return _jsx(_Fragment, {});
}
