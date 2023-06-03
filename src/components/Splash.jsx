import Image from 'next/image';
import { useLayoutEffect } from 'react';
import styles from '../styles/Splash.module.css';
// 'use client';

// GSAP のインポート
// import gsap from 'gsap';
import { gsap } from 'gsap';

// Pluginのインポート
// SSR doesn't work with ES Modules so we need to import the UMD files instead
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Pluginの登録
// gsap.registerPlugin(ScrollTrigger);
// const tl = gsap.timeline();

export default function Splash() {
  useLayoutEffect(() => {
    gsap
      .timeline()
      .to('.circle', { y: '-1rem', duration: 0.3, ease: 'power4.out' })
      .to('.circle', { y: '2.25rem', duration: 0.3, ease: 'power4.out' })
      .to('.circle', { y: '-1.05rem', duration: 0.3, ease: 'power4.out' })
      .to('.triangle', {
        y: '-6rem',
        rotation: 30,
        duration: 0.15,
        ease: 'power4.out',
      })
      .to('.triangle', { x: '8rem', y: '13rem', rotation: 420, duration: 1.2, ease: 'bounce.out' });

    gsap
      .timeline()
      .to('.ractan', {
        scaleY: '.6',
        transformOrigin: '0% bottom',
        duration: 0.3,
        delay: 0.37,
      })
      .to('.ractan', { scaleY: '1' });

    gsap
      .timeline()
      .fromTo(
        '.splashTtlInner',
        {
          background: 'radial-gradient(circle at center, #3e87ff 0%, transparent 0%)',
        },
        {
          background: 'radial-gradient(circle at center, #3e87ff 85%, transparent 100%)',
          fontSize: '3.7rem',
          duration: 2,
          ease: 'power4.out',
          delay: 1,
        }
      )
      .to('.splashTtlInner', { background: '#3e87ff' });

    gsap.to('.triangle', {
      backgroundColor: '#fff',
      border: '1px solid #3e87ff',
      delay: 1.3,
    });

    gsap.to('.circle', { scale: 3, duration: 0.5, ease: 'power4.out', delay: 1.5 });

    gsap
      .timeline()
      .to('.ractan', {
        y: '5.5rem',
        border: '10px outset #ef476f',
        ease: 'power4.out',
        delay: 1.6,
      })
      .to('.ractan', {
        x: '-15rem',
        scale: 1.5,
        transformOrigin: '50% 50%',
        rotate: '-360deg',
        duration: 1.3,
      });
  }, []);

  return (
    <div className={styles.splash}>
      <div>
        <div className={styles.splashTtl}>
          <h2 className={`splashTtlInner en ${styles.splashTtlInner}`}>
            voice de<br></br>quize
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
              style={{ maxWidth: 'none', height: 'max-content' }}
            ></Image>
          </div>
          <div className={`ractan ${styles.elem} ${styles.ractan}`}></div>
          <div className={styles.rod}></div>
        </div>
      </div>
    </div>
  );
}
