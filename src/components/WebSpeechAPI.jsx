import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useStore from '../store';

import { HiraganaAPI } from './HiraganaAPI';
import styles from '../styles/WebSpeechAPI.module.css';
import { VoiceRecorder } from './VoiceRecorder';
import useBetterMediaQuery from '@/components/useBetterMediaQuery';

const WebSpeechAPI = ({ checkAnswer }) => {
  const { transcript, finalTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const setGetTranscript = useStore((state) => state.setGetTranscript);
  const { play_button, on } = styles;
  const [isListening, setIsListing] = useState(false);

  // 現在の環境がブラウザかどうかをチェックし、音声認識をサポートしているかのチェック
  const isServer = typeof window === 'undefined';
  if (!browserSupportsSpeechRecognition && !isServer) {
    return <div>お使いのブラウザは音声認識をサポートしていません。</div>;
  }

  // メディアクエリ条件
  const isMobile = useBetterMediaQuery('(min-width: 481px)');
  // console.log(isMobile);

  const handleSwitch = () => {
    if (!isListening) {
      SpeechRecognition.startListening({ language: 'ja' });
    } else {
      SpeechRecognition.stopListening();
    }
    setIsListing(!isListening);
  };

  useEffect(() => {
    setGetTranscript(transcript);
  }, [transcript]);

  useEffect(() => {
    if (transcript) {
      setIsListing(!isListening);
      setTimeout(() => {
        checkAnswer();
      }, 1500);
    }
  }, [finalTranscript]);

  return (
    <div>
      <button onClick={handleSwitch} className={`${play_button} ${listening ? on : ''}`}>
        {!listening && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="#fff"
            className="bi bi-mic-mute"
            viewBox="0 0 16 16"
          >
            <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3z" />
            <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z" />
          </svg>
        )}
        {listening && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="#fff"
            className="bi bi-mic-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
          </svg>
        )}
      </button>
      {isMobile && <VoiceRecorder isListening={isListening} />}
      <HiraganaAPI isListening={isListening} transcript={transcript} finalTranscript={finalTranscript} />
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
      {/* <button onClick={() => SpeechRecognition.startListening({ language: 'ja' })} className="micb">
        Start
      </button>
      <button onClick={SpeechRecognition.stopListening} className="micb">
        Stop
      </button> */}
      {/* <button onClick={resetTranscript} className="micb">
        Reset
      </button> */}
      {/* <button onClick={checkAnswer}>判定</button> */}
      {/* <form>
        <p>{transcript}</p>
      </form> */}
    </div>
  );
};
export default WebSpeechAPI;
