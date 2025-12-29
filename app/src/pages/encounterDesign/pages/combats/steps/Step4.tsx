import MappedDrawers from "../../../utilities/MappedDrawers";
import SubStep1 from "./step4steps/SubStep1";
import SubStep2 from "./step4steps/SubStep2";
import SubStep3 from "./step4steps/SubStep3";
import SubStep4 from "./step4steps/SubStep4";
import SubStep5 from "./step4steps/SubStep5";

export default function Step4() {
    const steps = [
        {
            label: "Step 4.1: Select a Shape",
            child: <SubStep1 />
        },
        {
            label: "Step 4.2: Determine Size",
            child: <SubStep2 />
        },
        {
            label: "Step 4.3: Home Field Advantage",
            child: <SubStep3 />
        },
        {
            label: "Step 4.4: Select / Roll for Pattern(s)",
            child: <SubStep4 />
        },
        {
            label: "Step 4.5: Place Patterns",
            child: <SubStep5 />
        }
    ]

    return (
        <div>
            <p>	This step has a series of smaller, sub-steps.</p>
            <MappedDrawers steps={steps} />
        </div>
    )
}