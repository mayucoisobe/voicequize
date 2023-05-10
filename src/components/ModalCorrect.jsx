import { useEffect, useState } from 'react';
import useStore from '../store';
import styles from '../styles/Modal.module.css';

import { Button } from './Button';
// import { AudioSounds } from './AudioSounds';
import { db } from '@/db';
import { ReactComponent as Maru } from '../../public/images/modals/maru.svg';
import { ReactComponent as StarHead } from '../../public/images/modals/icon_headStars.svg';
import { ReactComponent as PointStars } from '../../public/images/modals/icon_pointStars.svg';

export const ModalCorrect = ({ show, setShow, handleNextQuiz, contents, english, spanish, image, children, audio }) => {
  const { point } = useStore();
  const { starCount } = useStore();
  const { cardCount } = useStore();
  const increaseStar = useStore((state) => state.increaseStar);
  const increaseCard = useStore((state) => state.increaseCard);
  const setGetTranscript = useStore((state) => state.setGetTranscript);
  const { voice } = useStore();
  const { isMuted } = useStore();

  const { overlay, content, customRed, star } = styles;
  const [isTrue, setIsTrue] = useState(false);
  const [getData, setGetData] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (localStorage.getItem('itemList')) {
      setGetData(JSON.parse(localStorage.getItem('itemList')));
    }
  }, []);

  // localStorageに保存
  const dataSave = () => {
    let itemData = {
      id: image,
      answer: contents,
      english: english,
      spanish: spanish,
      star: starCount,
      card: cardCount,
    };
    if (itemData) {
      let newArray = [...getData, itemData];
      setGetData(newArray);
      localStorage.setItem('itemList', JSON.stringify(newArray));
    }
  };

  // indexedDBに保存（voiceデータ有）
  async function voiceSave() {
    try {
      // Add the new voice!
      const id = await db.voices.add({
        voice,
        img: image,
        answer: contents,
        english: english,
      });

      setStatus(`Voice ${contents} successfully added. Got id ${id}`);
    } catch (error) {
      setStatus(`Failed to add ${contents}: ${error}`);
    }
  }

  useEffect(() => {
    let timerId;
    if (show === 1 && !isTrue) {
      timerId = setTimeout(async () => {
        await increaseStar();
        await increaseCard();
        setIsTrue(!isTrue);
      }, 1500);
    }
    return () => clearTimeout(timerId);
  }, [show]);

  useEffect(() => {
    if (isTrue) {
      dataSave();
      voiceSave();
    }
  }, [isTrue]);

  const nextQuiz = () => {
    handleNextQuiz();
    setShow(0);
    setGetTranscript('');
    setIsTrue(false);
  };

  useEffect(() => {
    !isMuted && show === 1 && audio.current?.play();
  }, [show]);

  if (show === 1) {
    return (
      <div className={`${overlay} z-50`}>
        <div className={`${content} ${customRed} animate-scale-in-center`}>
          <p className="mb-5 text-2xl xs:mb-6 xs:text-3xl">せいかい！👏</p>
          <Maru />
          <p className="mt-5 text-2xl xs:mt-6 xs:text-3xl">👏👏👏👏👏</p>
        </div>
        {/* <AudioSounds src="/resources/applause.mp3" autoPlay /> */}
        {isTrue && (
          <div className={`${overlay} z-50`} onClick={nextQuiz}>
            <div className={`${content} ${customRed} relative`} onClick={(e) => e.stopPropagation()}>
              <StarHead className={`${star} absolute -top-10 left-1/2`} />
              <p className="mb-2 text-base xs:mb-3 xs:text-xl">『 {contents} 』</p>
              <p className="en mb-4 text-4xl xs:text-5xl">GET !!</p>
              <div className="mb-4 max-w-sm">{children}</div>
              <div className="flex items-center gap-2">
                <PointStars />
                <p className="en fwb text-3xl xs:text-4xl"> +{point}</p>
              </div>
              <div className="self-stretch text-center">
                <Button styleType="secondary" text={'つぎへ'} onClick={() => nextQuiz()} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

// if (show === 1) {
//   if (!isTrue) {
//     return (
//       <>
//         <div className={overlay}>
//           <div className={`${content} ${customRed}`}>
//             <p className="mb-5 text-2xl xs:mb-6 xs:text-3xl">せいかい！👏</p>
//             <Maru />
//             <p className="mt-5 text-2xl xs:mt-6 xs:text-3xl">👏👏👏👏👏</p>
//           </div>
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <div className={overlay} onClick={nextQuiz}>
//           <div
//             className={`${content} ${customRed} relative`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <StarHead className={`${star} absolute -top-10 left-1/2`} />
//             <p className="mb-2 text-base xs:mb-3 xs:text-xl">
//               『 {contents} 』
//             </p>
//             <p className="en mb-4 text-4xl xs:text-5xl">GET !!</p>
//             <div className="mb-4 max-w-sm">{children}</div>
//             <div className="flex items-center gap-2">
//               <PointStars />
//               <p className="en fwb text-3xl xs:text-4xl"> +{point}</p>
//             </div>
//             <div className="self-stretch">
//               <Button
//                 styleType="secondary"
//                 text={'つぎへ'}
//                 onClick={() => nextQuiz()}
//               />
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// } else {
//   return null;
// }
