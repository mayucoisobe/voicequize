import React, { useEffect, useState } from 'react';
import useStore from '../store';

export const LocalStorageGet = () => {
  const [getData, setGetData] = useState([]);
  const [getStars, setGetStars] = useState(0);
  const [getCards, setGetCards] = useState(0);

  const setInitialStarCount = useStore((state) => state.setInitialStarCount);
  const setInitialCardCount = useStore((state) => state.setInitialCardCount);

  // ここからはstore.jsに追加するために記述

  const setData = useStore((state) => state.setData);
  // const setStars = useStore((state) => state.setStars);
  // const setCards = useStore((state) => state.setCards);

  // ここまではstore.jsに追加するために記述

  useEffect(() => {
    if (localStorage.getItem('itemList')) {
      const itemList = JSON.parse(localStorage.getItem('itemList'));
      setGetData(itemList);
      setData(itemList);

      const latestItem = itemList.length - 1;
      setGetStars(itemList[latestItem].star);
      setGetCards(itemList[latestItem].card);

      // store.jsのstarCountの初期値を更新する
      setInitialStarCount(itemList[latestItem].star);
      // store.jsのcardCountの初期値を更新する
      setInitialCardCount(itemList[latestItem].card);
    }
  }, []);
  console.log(getData);
};
