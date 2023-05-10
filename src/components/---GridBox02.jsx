import { useEffect, useState } from 'react';
import styles from '../styles/GridBox.module.css';

import useStore from '@/store';

export const GridBox02 = ({ onClick }) => {
  const decreasePoint = useStore((state) => state.decreasePoint);

  // const indexList = useStore((state) => state.indexList);
  const { indexList } = useStore();
  const setIndexList = useStore((state) => state.setIndexList);

  const { grid_container } = styles;
  const gridItems = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const [activeIndex, setActiveIndex] = useState('-1');
  // const [IndexList, setIndexList] = useState([]);
  const [isClicked, setIsClicked] = useState([]);

  const [hiddenIndices, setHiddenIndices] = useState([]);
  const handleGridClick = (index) => {
    setActiveIndex(index);
    setIndexList([...indexList, { index }]);
    decreasePoint();
    setTimeout(() => {
      setHiddenIndices([...hiddenIndices, index]);
    }, 1000);
    // setActiveIndex('');
  };

  console.log(indexList);

  return (
    <>
      <div
        className={`${grid_container} container absolute inset-0 h-52 cursor-pointer`}
      >
        {gridItems.map((item, index) => {
          const isHidden = hiddenIndices.includes(index);

          const isClicked = indexList.map((list) => list.index).includes(index);

          return (
            <div
              onClick={() => handleGridClick(index)}
              key={item}
              className={`${styles[item]} ${
                activeIndex === index ? 'animate-bounce-out-top' : ''
              }`}
              style={
                (isClicked ? { display: 'none' } : {},
                isHidden ? { display: 'none' } : {})
              }
              // style={{
              //   display: isClicked || isHidden ? 'none' : 'block',
              // }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
};
