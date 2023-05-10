import React, { useEffect, useState } from 'react';
import questions from '@/constants/questions';
import useStore from '@/store';

export const FilterTest02 = () => {
  const [quizlist, setQuizlists] = useState([]);
  const [image, setImage] = useState('');
  const [index, setIndex] = useState(0);
  // const [getData, setGetData] = useState([]);
  const localData = useStore((state) => state.localData);
  console.log(localData);

  // useEffect(() => {
  //   if (localStorage.getItem('itemList')) {
  //     const itemList = JSON.parse(localStorage.getItem('itemList'));
  //     setGetData(itemList);
  //   }
  // }, []);
  // console.log(getData);

  useEffect(() => {
    const shuffleArray = (array) => {
      const cloneArray = [...array];
      for (let i = cloneArray.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        // 配列の要素の順番を入れ替える
        [cloneArray[i], cloneArray[rand]] = [cloneArray[rand], cloneArray[i]];
      }
      console.log(cloneArray);
      console.log(...cloneArray);
      // シャッフル後のクイズリスト
      setQuizlists(cloneArray);
      setImage(cloneArray[index].id);
    };
    shuffleArray(questions);
  }, []);

  console.log(quizlist);

  const filteredQuizList = quizlist.filter((item) => {
    // return !getData.map((data) => data.id).includes(item.id);
    return !localData.map((data) => data.id).includes(item.id);
  });
  console.log(filteredQuizList);
};
