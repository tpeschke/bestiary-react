import { EditorProvider, extensions } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import MenuBar from "../../../../../../../components/textEditor/menuBar"
import { UpdateFunction } from "../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"

interface Props {
    defenseInfo: string,
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
            <EditorProvider onBlur={({ editor }) => updateDefenseInfo('defenseInfo', editor.getHTML())} slotBefore={<MenuBar />} extensions={extensions} content={defenseInfo}></EditorProvider>
        </>
    )
}