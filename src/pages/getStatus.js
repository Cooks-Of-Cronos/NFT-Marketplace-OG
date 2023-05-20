import { useState } from "react";

const STATISTICS_IMAGES = [
  "https://i.imgur.com/8OKwwRb.png",
  "https://i.imgur.com/8OKwwRb.png",
  "https://i.imgur.com/8OKwwRb.png",
];

function GetStats() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function handlePreviousImage() {
    setCurrentImageIndex((index) =>
      index === 0 ? STATISTICS_IMAGES.length - 1 : index - 1
    );
  }

  function handleNextImage() {
    setCurrentImageIndex((index) =>
      index === STATISTICS_IMAGES.length - 1 ? 0 : index + 1
    );
  }

  return (
    <div className="statistics">
      <h2 className="statistics-header">NFT Holders Get Up to 2x the REWARDS!</h2>
      <h3 className="statistics-subheader">NFT and Token Holers get Double and even Triple Rewards for buying, selling and listing.</h3>
     {/* <img
        className="statistics-image"
        src={STATISTICS_IMAGES[currentImageIndex]}
        alt="Statistics"
      />*/}
      {/*<div className="statistics-image-controls">
        <button onClick={handlePreviousImage}>Previous</button>
        <button onClick={handleNextImage}>Next</button>
      </div>*/}
      <div className="statistics-buttons">
              <a href="/#/CroBocop"><button className="earn-cgold-button">Purchase NFT</button></a>
        <a href="/#/mint"><button className="deposit-mtd-button">Start Earning</button></a>
      </div>
    </div>
  );
}

export default GetStats;
