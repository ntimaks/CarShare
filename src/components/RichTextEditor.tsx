import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from '@tiptap/extension-underline'
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline as LucideUnderline } from "lucide-react"

interface RichTextEditorProps {
    content: string
    onChange: (content: string) => void
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) {
        return null
    }

    return (
        <div className="border rounded-md p-2">
            <div className="mb-2 flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "bg-accent" : ""}
                >
                    <Bold className="h-3 w-3" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "bg-accent" : ""}
                >
                    <Italic className="h-3 w-3" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive("underline") ? "bg-accent" : ""}
                >
                    <LucideUnderline className="h-3 w-3" />
                </Button>
            </div>
            <EditorContent editor={editor} className="prose dark:prose-invert max-w-none" style={{ minHeight: '300px' }} />
        </div>
    )
}

export default RichTextEditor

