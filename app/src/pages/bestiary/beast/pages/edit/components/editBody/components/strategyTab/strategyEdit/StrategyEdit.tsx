import { StrategicOptions, StrategyNLimits } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { UpdateFunction } from "../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"
import { EditorProvider } from "@tiptap/react"
import MenuBar from "../../../../../../../components/textEditor/menuBar"
import StarterKit from "@tiptap/starter-kit"
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'

interface Props {
    strategiesNLimits: StrategyNLimits[] | undefined,
    limitNotes: string,
    updateCombatInfo: UpdateFunction
}

export default function StrategyEdit({ strategiesNLimits, updateCombatInfo, limitNotes }: Props) {
    const extensions = [
        // @ts-ignore
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false,
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false,
            },
        })
    ]

    function updateStrategies(indexToChange: number, key: string, value: string | number) {
        if (strategiesNLimits) {
            const alteredStrategies = strategiesNLimits.map((strategy, index) => {
                if (index === indexToChange) {
                    return {
                        ...strategy,
                        [key]: value
                    }
                }
                return strategy
            })
    
            updateCombatInfo('strategiesNLimits', alteredStrategies)
        }
    }

    function updateStrategiesOnClick(indexToChange: number, key: string, event: any) {
        const { checked } = event.target

        if (strategiesNLimits) {
            const alteredStrategies = strategiesNLimits.map((strategy, index) => {
                if (index === indexToChange) {
                    return {
                        ...strategy,
                        [key]: checked
                    }
                }
                return strategy
            })
    
            updateCombatInfo('strategiesNLimits', alteredStrategies)
        }
    }

    return (
        <>
            <h2 className="border">Limits by Group</h2>
            <table>
                <thead>
                    <tr>
                        <th>Group</th>
                        <th className="center-text">Chaos</th>
                        <th className="center-text">Chaos Note?</th>
                        <th className="center-text">Diminish</th>
                        <th className="center-text">Strategies</th>
                        <th className="center-text">Strategies Note?</th>
                        <th className="center-text">Baseline Strategies</th>
                        <th>Treasure</th>
                    </tr>
                </thead>
                <tbody>
                    {strategiesNLimits && strategiesNLimits.map(({ group, chaos, chaosNote, diminish, strategies, strategiesNote, baselineStrategies, treasure }, index) => {
                        return (
                            <tr key={index} >
                                <td>{group}</td>
                                <td className="center-text"><input type="number" onChange={event => updateStrategies(index, 'chaos', +event.target.value)} value={chaos ?? 0} /></td>
                                <td className="center-text"><input type="checkbox" defaultChecked={chaosNote} onClick={event => updateStrategiesOnClick(index, 'chaosNote', event)} /></td>
                                <td className="center-text"><input type="number" onChange={event => updateStrategies(index, 'diminish', +event.target.value)} value={diminish ?? 0} /></td>
                                <td className="center-text"><input onChange={event => updateStrategies(index, 'strategies', event.target.value)} value={strategies ?? ""} /></td>
                                <td className="center-text"><input type="checkbox" defaultChecked={strategiesNote} onClick={event => updateStrategiesOnClick(index, 'strategiesNote', event)} /></td>
                                <td className="center-text"><input onChange={event => updateStrategies(index, 'baselineStrategies', event.target.value)} value={baselineStrategies ?? ""} /></td>
                                <td><input onChange={event => updateStrategies(index, 'treasure', event.target.value)} value={treasure ?? ""} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <br/>
            <EditorProvider onBlur={({ editor }) => updateCombatInfo('limitNotes', editor.getHTML())} slotBefore={<MenuBar />} extensions={extensions} content={limitNotes}></EditorProvider>
        </>
    )
}