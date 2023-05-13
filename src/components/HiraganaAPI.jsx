import { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '@/store';

import styles from '../styles/HiraganaAPI.module.css';

// 正規表現：漢字を含む文字列のチェック
const regexp =
  /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;

export const HiraganaAPI = ({ isListening, transcript, finalTranscript }) => {
  const { getTranscript } = useStore();
  // const setGetTranscript = useStore((state) => state.setGetTranscript);
  const { hiraganaData } = useStore();
  const setHiraganaData = useStore((state) => state.setHiraganaData);
  const { balloon } = styles;

  useEffect(() => {
    if (!regexp.test(finalTranscript)) {
      setHiraganaData(''); // ひらがな変換せずそのままの値を入れる
    } else {
      const convertWord = () => {
        const outputType = 'hiragana';
        const apiUrl = 'https://labs.goo.ne.jp/api/hiragana';
        const appId = 'a1a70483ce199b1cbc69b0157ccec5934f2e0b62a26350757f6f4eab61e46df3';
        axios
          .post(apiUrl, {
            app_id: appId,
            sentence: finalTranscript,
            output_type: outputType,
          })
          .then((response) => {
            console.log(response.data.converted);
            setHiraganaData(response.data.converted);
          })
          .catch((error) => {
            console.error(error);
          });
        // console.log('API発火');
      };
      convertWord();
    }
    // console.log('ひらがなAPI');
    // console.log(finalTranscript);
  }, [finalTranscript]);

  return (
    <>
      <div className={balloon}>
        <p style={{ whiteSpace: 'pre-line' }}>
          {!isListening && !hiraganaData && !getTranscript ? 'マイクでこたえよう！' : ''}
        </p>
        <p>{hiraganaData ? hiraganaData : getTranscript}</p>
        {/* API叩きすぎるとアクセス制限あり、変換されない時は {getTranscript}をそのまま出力 finalTranscriptでは出ない！ */}
      </div>
    </>
  );
};
