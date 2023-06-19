import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import SplashScreen from './SplashScreen';

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
          <main className="mt-auto">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}
