'use client';
import { RainbowProvider } from '@/components/RainbowProvider';
import dynamic from 'next/dynamic';

const AppWithoutSSR = dynamic(() => import('./App'), { ssr: false });

export default function Home() {
  return (
    <main>
        <RainbowProvider>
          <AppWithoutSSR />
        </RainbowProvider>
    </main>
  );
}
