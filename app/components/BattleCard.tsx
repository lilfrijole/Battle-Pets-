'use client';

import { useRouter } from 'next/navigation';
import { generateBattleId, getBattleTypeFromTitle } from '../utils/battleUtils';
import Image from 'next/image';

interface Opponent {
  id: number;
  name: string;
  battleId: string;
}

interface BattleCardProps {
  title: string;
  credits: number;
  opponents: Opponent[];
  onCreateBattle: (battleId: string) => void;
}

const BattleCard: React.FC<BattleCardProps> = ({ 
  title, 
  credits, 
  opponents,
  onCreateBattle
}) => {
  const router = useRouter();

  const getBadgeImage = (title: string) => {
    switch (title) {
      case 'Bronze Battle':
        return '/bronze-badge.png';
      case 'Silver Battle':
        return '/silver-badge.png';
      case 'Gold Battle':
        return '/gold-badge.png';
      default:
        return '/bronze-badge.png';
    }
  };

  const handleCreateBattle = () => {
    const battleType = getBattleTypeFromTitle(title);
    const battleId = generateBattleId(battleType);
    onCreateBattle(battleId);
    router.push(`/battle/${battleId}`);
  };

  const handleJoinBattle = (battleId: string) => {
    router.push(`/battle/${battleId}`);
  };

  return (
    <div className="bg-[#1C1447] rounded-2xl p-6">
      <div className="relative mb-8">
        <div className="absolute right-0 top-0">
          <button 
            onClick={handleCreateBattle}
            className="bg-[#E770A7] text-white px-6 py-2.5 rounded-full hover:bg-pink-600 transition-colors text-sm font-medium"
          >
            + Battle
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 mb-1 pt-6">
            <Image
              src={getBadgeImage(title)}
              alt={`${title} Badge`}
              width={128}
              height={128}
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-white font-bold text-2xl -mt-[12px] mb-1">{title}</h3>
          <p className="text-gray-400 text-base">
            {credits} Aleo {credits === 1 ? 'Credit' : 'Credits'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[24px_1fr_100px] text-gray-400 text-sm mb-4 px-4">
        <span className="text-left text-[12px]">#</span>
        <span className="text-left text-[12px]">Opponent</span>
        <span></span>
      </div>

      <div className="space-y-2">
        {opponents.length > 0 ? (
          opponents.map((opponent) => (
            <div 
              key={opponent.id} 
              className="grid grid-cols-[12px_1fr_100px] items-center py-3 pl-4 bg-[#332561] rounded-lg"
            >
              <span className="text-gray-400 text-left text-[12px]">{opponent.id}</span>
              <span className="text-white text-left text-[12px] pl-3">{opponent.name}</span>
              <div className="pr-1">
                <button 
                  onClick={() => handleJoinBattle(opponent.battleId)}
                  className="border border-[#EE64AB] bg-[#EE64AB]/10 text-white px-1 py-2 rounded-xl hover:bg-[#EE64AB]/20 transition-colors w-[80px] text-[12px]"
                >
                  Join
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-400">
            Waiting for new battles...
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleCard; 