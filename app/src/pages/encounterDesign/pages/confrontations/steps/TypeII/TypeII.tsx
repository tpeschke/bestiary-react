import MappedDrawers from "../../../../utilities/MappedDrawers";
import AddendumExample from "./steps/AddedumExample";
import Introduction from "./steps/Introduction";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";

export default function TypeII() {
    const steps = [
        {
            label: "Introduction",
            child: <Introduction />
        },
        {
            label: "Step 1: Determine Desired Action",
            child: <Step1 />
        },
        {
            label: "Step 2: Determine Emotion(s)",
            child: <Step2 />
        },
        {
            label: "Step 3: Willingness & Ability",
            child: <Step3 />
        },
        {
            label: "Step 4: Set Skull",
            child: <Step4 />
        },
        {
            label: "Step 5: Set Ranks",
            child: <Step5 />
        },
        {
            label: "Addendum: Player Defender Examples",
            child: <AddendumExample />
        }
    ]

    return <MappedDrawers steps={steps} />
}