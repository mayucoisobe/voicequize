import Link from 'next/link';
import { useState } from 'react';
import useStore from '../store';
import styles from '../styles/menu.module.css';

import { HeadMeta } from '@/components/organisms/HeadMeta';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { AudioSounds } from '@/components/AudioSounds';
import { VolumeControl } from '@/components/VolumeControl';
import { ReactCompoment as Block } from '../../public/images/modals/icon_menu_how.svg';
import { ReactCompoment as Skull } from '../../public/images/modals/icon_menu_reset.svg';
import { ClearIndexedDB } from '@/components/ClearIndexedDB';

export default function menu() {
  const resetPoint = useStore((state) => state.resetPoint);
  const { title, board_inner, halfcircle } = styles;
  const [showHow, setShowHow] = useState(false); // あそび方Modal
  const [showReset, setShowReset] = useState(false); // リセットModal

  const LocalStorageClear = () => {
    console.log('ローカルストレージクリア！');
    localStorage.clear();
    ClearIndexedDB();
    resetPoint();
    window.location.reload();
  };

  return (
    <>
      <HeadMeta
        title={'メニュー | Voice de Quize'}
        description={'Voice de Quizeのメニューページです。'}
        url={'https://voicequize.vercel.app/menu'}
        type={'article'}
      />
      <div className="wrapper">
        <div className="mx-auto max-w-xl px-8">
          <VolumeControl />
          <div className="board">
            <div className={`${board_inner} relative mt-8 bg-white`}>
              <div className={`${halfcircle} -top-9 h-8 w-16 bg-customYellow`}></div>
              <h2 className={`${title} en relative mt-4 text-center text-4xl text-customBlue`}>MENU</h2>
              <div>
                <Button styleType="primary" text="あそび方" onClick={() => setShowHow(true)} />
                <Modal styleType="primary" show={showHow} setShow={setShowHow}>
                  <Block />
                  <p className="mt-5 text-base xs:mt-6 xs:text-xl">
                    ブロックの後ろに何かがかくれているよ？
                    <br />
                    クリックすると少しずつ見えてくる！👀
                    <br />
                    わかったらマイク🎙をクリック！
                    <br />
                    大きな声でこたえよう♬
                    <br />
                  </p>
                  <Link href="/" className="self-stretch text-center">
                    <Button styleType="primary" text="クイズへ" />
                  </Link>
                </Modal>
              </div>
              <Link href="/">
                <Button styleType="primary" text="クイズへ" />
              </Link>
              <div>
                <Button styleType="secondary" text="リセット" onClick={() => setShowReset(true)} />
                <Modal styleType="secondary" show={showReset} setShow={setShowReset}>
                  <Skull />
                  <p className="mt-5 text-base xs:mt-6 xs:text-xl">
                    スコアもカードも
                    <br />
                    <span className="fwb text-xl text-customRed xs:text-2xl">全てリセット</span>
                    されます
                  </p>
                  <Button styleType="secondary" text="リセット" onClick={LocalStorageClear} />
                  <Button styleType="quaternary" text="もどる" onClick={() => setShowReset(false)} />
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <AudioSounds src="/resources/bgm_Fluffing-a-Duck.mp3" autoPlay />
      </div>
    </>
  );
}
