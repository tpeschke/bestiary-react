import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Body from "../../../../../../../../../components/UI/body/Body";
import "./ChallengesDisplay.css";
import { ChallengeDisplay } from "./components/ChallengeDisplay";
export default function ChallengesDisplay({ challenges }) {
    return (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Challenges" }), _jsx(Body, { children: _jsx(_Fragment, { children: challenges.map((challenge, index) => _jsx(ChallengeDisplay, { challenge: challenge, index: index }, index)) }) })] }));
}
