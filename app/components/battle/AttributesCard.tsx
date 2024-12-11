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
      bg-[#1C1447] rounded-2xl p-6 w-[300px] shadow-lg ${position === 'left' ? 'group' : ''}`}
    >
      {/* Default Message - Only shown on left side */}
      {position === 'left' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 group-hover:hidden">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-8 h-8 mb-3"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <div>Only Facilitator Can View Stats</div>
        </div>
      )}

      {/* Stats Content - Hidden by default on left side, always visible on right side */}
      <div className={`space-y-4 ${position === 'left' ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-300' : ''}`}>
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