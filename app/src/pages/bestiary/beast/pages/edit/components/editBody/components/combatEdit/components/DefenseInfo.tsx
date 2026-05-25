import { EditorProvider, extensions } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import MenuBar from "../../../../../../../components/textEditor/menuBar"
import { UpdateFunction } from "../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"
import { SystemInfoValue } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { BONFIRE } from "@bestiary/common/utilities/get/getSystemString"

interface Props {
    defenseInfo: SystemInfoValue,
    updateDefenseInfo: UpdateFunction
}

export default function DefenseInfoEdit({ defenseInfo, updateDefenseInfo }: Props) {
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

    return (
        <>
            <h2>Appearance</h2>
            <EditorProvider onBlur={({ editor }) => updateDefenseInfo('defenseInfo', editor.getHTML())} slotBefore={<MenuBar />} extensions={extensions} content={defenseInfo[BONFIRE]}></EditorProvider>
        </>
    )
}