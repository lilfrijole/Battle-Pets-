import Image from 'next/image';

interface UserProfileProps {
  username: string;
  level: number;
  nextLevel: number;
  progress: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  username, 
  level, 
  nextLevel, 
  progress 
}) => {
  return (
    <div className="bg-[#261F53] rounded-2xl p-6 w-[280px] h-[234px] flex items-center">
      <div className="text-center w-full">
        <div className="w-24 h-24 mx-auto mb-4">
          <Image
            src="/elim.png"
            alt="Profile Picture"
            width={96}  // w-24 = 96px
            height={96} // h-24 = 96px
            className="rounded-full"
          />
        </div>
        <h2 className="text-white text-xl font-bold mb-2">{username}</h2>
        <div className="w-48 bg-[#1E1B2C] rounded-full h-2 mx-auto">
          <div 
            className="bg-[#E770A7] h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-gray-400 text-sm mt-2">
          Lv.{level} / Lv.{nextLevel}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 