import Link from 'next/link';
import useStore from '../store';
import styles from '../styles/menu.module.css';

import { Button } from './Button';

export const Menu = () => {
  const resetPoint = useStore((state) => state.resetPoint);
  const { title, board_inner, halfcircle } = styles;

  const LocalStorageClear = () => {
    console.log('ローカルストレージクリア！');
    localStorage.clear();
    resetPoint();
    window.location.reload();
  };

  return (
    <div className="wrapper">
      <container className="mx-auto max-w-xl px-8">
        <main>
          <div className="board">
            <div className={`${board_inner} relative mt-8 bg-white`}>
              <div className={`${halfcircle} -top-9 h-8 w-16 bg-customYellow`}></div>
              <h2 className={`${title} en relative mt-4 text-center text-4xl text-customBlue`}>MENU</h2>
              <Link href="/mycard" className="mt-5">
                <Button styleType="tertiary" text="あそび方" />
              </Link>
              <Link href="/" className="mt-5">
                <Button styleType="primary" text="スタート" />
              </Link>
              <Link href="/" className="mt-5">
                <Button styleType="secondary" text="リセット" onClick={LocalStorageClear} />
              </Link>
            </div>
          </div>
        </main>
      </container>
    </div>
  );
};
