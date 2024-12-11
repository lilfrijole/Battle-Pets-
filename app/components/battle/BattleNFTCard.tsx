import Image from 'next/image';

interface BattleNFTCardProps {
  name: string;
  image?: string;
  isOpponent?: boolean;
  username?: string;
  profileImage?: string;
}

const BattleNFTCard: React.FC<BattleNFTCardProps> = ({ 
  name, 
  image, 
  isOpponent = false,
  username,
  profileImage
}) => {
  return (
    <div className="relative">
      <div 
        className={`w-80 h-96 bg-[#261F53] rounded-2xl ${isOpponent ? 'rotate-12' : '-rotate-12'} 
        transform transition-all hover:rotate-0 hover:scale-105 duration-300 shadow-lg flex flex-col justify-between p-6`}
      >
        {/* User Avatar and Name */}
        <div className="flex items-center gap-3">
          {profileImage ? (
            <Image 
              src={profileImage} 
              alt={username || "Profile"} 
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-[#332561] rounded-full"></div>
          )}
          <span className="text-white text-lg">{username || name}</span>
        </div>

        {/* NFT Image Container */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full h-[80%] bg-[#332561] rounded-lg p-3 overflow-hidden">
            {image ? (
              <Image 
                src={image} 
                alt={name} 
                fill
                className="object-contain p-2"
              />
            ) : (
              isOpponent ? (
                <span className="text-6xl text-gray-400 flex items-center justify-center h-full">?</span>
              ) : (
                <div className="w-full h-full" />
              )
            )}
          </div>
        </div>

        {/* NFT Name */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default BattleNFTCard; 