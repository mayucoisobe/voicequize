import { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import SplashScreen from './SplashScreen';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  useEffect(() => {
    if (isLoading) return;
  }, [isLoading]);

  return (
    <>
      {isLoading && isHome ? (
        <SplashScreen finishLoading={() => setIsLoading(false)} />
      ) : (
        <>
          <Header />
          <main className="sm:mt-auto">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}
