import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Icon from '../../../../../../../../../components/icon/Icon';
import Body from '../../../../../../../components/UI/body/Body';
import './CommonFolkore.css';
export default function CommonFolklore({ folklores }) {
    return (_jsx(_Fragment, { children: folklores.length > 0 &&
            _jsxs("div", { className: 'common-folklore-shell', children: [_jsxs("div", { children: [_jsx("h2", { children: "Common Folklore" }), _jsx(Icon, { iconName: 'info', margin: "left", tooltip: "Common folklore is what people believe about the monster and what players will know without making a Check. The first line is the belief while the second line is the truth. The belief is almost always wrong in some way but almost always has a bit of truth as well." })] }), _jsx(Body, { children: _jsx("ul", { children: folklores.map(({ belief, truth }, index) => {
                                return (_jsxs("li", { children: [belief, _jsx("ul", { children: _jsx("li", { children: truth }) })] }, index));
                            }) }) })] }) }));
}
