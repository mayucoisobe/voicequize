import styles from '../styles/Modal.module.css';

import { Button } from './Button';
import { AudioSounds } from './AudioSounds';

export const ModalGameOver = ({ show, setShow, handleNextQuiz, contents, children }) => {
  const { overlay, content, customBlue } = styles;

  const nextQuiz = () => {
    handleNextQuiz();
    setShow(0);
  };

  if (show === 3) {
    return (
      <div className={`${overlay} z-50`} onClick={nextQuiz}>
        <div className={`${content} ${customBlue} animate-scale-in-center`} onClick={(e) => e.stopPropagation()}>
          <p className="en fwb mb-4 text-4xl text-customBlue xs:text-5xl">GameOver!</p>
          <div className="mb-4 max-w-sm">{children}</div>
          <p className="mb-2 text-base xs:mb-3 xs:text-xl">正解は・・・</p>
          <p className="text-2xl xs:text-3xl">『{contents}』</p>
          <div className="self-stretch text-center ">
            <Button styleType="primary" text={'つぎへ'} onClick={() => nextQuiz()} />
          </div>
        </div>
        <AudioSounds src="/resources/katsu.mp3" autoPlay />
      </div>
    );
  } else {
    return null;
  }
};
