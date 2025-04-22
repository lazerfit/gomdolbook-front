import { Editor } from "@tinymce/tinymce-react";

interface Props {
  placeholder: string;
  onChangeValue: (text: string) => void;
}

const key = import.meta.env.VITE_TINY_MCE_API_KEY;

const TinyMCE = ({ placeholder, onChangeValue }: Props) => {
  return (
    <>
      <Editor
        apiKey={key}
        initialValue={placeholder}
        onEditorChange={(newValue: string) => onChangeValue(newValue)}
        init={{
          height: 720,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        }}
      />
    </>
  );
};

export default TinyMCE;
