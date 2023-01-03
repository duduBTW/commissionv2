import { useCallback } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useEditor, Editor } from "@tiptap/react";
import { InputVariant } from "../base";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

// components
import Typography from "components/typography";
import ButtonIcon from "components/button/icon";
import ArrowGoBackLineIcon from "remixicon-react/ArrowGoBackLineIcon";
import ListOrderedIcon from "remixicon-react/ListOrderedIcon";
import H1Icon from "remixicon-react/H1Icon";
import H2Icon from "remixicon-react/H2Icon";
import H3Icon from "remixicon-react/H3Icon";
import ArrowGoForwardLineIcon from "remixicon-react/ArrowGoForwardLineIcon";
import BoldIcon from "remixicon-react/BoldIcon";
import ItalicIcon from "remixicon-react/ItalicIcon";
import ImageAddLineIcon from "remixicon-react/ImageAddLineIcon";

// styles
import * as s from "./styles";

interface InputEditorProps<T extends FieldValues = FieldValues> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  variant?: InputVariant;
}

const InputEditor = <T extends FieldValues = FieldValues>({
  name,
  label,
  control,
  variant = "outlined",
}: InputEditorProps<T>) => {
  const {
    field: { onChange, onBlur, ref, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image,
    ],
    onUpdate: ({ editor }) => {
      onChange({
        json: JSON.stringify(editor.getJSON()),
        html: editor.getHTML(),
      });
    },
    onCreate: ({ editor }) => {
      if (value?.json) {
        editor.commands.setContent(JSON.parse(value.json));
        return;
      }

      if (value?.html) {
        editor.commands.setContent(value.html);
        return;
      }
    },
  });

  return (
    <div>
      {label ? (
        <>
          <Typography
            variant="subtitle-02"
            color={error ? "error.main" : "text.40"}
          >
            {label}
          </Typography>
          <div style={{ height: "0.4rem" }} />
        </>
      ) : null}
      <s.container error={Boolean(error)} variant={variant}>
        <Nav editor={editor} />
        <s.content onBlur={onBlur} ref={ref} editor={editor} />
      </s.container>
      {error ? (
        <Typography variant="caption" color="error.main">
          {error.message}
        </Typography>
      ) : null}
    </div>
  );
};

const Nav = ({ editor }: { editor: Editor | null }) => {
  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;
  const size = "1.8rem";
  return (
    <s.nav_container>
      <ButtonIcon
        onClick={() => editor.chain().focus().undo().run()}
        type="button"
        tabIndex={-1}
      >
        <ArrowGoBackLineIcon size={size} />
      </ButtonIcon>
      <ButtonIcon
        onClick={() => editor.chain().focus().redo().run()}
        type="button"
        tabIndex={-1}
      >
        <ArrowGoForwardLineIcon size={size} />
      </ButtonIcon>
      <s.nav_divider />
      <ButtonIcon
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "primary" : "default"}
        type="button"
        tabIndex={-1}
      >
        <BoldIcon size={size} />
      </ButtonIcon>
      <ButtonIcon
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "primary" : "default"}
        type="button"
        tabIndex={-1}
      >
        <ItalicIcon size={size} />
      </ButtonIcon>
      <s.nav_divider />
      <ButtonIcon
        onClick={addImage}
        variant={editor.isActive("image") ? "primary" : "default"}
        type="button"
        tabIndex={-1}
      >
        <ImageAddLineIcon size={size} />
      </ButtonIcon>
      <ButtonIcon
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive("bulletList") ? "primary" : "default"}
        type="button"
        tabIndex={-1}
      >
        <ListOrderedIcon size={size} />
      </ButtonIcon>
      <ButtonIcon
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={
          editor.isActive("heading", { level: 1 }) ? "primary" : "default"
        }
        type="button"
        tabIndex={-1}
      >
        <H1Icon size={size} />
      </ButtonIcon>
      <ButtonIcon
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={
          editor.isActive("heading", { level: 2 }) ? "primary" : "default"
        }
        type="button"
        tabIndex={-1}
      >
        <H2Icon size={size} />
      </ButtonIcon>
      <ButtonIcon
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={
          editor.isActive("heading", { level: 3 }) ? "primary" : "default"
        }
        type="button"
        tabIndex={-1}
      >
        <H3Icon size={size} />
      </ButtonIcon>
    </s.nav_container>
  );
};

export default InputEditor;
