import { useState } from 'react'

import './textEditor.css'

import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import MenuBar from './menuBar'
import { SetPlayerNotes } from '../../interfaces/viewInterfaces'

interface Props {
  content: string,
  captureCallBack: SetPlayerNotes,
  readOnly?: boolean
}

export default function TextEditor({ content, captureCallBack, readOnly = false }: Props) {
  const extensions = [
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
      {readOnly ?
        <div dangerouslySetInnerHTML={{ __html: content }} />
        :
        <EditorProvider onBlur={({editor}) => captureCallBack(editor.getHTML())} slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
      }
    </>
  )
}