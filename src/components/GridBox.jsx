import { useEffect, useRef, useState } from 'react';
import useStore from '@/store';
import styles from '../styles/GridBox.module.css';
// import { AudioSounds } from './AudioSounds';

export const GridBox = () => {
  const decreasePoint = useStore((state) => state.decreasePoint);
  const { indexList } = useStore();
  const { index } = useStore();
  const setIndexList = useStore((state) => state.setIndexList);
  const { isMuted } = useStore();
  const createAudioRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState('-1');
  const { grid_container, grid_container__02 } = styles;
  const gridItems = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  useEffect(() => {
    createAudioRef.current = new Audio(`/resources/${index % 2 === 0 ? 'purin01' : 'purin02'}.mp3`);
  }, [index]);

  const audioLoadPlay = () => {
    !isMuted ? (createAudioRef.current.load(), createAudioRef.current?.play()) : null;
  };

  const handleGridClick = (index) => {
    setActiveIndex(index);
    setIndexList([...indexList, { index }]);
    decreasePoint();
    audioLoadPlay();
    // audioRef.current.play();

    setTimeout(() => {
      setActiveIndex('-1');
    }, 700);
  };

  // console.log(createAudio);

  return (
    <>
      {/* <div className={`${grid_container__02} container absolute inset-0 h-52 cursor-pointer`}> */}
      <div
        className={`${index % 2 === 0 ? grid_container : grid_container__02} container absolute inset-0 cursor-pointer`}
      >
        {gridItems.map((item, index) => {
          const isClicked = indexList.map((list) => list.index).includes(index);
          return (
            <div
              onClick={() => handleGridClick(index)}
              key={item}
              className={`${styles[item]}
            ${activeIndex === index ? 'animate-jello-horizontal' : ''}`}
              style={isClicked ? { opacity: 0, pointerEvents: 'none' } : {}}
            ></div>
          );
        })}
        {/* <AudioSounds
          src={`/resources/${index % 2 === 0 ? 'purin01' : 'purin02'}.mp3`}
          autoPlay={false}
          audioRef={audioRef}
        /> */}
      </div>
    </>
  );
};
