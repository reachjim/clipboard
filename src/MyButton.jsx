import React, {useState, useEffect} from 'react';
export default function MyButton({ onSave }) {
    const handleSaveClick = () => {
      onSave()
    }
    return (
      <button onClick={handleSaveClick}>save</button>
    );
}