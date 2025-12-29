import MappedDrawers from "../../../../../utilities/MappedDrawers"
import Example from "./step5steps/Example"
import SubStep1 from "./step5steps/SubStep1"
import SubStep2 from "./step5steps/SubStep2"

export default function Step5() {
    const steps = [
        {
            label: "Step 5.1: Set Capacity",
            child: <SubStep1 />
        },
        {
            label: "Step 5.2: Set Base Ranks",
            child: <SubStep2 />
        },
        {
            label: "Example",
            child: <Example />
        }
    ]

    return (
        <div>
            <p>	Using the Skull Rating, go through and set the Ranks for the different social stats.</p>
            <MappedDrawers steps={steps} />
        </div>
    )
}