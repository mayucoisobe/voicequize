import Link from 'next/link';
import useStore from '../store';

import { ReactCompoment as Star } from '../../public/images/common/icon_starCount.svg';
import { ReactCompoment as Card } from '../../public/images/common/icon_cardCount.svg';

export const Header = () => {
  const { point } = useStore();
  const { starCount } = useStore();
  const { cardCount } = useStore();

  return (
    <div>
      <div className="container mx-auto flex flex-wrap items-center justify-between px-8 py-5">
        <Link className="flex w-20 items-center rounded-full border-2 border-customBlue pl-2" href="/score">
          <Star />
          <p className="en pl-1 text-xl">{starCount}</p>
        </Link>
        <div className="relative">
          <div className="header_diamond"></div>
          <p className="header_text">{point}</p>
        </div>
        <Link className="flex w-20 items-center rounded-full border-2 border-customBlue pl-2 " href="/score">
          <Card />
          <p className="en pl-1 text-xl">{cardCount}</p>
        </Link>
      </div>
    </div>
  );
};
