import { useEffect } from 'react';
import useStore from '../store';

export const LocalStorageGet = () => {
  const setLocalData = useStore((state) => state.setLocalData);
  const setInitialStarCount = useStore((state) => state.setInitialStarCount);
  const setInitialCardCount = useStore((state) => state.setInitialCardCount);

  useEffect(() => {
    if (localStorage.getItem('itemList')) {
      const itemList = JSON.parse(localStorage.getItem('itemList'));
      const latestItem = itemList.length - 1;
      setLocalData(itemList);
      setInitialStarCount(itemList[latestItem].star);
      setInitialCardCount(itemList[latestItem].card);
    }
  }, []);

  return null;
  // console.log(getData);
};
