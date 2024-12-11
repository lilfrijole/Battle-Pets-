'use client';

import { FC, ReactNode, useMemo, useCallback } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
  WalletError
} from "@demox-labs/aleo-wallet-adapter-base";

import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";

interface Props {
  children: ReactNode;
}

export const WalletContextProvider: FC<Props> = ({ children }) => {
  const wallets = useMemo(
    () => {
      const adapter = new LeoWalletAdapter({
        appName: "Battle Pets",
        network: WalletAdapterNetwork.Testnet,
        timeout: 60000,
        permissions: [
          DecryptPermission.OnConnect,
          DecryptPermission.OnSign,
          DecryptPermission.UponRequest
        ]
      });

      // Add connection listener to handle window closure
      adapter.on('connect', () => {
        // Try to close the window if it's a popup
        if (window.opener) {
          try {
            // Send message to parent window
            window.opener.postMessage({ type: 'WALLET_CONNECTED' }, '*');
            // Close this window
            window.close();
          } catch (error) {
            console.error('Error closing window:', error);
          }
        }
      });

      return [adapter];
    },
    []
  );

  const onError = useCallback((error: WalletError) => {
    console.error('Wallet Error:', error);
  }, []);

  return (
    <WalletProvider 
      wallets={wallets} 
      onError={onError}
      autoConnect={false}
    >
      <WalletModalProvider>
        {children}
      </WalletModalProvider>
    </WalletProvider>
  );
}; 