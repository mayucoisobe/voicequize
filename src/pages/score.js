'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useLayoutEffect } from 'react';
import useStore from '../store';
import styles from '../styles/score.module.css';

import { HeadMeta } from '@/components/organisms/HeadMeta';
import { Button } from '@/components/Button';
import { LocalStorageGet } from '@/components/LocalStorageGet';
import { AudioSounds } from '@/components/AudioSounds';
import { VolumeControl } from '@/components/VolumeControl';
import { ReactComponent as Star } from '../../public/images/score_starCount.svg';
import { ReactComponent as Card } from '../../public/images/score_cardCount.svg';
import { ReactComponent as StarHead } from '../../public/images/modals/icon_headStars.svg';

import gsap from 'gsap'; // GSAP のインポート
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'; // MotionPathPluginのインポート
gsap.registerPlugin(MotionPathPlugin); // MotionPathPluginの初期化

export default function score() {
  const { starCount } = useStore();
  const { cardCount } = useStore();
  const { title, board_inner, star, po_center, po_right } = styles;
  const elemRef = useRef(null);

  const objList = [
    {
      id: 'obj01',
      src: '/images/gsap/obj01.svg',
      width: 80,
      style: { position: 'absolute', bottom: '0', left: '-80px' },
    },
    {
      id: 'obj02',
      src: '/images/gsap/obj02.svg',
      width: 80,
      style: { position: 'absolute', bottom: '0', left: '-80px' },
    },
    {
      id: 'obj03',
      src: '/images/gsap/obj03.svg',
      width: 80,
      style: { position: 'absolute', bottom: '0', left: '-80px' },
    },
    {
      id: 'obj04',
      src: '/images/gsap/obj04.svg',
      width: 80,
      style: { position: 'absolute', bottom: '0', left: '-80px' },
    },
    {
      id: 'obj05',
      src: '/images/gsap/obj05.svg',
      width: 80,
      style: { position: 'absolute', bottom: '0', right: '-80px' },
    },
    {
      id: 'obj06',
      src: '/images/gsap/obj06.svg',
      width: 140,
      style: { position: 'absolute', bottom: '0', right: '-140px' },
    },
    {
      id: 'obj07',
      src: '/images/gsap/obj07.svg',
      width: 80,
      style: { position: 'absolute', bottom: '0', right: '-80px' },
    },
  ];

  const createAnimation = (objId, path, autoRotate, duration, delay, ease) => {
    gsap.to(`#${objId}`, {
      motionPath: {
        path: path,
        curviness: 0.1,
        autoRotate: autoRotate,
        alignOrigin: [0.5, 0.5],
      },
      duration: duration,
      delay: delay,
      ease: ease,
      repeat: 2,
      repeatDelay: 20,
    });
  };

  useLayoutEffect(() => {
    const elem = elemRef.current; // boardの相対位置を取得
    const { x, y, width, height, right, bottom } = elem.getBoundingClientRect();
    const bxWidth = window.innerWidth; // ブラウザの幅を取得
    const bxHeight = window.innerHeight; // ブラウザの高さを取得

    const path01 = [
      { x: 0, y: -50 },
      { x: x + 15, y: -50 },
      { x: x + 15, y: -height + 10 },
      { x: right + 65, y: -height + 10 },
      { x: right + 65, y: -30 },
      { x: bxWidth + 100, y: -30 },
    ];
    const path02 = [
      { x: 0, y: 0 },
      { x: -bxWidth - 140, y: 0 },
    ];

    createAnimation('obj01', path01, true, 30, 0, 'power1.easeIn');
    createAnimation('obj02', path01, true, 30, 2, 'power1.easeIn');
    createAnimation('obj03', path01, true, 30, 4, 'power1.inOut');
    // createAnimation('obj04', path01, true, 30, 5, 'power1.inOut');
    createAnimation('obj05', path02, false, 12, 33, 'power3.easeInOut');
    createAnimation('obj06', path02, false, 12, 34.5, 'power2.inOut');
    createAnimation('obj07', path02, false, 12, 37, 'power3.inOut');
  }, []);

  return (
    <>
      <HeadMeta
        title={'スコア | voice de quize'}
        description={'voice de quizeのスコアのページです。'}
        url={'https://voicequize.vercel.app/score'}
        type={'score'}
        imageUrl={'https://voicequize.vercel.app/ogp-image.png'}
      />
      <div className="wrapper relative overflow-x-hidden">
        <div className="mx-auto max-w-xl px-8">
          <VolumeControl />
          <div ref={elemRef} className="board">
            <div className={`${board_inner} relative mt-8 bg-white`}>
              <StarHead className={`${star} absolute -top-11 left-1/2 z-50`} />
              <h2 className={`${title} en relative mt-4 text-center text-4xl text-customBlue`}>SCORE</h2>
              <div className="relative mt-4">
                <div className="relative z-50 h-16 w-16 rounded-full border-4 border-solid border-customYellow bg-white">
                  <Star className={po_center} />
                </div>
                <div
                  className={`${po_right} h-12 w-36 rounded-full border-4 border-solid border-customYellow bg-white`}
                >
                  <p className="en pr-3 text-right text-4xl">{starCount}</p>
                </div>
              </div>
              <div className="relative mt-2">
                <div className="relative z-50 h-16 w-16 rounded-full border-4 border-solid border-customYellow bg-white">
                  <Card className={po_center} />
                </div>
                <div
                  className={`${po_right} h-12 w-36 rounded-full border-4 border-solid border-customYellow bg-white`}
                >
                  <p className="en pr-3 text-right text-4xl">{cardCount}</p>
                </div>
              </div>
              <Link href="/mycard">
                <Button styleType="primary" text="カード" />
              </Link>
            </div>
          </div>
          {objList.map((obj, index) => (
            <Image
              key={index}
              id={obj.id}
              src={obj.src}
              width={obj.width}
              height="80"
              alt="くるまの画像"
              style={obj.style}
            />
          ))}
          <AudioSounds src="/resources/bgm_Run-Amok.mp3" autoPlay />
        </div>
        {/* 初回ページアクセス時のポイント表示 各ページに記載 */}
        <LocalStorageGet />
      </div>
    </>
  );
}
