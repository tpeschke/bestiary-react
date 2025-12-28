import { JSX } from "react";
import Drawer from "../../../components/drawers/components/Drawer";
import Drawers from "../../../components/drawers/Drawers";

interface Step {
    label: string,
    child: JSX.Element
}

interface Props {
    steps: Step[]
}

export default function MappedDrawers({ steps }: Props) {
    return (
        <Drawers>
            {steps.map(({ label, child }, index) => formatStep(label, child, index))}
        </Drawers>
    )
}

function formatStep(label: string, child: JSX.Element, index: number) {
    return (
        <Drawer key={index} label={label}>
            {child}
        </Drawer>
    )
}