interface ProfileStats {
  position: string;
  credits: number;
  xp: number;
}

interface StatsSectionProps {
  stats: ProfileStats;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <div className="bg-[#261F53] rounded-2xl p-6 w-[280px] h-[234px]">
      <div className="space-y-3">
        <div>
          <h3 className="text-gray-400 text-sm mb-1">My Position</h3>
          <p className="text-white text-2xl font-bold">{stats.position}</p>
        </div>
        <div>
          <h3 className="text-gray-400 text-sm mb-1">Credits</h3>
          <p className="text-white text-2xl font-bold">{stats.credits}</p>
        </div>
        <div>
          <h3 className="text-gray-400 text-sm mb-1">XP</h3>
          <p className="text-white text-2xl font-bold">{stats.xp}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection; 