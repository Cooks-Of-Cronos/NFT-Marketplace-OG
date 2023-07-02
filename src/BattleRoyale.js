import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent, Typography } from '@mui/material';
import vs from './images/vs.png'
import {  IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import bankheist from './images/bankHeist.png'
import Navbar from './components/NavBarComp';

// Banner or Hero Section
const Banner = styled.div`
  background-image: url('https://i.imgur.com/ho6SkPK.png');
  background-size: cover;
  background-position: center;
  height: 300px;
`;

const RulesSection = styled(Card)`
  margin-top: 2rem;
  max-width: 600px;
  margin: 2rem auto;
`;

const RulesTitle = styled(Typography)`
  font-size: 1.5rem;
`;

const RulesDescription = styled(Typography)`
  margin-top: 1rem;
`;

// NFT Showcase Component
const NFTShowcase = styled.div`
  margin-top: 2rem;
`;

const NFTImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: cover;
  display: block;
  margin: 0 auto;
`;


// Leaderboard Section
const LeaderboardSection = styled.div`
  margin-top: 2rem;
`;

const LeaderboardTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const LeaderboardList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LeaderboardItem = styled.li`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const LeaderboardTable = styled(Table)`
  width: 100%;
`;

// Countdown Timer Component
const CountdownTimer = styled.div`
  margin-top: 2rem;
  font-size: 2rem;
`;


const SocialSharing = styled.div`
  margin-top: 2rem;
`;

const SocialButton = styled.button`
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
`;

const BattleUI = () => {
    const [winner, setWinner] = useState('');
const [countdown, setCountdown] = useState('2 days 4 hours 30 mins');

  // Example data
  const nftImage = 'https://i.imgur.com/jowvQtV.gif';
  const leaderboardData = ['DavCras', 'Geno', 'SmokeDog'];
  const prizeAmount = 100; // Dummy prize amount
// persist leaderboard with local storage in the safest way possible.
// let user's know not to clear this apps cache for not in (Beta)

const startBattleRoyale = () => {
  // Simulate battle royale logic
  const winnerIndex = Math.floor(Math.random() * leaderboardData.length);
  const winnerAddress = leaderboardData[winnerIndex];
  setWinner(winnerAddress);
  setCountdown('Battle over'); // Change the countdown text after the battle is over
};

const withdrawPrize = () => {
  // Simulate prize withdrawal
  alert(`Prize of ${prizeAmount} transferred to winner: ${winner}`);
};

  return (
    <div>
      <Navbar></Navbar>
      <Banner />
      <RulesSection>
      <CardContent>
          <RulesTitle variant="h2">NFT Battle Royale Rules</RulesTitle>
          <RulesDescription>
            Stake your NFTs, battle against others, and be the last NFT standing to win amazing prizes!
          </RulesDescription>
        </CardContent>
      </RulesSection>
      <NFTShowcase>
        <NFTImage src={vs} alt="NFT Showcase" />
      </NFTShowcase>
      <LeaderboardSection>
      <Card>
  <CardContent>
    <Typography variant="h4" component="h2" align="center">
      Leaderboard
    </Typography>
  </CardContent>
</Card>
        <LeaderboardTable>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </LeaderboardTable>
      </LeaderboardSection>
      <Card>
  <CardContent>
    <Typography variant="h5" component="h2">
      Countdown: {countdown}
    </Typography>
  </CardContent>
</Card>
      <SocialSharing>
  <IconButton>
    <TwitterIcon />
  </IconButton>
</SocialSharing>
      {winner && (
        <div>
          <p>Winner: {winner}</p>
          <button onClick={withdrawPrize}>Withdraw Prize</button>
        </div>
      )}
      {!winner && <button onClick={startBattleRoyale}>Start Battle Royale</button>}
    </div>
  );
};

export default BattleUI;
