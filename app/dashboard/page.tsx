'use client';

import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import BattleCard from "../components/BattleCard";

// Battle type configurations
const battleTypes = [
  { title: "Bronze Battle", credits: 1 },
  { title: "Silver Battle", credits: 5 },
  { title: "Gold Battle", credits: 10 }
];

export default function Dashboard() {
  const { wallet, connected, disconnect } = useWallet();
  const router = useRouter();
  const [battles, setBattles] = useState<{[key: string]: Array<{id: string, creator: string}>}>({
    'Bronze Battle': [],
    'Silver Battle': [],
    'Gold Battle': []
  });

  // Load battles from localStorage on mount
  useEffect(() => {
    const savedBattles = localStorage.getItem('battles');
    if (savedBattles) {
      setBattles(JSON.parse(savedBattles));
    }
  }, []);

  // Add effect to redirect when disconnected
  useEffect(() => {
    if (!connected) {
      router.push('/');
    }
  }, [connected, router]);

  const createBattle = (battleType: string, battleId: string) => {
    const updatedBattles = {
      ...battles,
      [battleType]: [
        ...battles[battleType],
        {
          id: battleId,
          creator: "erica" // Hardcoded for now
        }
      ]
    };
    setBattles(updatedBattles);
    localStorage.setItem('battles', JSON.stringify(updatedBattles));
  };

  const deleteBattle = (battleId: string) => {
    // Find and delete the battle from the correct type
    const updatedBattles = Object.keys(battles).reduce((acc, battleType) => {
      acc[battleType] = battles[battleType].filter(battle => battle.id !== battleId);
      return acc;
    }, {...battles});
    
    setBattles(updatedBattles);
    localStorage.setItem('battles', JSON.stringify(updatedBattles));
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      router.push('/');
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  return (
    <main className="min-h-screen bg-[#14111F] text-white">
      <div className="min-h-screen bg-[url('/dashboard-bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="flex justify-end mb-8">
            <button
              onClick={handleDisconnect}
              className="border border-[#EE64AB] bg-[#EE64AB]/10 text-white px-4 py-2 rounded-xl hover:bg-[#EE64AB]/20 transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>

          <Profile />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {battleTypes.map((type) => (
              <BattleCard
                key={type.title}
                title={type.title}
                credits={type.credits}
                onCreateBattle={(battleId) => createBattle(type.title, battleId)}
                opponents={battles[type.title].map((battle, index) => ({
                  id: index + 1,
                  name: battle.creator,
                  battleId: battle.id
                }))}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 