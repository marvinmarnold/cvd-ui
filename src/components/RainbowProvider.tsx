import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import { type Chain } from 'viem'
 
const localhost = {
    id: 31337,
    name: 'Localhost',
    nativeCurrency: { name: 'Local', symbol: 'LOCAL', decimals: 18 },
    rpcUrls: {
      default: { http: ['http://localhost:8545'] },
    },
  } as const satisfies Chain

const config = getDefaultConfig({
    appName: 'Cats v Dogs',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID!,
    chains: [sepolia, localhost],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

  const queryClient = new QueryClient();

export const RainbowProvider = ({children}: any) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};