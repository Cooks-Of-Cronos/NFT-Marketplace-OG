import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect, updateConnectionStatus } from '../redux/blockchain/blockchainActions';
import { useDispatch, useSelector } from 'react-redux';
import bankHeist from '../images/bankHeist.png'
import { Card, CardContent, Typography } from '@mui/material';
import banks from '../images/banks.png'
import Navbar from '../components/NavBarComp';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #ff9900; /* Orange color */
`;

const Summary = styled.p`
  font-size: 16px;
  color: #777;
  margin-bottom: 30px;
`;

const FeatureCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  color: #555;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #555;
`;

const ConnectButton = styled.button`
  background-color: ${props => props.connected ? '#42ba96' : '#ff9900'};
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.connected ? '#238f6f' : '#ff7700'};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;


const TextSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const TextHeading = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TextContent = styled.p`
  font-size: 16px;
`;






const PreviewUI = () => {
  const dispatch = useDispatch();
  const connected = useSelector((state) => state.blockchain.connected);
  const [currentlyConnected, setCurrentlyConnected] = useState(false);
  const blockchain = useSelector((state) => state.blockchain);



  const handleConnect = () => {
    dispatch(connect());
    
    setCurrentlyConnected(true);
        console.log(blockchain.account)
  };

//   useEffect(() => {
//     // Check if blockchain.account exists
//     if (blockchain.account) {
//       setCurrentlyConnected(true);
//     } else {
//       setCurrentlyConnected(false);
//     }
//   }, [blockchain.account]);




  const ConnectButton = ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
  };

  return (
  
    <Wrapper>
      <TextSection><Navbar></Navbar></TextSection>
      <Card>
      <CardContent>
      <Typography variant="h2" component="h2">
      Crook x Cop Bank Heist 
    </Typography>
      </CardContent>
      </Card>
      
     
        
        <div>
       
        <ConnectButton onClick={handleConnect} >
          {currentlyConnected ? 'CONNECTED' : 'CONNECT'}
        </ConnectButton>
        {currentlyConnected ? (<p>Thank you for connecting your wallet!</p>):
        (<p></p>)}
        
      </div>
      <Card>
  <img src={banks} alt="Banner" style={{ width: '100%' }} />
  <CardContent>
    <Typography variant="h5" component="h2">
      Crook x Cop Bank Heist 
    </Typography>
    <Typography variant="body1">
      Introducing an exciting new feature to the Crook x Cop NFT collection - the Bank Heist Gamification. Engage with your NFTs in a thrilling interactive experience where you can initiate a bank heist using the Cro Crook NFT and potentially earn rewards based on your success chance. The more NFTs you hold, the higher your chances of success!
    </Typography>
  </CardContent>
</Card>

      <Card>
  <CardContent>
    <Typography variant="h5" component="h2">
      How it Works
    </Typography>
    <ul>
      <li>Initiate Heist: Use the Cro Crook NFT to start a bank heist.</li>
      <li>Success Chance: Your success chance is calculated based on the number of NFTs you hold. Each NFT increases your chances by 1%.</li>
      <li>Perform Bank Heist: Execute the bank heist and test your luck. If your success chance proves true, you'll receive fantastic rewards.</li>
      <li>Rewards: Successful heists grant you not only NFTs but also cGOLD Stack - a valuable ERC-20 token worth 150 + $CRO.</li>
    </ul>
  </CardContent>
</Card>

      <ImageContainer>
        <Image src={bankHeist} alt="Exciting Image" />
      </ImageContainer>

      <TextSection>
        <TextHeading>Get ready to embark on thrilling adventures and showcase your collection's strength in the Crook x Cop Bank Heist Gamification feature!</TextHeading>
        <TextContent>Stay tuned for more updates and don't miss out on the excitement!</TextContent>
        <TextContent>Connect your wallet early to benefit from the Crook x Cop Bank Heist Gamification feature</TextContent>
      </TextSection>

      
    </Wrapper>
  );
};

export default PreviewUI;
