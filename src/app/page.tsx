'use client';

import { useEffect, useState } from 'react';

import { useInnerSize } from '@/app/hook/useInnerSize';
import Form from '@/components/Form';
import Loading from '@/components/Loading';
import Topbar from '@/components/Topbar';

const Home = () => {
  const { isReady } = useInnerSize();
  const [liffUserId, setLiffUserId] = useState<string>('');
  const initLIFF = async () => {
    try {
      const liff = (await import('@line/liff')).default;
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });

      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        setLiffUserId(profile.userId);
      } else {
        liff.login();
      }
    } catch (error) {
      console.log('Error initializing LIFF:', error);
    }
  };

  useEffect(() => {
    initLIFF();
  });

  if (!isReady) return null;

  return (
    <div className="flex flex-col w-[var(--inner-width)] h-[var(--inner-height)]">
      {liffUserId ? (
        <div className="w-full h-full">
          <Topbar />
          <Form liffUID={liffUserId} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
