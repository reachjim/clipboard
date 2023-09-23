import React, {useState, useEffect} from 'react';
import { EditorState, AtomicBlockUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';



function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const imagePlugin = createImagePlugin();
  const plugins = [imagePlugin];


  // 访问 DOM 元素或在 React 组件之间共享数据
  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  function handlePastedFiles(files) {
    // 处理粘贴的文件
    const fileArray = Array.from(files);
    for(const file of fileArray) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Url = e.target.result;
        // 创建一个包含图像的 ContentBlock
        const contentStateWithEntity = editorState.getCurrentContent().createEntity(
          'IMAGE', 'IMMUTABLE', { src: base64Url });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, 
          { currentContent: contentStateWithEntity });
        // 插入图像
        setEditorState(AtomicBlockUtils.insertAtomicBlock(
          newEditorState, entityKey, ' '));
      };
      reader.readAsDataURL(file);
    }
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
        handlePastedFiles={handlePastedFiles}
        plugins={plugins}
      />
    </div>
  );
}

export default MyEditor;