const SpeechSynthesisAPI = ({ japanese, english }) => {
  // 現在の環境がブラウザかどうかをチェックし、音声読み上げをサポートしているかのチェック
  const isServer = typeof window === 'undefined';
  if (!SpeechSynthesisUtterance && !isServer) {
    return <div>お使いのブラウザは音声読み上げをサポートしていません。</div>;
  }

  const speak = (utterance) => {
    speechSynthesis.speak(utterance);
    // 開始でonstartイベント、完了でonendイベントが発生
  };

  const speakEn = () => {
    const newMsg = new SpeechSynthesisUtterance();
    newMsg.text = english;
    newMsg.lang = 'en-US';
    newMsg.volume = '.8';
    newMsg.rate = 0.8;
    speak(newMsg);
  };

  const speakJa = () => {
    const newMsg = new SpeechSynthesisUtterance();
    newMsg.text = japanese;
    newMsg.lang = 'ja-JP';
    newMsg.volume = '.5';
    newMsg.rate = 1;
    speak(newMsg);
  };

  return (
    <>
      <button onClick={speakJa}>{japanese}</button>
      <button onClick={speakEn}>{english}</button>
    </>
  );
};
export default SpeechSynthesisAPI;

// speak cancel pause resume（再開）

const speak = (text, lang, volume, rate) => {
  const newMsg = new SpeechSynthesisUtterance();
  newMsg.text = text;
  newMsg.lang = lang;
  newMsg.volume = volume;
  newMsg.rate = rate;
  speechSynthesis.speak(newMsg);
};

const speakEn = () => {
  speak(english, 'en-US', 0.8, 0.8);
};

const speakJa = () => {
  speak(japanese, 'ja-JP', 0.5, 1);
};
