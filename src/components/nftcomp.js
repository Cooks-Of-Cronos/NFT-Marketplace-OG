import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { NFTContext } from './nftcontextinit';

function NFTPage() {
  const nfts = useContext(NFTContext);
  const { id } = useParams();

  const nft = nfts.find(nft => nft.tokenId === id);

  if (!nft) {
    return <div>NFT not found</div>;
  }

  return (
    <div>
      <h1>{nft.metadata.name}</h1>
      <img src={nft.image} alt={nft.metadata.description} />
      {/* other NFT info */}
    </div>
  );
}
