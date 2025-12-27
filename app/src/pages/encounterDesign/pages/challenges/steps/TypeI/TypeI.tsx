import Drawer from "../../../../../../components/drawers/components/Drawer";
import Drawers from "../../../../../../components/drawers/Drawers";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";

export default function TypeI() {
    return (
        <Drawers>
            <Drawer label="(Optional) Step 0: Determine Desired Action">
                <Step0 />
            </Drawer>
            <Drawer label="Step 1: Determine Emotion(s)">
                <Step1 />
            </Drawer>
        </Drawers>
    )
}