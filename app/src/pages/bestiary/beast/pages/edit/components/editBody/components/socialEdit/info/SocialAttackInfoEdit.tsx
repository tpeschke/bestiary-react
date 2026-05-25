import { EditorProvider, extensions } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import MenuBar from "../../../../../../../components/textEditor/menuBar"
import { UpdateFunction } from "../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString"
import { SystemInfoValue } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"

interface Props {
    attackInfo: SystemInfoValue,
    updateAttackInfo: UpdateFunction
}

export default function SocialAttackInfoEdit({ attackInfo, updateAttackInfo }: Props) {
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

    const updateDefenseInfoForSystem = (system: 0 | 1 | 2, value: string) => {
        const newInfo = attackInfo.map((info: string | undefined, index: number) => {
            if (system === index) {
                return value
            }
            return info
        })

        updateAttackInfo('attackInfo', newInfo)
    }

    return (
        <>
            <h2>Attack Info</h2>
            <div className="info-by-system-shell">
                <div>
                    <h3>Bonfire</h3>
                    <EditorProvider onBlur={({ editor }) => updateDefenseInfoForSystem(BONFIRE, editor.getHTML())} slotBefore={<MenuBar />} extensions={extensions} content={attackInfo[BONFIRE]}></EditorProvider>
                </div>
                <div>
                    <h3>HackMaster</h3>
                    <EditorProvider onBlur={({ editor }) => updateDefenseInfoForSystem(HACKMASTER, editor.getHTML())} slotBefore={<MenuBar />} extensions={extensions} content={attackInfo[HACKMASTER]}></EditorProvider>
                </div>
            </div>
        </>
    )
}