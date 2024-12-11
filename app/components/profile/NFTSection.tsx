import Image from 'next/image';
import { useState, useEffect } from 'react';

interface NFTCard {
  name: string;
  image: string;
}

interface NFTSectionProps {
  nfts: NFTCard[];
}

const NFTSection: React.FC<NFTSectionProps> = ({ nfts }) => {
  const [isMinting, setIsMinting] = useState(true);
  const [mintedNFTs, setMintedNFTs] = useState<NFTCard[]>([]);
  const [currentMintIndex, setCurrentMintIndex] = useState(0);

  const startMinting = async () => {
    console.log('Starting minting process...');
    setIsMinting(true);
    setMintedNFTs([]);
    setCurrentMintIndex(0);

    // Show loading state for all NFTs first
    console.log('Showing loading state for all NFTs...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mint NFTs one by one
    for (let i = 0; i < nfts.length; i++) {
      console.log(`Minting NFT ${i + 1} of ${nfts.length}...`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      setMintedNFTs(prev => {
        const updatedNFTs = [...prev, nfts[i]];
        console.log(`NFT ${i + 1} minted:`, nfts[i].name);
        return updatedNFTs;
      });
    }

    console.log('All NFTs minted successfully!');
    setIsMinting(false);
  };

  if (isMinting && mintedNFTs.length === 0) {
    return (
      <div className="bg-[#261F53] rounded-2xl p-6 w-[55%] h-[234px] flex flex-col items-center justify-center">
        <button
          onClick={startMinting}
          className="bg-[#EE64AB] text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition-colors"
        >
          Mint Random NFTs
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#261F53] rounded-2xl p-6 w-[55%] h-[234px]">
      <h3 className="text-white text-sm font-medium mb-2">Battle Pets</h3>
      <div className="flex gap-4 h-[168px]">
        {nfts.map((nft, index) => {
          const isMinted = index < mintedNFTs.length;

          return (
            <div 
              key={index} 
              className={`w-[calc(33.333%-6px)] h-full bg-[#332561] rounded-lg p-3 transition-all duration-500
                ${isMinted ? 'opacity-100 transform-none' : 'opacity-100 translate-y-0'}`}
            >
              {isMinted ? (
                <>
                  <h4 className="text-gray-400 text-sm mb-2">{nft.name}</h4>
                  <div className="relative w-full h-[calc(100%-24px)] bg-[#3E2E72] rounded-lg overflow-hidden">
                    <Image
                      src={nft.image}
                      alt={nft.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-[#EE64AB] animate-spin">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-8 h-8"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" 
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NFTSection; 