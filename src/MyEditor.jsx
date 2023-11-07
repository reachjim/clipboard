import React, {useState, useEffect,forwardRef,useImperativeHandle, useMemo} from 'react';
import { EditorState, AtomicBlockUtils,convertToRaw, convertFromRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
// import { createDatabase, loadLastSnapshot } from './storage/db';
import Dexie from 'dexie';
import * as jsonpatch from 'fast-json-patch';
import { applyOperation } from 'fast-json-patch';

const MyEditor = forwardRef((props, ref) => {
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  const imagePlugin = createImagePlugin();
  const plugins = [imagePlugin];
  
  // 访问 DOM 元素或在 React 组件之间共享数据
  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  };

  // 从剪切板粘贴图像
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
  };

  // 定义暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    handleSave: () => {
      handleSave();
    },
    handleLoad: () => {
      handleLoad();
    }
  }));

  function handleLoad() {
    loadLastSnapshot();
  }
  

  // 保存编辑器内容
  function handleSave() {
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    const patch = jsonpatch.compare(lastEditorContent, rawContent);
    setLastEditorContent(rawContent);
    // 保存到数据库
    saveContentToDb(rawContent);
    console.log(patch);
  };

  function saveContentToDb(content) {
    db.editorContent.add({
      createdAt: Date.now(),
      path: 'default',
      snapshot: content
    });
  }

  // 创建数据库
  const [db, setDb] = useState(()=>createDatabase('anonymity'));
  
  // useEffect(() => {
  // }, []);
  function createDatabase(dbName) {
    const db = new Dexie(dbName);
    db.version(1).stores({
        editorContent: '++id, createdAt, mail, snapshot',
    });
    return db;
  };

  const [lastEditorContent, setLastEditorContent] = useState({});
  useEffect(() => {
    loadLastSnapshot();
  }, []);
  
  // 加载上次编辑内容
  function loadLastSnapshot() {
    loadContentFromDb().then((editorContent)=>{
      if (editorContent.length > 0) {
        const snapshot = editorContent[0].snapshot;
        if(snapshot) {
          const lastEditorState = EditorState.createWithContent(convertFromRaw(snapshot));
          setEditorState(lastEditorState);
          setLastEditorContent(snapshot);
        }
      }
    });
  }
  function loadContentFromDb() {
    const content = db.editorContent.orderBy('createdAt')
    .reverse()
    .limit(1)
    .toArray();
    return content;
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
);
export default MyEditor;