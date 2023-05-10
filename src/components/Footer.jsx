import Link from 'next/link';

import { ReactCompoment as Menu } from '../../public/images/common/icon_menu.svg';
import { ReactCompoment as Quiz } from '../../public/images/common/icon_quiz.svg';
import { ReactCompoment as Card } from '../../public/images/common/icon_mycard.svg';
import { ReactCompoment as Score } from '../../public/images/common/icon_score.svg';

export const Footer = () => {
  const menuItems = [
    {
      href: '/menu',
      icon: <Menu />,
      text: 'メニュー',
    },
    {
      href: '/',
      icon: <Quiz />,
      text: 'クイズ',
    },
    {
      href: '/mycard',
      icon: <Card />,
      text: 'マイカード',
    },
    {
      href: '/score',
      icon: <Score />,
      text: 'スコア',
    },
  ];

  return (
    <footer className="sticky bottom-0 z-30 mt-auto">
      <ul className="footer_menu mt-5">
        {/* <ul className="footer_menu container fixed bottom-0 mt-5"> */}
        {menuItems.map((menuItem, index) => (
          <li key={index} className="flex w-3/12 flex-col  justify-center">
            <Link href={menuItem.href} className="flex flex-col content-center items-center justify-center">
              {menuItem.icon}
              <span className="pt-2 text-xs text-white">{menuItem.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};
