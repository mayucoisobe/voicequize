import { useEffect } from 'react';
import useStore from '@/store';
import styles from '../styles/Modal.module.css';
import { Button } from './Button';
// import { AudioSounds } from './AudioSounds';
import { ReactComponent as Batsu } from '../../public/images/modals/batsu.svg';

export const ModalInCorrect = ({ show, setShow, audio }) => {
  const setGetTranscript = useStore((state) => state.setGetTranscript);
  const setHiraganaData = useStore((state) => state.setHiraganaData);
  const { overlay, content, customBlue } = styles;
  const { isMuted } = useStore();

  const closeModal = () => {
    setShow(0);
    setGetTranscript('');
    setHiraganaData('');
  };

  useEffect(() => {
    !isMuted && show === 2 && audio.current?.play();
  }, [show]);

  if (show === 2) {
    return (
      <div className={`${overlay} z-50`} onClick={closeModal}>
        <div className={`${content} ${customBlue} animate-scale-in-center`} onClick={(e) => e.stopPropagation()}>
          <p className="mb-5 text-2xl xs:mb-6 xs:text-3xl">ざんねん！😹</p>
          <Batsu />
          <div className="self-stretch text-center ">
            <Button styleType="primary" text={'もどる'} onClick={closeModal} />
          </div>
        </div>
        {/* <AudioSounds src="/resources/donmai.mp3" autoPlay /> */}
      </div>
    );
  } else {
    return null;
  }
};
