import { useState } from 'react';

export const Answer = () => {
  const [text, setText] = useState('');
  const inputChange = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <h2>{text}</h2>
      <input onChange={inputChange} placeholder="テキスト入力"></input>
    </>
  );
};
