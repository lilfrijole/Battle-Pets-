'use client';

import { FC, ReactNode, useMemo, useCallback } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
  WalletError,
} from "@demox-labs/aleo-wallet-adapter-base";

// Import the default styles
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";

interface Props {
  children: ReactNode;
}

export const WalletContextProvider: FC<Props> = ({ children }) => {
  // Create the wallet adapter
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Battle Pets",
        timeout: 30000,
        permissions: [
          DecryptPermission.UponRequest,
        ],
      }),
    ],
    []
  );

  const onError = useCallback((error: WalletError) => {
    console.error('Wallet Error:', error);
  }, []);

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      autoConnect
    >
      <WalletModalProvider>
        {children}
      </WalletModalProvider>
    </WalletProvider>
  );
}; 