// 画面表示で自動再生 Base
import ReactAudioPlayer from 'react-audio-player';

export const Audio = () => {
  return (
    <div>
      <p>画面表示で自動再生</p>
      {/* <ReactAudioPlayer src="/resources/levelup.mp3" autoPlay controls style={{ width: '250px' }} /> */}
      <ReactAudioPlayer src="/resources/levelup.mp3" autoPlay style={{ width: '250px' }} />
    </div>
  );
};

// ボタンクリックで再生は実現できていない・・・
// import { useRef } from 'react';
// import ReactAudioPlayer from 'react-audio-player';

// export const Audio = () => {
//   const audioRef = useRef(null);

//   const handlePlay = () => {
//     audioRef.current.audio.play();
//     console.log('再生ボタンが押されました');
//   };

//   return (
//     <div>
//       <button onClick={handlePlay}>再生ボタン</button>
//       <ReactAudioPlayer src="/resources/levelup.mp3" style={{ width: '250px' }} ref={audioRef} />
//     </div>
//   );
// };
