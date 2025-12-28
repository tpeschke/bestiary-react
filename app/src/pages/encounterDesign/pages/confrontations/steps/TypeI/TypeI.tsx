import Drawers from "../../../../../../components/drawers/Drawers";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import MappedDrawers from "../../../../utilities/MappedDrawers";

export default function TypeI() {
    const steps = [
        {
            label: "(Optional) Step 0: Determine Desired Action",
            child: <Step0 />
        },
        {
            label: "Step 1: Determine Emotion(s)",
            child: <Step1 />
        }
    ]

    return <MappedDrawers steps={steps} />
}

