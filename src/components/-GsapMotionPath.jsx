// 'use client';
import Image from 'next/image';
import { useRef, useLayoutEffect } from 'react';

// GSAP のインポート
import gsap from 'gsap';
// MotionPathPluginのインポート
// SSR doesn't work with ES Modules so we need to import the UMD files instead
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
// MotionPathPluginの初期化
gsap.registerPlugin(MotionPathPlugin);

export const GsapMotionPath = () => {
  const elemRef = useRef(null);

  // ブラウザの幅を取得
  const bxWidth = window.innerWidth;

  const objList = [
    { id: 'obj01', src: '/img/obj01.svg', width: 80, height: 80, style: { position: 'absolute', left: '-80px' } },
    { id: 'obj02', src: '/img/obj02.svg', width: 80, height: 80, style: { position: 'absolute', left: '-80px' } },
    { id: 'obj03', src: '/img/obj03.svg', width: 80, height: 80, style: { position: 'absolute', left: '-80px' } },
    { id: 'obj04', src: '/img/obj04.svg', width: 80, height: 80, style: { position: 'absolute', left: '-80px' } },
    { id: 'obj05', src: '/img/obj05.svg', width: 80, height: 80, style: { position: 'absolute', right: '-80px' } },
    { id: 'obj06', src: '/img/obj06.svg', width: 140, height: 80, style: { position: 'absolute', right: '-140px' } },
    { id: 'obj07', src: '/img/obj07.svg', width: 80, height: 80, style: { position: 'absolute', right: '-80px' } },
  ];

  const createAnimation = (objId, path, autoRotate, duration, delay, ease) => {
    gsap.to(`#${objId}`, {
      motionPath: {
        path: path,
        curviness: 0.2,
        autoRotate: autoRotate,
        alignOrigin: [0.5, 0.5],
      },
      duration: duration,
      delay: delay,
      ease: ease,
      repeat: 5,
      repeatDelay: 40,
    });
  };

  useLayoutEffect(() => {
    // 特定要素の相対座標を取得
    const elem = elemRef.current;
    const { x, y, width, height, right, bottom } = elem.getBoundingClientRect();

    const path01 = [
      { x: 0, y: -50 },
      { x: x + 10, y: -50 },
      { x: x + 10, y: -height - 60 },
      { x: right + 70, y: -height - 60 },
      { x: right + 70, y: -50 },
      { x: bxWidth + 100, y: -50 },
    ];

    const path02 = [
      { x: 0, y: +20 },
      { x: -bxWidth - 140, y: +20 },
    ];

    createAnimation('obj01', path01, true, 30, 0, 'power1.easeIn');
    createAnimation('obj02', path01, true, 30, 1.5, 'power1.easeIn');
    createAnimation('obj03', path01, true, 30, 3, 'power1.inOut');
    createAnimation('obj04', path01, true, 30, 5, 'power1.inOut');
    createAnimation('obj05', path02, false, 12, 33, 'power3.easeInOut');
    createAnimation('obj06', path02, false, 12, 35, 'power2.inOut');
    createAnimation('obj07', path02, false, 12, 38.5, 'power3.inOut');
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <h1>Demo11: MotionPathPlugin</h1>
      <div ref={elemRef} style={{ width: '256px', height: '352px', background: 'green', margin: 'auto' }}></div>
      {objList.map((obj, index) => (
        <Image
          key={index}
          id={obj.id}
          src={obj.src}
          width={obj.width}
          height={obj.height}
          alt="くるまの画像"
          style={obj.style}
        />
      ))}
    </div>
  );
};
