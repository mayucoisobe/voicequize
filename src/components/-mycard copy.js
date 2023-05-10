import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import useStore from '../store';
import styles from '../styles/mycard.module.css';
import { motion, AnimatePresence } from 'framer-motion';

import { LocalStorageGet } from '@/components/LocalStorageGet';
import useBetterMediaQuery from '@/components/useBetterMediaQuery';
import { ReactCompoment as PlayIcon } from '../../public/images/modals/icon_play.svg';
import { ReactCompoment as CloseIcon } from '../../public/images/modals/icon_close.svg';
import { ReactCompoment as JokerIcon } from '../../public/images/joker_icon.svg';

// 動的インポートの対応
const SpeechSynthesisAPI = dynamic(() => import('./SpeechSynthesisAPI'), {
  //サーバーサイド側でインポートはしない
  ssr: false,
});

export default function mycard() {
  const { localData } = useStore();
  const { cardCount } = useStore();
  const { mycard_list } = styles;

  const isMobile = useBetterMediaQuery('(min-width: 481px)');

  // isOpen ステートを配列に変更
  const [isOpen, setIsOpen] = useState(Array(localData.length).fill(false));
  console.log(isOpen);

  // index に基づいて isOpen の対応する値をトグルする関数
  const toggleIsOpen = (index) => {
    setIsOpen((prev) => {
      const newIsOpen = [...prev];
      newIsOpen[index] = !prev[index];
      return newIsOpen;
    });
  };

  console.log(localData);

  return (
    <div className="wrapper">
      <div className="mx-auto max-w-xl px-8">
        {!cardCount && (
          <>
            <p className="my-5 text-center text-xl">まだカードがありません！</p>
            <JokerIcon className="container h-full max-w-xs animate-flip-in-ver-right " />
          </>
        )}
        {!isMobile ? <p>モバイルです</p> : <p>481px以上です</p>}
        {/* <VoiceList /> */}
        <ClearDatabaseButton />

        <ul className="flex flex-col flex-wrap items-start justify-between gap-x-6 gap-y-7 sm:flex-row sm:gap-x-10">
          {localData.map((data, index) => (
            <li
              key={index}
              className={`${mycard_list} container relative flex animate-flip-in-ver-right flex-col items-center rounded-xl bg-customBlue p-3 pb-5`}
            >
              {isOpen[index] && (
                <CloseIcon
                  onClick={() => toggleIsOpen(index)}
                  className="bi bi-x-circle-fill absolute top-5 right-5 cursor-pointer"
                />
              )}
              <motion.div
                transition={{ layout: { duration: 1, type: 'spring' } }}
                layout="position"
                // className="container"
              >
                {/* <div className="img_box"> */}
                <Image
                  src={`/images/questions/${data.id}.jpg`}
                  width={250}
                  height={250}
                  alt="車画像"
                  className="h-40 max-w-full rounded-lg bg-white object-contain"
                  onClick={() => toggleIsOpen(index)}
                />
                {!isOpen[index] && (
                  <PlayIcon onClick={() => toggleIsOpen(index)} className="m-auto mt-3 cursor-pointer" />
                )}
                <AnimatePresence mode="wait">
                  {isOpen[index] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, ease: 'easeInOut' }}
                      className="expand"
                    >
                      {/* <CloseIcon
                        onClick={() => toggleIsOpen(index)}
                        className="bi bi-x-circle-fill absolute top-5 right-5 cursor-pointer"
                      /> */}
                      <SpeechSynthesisAPI japanese={data.answer} english={data.english} spanish={data.spanish} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>

      {/* 初回ページアクセス時のポイント表示 各ページに記載 */}
      <LocalStorageGet />
    </div>
  );
}
