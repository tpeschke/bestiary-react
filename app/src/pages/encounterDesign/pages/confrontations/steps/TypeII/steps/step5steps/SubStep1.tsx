import Icon from "../../../../../../../../components/icon/Icon";
import formatSkulls from "../../../../../../utilities/FormatSkulls";

export default function SubStep1() {
    const confrontationLevelThresholds = [
        [0, 1, 3, 6, 9, 9],
        [0, 1, 3, 6, 9, 9],
        [0, 1, 4, 7, 11, 11],
        [0, 1, 4, 7, 11, 11],
        [0, 1, 4, 8, 12, 12],
        [0, 1, 4, 8, 12, 12],
        [0, 1, 5, 10, 15, 15]
    ]

    return (
        <div>
            <table className="float-right">
                <thead>
                    <tr>
                        <th>Skull Rating</th>
                        <th>No And</th>
                        <th>No</th>
                        <th>No But</th>
                        <th>Yes But</th>
                        <th>Yes</th>
                        <th>Yes And</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{<Icon iconName="skull-outline" iconSize='h2' />}</th>
                        <td>&lt;0</td>
                        <td>≤1</td>
                        <td>≤3</td>
                        <td>≤5</td>
                        <td>≤8</td>
                        <td>&gt;8</td>
                    </tr>
                    {confrontationLevelThresholds.map((thresholds, index) => {
                        const [na, n, nb, yb, y, ya] = thresholds
                        return (
                            <tr key={index}>
                                <th>{formatSkulls(index + 1)}</th>
                                <td>&lt;{na}</td>
                                <td>≤{n}</td>
                                <td>≤{nb}</td>
                                <td>≤{yb}</td>
                                <td>≤{y}</td>
                                <td>&gt;{ya}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <p>If the players are on the attack, you’ll need to know the Capacity of their target. Use the following table:</p>
            <h1>Brainstorm Some Ands & Buts</h1>
            <p>You might take a few seconds to jot down ideas for what “No And”, “No But”, “Yes But”, and “Yes And” looks like.</p>
        </div>
    )
}