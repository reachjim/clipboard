import React, {useState, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import MyEditor from './MyEditor';
import MyButton from './MyButton';


function App() {
  // Create the count state.
  // const [count, setCount] = useState(0);

  // // Update the count (+1 every second).
  // useEffect(() => {
  //   const timer = setTimeout(() => setCount(count + 1), 1000);
  //   return () => clearTimeout(timer);
  // }, [count, setCount]);

  // 访问 DOM 元素或在 React 组件之间共享数据
  const myEditorRef = useRef(null);
  
  const handleSave = () => {
    myEditorRef.current.handleSave();
  };

  const handleLoad = () => {
    myEditorRef.current.handleLoad();
  };

  useEffect(() => {

  }, []);

  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Page has been open for <code>{count}</code> seconds. Hello
        </p> */}
        <MyButton onSave={handleSave} />
        <button onClick={handleLoad} >load</button>
      </header>
      <main>
        <MyEditor ref={myEditorRef} />
      </main>
    </div>
  );
}

export default App;