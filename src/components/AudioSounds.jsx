import useStore from '../store';

// 音声再生の汎用コンポーネント
export const AudioSounds = ({ src, autoPlay, audioRef }) => {
  const { isMuted } = useStore();

  return (
    <div>
      <audio src={src} autoPlay={autoPlay} ref={audioRef} muted={isMuted} />
    </div>
  );
};

// 画面表示で自動再生
// export const AudioSounds = () => {
//   return (
//     <div>
//       <audio src="/resources/fanfare.mp3" autoPlay />
//     </div>
//   );
// };

// ボタンクリックで再生
// import { useRef } from 'react';
// export const AudioSounds = () => {
//   const audioRef = useRef(null);

//   const handlePlay = () => {
//     audioRef.current.play();
//     console.log('再生ボタンが押されました');
//   };

//   return (
//     <div>
//       <button onClick={handlePlay}>再生</button>
//       <audio src="/resources/levelup.mp3" ref={audioRef} />
//     </div>
//   );
// };
