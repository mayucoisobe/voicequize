'use client';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import styles from '../styles/Splash.module.css';
import { gsap } from 'gsap';

export default function SplashScreen({ finishLoading }) {
  const [isMounted, setIsMounted] = useState(false);

  const animation = () => {
    const loader = gsap.timeline({
      onComplete: () => finishLoading(),
    });

    loader
      .to('.circle', { y: '-1rem', duration: 0.3, ease: 'power4.out' })
      .to('.circle', { y: '2.25rem', duration: 0.3, ease: 'power4.out' })
      .to('.circle', { y: '-1.3rem', duration: 0.3, ease: 'power4.out' })
      .to('.triangle', { y: '-6.5rem', rotation: 20, duration: 0.35, ease: 'power4.out' })
      .to('.triangle', { x: '8rem', y: '13rem', rotation: 420, duration: 1.2, ease: 'bounce.out' })
      .to('.triangle', { backgroundColor: '#fff', border: '1px solid #3e87ff', duration: 0.5 }, '1.1')
      .to('.ractan', { scaleY: '.6', transformOrigin: '0% bottom', duration: 0.3 }, '0.32')
      .to('.ractan', { scaleY: '1' }, '>')
      .fromTo(
        '.splashTtlInner',
        { background: 'radial-gradient(circle at center, #3e87ff 0%, transparent 0%)' },
        {
          background: 'radial-gradient(circle at center, #3e87ff 95%, transparent 100%)',
          fontSize: '3.7rem',
          duration: 2,
          ease: 'power4.out',
        },
        '1.1'
      )
      .to('.splashTtlInner', { background: '#3e87ff' }, '>')
      .to('.circle', { scale: 3, duration: 0.5, ease: 'power4.out' }, '1.5')
      .to('.ractan', { y: '5.5rem', border: '10px outset #ef476f', ease: 'power4.out' }, '1.6')
      .to('.ractan', { x: '-15rem', scale: 2, transformOrigin: '50% 50%', rotate: '-360deg', duration: 1.3 }, '-=2')
      .to('.circle', { transformOrigin: '50% 50%', rotate: '15', duration: 0.2, ease: 'power4.out' }, '-=1');
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animation();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.splash}>
      <div>
        <div className={styles.splashTtl}>
          <h2 className={`splashTtlInner en ${styles.splashTtlInner}`}>
            Voice de<br></br>Quize
          </h2>
        </div>
        <div className={styles.oden}>
          <div className={`triangle ${styles.elem} ${styles.triangle}`}></div>
          <div className={`circle ${styles.elem} ${styles.circle}`}>
            <Image
              width={76}
              height={76}
              alt="voicequizeLogo"
              src="/images/appIcon.svg"
              mr={2}
              style={{ maxWidth: 'none', height: '76px' }}
            ></Image>
          </div>
          <div className={`ractan ${styles.elem} ${styles.ractan}`}></div>
          <div className={styles.rod}></div>
        </div>
      </div>
    </div>
  );
}
