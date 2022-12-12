import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import { InputVariant } from "../base";
import StarterKit from "@tiptap/starter-kit";

// components
import Typography from "components/typography";

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
  } = useController({
    control,
    name,
  });

  const editor = useEditor({
    extensions: [StarterKit],
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
          <Typography variant="subtitle-02" color="text.40">
            {label}
          </Typography>
          <div style={{ height: "0.4rem" }} />
        </>
      ) : null}
      <s.container variant={variant}>
        <s.content onBlur={onBlur} ref={ref} editor={editor} />
      </s.container>
    </div>
  );
};

export default InputEditor;
