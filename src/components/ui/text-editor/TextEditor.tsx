'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface IEditor {
  initialValue?: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ onChange, initialValue = '' }: IEditor) {
  const editorRef: any = useRef(null);

  return (
    <Editor
      id="editor-id"
      apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      init={{
        plugins: [],
        toolbar:
          'customUnknownWordsButton | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        skin: 'oxide-dark',
        content_css: '/editor-style.css',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request: any, respondWith: any) =>
          respondWith.string(() =>
            Promise.reject('See docs to implement AI Assistant')
          ),
        setup: (editor) => {
          editor.ui.registry.addButton('customUnknownWordsButton', {
            icon: 'help',
            tooltip: 'Add Unknown Word',
            onAction: () => {
              const word = prompt('Enter unknown word:');
              if (word) {
                editor.insertContent(
                  `<b style="color: #3b82f6 " class="unknown-word">${word}</b>&nbsp;`
                );
              }
            },
          });
        },
      }}
      onEditorChange={onChange}
      value={initialValue}
    />
  );
}
