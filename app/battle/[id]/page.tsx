'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BattleNFTCard from '@/app/components/battle/BattleNFTCard';
import AttributesCard from '@/app/components/battle/AttributesCard';
import Image from 'next/image';

interface BattleNFT {
  name: string;
  image: string;
  stats: {
    strength: number;
    speed: number;
    stamina: number;
  };
}

export default function BattlePage() {
  const params = useParams();
  const router = useRouter();
  const battleId = params.id as string;
  const [selectedNFT, setSelectedNFT] = useState<BattleNFT | null>(null);

  // Extract battle type from battleId (format: "type-timestamp-random")
  const battleType = battleId.split('-')[0];
  const battleTitle = `${battleType.charAt(0).toUpperCase() + battleType.slice(1)} Battle`;
  
  // Get credits based on battle type
  const getCredits = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bronze': return 1;
      case 'silver': return 5;
      case 'gold': return 10;
      default: return 1;
    }
  };

  const getBadgeImage = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bronze':
        return '/bronze-badge.png';
      case 'silver':
        return '/silver-badge.png';
      case 'gold':
        return '/gold-badge.png';
      default:
        return '/bronze-badge.png';
    }
  };

  useEffect(() => {
    // Mock NFT data with new stat names
    setSelectedNFT({
      name: "Fire Guy",
      image: "/fire_guy.png",
      stats: {
        strength: 85,
        speed: 70,
        stamina: 90
      }
    });
  }, []);

  const handleExit = () => {
    router.push('/dashboard');
  };

  const handleDelete = () => {
    // Get battles from localStorage
    const savedBattles = localStorage.getItem('battles');
    if (savedBattles) {
      const battles = JSON.parse(savedBattles);
      
      // Find and delete the battle from the correct type
      const updatedBattles = Object.keys(battles).reduce((acc, battleType) => {
        acc[battleType] = battles[battleType].filter(battle => battle.id !== battleId);
        return acc;
      }, {...battles});
      
      // Save updated battles
      localStorage.setItem('battles', JSON.stringify(updatedBattles));
    }
    
    // Navigate back to dashboard
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-[#14111F] text-white">
      <div className="min-h-screen bg-[url('/dashboard-bg.png')] bg-cover bg-center bg-no-repeat relative">
        {/* Battle Info Header */}
        <div className="absolute top-8 left-8 flex items-center gap-4">
          <div className="w-[94px] h-[94px]">
            <Image
              src={getBadgeImage(battleType)}
              alt="Battle Badge"
              width={94}
              height={94}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl -mt-[12px] font-bold">{battleTitle}</h1>
            <p className="text-gray-400">{getCredits(battleType)} Aleo Credits</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-8 right-8 flex gap-4">
          <button 
            onClick={handleDelete}
            className="border border-gray-600 bg-gray-600/10 text-white px-6 py-2.5 rounded-xl 
            hover:bg-gray-600/20 transition-all duration-300"
          >
            Delete
          </button>
          <button 
            onClick={handleExit}
            className="border border-[#EE64AB] bg-[#EE64AB]/10 text-white px-6 py-2.5 rounded-xl 
            hover:bg-[#EE64AB]/20 transition-all duration-300"
          >
            Exit
          </button>
        </div>

        {/* Center VS Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-6xl font-bold text-white/50">VS</span>
        </div>

        {/* Battle Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button 
            disabled
            className="px-16 py-3 rounded-xl border border-[#EE64AB] bg-[#EE64AB]/10 text-white/50 
            cursor-not-allowed transition-all duration-300"
          >
            Battle
          </button>
        </div>

        {/* NFT Cards */}
        <div className="h-screen flex items-center justify-around px-32">
          {selectedNFT && (
            <>
              <BattleNFTCard 
                name={selectedNFT.name} 
                image={selectedNFT.image} 
                username="lil_frijole"
                profileImage="/elim.png"
              />
              <BattleNFTCard name="Waiting..." isOpponent />
            </>
          )}
        </div>

        {/* Attribute Cards */}
        {selectedNFT && (
          <>
            <AttributesCard stats={selectedNFT.stats} position="left" />
            <AttributesCard 
              stats={{ strength: 0, speed: 0, stamina: 0 }} 
              position="right" 
            />
          </>
        )}
      </div>
    </main>
  );
} 