export default function ObjectiveTables() {
    return (
        <div className="objective-tables">
            <div>
                <h2>Verb</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Route</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Destroy / Kill</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Defend</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Take & Hold</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Bring X to Y</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Keep X Alive / Intact</td>
                            <td>+</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Objective</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>All Enemies</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Specific Enemy</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Captain</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Item</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Zone</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Allies</td>
                            <td>+</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Time</h2>
                <p>Time is optional: note that it will make the objective harder if it’s attached to the main objective or any secondaries that penalize the players for not completing it.</p>
                <table>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>In any number of seconds</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Under time limit</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>For longer than time limit</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Before other side completes their objective</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>While condition is met</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Roll Twice, Keep Both</td>
                            <td>+</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}