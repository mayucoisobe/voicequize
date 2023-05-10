import useStore from '@/store';
import styles from '../styles/Modal.module.css';
import { Button } from './Button';
import { AudioSounds } from './AudioSounds';
import { ReactComponent as Batsu } from '../../public/images/modals/batsu.svg';

export const ModalInCorrect = ({ show, setShow }) => {
  const setGetTranscript = useStore((state) => state.setGetTranscript);
  const setHiraganaData = useStore((state) => state.setHiraganaData);
  const { overlay, content, customBlue } = styles;
  const closeModal = () => {
    setShow(0);
    setGetTranscript('');
    setHiraganaData('');
  };

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
        <AudioSounds src="/resources/donmai.mp3" autoPlay />
      </div>
    );
  } else {
    return null;
  }
};

// padding: 60px 35px 40px;
//     border-radius: 30px;
//     border: 10px solid red;

//     pt-14 pb-10 px-9
