import React, {useState, useEffect} from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';


function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  return (
    <div
      style={{ minHeight: "6em", cursor: "text", margin:"0 0.5em" }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Write something!"
      />
    </div>
  );
}

export default MyEditor;