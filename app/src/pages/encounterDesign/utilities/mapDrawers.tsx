import { JSX } from "react";
import Drawer from "../../../components/drawers/components/Drawer";

export interface Step {
    label: string,
    child: JSX.Element
}

export default function mapDrawers(steps: Step[]) {
    return steps.map(({ label, child }, index) => formatStep(label, child, index))
}

function formatStep(label: string, child: JSX.Element, index: number) {
    return (
        <Drawer key={index} label={label}>
            {child}
        </Drawer>
    )
}