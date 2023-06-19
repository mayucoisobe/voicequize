import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useStore from '../store';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import questions from '@/constants/questions';
import { HeadMeta } from '@/components/organisms/HeadMeta';
import { ModalCorrect } from '@/components/ModalCorrect';
import { ModalInCorrect } from '@/components/ModalInCorrect';
import { ModalGameOver } from '@/components/ModalGameOver';
import { ButtonStart } from '@/components/ButtonStart';
import { LocalStorageGet } from '@/components/LocalStorageGet';
import { GridBox } from '@/components/GridBox';
import WebSpeechAPI from '@/components/WebSpeechAPI';
import { AudioSounds } from '@/components/AudioSounds';
import { VolumeControl } from '@/components/VolumeControl';

import { ReactComponent as IconStar } from '../../public/images/common/icon_starCount.svg';
import { ReactComponent as IconHand } from '../../public/images/common/icon_pointhand.svg';

export default function Home() {
  // const { localData } = useStore();
  // 以下はconst {localData} = usestore(); じゃない？上記で修正してみる
  // Zstandでは関数で返ってくるので、配列として使用するためには　localDataを呼び出す必要があるので、上記のは不可っぽい???
  const localData = useStore((state) => state.localData);
  const { point, quizlist, index, isStart, getTranscript } = useStore();
  const resetPoint = useStore((state) => state.resetPoint);
  const resetSetIndexList = useStore((state) => state.resetSetIndexList);
  const setQuizlist = useStore((state) => state.setQuizlist);
  const setIndex = useStore((state) => state.setIndex);
  const setIsStart = useStore((state) => state.setIsStart);
  const setHiraganaData = useStore((state) => state.setHiraganaData);

  const [show, setShow] = useState('0'); // 正解 1/不正解 2/ゲームオーバー 3のモーダル切替
  const [image, setImage] = useState('q_circle');
  const { transcript, finalTranscript } = useSpeechRecognition();

  /*
  ios audio再生対策
  -------------------- */
  // 音源用のstate ios対策
  // const [audio01, setAudio01] = useState('');
  // const [audio02, setAudio02] = useState('');
  // const [audio03, setAudio03] = useState('');
  const { audio01, audio02, audio03 } = useStore();
  const setAudio01 = useStore((state) => state.setAudio01);
  const setAudio02 = useStore((state) => state.setAudio02);
  const setAudio03 = useStore((state) => state.setAudio03);
  // 正解モーダル 音生成：
  const createAudio01 = useRef(typeof Audio !== 'undefined' ? new Audio('/resources/applause.mp3') : undefined);
  // 不正解モーダル 音生成：
  const createAudio02 = useRef(typeof Audio !== 'undefined' ? new Audio('/resources/donmai.mp3') : undefined);
  // 時間切れモーダル 音生成：
  const createAudio03 = useRef(typeof Audio !== 'undefined' ? new Audio('/resources/katsu.mp3') : undefined);
  const audioLoad = () => {
    createAudio01.current.load();
    createAudio02.current.load();
    createAudio03.current.load();
    setAudio01(createAudio01);
    setAudio02(createAudio02);
    setAudio03(createAudio03);
    console.log('load実行');
  };
  /*
  ios audio再生対策ここまで
  -------------------- */

  // 既に正解しているクイズを除く(ローカルデータとの差分チェック)
  const filteredQuizList = (array) => {
    return array.filter((item) => {
      return !localData.map((data) => data.id).includes(item.id);
    });
  };

  const shuffleStart = () => {
    const shuffleArray = (array) => {
      const cloneArray = [...array];
      for (let i = cloneArray.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        // 配列の要素の順番を入れ替える
        [cloneArray[i], cloneArray[rand]] = [cloneArray[rand], cloneArray[i]];
      }
      const filteredArray = filteredQuizList(cloneArray);
      setQuizlist(filteredArray);
    };
    shuffleArray(questions);
  };

  useEffect(() => {
    if (quizlist.length > 0) {
      setImage(quizlist[index].id);
      setIsStart(true);
    }
  }, [quizlist]);

  useEffect(() => {
    if (point === 0) {
      setTimeout(() => {
        setShow(3);
      }, 5000);
    }
  }, [point]);

  // 次のクイズへ
  const handleNextQuiz = () => {
    if (quizlist.length === index + 1) {
      alert('全問おわり！リセットすればまた遊べます！');
      return;
    } else {
      resetPoint();
      resetSetIndexList();
      setIndex(index + 1);
      setHiraganaData('');
      setTimeout(() => {
        setImage(quizlist[index + 1].id);
      }, 300); // ブロック生成前に次のクイズ画像が見えるのを防ぐ
    }
  };

  // 正解か不正解の判別
  const checkAnswer = () => {
    // text === quizlist[index].check ? setShow(1) : setShow(2);
    // getTranscript === quizlist[index].check ? setShow(1) : setShow(2);
    finalTranscript === quizlist[index].check ? setShow(1) : setShow(2);
  };

  return (
    <>
      <HeadMeta
        title={'声で答えるクイズ| voice de quize'}
        description={
          'voice de quizeのクイズページです。大きな声で答えよう！ブロックの後ろに隠れているのは何かな？マイクをタッチして元気な声で答えてみよう！'
        }
        url={'https://voicequize.vercel.app/'}
        type={'website'}
        imageUrl={'https://voicequize.vercel.app/ogp-img.png'}
      />
      <div className="wrapper pb-12">
        <div className="mx-auto max-w-sm px-8">
          <div className="flex items-center justify-between">
            <VolumeControl />
            {isStart && (
              <button onClick={() => setShow(3)} className="btn-oteage">
                おてあげ 👀
              </button>
            )}
          </div>
          <section>
            <div className="mb-3 flex gap-1.5">
              {[...Array(point)].map((_, index) => (
                <IconStar key={index} />
              ))}
            </div>
          </section>
          <section className={`${!isStart ? 'pointer-events-none' : 'pointer-events-auto'}`}>
            <div className="relative bg-white ">
              <Image
                src={`/images/questions/${image}.jpg`}
                width={640}
                height={480}
                alt="car"
                className="container rounded-xl border-4 border-solid border-customBlue object-contain object-center"
              />
              <GridBox />
            </div>
          </section>
          <section className="mt-5">
            {/* スタートボタンを押したらボタン非表示〜クイズシャッフル＆クリック可能〜マイク表示 */}
            {!isStart ? (
              <div className="relative">
                <ButtonStart
                  onClick={() => {
                    shuffleStart();
                    audioLoad();
                  }}
                >
                  PLAY
                </ButtonStart>
                <IconHand className="absolute top-24 right-5 animate-up-down" />
                <AudioSounds src="/resources/bgm_Monkeys-Spinning-Monkeys.mp3" autoPlay />
              </div>
            ) : (
              <div>
                <WebSpeechAPI checkAnswer={checkAnswer} />
                <AudioSounds src="/resources/dialogue_touch.mp3" autoPlay />
              </div>
            )}
          </section>
          <ModalCorrect
            show={show}
            setShow={setShow}
            handleNextQuiz={handleNextQuiz}
            setIndex={setIndex}
            contents={quizlist[index]?.answer}
            english={quizlist[index]?.english}
            spanish={quizlist[index]?.spanish}
            image={image}
            audio={audio01}
          >
            <img src={`/images/questions/${image}.jpg`} alt="車の画像" />
          </ModalCorrect>
          <ModalInCorrect show={show} setShow={setShow} audio={audio02}></ModalInCorrect>
          <ModalGameOver
            show={show}
            setShow={setShow}
            handleNextQuiz={handleNextQuiz}
            setIndex={setIndex}
            contents={quizlist[index]?.answer}
            audio={audio03}
          >
            <img src={`/images/questions/${image}.jpg`} alt="車の画像" />
          </ModalGameOver>
        </div>
        {/* 初回ページアクセス時のポイント表示 各ページに記載 */}
        <LocalStorageGet />
      </div>
    </>
  );
}

// 音楽のクレジット表記
// Fluffing a Duck Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 3.0 License
// http://creativecommons.org/licenses/by/3.0/
// Music promoted by https://www.chosic.com/free-music/all/
