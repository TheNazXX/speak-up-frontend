"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

interface IEditor {
  initialValue?: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ onChange, initialValue = "" }: IEditor) {
  const editorRef: any = useRef(null);

  return (
    <>
      <Editor
        id="editor-id"
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        init={{
          plugins: [],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Nazar",
          skin: "oxide-dark",
          content_css: "/editor-style.css",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request: any, respondWith: any) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        onEditorChange={onChange}
        value={initialValue}
      />
    </>
  );
}
