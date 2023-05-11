import { useRef } from 'react';
import { ButtonSpeak } from '@/components/ButtonSpeak';

const SpeechSynthesisAPI = ({ japanese, english, voice }) => {
  const audioRef = useRef(null);

  // 利用可能な音声の種類
  // const voices = speechSynthesis.getVoices();
  // console.log(voices);
  // 現在の環境がブラウザかどうかをチェックし、音声読み上げをサポートしているかのチェック
  const isServer = typeof window === 'undefined';
  if (!SpeechSynthesisUtterance && !isServer) {
    return <div>お使いのブラウザは音声読み上げをサポートしていません。</div>;
  }

  const speak = (text, lang, volume, rate) => {
    const newMsg = new SpeechSynthesisUtterance();
    newMsg.text = text;
    newMsg.lang = lang;
    newMsg.volume = volume;
    newMsg.rate = rate;
    speechSynthesis.speak(newMsg);
  };

  const speakJa = () => {
    speak(japanese, 'ja-JP', 1, 0.8);
  };

  const speakEn = () => {
    speak(english, 'en-GB', 1, 0.7);
  };

  const speakMyVoice = () => {
    audioRef.current.play();
  };

  return (
    <>
      {voice === '' ? (
        <ButtonSpeak styleType="tertiary" onClick={speakJa} text={japanese} />
      ) : (
        <>
          <ButtonSpeak styleType="tertiary" onClick={speakMyVoice} text={japanese} />
          <audio src={voice} ref={audioRef}></audio>
        </>
      )}

      <ButtonSpeak styleType="secondary" onClick={speakEn} text={english} />
    </>
  );
};
export default SpeechSynthesisAPI;
