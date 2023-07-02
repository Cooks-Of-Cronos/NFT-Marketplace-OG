import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateAccount, connect, disconnect } from '../redux/blockchain/blockchainActions';
import Web3Modal from 'web3modal';
import { Web3ReactProvider } from '@web3-react/core';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Modal from 'react-modal';
import { BsSegmentedNav } from "react-icons/bs";





const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  background-color: #3ba8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const NetworkStatus = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const ConnectionStatus = styled.div`
  font-size: 18px;
  color: ${({ isConnected }) => (isConnected ? 'green' : 'red')};
`;

const ConnectButton = styled.button`
  font-size: 18px;
  color: white;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const DisconnectButton = styled(ConnectButton)`
  border: 1px solid red;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    box-shadow: 0 2px 8px rgba(59, 168, 248, 0.5);
  }
`;

const Button = styled.button`
  font-size: 16px;
  color: white;
  background-color: #3ba8f8;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2e8fe5;
  }
`;

const MarketplaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const InfoLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const InfoValue = styled.div`
  font-size: 18px;
  color: #666;
`;

const BigWhiteButton = styled.button`
  font-size: 2rem;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const LinkButton = styled(Link)`
  text-decoration: none;
`;

const BattleButton = styled(ConnectButton)`
  padding: 8px 16px;
`;

const StyledConnectButton = styled(ConnectButton)`
  width: 100%;
`;


const StyledBattleButton = styled(BattleButton)`
  width: 100%;
`;

const StyledBadgeButton = styled(ConnectButton)`
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;




const StyledBadge = styled(Badge)`
  display: flex;
  align-items: center;
`;



const ButtonGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-width: 100%;

  > * {
    flex: 1 1 200px;
    min-width: 0;
  }
`;


const ButtonGroupItem = styled.div`
  flex: 1;
  min-width: 0;
`;

const StyledCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;



const Navbar = ({ activeListings }) => {
  const isConnected = useSelector((state) => state.blockchain.isConnected);
  const network = useSelector((state) => state.blockchain.network);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const connectWeb3Modal = async () => {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: false,
        providerOptions: {}, // Add your provider options here
      });

      const provider = await web3Modal.connect();

      const handleAccountsChanged = (accounts) => {
        dispatch(updateAccount(accounts[0]));
      };

      // Add event listener for the accountsChanged event
      provider.on('accountsChanged', handleAccountsChanged);

      // Remove the event listener when the component unmounts
      return () => {
        provider.off('accountsChanged', handleAccountsChanged);
      };
    };

    connectWeb3Modal();
  }, [dispatch]);

  const handleConnect = () => {
    dispatch(connect());
  };

  const handleDisconnect = () => {
    dispatch(disconnect());
  };

  return (

    <>
    
<BigWhiteButton onClick={handleModalOpen}>
								  <BsSegmentedNav />
							  </BigWhiteButton>
      
      <Modal isOpen={modalOpen} closeModal={handleModalClose}>

    <NavbarContainer>
        <Card>
            <CardContent>
            <NetworkStatus>Network: {network}</NetworkStatus>
      <ConnectionStatus isConnected={isConnected}>
        {isConnected ? 'Connected' : 'Disconnected'}
      </ConnectionStatus>
      <SearchInput
            type="text"
            placeholder="Search..."
            onChange=""
          />
      {/* {isConnected ? (
        <DisconnectButton onClick={handleDisconnect}>Disconnect</DisconnectButton>
      ) : (
        <ConnectButton onClick={handleConnect}>Connect</ConnectButton>
      )} */}
        
      <div>
			<MarketplaceInfo>
          <InfoLabel>Total Volume</InfoLabel>
          <InfoValue>$1,234,567</InfoValue>
        </MarketplaceInfo>
      
        <MarketplaceInfo>
          <InfoLabel>Total cGOLD in Lockup</InfoLabel>
          <InfoValue>100,000 cGOLD</InfoValue>
        </MarketplaceInfo>
        <MarketplaceInfo>
          <InfoLabel>Total Sales</InfoLabel>
          <InfoValue>40</InfoValue>
        </MarketplaceInfo>
        <MarketplaceInfo>
          <InfoLabel>Active Listings</InfoLabel>
          <InfoValue>{activeListings}</InfoValue>
        </MarketplaceInfo>
		</div>
    <Button onClick={handleModalClose}>Close Modal</Button> {/* Add close button */}
            </CardContent>
        </Card>
        <StyledCard>
      <ButtonGroupContainer>
        <ButtonGroupItem>
          <LinkButton to="/">
          <StyledBadge badgeContent="Home" color="primary">
          <StyledBadgeButton>Home</StyledBadgeButton>
          </StyledBadge>
          </LinkButton>
        </ButtonGroupItem>
        <ButtonGroupItem>
          <LinkButton to="/preview">
          <StyledBadge badgeContent="Heist" color="primary">
          <StyledBadgeButton>Heist</StyledBadgeButton>
          </StyledBadge>
          </LinkButton>
        </ButtonGroupItem>
        <ButtonGroupItem>
          <LinkButton to="/battle">
            <StyledBadge badgeContent="Battle" color="primary">
              <StyledBadgeButton>Battle Royale</StyledBadgeButton>
            </StyledBadge>
          </LinkButton>
        </ButtonGroupItem>
      </ButtonGroupContainer>
    </StyledCard>
       
      
    </NavbarContainer>
    </Modal>
    
  </>
  );
};

export default Navbar;
