'use client';

import StatsSection from './profile/StatsSection';
import UserProfile from './profile/UserProfile';
import NFTSection from './profile/NFTSection';

const Profile: React.FC = () => {
  // Mock data
  const stats = {
    position: "4th",
    credits: 2400,
    xp: 11800
  };

  const userProfile = {
    username: "lil_frijole",
    level: 7,
    nextLevel: 8,
    progress: 70
  };

  const nfts = [
    { name: "Fire Guy", image: "/fire_guy.png" },
    { name: "Mud Guy", image: "/mud_guy.png" },
    { name: "Ice Bird", image: "/icebird_guy.png" }
  ];

  return (
    <div className="w-full bg-[#1C1447] rounded-2xl p-6 mb-8">
      <div className="flex items-start justify-between gap-6">
        <StatsSection stats={stats} />
        <UserProfile {...userProfile} />
        <NFTSection nfts={nfts} />
      </div>
    </div>
  );
};

export default Profile; 