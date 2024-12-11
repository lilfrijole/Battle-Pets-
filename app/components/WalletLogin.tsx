'use client';

import { FC, useCallback, useEffect, useState } from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";
import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useRouter } from "next/navigation";

const walletButtonStyle = `
  .main-wallet-button {
    border-radius: 12px !important;
    border: 1px solid #EE64AB !important;
    background: rgba(238, 100, 171, 0.10) !important;
    color: white !important;
    padding: 0.5rem 1rem !important;
    transition: all 300ms !important;
    width: 426px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
  }
  
  .main-wallet-button:hover {
    background: rgba(238, 100, 171, 0.20) !important;
  }

  .main-wallet-button:not([disabled]):hover {
    background: rgba(238, 100, 171, 0.20) !important;
  }
`;

export const WalletLogin: FC = () => {
  const { wallet, connected, connecting } = useWallet();
  const router = useRouter();
  const [isLeoAvailable, setIsLeoAvailable] = useState(false);

  // Check wallet availability through adapter
  useEffect(() => {
    const checkWalletAvailability = () => {
      const isAvailable = !!(wallet?.adapter && wallet.adapter.ready);
      console.log('Wallet availability check:', {
        adapterExists: !!wallet?.adapter,
        adapterName: wallet?.adapter?.name,
        adapterReady: wallet?.adapter?.ready,
        connected,
        connecting,
        timestamp: new Date().toISOString()
      });
      
      setIsLeoAvailable(isAvailable);
      return isAvailable;
    };

    // Check immediately and after a delay
    if (!checkWalletAvailability()) {
      const timer = setTimeout(checkWalletAvailability, 1000);
      return () => clearTimeout(timer);
    }
  }, [wallet, connected, connecting]);

  // Monitor connection status
  useEffect(() => {
    if (connected && wallet) {
      console.log('Connection Status:', {
        name: wallet.adapter.name,
        publicKey: wallet.adapter.publicKey,
        isConnected: connected,
        adapterReady: wallet.adapter.ready,
        timestamp: new Date().toISOString()
      });
      router.push('/dashboard');
    }
  }, [connected, wallet, router]);

  const handleConnect = useCallback(async () => {
    console.log('Connection attempt:', {
      adapterExists: !!wallet?.adapter,
      adapterReady: wallet?.adapter?.ready,
      isLeoAvailable,
      connecting,
      connected,
      timestamp: new Date().toISOString()
    });

    try {
      if (!wallet?.adapter) {
        console.log('No wallet adapter available');
        return;
      }

      if (!wallet.adapter.ready) {
        console.log('Wallet adapter not ready');
        return;
      }
      
      await wallet.adapter.connect();
      console.log('Connection successful');
    } catch (error) {
      console.error('Connection error:', error);
      if (error instanceof WalletNotConnectedError) {
        console.log('Wallet connection error occurred');
      }
    }
  }, [wallet, isLeoAvailable, connecting, connected]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 mt-[0px]">
      <style>{walletButtonStyle}</style>
      <WalletMultiButton 
        className="main-wallet-button"
        onClick={handleConnect}
      >
        Connect Wallet
      </WalletMultiButton>
      {connecting && <div className="text-white">Connecting...</div>}
      {connected && wallet && (
        <div className="text-center text-sm text-white">
          <p>Connected to: {wallet.adapter.name}</p>
          <p>Address: {wallet.adapter.publicKey}</p>
        </div>
      )}
    </div>
  );
}; 