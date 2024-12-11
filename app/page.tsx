'use client';

import { WalletLogin } from './components/WalletLogin';

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/login.png")' }}
      />
      <div className="relative z-10 flex flex-col h-full items-center pt-[446px]">
        <h1 className="text-white text-3xl font-bold mb-4">
          Welcome to Battle Pets.
        </h1>
        <p className="text-white text-xl mb-4">
          Please login using your Leo Wallet
        </p>
        <WalletLogin />
      </div>
    </main>
  );
}
