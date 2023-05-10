const SpeechSynthesisAPI = ({ localData }) => {
  const list = localData;

  console.log(localData);
  // const synthesis = window.speechSynthesis;
  // const utterance = new SpeechSynthesisUtterance('Hello, world!');
  // synthesis.speak(utterance);

  // 現在の環境がブラウザかどうかをチェックし、音声認識をサポートしているかのチェック
  const isServer = typeof window === 'undefined';
  if (!SpeechSynthesisUtterance && !isServer) {
    return <div>お使いのブラウザは音声読み上げをサポートしていません。</div>;
  }

  const msg = new SpeechSynthesisUtterance();
  // 利用可能な音声の種類
  // const voice = speechSynthesis.getVoices();
  // console.log(voice);
  // console.log(voice[0]);

  // msg.text = '日本語アイウエオ青巻き髪';
  let textList = list[0].answer;
  let textListEn = list[0].english;
  console.log(textListEn);

  msg.text = textListEn;
  // msg.lang = 'ja-JP';
  msg.lang = 'en-US';
  // msg.name = 'Kyoko';
  // msg.voice = ''; //　声の種類
  msg.volume = '.5'; //　音量
  msg.rate = 0.8;
  // msg.pitch = ''; // ピッチ

  const speak = () => {
    speechSynthesis.speak(msg);
    // 開始でonstartイベント、完了でonendイベントが発生
  };

  // console.log(list[1].answer);
  // console.log(list[1].english);

  const speakJa = () => {
    console.log('日本語');
  };
  const speakEn = () => {
    speak();
    console.log('英語');
  };

  return (
    <>
      <button onClick={speakJa}>日本語読み上げ</button>
      <button onClick={speakEn}>英語読み上げ</button>
    </>
  );
};
export default SpeechSynthesisAPI;

// speak cancel pause resume（再開）
