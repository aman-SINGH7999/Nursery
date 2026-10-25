import { useEffect } from 'react';
import { Editor, useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Link as LinkIcon, Unlink } from 'lucide-react';


import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code2,
  Undo,
  Redo,
  type LucideIcon,
} from 'lucide-react';

import { Group, ActionIcon, Divider, Paper } from '@mantine/core';

interface MyRichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

/* ================= MENU BAR ================= */

type MenuItem =
  | {
      icon: LucideIcon;
      action: () => void;
      isActive?: boolean;
      disabled?: boolean;
    }
  | { divider: true };

const MenuBar = ({ editor }: { editor: Editor }) => {

  const setLink = () => {
  const previousUrl = editor.getAttributes('link').href;
  const url = window.prompt('Enter URL', previousUrl);

  if (url === null) return;

  if (url === '') {
    editor.chain().focus().unsetLink().run();
    return;
  }

  editor.chain().focus().setLink({ href: url }).run();
};


  const items: MenuItem[] = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold') },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic') },
    { icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), isActive: editor.isActive('underline') },
    { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike') },
    { icon: Code, action: () => editor.chain().focus().toggleCode().run(), isActive: editor.isActive('code') },

    { divider: true },

    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },

    { divider: true },

    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList') },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList') },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run() },
    { icon: Code2, action: () => editor.chain().focus().toggleCodeBlock().run() },

    { divider: true },

    { icon: LinkIcon, action: setLink, isActive: editor.isActive('link'),},
    { icon: Unlink, action: () => editor.chain().focus().unsetLink().run(), disabled: !editor.isActive('link'),},

    { divider: true },

    { icon: Undo, action: () => editor.chain().focus().undo().run(), disabled: !editor.can().undo() },
    { icon: Redo, action: () => editor.chain().focus().redo().run(), disabled: !editor.can().redo() },
  ];

  return (
    <Group gap={4} className="border-b border-gray-200 p-2 flex-wrap">
      {items.map((item, index) =>
        'divider' in item ? (
          <Divider key={index} orientation="vertical" />
        ) : (
          <ActionIcon
            key={index}
            size="sm"
            variant={item.isActive ? 'filled' : 'subtle'}
            onClick={item.action}
            disabled={item.disabled}
          >
            <item.icon size={16} />
          </ActionIcon>
        )
      )}
    </Group>
  );
};

/* ================= EDITOR ================= */

export default function MyRichTextEditor({
  value,
  onChange,
  placeholder = 'Write something...',
}: MyRichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      Placeholder.configure({ 
        placeholder,
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-400 before:float-left before:h-0 before:pointer-events-none',
      }),
      
    ],
    content: value && value !== '<p></p>' ? value : '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none focus:outline-none min-h-[160px] p-4',
          'data-placeholder': placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <Paper shadow="sm" radius="md" withBorder>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Paper>
  );
}
