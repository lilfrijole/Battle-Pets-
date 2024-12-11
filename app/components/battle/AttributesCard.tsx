interface Stats {
  strength: number;
  speed: number;
  stamina: number;
}

interface AttributesCardProps {
  stats: Stats;
  position: 'left' | 'right';
}

const AttributesCard: React.FC<AttributesCardProps> = ({ stats, position }) => {
  return (
    <div className={`fixed bottom-8 ${position === 'left' ? 'left-8' : 'right-8'} 
      bg-[#1C1447] rounded-2xl p-6 w-[300px] shadow-lg`}
    >
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium text-white">Strength</span>
            <span className="text-[#EE64AB]">{stats.strength}</span>
          </div>
          <div className="w-full bg-[#332561] rounded-full h-3">
            <div 
              className="bg-[#EE64AB] h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${stats.strength}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium text-white">Speed</span>
            <span className="text-[#EE64AB]">{stats.speed}</span>
          </div>
          <div className="w-full bg-[#332561] rounded-full h-3">
            <div 
              className="bg-[#EE64AB] h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${stats.speed}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium text-white">Stamina</span>
            <span className="text-[#EE64AB]">{stats.stamina}</span>
          </div>
          <div className="w-full bg-[#332561] rounded-full h-3">
            <div 
              className="bg-[#EE64AB] h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${stats.stamina}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributesCard; 