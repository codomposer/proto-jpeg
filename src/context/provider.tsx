"use client";

import { PropsWithChildren, useMemo, useState } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { ToastContainer } from 'react-toastify';

import { SOLANA_RPC_URL } from "@/config";

import "@solana/wallet-adapter-react-ui/styles.css";

export default function Provider(props: PropsWithChildren) {
  const [network] = useState(WalletAdapterNetwork.Devnet);
  const endpoint = useMemo(() => SOLANA_RPC_URL, []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ToastContainer
            hideProgressBar={true}
            pauseOnFocusLoss={false}
          />
          <div>{props.children}</div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
