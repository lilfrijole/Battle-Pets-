import Image from 'next/image';

interface NFTCard {
  name: string;
  image: string;
}

interface NFTSectionProps {
  nfts: NFTCard[];
}

const NFTSection: React.FC<NFTSectionProps> = ({ nfts }) => {
  return (
    <div className="bg-[#261F53] rounded-2xl p-6 w-[55%] h-[234px]">
      <h3 className="text-white text-sm font-medium mb-2">Battle Pets</h3>
      <div className="flex gap-4 h-[168px]">
        {nfts.map((nft, index) => (
          <div key={index} className="w-[calc(33.333%-6px)] h-full bg-[#332561] rounded-lg p-3">
            <h4 className="text-gray-400 text-sm mb-2">{nft.name}</h4>
            <div className="relative w-full h-[calc(100%-24px)] bg-[#3E2E72] rounded-lg overflow-hidden">
              <Image
                src={nft.image}
                alt={nft.name}
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTSection; 