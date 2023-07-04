//IMPORTS
import Web3Modal from "web3modal";
import { DeFiWeb3Connector } from 'deficonnect';
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import React, { useEffect, useState, useRef } from "react";
import Web3EthContract, { Contract } from "web3-eth-contract";
import styled from 'styled-components';
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Jumbotron } from 'styled-jumbotron-component';
import { store, ReactNotification, NotificationContainer, NotificationManager } from 'react-notifications';
import Web3 from 'web3';
//import { providerOptions } from './provider/providerOptions';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import ListGroup from 'react-bootstrap/ListGroup';


import { testABI } from './components/TestComp.js';
import { testContract } from './components/TestComp.js';
import GetStats from "./pages/getStatus.js";
import { REWARDSABI } from './mint.js';
import { REWARDSCONTRACT } from './mint.js';
import { CROCELLSABI } from './mint.js';
import { CROBADGEABI } from './mint.js';
import { DISCONNECT_FAILED, disconnectFailed, disconnect, connect, isConnected, updateAccount } from "./redux/blockchain/blockchainActions.js";
import './styles/market.css';
import { fetchData } from "./redux/data/dataActions.js";
import Footer from './Footer.js';
import Modal from 'react-modal';
import logo from '../src/images/logo.png'
import logokitchen from '../src/images/logokitchen.gif'

import { Tooltip, Snackbar } from "@material-ui/core";
import { FaUserCircle, FaDiscord, FaEthereum, FaItunesNote, FaMedium, FaTelegram, FaAngleUp } from 'react-icons/fa';
import { AiFillTwitterCircle, AiOutlineVerticalAlignTop } from "react-icons/ai"; 
import { FcAbout } from "react-icons/fc"; 
import { VscDebugDisconnect } from "react-icons/vsc";

import { TiFlowSwitch } from "react-icons/ti";
import { AiOutlineLogin } from "react-icons/ai"
import CryptoJS from 'crypto-js';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from "./components/NavBarComp.js";
import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent, Typography } from '@mui/material';


import CustomIcon from './images/cronos-cro-logo.png';
import CustomCgoldIcon from './images/cgold.png'

import { BsSegmentedNav } from "react-icons/bs";




const StyledCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const StyledHeading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const StyledModalContent = styled.div`
  font-size: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

const StyledSidebarItem = styled.div`
  margin-bottom: 10px;
`;

const StyledSidebarHeader = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;


// STYLED COMPONENTS
const Icon = styled.img`
height: 150px;
width: 150px;
`;

const Title = styled.h1`
font-size: 2rem;
`;

const Description = styled.p`
font-size: 1.2rem;
`;

const StyledButton = styled.button`
background-color: ${(props) => props.bgColor};
color: ${(props) => props.color};
width: 100%;
max-width: 250px;
transition: background-color 0.5s ease;
padding: 0.5rem 2rem;
font-size: 2rem;
border: none;
border-radius: 4px;
margin: 1rem 0;
cursor: pointer;

&:hover {
background-color: ${(props) => props.hoverBgColor};
}
`;

const NavbarContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 60px;
padding: 0 20px;
background-color: #ffffff;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
z-index: 999;
`;

const SearchBar = styled.div`
display: flex;
align-items: center;
gap: 1rem;

input[type='text'] {
padding: 0.5rem;
border: none;
border-radius: 4px;
outline: none;
}

button {
padding: 0.5rem 1rem;
border: none;
border-radius: 4px;
background-color: #007bff;
color: #fff;
cursor: pointer;
}
`;

const MarketplaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoLabel = styled.div`
  /* Info label styles */
  /* Add your custom styles here */
`;

const InfoValue = styled.div`
  /* Info value styles */
  /* Add your custom styles here */
`;

const CustomIconWrapper = styled('img')`
  /* Custom icon styles */
  /* Add your custom styles here */
  margin-left: 5px;
  width: 20px;
  height: 20px;
`;

// const Sidebar = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 280px;
//   height: 100vh;
//   background-color: #f8f9fa;
//   padding: 1rem;
//   transition: transform 0.3s ease;
//   transform: translateX(${props => (props.showSidebar ? '0' : '-100%')});
//   z-index: 1;

//   .sidebar-toggle {
//     position: absolute;
//     top: 1rem;
//     right: 1rem;
//     padding: 0.5rem;
//     background-color: transparent;
//     border: none;
//     outline: none;
//     cursor: pointer;
//   }

//   .sidebar-content {
//     margin-top: 2rem;

//     h3 {
//       font-size: 1.2rem;
//       margin-bottom: 0.5rem;
// 	  color: black;
//     }

//     p {
//       margin-bottom: 0.5rem;
// 	  color: black;
//     }
//   }
// `;
const ChainName = styled.p`
font-size: 16px;
font-weight: bold;
`;

const Logo = styled.img`
height: 40px;
`;

// Styled Components
const Wrapper = styled.div`
display: flex;
justify-content: flex-start;
align-items: flex-start;
height: 100vh;
overflow: auto;
overflow-y: scroll;
background-image:url(https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2QzdnI1ejU0ZWdwMm83NGJ4YW9wOGE3c3FhaTk1cjl5cW56dzNpMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t3cAV2HGSSMljwOpS9/giphy-downsized-large.gif);


@media (max-width: 768px) {
	display: flex;
	justify-content: flex-start;
align-items: flex-start;
height: 100vh;
background-image:url(https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2QzdnI1ejU0ZWdwMm83NGJ4YW9wOGE3c3FhaTk1cjl5cW56dzNpMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t3cAV2HGSSMljwOpS9/giphy-downsized-large.gif);
overflow: auto;
overflow-y: scroll;

}
`;

const Sidebar = styled.div`
width: 20%;
background-color: #c33f56;
padding-right: 20px;
position: fixed;
margin-right: 100px;
height: 100%;
top: 0;
left: 0;
bottom: 0;
overflow: auto;
align-items: center;


@media (max-width: 768px) {
width: 100px;
position: fixed;
overflow: auto;
height: 100%;
background-color: #c33f56;
padding: 10px;
border: 5px solid white;
}
`;

const SidebarItem = styled.p`
  color:black;
  font-size: 14px;
  margin-bottom: 10px;

  &.account {
    color: black;
  }

  &.total-balance {
    color: gold;
    font-weight: bold;
  }
`;

const SidebarValue = styled.span`
  font-weight: bold;
  color: green;
`;

const SidebarScrollableContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Button = styled.button`
  background-color: red;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c30000;
  }
`;

const DisabledButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  border: none;
  background-color:red;
  color: #ccc;
  font-size: 14px;
  cursor: not-allowed;
  opacity: 0.5;

  &:hover {
    background-color: #f5f5f5;
    color: #ccc;
  }
`;

const SidebarButton = styled.button`
  padding: 10px 20px;
  background-color: red;
  border: none;
  cursor: pointer;
`;

const ModalContent = styled.div`
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: #3ba8f8;
`;

const ModalImg = styled.img`
width: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;

  flex: 1;
 
  width: 300px;

  @media (max-width: 768px) {
	width: 300px;
	flex: 1;
	
	padding: 20px;
	height: 100vh;

	flex-direction: column;
	
	}

  
`;

const Content = styled.div`
flex: 1;
padding: 20px;
overflow-y: scroll;
overflow-x: hidden;
`;

const Feed = styled.div`
display: flex;
flex-direction: column;
flex-wrap: nowrap;
align-items: center;
width: 100%;
margin-left: 20%;

`;

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const NFTContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`;

const ModalTitle = styled.h3`
  /* Styles for the modal title */
  /* Add your custom styles here */
  font-size: 1.5rem;
  margin-top: 1rem;
`;

const HeaderTitle = styled.h1`
  /* Styles for the modal title */
  /* Add your custom styles here */
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-right: 50px;
  color: black;
  align-self: center;
`;


const ImageContainer = styled.div`
  position: relative;
`;

/* Styling for the modal image */
const ModalImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: auto;
  margin-top: 1rem;
  cursor: pointer;
`;

const ModalCloseButton = styled.button`
  /* Styles for the modal close button */
  /* Add your custom styles here */
  padding: 0.5rem 1rem;
  background-color: #008080;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 1rem;

  &:hover {
    background-color: #006666;
  }
`;

const ModalDescription = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0;
`;


const BigWhiteButton = styled.button`
  font-size: 2rem;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const NFTCollectionsTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const NFTCollectionsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NFTCollectionItem = styled.li`
  font-size: 16px;
  margin-bottom: 10px;
`;



// VARIABLES 
//----------

const NFTCONTRACT = "0x230Bb7ce185CD0042973202f5F38B7072440e2C9";
const STAKINGCONTRACT = "0xe1882742713E415391b4815cB3833E9E03A6a895"
const CroMinionsContract = "0x3E2f91c31daf2467B5360EE85D78E99338fd4976"
const CROCELLSCONTRACT = "0x1632568C5DeA50b5738c6C7bE2786657A9840485"
const CroBadgesContract = "0x2e756776A63F936a6010Dd9ee5C5fE77b5E02562"
const bdlContract = "0xd05c62Dc7941B243cffCb7d3eF483279F21b08F0"
const blumiesContract = "0xB278947b945eB7dea7F1822A1801d7e9aEdD8e63"

const cGoldContract = "0x10e18383a6B02D19a21478c4F13C30E889a9218e";

const cGoldABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "controller",
				"type": "address"
			}
		],
		"name": "addController",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "version",
				"type": "uint8"
			}
		],
		"name": "Initialized",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "controller",
				"type": "address"
			}
		],
		"name": "removeController",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const ABI = 
[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_symbol",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_initBaseURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_initNotRevealedUri",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseExtension",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxMintAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_mintAmount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "notRevealedUri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_state",
				"type": "bool"
			}
		],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reveal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "revealed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseExtension",
				"type": "string"
			}
		],
		"name": "setBaseExtension",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseURI",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newCost",
				"type": "uint256"
			}
		],
		"name": "setCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_notRevealedURI",
				"type": "string"
			}
		],
		"name": "setNotRevealedURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newmaxMintAmount",
				"type": "uint256"
			}
		],
		"name": "setmaxMintAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "walletOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]
const MINIONSABI = [
{
	"inputs": [
		{
			"internalType": "string",
			"name": "_name",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "_symbol",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "_initBaseURI",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "_initNotRevealedUri",
			"type": "string"
		}
	],
	"stateMutability": "nonpayable",
	"type": "constructor"
},
{
	"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "approved",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "Approval",
	"type": "event"
},
{
	"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "operator",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "bool",
			"name": "approved",
			"type": "bool"
		}
	],
	"name": "ApprovalForAll",
	"type": "event"
},
{
	"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "previousOwner",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "newOwner",
			"type": "address"
		}
	],
	"name": "OwnershipTransferred",
	"type": "event"
},
{
	"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "from",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "Transfer",
	"type": "event"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "approve",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "owner",
			"type": "address"
		}
	],
	"name": "balanceOf",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "baseExtension",
	"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "cost",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "getApproved",
	"outputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "operator",
			"type": "address"
		}
	],
	"name": "isApprovedForAll",
	"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "maxMintAmount",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "maxSupply",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "uint256",
			"name": "_mintAmount",
			"type": "uint256"
		}
	],
	"name": "mint",
	"outputs": [],
	"stateMutability": "payable",
	"type": "function"
},
{
	"inputs": [],
	"name": "name",
	"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "notRevealedUri",
	"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "owner",
	"outputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "ownerOf",
	"outputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "bool",
			"name": "_state",
			"type": "bool"
		}
	],
	"name": "pause",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "paused",
	"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "renounceOwnership",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "reveal",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "revealed",
	"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "from",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "safeTransferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "from",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		},
		{
			"internalType": "bytes",
			"name": "_data",
			"type": "bytes"
		}
	],
	"name": "safeTransferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "operator",
			"type": "address"
		},
		{
			"internalType": "bool",
			"name": "approved",
			"type": "bool"
		}
	],
	"name": "setApprovalForAll",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "string",
			"name": "_newBaseExtension",
			"type": "string"
		}
	],
	"name": "setBaseExtension",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "string",
			"name": "_newBaseURI",
			"type": "string"
		}
	],
	"name": "setBaseURI",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "uint256",
			"name": "_newCost",
			"type": "uint256"
		}
	],
	"name": "setCost",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "string",
			"name": "_notRevealedURI",
			"type": "string"
		}
	],
	"name": "setNotRevealedURI",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "uint256",
			"name": "_newmaxMintAmount",
			"type": "uint256"
		}
	],
	"name": "setmaxMintAmount",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "bytes4",
			"name": "interfaceId",
			"type": "bytes4"
		}
	],
	"name": "supportsInterface",
	"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "symbol",
	"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "uint256",
			"name": "index",
			"type": "uint256"
		}
	],
	"name": "tokenByIndex",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "index",
			"type": "uint256"
		}
	],
	"name": "tokenOfOwnerByIndex",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "tokenURI",
	"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "totalSupply",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "from",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "transferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "newOwner",
			"type": "address"
		}
	],
	"name": "transferOwnership",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "_owner",
			"type": "address"
		}
	],
	"name": "walletOfOwner",
	"outputs": [
		{
			"internalType": "uint256[]",
			"name": "",
			"type": "uint256[]"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "withdraw",
	"outputs": [],
	"stateMutability": "payable",
	"type": "function"
}
]
const BDLABI = [
{ "inputs": [{ "internalType": "address", "name": "_lootersContract", "type": "address" }, { "internalType": "address", "name": "_artist", "type": "address" }, { "internalType": "address", "name": "_yako", "type": "address" }, { "internalType": "address", "name": "_lootContract", "type": "address" }, { "internalType": "address", "name": "_lootCoinContract", "type": "address" }, { "internalType": "address", "name": "_cdlContract", "type": "address" }, { "internalType": "address", "name": "_godContract", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "inputs": [], "name": "_tokenIdCounter", "outputs": [{ "internalType": "uint256", "name": "_value", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_addresses", "type": "address[]" }], "name": "addWhiteList", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "artist", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cdlContract", "outputs": [{ "internalType": "contract ERC721", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "godContract", "outputs": [{ "internalType": "contract ERC721", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "isDiscount", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "isMember", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "isWhiteList", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lootCoinContract", "outputs": [{ "internalType": "contract ERC721", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lootersContract", "outputs": [{ "internalType": "contract ERC721", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_count", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "mintArtist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "dest", "type": "address" }], "name": "payments", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "removeWhiteList", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_artist", "type": "address" }], "name": "setArtist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_cost", "type": "uint256" }, { "internalType": "bool", "name": "isMember", "type": "bool" }], "name": "setCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_supply", "type": "uint256" }], "name": "setSupply", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_uri", "type": "string" }], "name": "setUri", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "payee", "type": "address" }], "name": "withdrawPayments", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "yako", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }
]
const BlumiesABI = [
{ "inputs": [{ "internalType": "address", "name": "_marketAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "FundsDisperse", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "milestone", "type": "uint256" }], "name": "MilestoneReached", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [], "name": "RefundModeStarted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "address", "name": "refundee", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Refunded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "inputs": [{ "internalType": "address[]", "name": "_addresses", "type": "address[]" }], "name": "addWhiteList", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "addWhiteListAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "airdropMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "availableTokenCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "blacklist", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "canMint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "_ids", "type": "uint256[]" }], "name": "checkBlacklist", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_percent", "type": "uint16" }, { "internalType": "address", "name": "_to", "type": "address" }], "name": "disperseFunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getInfo", "outputs": [{ "components": [{ "internalType": "uint256", "name": "regularCost", "type": "uint256" }, { "internalType": "uint256", "name": "memberCost", "type": "uint256" }, { "internalType": "uint256", "name": "whitelistCost", "type": "uint256" }, { "internalType": "uint256", "name": "maxSupply", "type": "uint256" }, { "internalType": "uint256", "name": "totalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "maxMintPerAddress", "type": "uint256" }, { "internalType": "uint256", "name": "maxMintPerTx", "type": "uint256" }], "internalType": "struct Drop.Infos", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPayees", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getShares", "outputs": [{ "internalType": "uint16[]", "name": "", "type": "uint16[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initiateRefunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isPresale", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "isWhitelist", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "maxAvailableSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxMintAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxMintPerAddress", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "memberCost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "milestonesReached", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_mintAmount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "mintCost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "refundAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "refunding", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "regularCost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "removeWhiteList", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "_ids", "type": "uint256[]" }], "name": "requestRefunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_mintAmount", "type": "uint256" }], "name": "reservedMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256[]", "name": "_ids", "type": "uint256[]" }], "name": "reservedMintByIds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "reservedMintedNFT", "outputs": [{ "internalType": "uint256", "name": "_value", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "reservedNft", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "_salePrice", "type": "uint256" }], "name": "royaltyInfo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "scale", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_newBaseURI", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint96", "name": "feeNumerator", "type": "uint96" }], "name": "setDefaultRoyalty", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "maxAmount", "type": "uint16" }], "name": "setMaxMintPerAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_max", "type": "uint256" }], "name": "setMaxWhiteList", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_cost", "type": "uint256" }], "name": "setMemberCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_newPayees", "type": "address[]" }, { "internalType": "uint16[]", "name": "_newShares", "type": "uint16[]" }], "name": "setPaymentShares", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_startTime", "type": "uint256" }], "name": "setPublicStartTime", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_cost", "type": "uint256" }], "name": "setRegularCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_presaleOnly", "type": "bool" }], "name": "setWhiteListPresaleOnly", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_cost", "type": "uint256" }], "name": "setWhitelistCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_startTime", "type": "uint256" }], "name": "setWhitelistStartTime", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "whiteListPresaleOnly", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "whitelistCost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "whitelistedAddresses", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }
]


const Web3Utils = require('web3-utils');

const providerOptions = {
display: {
	logo: "",
	name: "Defi Wallet",
	description: "Connect to your Defi Wallet account"
},
package: DeFiWeb3Connector,
options: {
	supportedChainIds: [1, 5, 25],
	rpc: {
		1: "https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a",
		5: "https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a",
		25: "https://evm.cronos.org/", // cronos mainet
	},
	pollingInterval: 15000,
},

walletconnect: {
	package: WalletConnectProvider, // required
	options: {
		infuraId: "c66d5493eff848ca89349923e7d1131a", // required
		rpc: {
			1: "https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a",
			5: "https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a",
			25: "https://evm.cronos.org/", // cronos mainet
		},
	},
},
walletlink: {
	package: WalletLink, // Required
	options: {
		appName: "Cro County Dapp", // Required
		infuraId: "c66d5493eff848ca89349923e7d1131a", // Required unless you provide a JSON RPC url; see `rpc` below
		rpc: "https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a", // Optional if `infuraId` is provided; otherwise it's required
		chainId: 25, // Optional. It defaults to 1 if not provided
		appLogoUrl: null, // Optional....
	},
},
}

const web3Modal = new Web3Modal({
	network: "mainnet",
	providerOptions
});

const MarketplaceModal = ({ isOpen, closeModal }) => {
	const [isZoomed, setIsZoomed] = useState(false);

	const toggleZoom = () => {
		setIsZoomed(!isZoomed);
	  };
	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
		<ModalContent>
		  
		  {/* <img src="https://i.imgur.com/DXvGEnC.png"></img> */}

		  <img src="https://i.imgur.com/DXvGEnC.png"></img>
		  <Card>
		  <ModalImage
  src="https://i.imgur.com/qcTVXup.png"
  alt="Logo"
  onClick={toggleZoom}
  style={{ transform: isZoomed ? 'scale(2)' : 'scale(1)' }}
/>
		  <ModalDescription>
			Our NFT Rewards marketplace is a user-friendly platform for trading and exchanging NFTs (Non-Fungible Tokens). It provides collectors and artists with a seamless experience to connect, discover, and trade unique digital assets. With a diverse range of NFTs available, from artwork to digital collectibles and virtual real estate, our marketplace caters to various interests.
		  </ModalDescription>
		  </Card>
		  <Card>
			<CardContent></CardContent>
			<NFTCollectionsTitle>Rewards</NFTCollectionsTitle>
			 <ModalImage src="https://i.imgur.com/3Cr2PXM.png" alt="Community Action" />
			<ModalDescription>
			What sets us apart is the incorporation of rewards, allowing users to earn exclusive incentives such as limited edition NFTs and discounts by participating in trading activities. We prioritize security and transparency, ensuring a safe environment for buying, selling, and trading NFTs.
		  </ModalDescription>
		  </Card>
		  <Card>
		  <NFTCollectionsTitle>Community</NFTCollectionsTitle>
		  <ModalImage src="https://i.imgur.com/deB3fTF.png" alt="Community Action" />
		  <ModalDescription>
			Join our dynamic community, discover incredible digital creations, and be part of an evolving ecosystem of NFT enthusiasts on our NFT Rewards marketplace.
		  </ModalDescription>
		  </Card>
		  <StyledCard>
  <NFTCollectionsTitle>Supported NFT Collections</NFTCollectionsTitle>
  <NFTCollectionsList>
    <NFTCollectionItem>Cro Crooks</NFTCollectionItem>
    <NFTCollectionItem>CroBadges</NFTCollectionItem>
    <NFTCollectionItem>Crominions</NFTCollectionItem>
    <NFTCollectionItem>Crocells</NFTCollectionItem>
    <NFTCollectionItem>Blumies</NFTCollectionItem>
	<NFTCollectionItem>Baby Demon Legion</NFTCollectionItem>
    {/* Add more collections as needed */}
  </NFTCollectionsList>
</StyledCard>
<StyledCard>
  <NFTCollectionsTitle>Supported Crypto's</NFTCollectionsTitle>
  <NFTCollectionsList>
    <NFTCollectionItem>$CRO (cronos)</NFTCollectionItem>
    <NFTCollectionItem>$cGOLD (croGold)</NFTCollectionItem>
    <NFTCollectionItem>$TROLL (potential)</NFTCollectionItem>
    <NFTCollectionItem>$TONIC(potential)</NFTCollectionItem>
    <NFTCollectionItem>$WCRO(wrapped CRO)</NFTCollectionItem>
	
    {/* Add more collections as needed */}
  </NFTCollectionsList>
</StyledCard>
		  
		  {/* Add more information about the marketplace */}
		  <ModalCloseButton onClick={closeModal}>Close</ModalCloseButton>
		</ModalContent>
	  </Modal>
	  
	);
  };

 


// SEARCH HERE FOR PAWNSHOP
// Appraiser Contract Address and ABI
const appraiserContractAddress = '0x1A5fBFa9ab3bCd7eB6438e8F95698A704725b787';
const appraiserContractABI =
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "nftAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "volatility",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lastPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "recommendedLoanAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lastUpdateTimestamp",
				"type": "uint256"
			}
		],
		"name": "AppraisalSubmitted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "volatility",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "recommendedLoanAmount",
				"type": "uint256"
			}
		],
		"name": "setAppraisal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "appraisals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "volatility",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "recommendedLoanAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastUpdateTimestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC721",
				"name": "nftAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getAppraisal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// NFTLendingPool Contract Address and ABI
const lendingPoolContractAddress = '0xb121919c9E54DCB1B4C0c6Aeec60e2B5eD06d582';
const lendingPoolContractABI =
[
{
"inputs": [
	{
		"internalType": "contract IERC20",
		"name": "_underlyingToken",
		"type": "address"
	},
	{
		"internalType": "contract IAppraiser",
		"name": "_appraiser",
		"type": "address"
	}
],
	"stateMutability": "nonpayable",
		"type": "constructor"
},
{
"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "value",
			"type": "uint256"
		}
	],
		"name": "Approval",
			"type": "event"
},
{
"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "borrower",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
		"name": "Borrowed",
			"type": "event"
},
{
"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "borrower",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "id",
			"type": "uint256"
		}
	],
		"name": "Deposit",
			"type": "event"
},
{
"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "contract IERC721",
			"name": "nft",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "id",
			"type": "uint256"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
		"name": "Liquidation",
			"type": "event"
},
{
"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "borrower",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
		"name": "Repaid",
			"type": "event"
},
{
"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "from",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "value",
			"type": "uint256"
		}
	],
		"name": "Transfer",
			"type": "event"
},
{
"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "supplier",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
		"name": "Withdraw",
			"type": "event"
},
{
"inputs": [
	{
		"internalType": "address",
		"name": "owner",
		"type": "address"
	},
	{
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}
],
	"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [],
	"name": "appraiser",
		"outputs": [
			{
				"internalType": "contract IAppraiser",
				"name": "",
				"type": "address"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "address",
		"name": "spender",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
	}
],
	"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "contract IERC721",
		"name": "",
		"type": "address"
	}
],
	"name": "assetPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}
],
	"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "uint256",
		"name": "borrowAmount",
		"type": "uint256"
	}
],
	"name": "borrow",
		"outputs": [],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [],
	"name": "borrowIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "address",
		"name": "borrower",
		"type": "address"
	}
],
	"name": "calculateCollateralValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [],
	"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "address",
		"name": "spender",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "subtractedValue",
		"type": "uint256"
	}
],
	"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "contract IERC721",
		"name": "nft",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "id",
		"type": "uint256"
	}
],
	"name": "depositNFT",
		"outputs": [],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "contract IERC721",
		"name": "",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}
],
	"name": "depositor",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [],
	"name": "exchangeRateStored",
		"outputs": [
			{
				"internalType": "int128",
				"name": "",
				"type": "int128"
			}
		],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "address",
		"name": "spender",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "addedValue",
		"type": "uint256"
	}
],
	"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "contract IERC721",
		"name": "nft",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "id",
		"type": "uint256"
	}
],
	"name": "liquidateBorrow",
		"outputs": [],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
	}
],
	"name": "mint",
		"outputs": [],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [],
	"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "uint256",
		"name": "redeemTokens",
		"type": "uint256"
	}
],
	"name": "redeem",
		"outputs": [],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "uint256",
		"name": "repayAmount",
		"type": "uint256"
	}
],
	"name": "repayBorrow",
		"outputs": [],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [],
	"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [],
	"name": "totalBorrowed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [],
	"name": "totalRepaid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [],
	"name": "totalSupplied",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [],
	"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "address",
		"name": "to",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
	}
],
	"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "address",
		"name": "from",
		"type": "address"
	},
	{
		"internalType": "address",
		"name": "to",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
	}
],
	"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
			"stateMutability": "nonpayable",
				"type": "function"
},
{
"inputs": [],
	"name": "underlyingToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
			"stateMutability": "view",
				"type": "function"
},
{
"inputs": [
	{
		"internalType": "contract IERC721",
		"name": "nft",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "id",
		"type": "uint256"
	}
],
	"name": "withdrawNFT",
		"outputs": [],
			"stateMutability": "nonpayable",
				"type": "function"
}
]

const AppraiserForm = styled.div`
background-color: #f8f8f8;
padding: 20px;
border-radius: 8px;
`;

const FormContainer = styled.div`
margin-bottom: 20px;
`;

const AppraisalDisplay = styled.div`
background-color: #ffffff;
padding: 20px;
border-radius: 8px;
margin-bottom: 20px;
`;

const AppraisalButton = styled.button`
background-color: #4caf50;
color: #ffffff;
padding: 10px 20px;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 16px;

&:hover {
background-color: #45a049;
}
`;




// SEARCH HERE FOR MARKETPLACE FUNCTIONALITY
const Marketplace = () => {
const dispatch = useDispatch();
const [currentIndex, setCurrentIndex] = useState(0);
const [account, setAccount] = useState("");
const [Nfts, setNfts] = useState([]);
const [startIndex, setStartIndex] = useState(0);
const blockchain = useSelector((state) => state.blockchain);


const [count, setCount] = useState(0);
const [Rewards, setRewards] = useState(0);
const [rewardBalances, setRewardBalances] = useState({});
const [activeListings, setActiveListings] = useState(0);

  const [showSidebar, setShowSidebar] = useState(false);
const sidebarRef = useRef(null);
const [connecting, setConnecting] = useState(false);
const [notification, setNotification] = useState(null);
const [loading, setLoading] = useState(false);
const [showNfts, setShowNfts] = useState(false);
const [showBetaWarning, setShowBetaWarning] = useState(true);
const [itemsForSale, setItemsForSale] = useState([]);
const [balance, setBalance] = useState(null);
const [nftData, setNFTData] = useState([]);
const [isNFTCollapsed, setIsNFTCollapsed] = useState(false);
const [isZoomed, setIsZoomed] = useState(false);


const wrapperRef = useRef(null);
const contentRef = useRef(null);

const [activeFeed, setActiveFeed] = useState("nft"); // Default active feed is "nft"
const [modalOpen, setModalOpen] = useState(false);
const currentNFT = nftData[currentIndex];
const [modal2Open, setModal2Open] = useState(false);
const [transferAmount, setTransferAmount] = useState('');

const [toAddress, setToAddress] = useState('');
const image = '';
const metadata = {};
const tokenId = '';



  

function generateNFTCard(image, metadata, tokenId) {
	return `
	  <div class="row justify-content-center">
		<div class="col-md-4">
		  <div class="card-wrapper">
			<div class="card">
			  <img src="${image}" class="card-img-top nft-image" width="100%" height="auto" />
			  <div class="card-body">
				<h5 class="card-title">${metadata.name}</h5>
				
				<div class="form-group">
				  <input type="number" name="AskingPrice" class="form-control" id="askingPriceInput-${tokenId}" placeholder="Enter price">  
				</div>
				<button type="button" class="btn btn-primary nft-btn zoom" data-tokenid="${tokenId}">List NFT</button>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
  
	  <style>
	  .form-control {
		width: 100%;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
		outline: none;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	  }
	  
	  .form-control:focus {
		border-color: #1f87f5;
		box-shadow: 0 0 5px rgba(31, 135, 245, 0.5);
	  }
	  
		
		.card {
		  background-color: #fff;
		  border: 12px solid #1f87f5;
		  border-radius: 10px;
		  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		  
		  height: 100%;
		  width: 100%;
		}
  
		.card-title {
		  font-size: 24px;
		  font-weight: 700;
		  margin-bottom: 10px;
		}
  
		.card-text {
		  font-size: 16px;
		  margin-bottom: 20px;
		}
  
		.card-img-top {
		  height: 100%;
		  max-width: 100%;
		  object-fit: cover;
		  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		}
  
		.zoom {
		  transition: transform 0.5s ease;
		}
  
		.zoom:hover {
		  transform: scale(1.1);
		}
  
		.btn {
		  transition: background-color 0.5s ease;
		  color: #fff;
		}
  
		.btn:hover {
		  background-color: #1f87f5;
		}
  
		#stakeBtn,
		#unstakeBtn,
		#claimBtn {
		  position: relative;
		}
  
		#stakeBtn:after,
		#unstakeBtn:after,
		#claimBtn:after {
		  content: '';
		  display: block;
		  width: 30px;
		  height: 30px;
		  border: 2px solid #fff;
		  border-top: 2px solid transparent;
		  border-radius: 50%;
		  position: absolute;
		  top: 50%;
		  left: 50%;
		  transform: translate(-50%, -50%) rotate(0deg);
		  animation: rotate 1s infinite linear;
		}
  
		@keyframes rotate {
		  0% {
			transform: translate(-50%, -50%) rotate(0deg);
		  }
		  100% {
			transform: translate(-50%, -50%) rotate(360deg);
		  }
		}
  
		#stakeBtn.loading:after,
		#unstakeBtn.loading:after,
		#claimBtn.loading:after {}
	  </style>
	`;
  }
  
const generateSecretKey = () => {
	const randomBytes = CryptoJS.lib.WordArray.random(16);
	const secretKey = randomBytes.toString();
	return secretKey;
  };

const secretKey = generateSecretKey();

// Example initial reward balances



// Function to update the reward balance for the user's account address
const updateRewardBalance = () => {
    const account = blockchain.account; // Assuming blockchain.account holds the user's account address
    const currentBalance = rewardBalances[account] || 0;
    const newBalance = currentBalance + 10;

	const updatedBalances = {
		...rewardBalances,
		[account]: newBalance,
	  };
  
	  const updatedBalancesString = JSON.stringify(updatedBalances);
	  const encryptedString = CryptoJS.AES.encrypt(updatedBalancesString, secretKey).toString();
  
	  localStorage.setItem('rewardBalances', encryptedString);

    // setRewardBalances(prevRewardBalances => ({
    //   ...prevRewardBalances,
    //   [account]: newBalance
    // }));
	setRewardBalances(updatedBalances);
  };

// Retrieve and decrypt reward balances from localStorage
useEffect(() => {
	const encryptedString = localStorage.getItem('rewardBalances');
  
	if (encryptedString) {
	  try {
		const decryptedString = CryptoJS.AES.decrypt(encryptedString, secretKey).toString(CryptoJS.enc.Utf8);
		const balances = JSON.parse(decryptedString);
		setRewardBalances(balances);
	  } catch (error) {
		// Handle decryption error
		console.error('Error decrypting reward balances:', error);
		// Optionally, you can set the rewardBalances state to an initial value if decryption fails
		// setRewardBalances({});
	  }
	}
  }, []);
  
  // Render the current reward balance as a string
  const balanceString = rewardBalances[blockchain.account] ? rewardBalances[blockchain.account].toString() : '0';


const openModal = () => {
    setModalOpen(true);
};

const closeModal = () => {
    setModalOpen(false);
};

const handleModalOpen = () => {
    setModal2Open(true);
  };

const handleModalClose = () => {
    setModal2Open(false);
  };

const handleNFTCollapse = () => {
	setIsNFTCollapsed((prevState) => !prevState);
	console.log(isNFTCollapsed);
};

const handleSwitchFeed = async () => {
	const newActiveFeed = activeFeed === "nft" ? "market" : "nft";
  
	if (activeFeed === "nft" && !isNFTCollapsed) {
	  // Collapse the NFT feed before switching
	  handleNFTCollapse(); 
	  await new Promise((resolve) => setTimeout(resolve, 300)); // Delay to allow the UI to update
		
	  await setActiveFeed(newActiveFeed);
	  console.log(newActiveFeed);
  
	  if (newActiveFeed === "market") {
		// Fetch market NFTs when switching to Market Feed
		await displayNFTsFeatures();
	  } 

	} else if (activeFeed === "market" )  {
		handleNFTCollapse(); 
		await new Promise((resolve) => setTimeout(resolve, 100));
	  await setActiveFeed(newActiveFeed);
	  console.log(newActiveFeed);
	  await displayNFTs();
  
	  if (activeFeed === "nft") {
		// Fetch market NFTs when switching to Market Feed
		await displayNFTs();
	  }
	}
  };


const handleBackToTop = () => {
	console.log("firing");
	wrapperRef.current?.scrollTo(0, 0);
	contentRef.current?.scrollTo(0, 0);
};

const handleNextClick = () => {
	setCurrentIndex((prevIndex) => (prevIndex + 1) % nftData.length);
	console.log(currentIndex)
};

const handleConnect  = async () => {
	dispatch(connect());
	
	
	
};

const handleDisconnect = () => {
	dispatch(disconnect());
};

const fetchBalance = async () => {
	const apiKey = "WACBMAWJB6171MP98GMUPN585QSR7BWRU8";
	const address = blockchain.account;
	const url = `https://api.cronoscan.com/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;

	const response = await fetch(url);
	const data = await response.json();

	// Parse the balance and format it to 2 decimal places
	const balance = parseFloat(data.result) / 1e18;
	setBalance(balance.toFixed(2));
}

function isUserLoggedIn() {
	// Your code to check if the user is logged in goes here
	// Return true if the user is logged in, false otherwise
	if (blockchain.account = true) {
		return true 
	} else {
		return false
	}
}

  // SUPPORT FUNCTIONS
//-----------------------

	// Load More NFTs
const loadMore = () => {
		setStartIndex(startIndex + 10);
		getNFTs(startIndex + 10);
};

	// Load More NFTs
const loadMoreCells = () => {
		setStartIndex(startIndex + 10);
		getCellNFTs(startIndex + 10);
};

	// Load More Badges
const loadMoreBadges = () => {
		setStartIndex(startIndex + 10);
		getBadgeNFTs(startIndex + 10);
};

	// Load More Minions

	// Load More CroboCops


	// Load First Ten NFTs
const getFirstTenCells = () => {
		setStartIndex(startIndex + 0);
		getCellNFTs(startIndex + 0);
};

	// Load First Ten NFTs
const getFirstTenBadges = () => {
		setStartIndex(startIndex + 0);
		getBadgeNFTs(startIndex + 0);
};

	// Load First Ten NFTs
const getFirstTen = () => {
		setStartIndex(startIndex + 0);
		getNFTs(startIndex + 0);
};

const getFirstTenMinions = () => {
		setStartIndex(startIndex + 0);
		getMinionsNFTs(startIndex + 0);
};

const getFirstTenBdl = () => {
	setStartIndex(startIndex + 0);
	getMinionsNFTs(startIndex + 0);
};



async function getAllNFTs() {
	console.log("It's running")
	const contract = new Web3EthContract(ABI, NFTCONTRACT);
  
	// Get the total number of NFTs minted
	const totalNFTs = await contract.methods.totalSupply().call();
  console.log(totalNFTs)
	let nfts = [];
  
	// Loop through all the NFTs
	for (let i = 0; i < totalNFTs; i++) {
	  // Get the token ID for the NFT
	  const tokenId = await contract.methods.tokenByIndex(i).call();
	  
  
	  // Get the NFT metadata and image URI
	  const uri = await contract.methods.tokenURI(tokenId).call();
	  
	  const ipfsURL = addIPFSProxy(uri);
	  const request = new Request(ipfsURL);
	  const response = await fetch(request);
	  
	  const metadata = await response.json();
	  
  
	  const image = addIPFSProxy(metadata.image);
	  
  
	  // Add the NFT information to the array
	  nfts.push({
		tokenId: tokenId,
		metadata: metadata,
		image: image,
	  });

	  console.log(nfts);
	setNfts(nfts);
	}
  
	
}
  
// Load First Ten Partner Projects

	// Load First Ten Other Projects




// MAIN FUNCTIONS
//-----------------------

	// Get NFTs
async function getNFTs(startIndex) {
		const contract = new Web3EthContract(ABI, NFTCONTRACT)
		const address = blockchain.account;


		let totalNFTs = 0;
		let nfts = [];



		// Get the total number of NFTs held by the user
		totalNFTs = await contract.methods.balanceOf(address).call();
		//console.log('totalNFTs:', totalNFTs);
		// Loop through all of the NFTs held by the user



		for (let i = startIndex; i < startIndex + 10; i++) {
			if (i >= totalNFTs) {
				break;
			}
			// Get the token ID for the current NFT
			const tokenId = await contract.methods.tokenOfOwnerByIndex(address, i).call();
			//console.log('tokenId:', tokenId);
			// Get the NFT metadata and image URI
			const uri = await contract.methods.tokenURI(tokenId).call();
			const ipfsURL = addIPFSProxy(uri);
			const request = new Request(ipfsURL);
			const response = await fetch(request);
			const metadata = await response.json();
			console.log(metadata)
			//console.log(metadata.name); // Metadata in JSON

			const image = addIPFSProxy(metadata.image);
			let jsonData = {};
			//console.log('uri:', uri);
			///console.log(metadata);
			//console.log(metadata.artist);
			//console.log(image);


			let jsonString = JSON.stringify(uri.replace(/ipfs:\/\//g, "https://"));

			jsonData = JSON.parse(jsonString);
			//console.log(jsonData);




			let name = addIPFSProxy(metadata.name);
			///console.log(metadata.name);
			let description = addIPFSProxy(metadata.description);
			///console.log(description)


			// Add the NFT information to the array
			nfts.push({
				tokenId: tokenId,
				metadata: metadata,
				image: image,

			});
			//console.log(nfts);

			// Build and display the HTML element for each NFT
			// Build and display the HTML element for each NFT
			let content = generateNFTCard(image, metadata, tokenId);

			document.getElementById("nftid").innerHTML += content;

			// Add event listener to stake buttons
			document.querySelectorAll('.nft-btn').forEach(btn => {
				btn.addEventListener('click', async event => {
					const tokenId = event.target.dataset.tokenid;
					const askingPriceInput = document.getElementById(`askingPriceInput-${tokenId}`);
					const askingPrice = Number(askingPriceInput.value);
					console.log(askingPrice);
		
					const nftTokenAddress = "0x230Bb7ce185CD0042973202f5F38B7072440e2C9";
					const marketplaceAddress = "0xa12A3A4ED947e38Ad0c177799De37DD77F520E62"

					const contract = new Web3EthContract(testABI, testContract);
					const rewardcontract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);
					const NFTcontract = new Web3EthContract(ABI, NFTCONTRACT);

					await NFTcontract.methods.approve(marketplaceAddress, tokenId).send({ from: blockchain.account });
					const result = await contract.methods.addItemToMarket(tokenId, nftTokenAddress, askingPrice).send({ from: blockchain.account });
					if (result.status) {
					// Display success notification
					Swal.fire({
						icon: 'success',
						title: 'NFT listed successfully',
						showConfirmButton: false,
						timer: 5000
					});

					// Update the reward balance
					setRewardBalances(prevReward => {
						const updatedBalance = prevReward + 5;
						localStorage.setItem(`${blockchain.account}-rewards`, updatedBalance);
						console.log('Updated balance:', updatedBalance);
						return updatedBalance;
					});
					
					}
				});
			});



			// Add event listener to stake buttons
			document.querySelectorAll('.claim-btn').forEach(btn => {
				btn.addEventListener('click', async event => {
					const tokenId = event.target.dataset.tokenid;

					const contract = new Web3EthContract(ABI, NFTCONTRACT);
					const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);

					vaultcontract.methods.stake([tokenId]).send({ from: blockchain.account });
				});
			});

			let startIndex = 10;
			const loadMoreBtn = document.querySelector("#load-more-btn");

			/*loadMoreBtn.addEventListener("click", async () => {
				startIndex += 10;
				await getNFTs(startIndex);
			});*/



		}
		return nfts;
		setNfts(nfts);


}

// Get Crocell NFTs
async function getCellNFTs(startIndex) {
		const contract = new Web3EthContract(CROCELLSABI, CROCELLSCONTRACT)
		// initial loading screen
		handleNotification("Checking Staked Crooks");

		// Initialize web3 using MetaMask
		if (window.ethereum) {
			const web3 = new Web3(window.ethereum);
			try {
				// Request account access if needed
				await window.ethereum.enable();
				console.log('Web3 initialized!');
			} catch (error) {
				console.log('User denied account access');
			}
		}

		const address = account;
		let totalNFTs = 0;
		let nfts = [];
		// Get the total number of NFTs held by the user
		totalNFTs = await contract.methods.balanceOf(blockchain.account).call();
		//console.log(totalNFTs)
		//console.log('totalNFTs:', totalNFTs);


		// Get the list of NFTs currently listed for sale
		const marketplaceContract = new Web3EthContract(
			testABI,
			testContract
		);
		const itemsForSale = await marketplaceContract.methods
			.getItemsForSale()
			.call({ from: blockchain.account });
		// Loop through all of the NFTs held by the use
		for (let i = startIndex; i < startIndex + 10; i++) {
			if (i >= totalNFTs) {
				break;
			}

			// Get the token ID for the current NFT
			const tokenId = await contract.methods.tokenOfOwnerByIndex(blockchain.account, i).call();
			//console.log('tokenId:', tokenId);


			// Check if the current NFT is already listed for sale
			const nftIsForSale = itemsForSale.some(
				(item) =>
					item[1] === contract._address &&
					item[2] === tokenId &&
					item[5] === false
			);
			if (nftIsForSale) {
				//console.log(`NFT ${tokenId} is already listed for sale`);
				continue;
			}

			// Get the NFT metadata and image URI
			const uri = await contract.methods.tokenURI(tokenId).call();
			const ipfsURL = addIPFSProxy(uri);
			const request = new Request(ipfsURL);
			const response = await fetch(request);
			const metadata = await response.json();
			//console.log(metadata.name); // Metadata in JSON

			const image = addIPFSProxy(metadata.image);
			let jsonData = {};
			//console.log('uri:', uri);
			//console.log(metadata);
			//console.log(metadata.artist);
			//console.log(image);

			let jsonString = JSON.stringify(uri.replace(/ipfs:\/\//g, "https://"));

			jsonData = JSON.parse(jsonString);
			//console.log(jsonData);

			let name = addIPFSProxy(metadata.name);
			//console.log(metadata.name);
			let description = addIPFSProxy(metadata.description);
			//console.log(description)


			// Add the NFT information to the array
			nfts.push({
				tokenId: tokenId,
				metadata: metadata,
				image: image,

			});
			//console.log(nfts);
			setNfts(nfts);

			// Build and display the HTML element for each NFT
			// Build and display the HTML element for each NFT
			let content = generateNFTCard(image, metadata, tokenId);

			document.getElementById("nftid").innerHTML += content;

			// Add event listener to parent element
			document.querySelectorAll('.cell-btn').forEach(btn => {
				btn.addEventListener('click', async event => {
					const tokenId = event.target.dataset.tokenid;
					const askingPriceInput = document.getElementById(`askingPriceInput-${tokenId}`);
					const askingPrice = Number(askingPriceInput.value);
					console.log(askingPrice);

					const nftTokenAddress = "0x1632568C5DeA50b5738c6C7bE2786657A9840485";
					const marketplaceAddress = "0xa12A3A4ED947e38Ad0c177799De37DD77F520E62";

					const contract = new Web3EthContract(testABI, testContract);
					const rewardcontract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);
					const NFTcontract = new Web3EthContract(CROCELLSABI, CROCELLSCONTRACT);

					//approve transfer for NFT Marketplace Contract
					// Approve transfer of cGOLD to Marketplace contract
					// Add cGOLD tokens to Marketplace Balance.
					await NFTcontract.methods.approve(marketplaceAddress, tokenId).send({ from: blockchain.account });
					const result = await contract.methods.addItemToMarket(tokenId, nftTokenAddress, askingPrice).send({ from: blockchain.account });
					if (result.status) {
					// Display success notification
					Swal.fire({
						icon: 'success',
						title: 'NFT listed successfully',
						showConfirmButton: false,
						timer: 5000
					});
					}
				});
			});

			// Add event listener to stake buttons
			// change this to List Function

		



			// Add event listener to stake buttons
			document.querySelectorAll('.claim-btn').forEach(btn => {
				btn.addEventListener('click', async event => {
					const tokenId = event.target.dataset.tokenid;
					const askingPrice = document.getElementById("askingPriceInput").value;
					const contract = new Web3EthContract(ABI, NFTCONTRACT);
					const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);

					vaultcontract.methods.stake([tokenId]).send({ from: blockchain.account });
				});
			});

			let startIndex = 10;
			const loadMoreBtn = document.querySelector("#load-more-btn");

			/*loadMoreBtn.addEventListener("click", async () => {
				startIndex += 10;
				await getCellNFTs();
			});*/
		}
		console.log(nfts);
}

// Get CroBadge NFTs
async function getBadgeNFTs(startIndex) {
		const contract = new Web3EthContract(CROBADGEABI, CroBadgesContract)
		// initial loading screen
		handleNotification("Checking Staked Crooks");

		// Initialize web3 using MetaMask
		if (window.ethereum) {
			const web3 = new Web3(window.ethereum);
			try {
				// Request account access if needed
				await window.ethereum.enable();
				console.log('Web3 initialized!');
			} catch (error) {
				console.log('User denied account access');
			}
		}
	
		const address = account;


		let totalNFTs = 0;
		let nfts = [];



		// Get the total number of NFTs held by the user
		totalNFTs = await contract.methods.balanceOf(blockchain.account).call();
		//console.log(totalNFTs)
		//console.log('totalNFTs:', totalNFTs);


		// Get the list of NFTs currently listed for sale
		const marketplaceContract = new Web3EthContract(
			testABI,
			testContract
		);
		const itemsForSale = await marketplaceContract.methods
			.getItemsForSale()
			.call({ from: blockchain.account });





		// Loop through all of the NFTs held by the user

		for (let i = startIndex; i < startIndex + 10; i++) {
			if (i >= totalNFTs) {
				break;
			}

			// Get the token ID for the current NFT
			const tokenId = await contract.methods.tokenOfOwnerByIndex(blockchain.account, i).call();
			//console.log('tokenId:', tokenId);


			// Check if the current NFT is already listed for sale
			const nftIsForSale = itemsForSale.some(
				(item) =>
					item[1] === contract._address &&
					item[2] === tokenId &&
					item[5] === false
			);
			if (nftIsForSale) {
				console.log(`NFT ${tokenId} is already listed for sale`);
				continue;
			}


			// Get the NFT metadata and image URI
			const uri = await contract.methods.tokenURI(tokenId).call();
			const ipfsURL = addIPFSProxy(uri);
			const request = new Request(ipfsURL);
			const response = await fetch(request);
			const metadata = await response.json();
			//console.log(metadata.name); // Metadata in JSON

			const image = addIPFSProxy(metadata.image);
			let jsonData = {};
			//console.log('uri:', uri);
			//console.log(metadata);
			//console.log(metadata.artist);
			//console.log(image);


			let jsonString = JSON.stringify(uri.replace(/ipfs:\/\//g, "https://"));

			jsonData = JSON.parse(jsonString);
			//console.log(jsonData);



			let name = addIPFSProxy(metadata.name);
			//console.log(metadata.name);
			let description = addIPFSProxy(metadata.description);
			//console.log(description)
		

			// Add the NFT information to the array
			nfts.push({
				tokenId: tokenId,
				metadata: metadata,
				image: image,

			});
			//console.log(nfts);
			setNfts(nfts);

			// Build and display the HTML element for each NFT
			// Build and display the HTML element for each NFT
			let content = generateNFTCard(image, metadata, tokenId);

			document.getElementById("nftid").innerHTML += content;



			// Add event listener to List buttons
			// change this to List Function

			document.querySelectorAll('.badge-btn').forEach(btn => {
				btn.addEventListener('click', async event => {
					const tokenId = event.target.dataset.tokenid;
					const askingPriceInput = document.getElementById(`askingPriceInput-${tokenId}`);
					const askingPrice = Number(askingPriceInput.value);
					console.log("THIS IS THE ASKING RIGHT... " + askingPrice);
				
					const nftTokenAddress = "0x2e756776A63F936a6010Dd9ee5C5fE77b5E02562";
					const marketplaceAddress = "0xa12A3A4ED947e38Ad0c177799De37DD77F520E62"

					const contract = new Web3EthContract(testABI, testContract);
					const rewardcontract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);
					const NFTcontract = new Web3EthContract(CROBADGEABI, CroBadgesContract);

					//approve transfer for NFT Marketplace Contract
					// Approve transfer of cGOLD to Marketplace contract
					// Add cGOLD tokens to Marketplace Balance.
					await NFTcontract.methods.approve(marketplaceAddress, tokenId).send({ from: blockchain.account });
					Swal.fire({
						title: 'Please approve this first transaction, then await another to list the NFT...',
						showConfirmButton: true,
					  });
					const result = await contract.methods.addItemToMarket(tokenId, nftTokenAddress, askingPrice).send({ from: blockchain.account });
					if (result.status) {
					// Display success notification
					Swal.fire({
						icon: 'success',
						title: 'NFT listed successfully',
						showConfirmButton: false,
						timer: 5000
					});
					}
				});
			});



			// // Add event listener to Buy buttons
			// document.querySelectorAll('.claim-btn').forEach(btn => {
			// 	btn.addEventListener('click', async event => {
			// 		const tokenId = event.target.dataset.tokenid;
			// 		const askingPrice = document.getElementById("askingPriceInput").value;
			// 		const contract = new Web3EthContract(ABI, NFTCONTRACT);
			// 		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);

			// 		vaultcontract.methods.stake([tokenId]).send({ from: blockchain.account });
			// 	});
			// });

		
			let startIndex = 10;
			const loadMoreBtn = document.querySelector("#load-more-btn");

			/*loadMoreBtn.addEventListener("click", async () => {
				startIndex += 10;
				await getCellNFTs();
			});*/



		}
		console.log(nfts);



}

// Get Minions NFTs
async function getMinionsNFTs() {
	const contract = new Web3EthContract(MINIONSABI, CroMinionsContract)
	// initial loading screen
	// Initialize web3 using MetaMask
	if (window.ethereum) {
		const web3 = new Web3(window.ethereum);
		try {
			// Request account access if needed
			await window.ethereum.enable();
			console.log('Web3 initialized!');
		} catch (error) {
			console.log('User denied account access');
		}
	}

	const address = account;
	let totalNFTs = 0;
	let nfts = [];

	// Get the total number of NFTs held by the user
	totalNFTs = await contract.methods.balanceOf(blockchain.account).call();
	//console.log(totalNFTs)
	//console.log('totalNFTs:', totalNFTs);
	// Loop through all of the NFTs held by the user
	for (let i = 0; i <= 0; i++) {
		if (i >= totalNFTs) {
			break;
		}

		// Get the token ID for the current NFT
		const tokenId = await contract.methods.tokenOfOwnerByIndex(blockchain.account, i).call();
		//console.log('tokenId:', tokenId);


		// Get the NFT metadata and image URI
		const uri = await contract.methods.tokenURI(tokenId).call();
		const ipfsURL = addIPFSProxy(uri);
		const request = new Request(ipfsURL);
		const response = await fetch(request);
		const metadata = await response.json();
		//console.log(metadata.name); // Metadata in JSON

		const image = addIPFSProxy(metadata.image);
		let jsonData = {};
		//console.log('uri:', uri);
		//console.log(metadata);
		//console.log(metadata.artist);
		//console.log(image);

		let jsonString = JSON.stringify(uri.replace(/ipfs:\/\//g, "https://"));

		jsonData = JSON.parse(jsonString);
		console.log(jsonData);


		let name = addIPFSProxy(metadata.name);
		//console.log(metadata.name);
		let description = addIPFSProxy(metadata.description);
		//console.log(description)

		// Add the NFT information to the array
		nfts.push({
			tokenId: tokenId,
			metadata: metadata,
			image: image,

		});
		//console.log(nfts);
		setNfts(nfts);

		console.log(nfts);
		// Build and display the HTML element for each NFT
		let content = generateNFTCard(image, metadata, tokenId);

		document.getElementById("nftid").innerHTML += content;

		document.querySelectorAll('.m-btn').forEach(btn => {
			btn.addEventListener('click', async event => {
				
				Swal.fire({
					title: 'Not available for listing yet..',
					showConfirmButton: true,
				  });
			
				
			});
		});

}
}
		
async function getBdlNFTs() {
	const contract = new Web3EthContract( BDLABI, bdlContract)
	// initial loading screen
	handleNotification("Checking Staked Crooks");

	// Initialize web3 using MetaMask
	if (window.ethereum) {
		const web3 = new Web3(window.ethereum);
		try {
			// Request account access if needed
			await window.ethereum.enable();
			console.log('Web3 initialized!');
		} catch (error) {
			console.log('User denied account access');
		}
	}

	const address = account;
	let totalNFTs = 0;
	let nfts = [];

	// Get the total number of NFTs held by the user
	totalNFTs = await contract.methods.balanceOf(blockchain.account).call({ from: blockchain.account });
	//console.log(totalNFTs)
	//console.log('totalNFTs:', totalNFTs);

	// Loop through all of the NFTs held by the user
	for (let i = 0; i <= totalNFTs; i++) {
		if (i >= totalNFTs) {
			break;
		}

		// Get the token ID for the current NFT
		const tokenId = await contract.methods.tokenOfOwnerByIndex(blockchain.account, i).call();
		//console.log('tokenId:', tokenId);


		// Get the NFT metadata and image URI
		const uri = await contract.methods.tokenURI(tokenId).call();
		const ipfsURL = addIPFSProxy(uri);
		const request = new Request(ipfsURL);
		const response = await fetch(request);
		const metadata = await response.json();
		//console.log(metadata.name); // Metadata in JSON

		const image = addIPFSProxy(metadata.image);
		let jsonData = {};
		//console.log('uri:', uri);
		//console.log(metadata);
		//console.log(metadata.artist);
		//console.log(image);

		let jsonString = JSON.stringify(uri.replace(/ipfs:\/\//g, "https://"));

		jsonData = JSON.parse(jsonString);
		console.log(jsonData);

		let name = addIPFSProxy(metadata.name);
		//console.log(metadata.name);
		let description = addIPFSProxy(metadata.description);
		//console.log(description)

		// Add the NFT information to the array
		nfts.push({
			tokenId: tokenId,
			metadata: metadata,
			image: image,

		});
		//console.log(nfts);
		setNfts(nfts);

		console.log(nfts);
		// Build and display the HTML element for each NFT
		let content = generateNFTCard(image, metadata, tokenId);

		document.getElementById("nftid").innerHTML += content;

		document.querySelectorAll('.bdl-btn').forEach(btn => {
			btn.addEventListener('click', async event => {
				
				Swal.fire({
					title: 'Not available for listing yet..',
					showConfirmButton: true,
				  });
			
				
			});
		});
	}

}


function showNotification() {
		Swal.fire({
		  title: 'Success!',
		  text: 'Test',
		  icon: 'success',
		  confirmButtonText: 'Ok'
		});

		
}

async function getNFTsCount() {
		const marketplaceAddress = "0xa12A3A4ED947e38Ad0c177799De37DD77F520E62";

		// NEW FUNCTIONALITY 
		const nftContracts = [
			{
				address: "0x1632568C5DeA50b5738c6C7bE2786657A9840485",
				abi: CROCELLSABI,
			},
			{
				address: "0x2e756776A63F936a6010Dd9ee5C5fE77b5E02562",
				abi: CROBADGEABI,
			},
			// add more NFT contracts as needed
		];

		const NFTcontract = new Web3EthContract(CROCELLSABI, CROCELLSCONTRACT);
		const marketplaceContract = new Web3EthContract(testABI, testContract);
		const marketplaceItemsDiv = document.getElementById("marketplaceItems");

		try {
			// Check if user is logged in before calling getItemsForSale
			if (!blockchain.account) {
				// User is not logged in, display error message
				alert("Please log in to continue");
				return;
			}

			let count = 0;

			for (let i = 0; i < nftContracts.length; i++) {
				const contract = new Web3EthContract(nftContracts[i].abi, nftContracts[i].address);

				const itemsForSale = await marketplaceContract.methods.getItemsForSale().call({ from: blockchain.account });

				for (const item of itemsForSale) {
					const NFTtokenID = item[2];
					const nftTokenAddress = item[1];
					// Check if NFT already exists in the marketplaceItemsDiv
					// Get the NFT's unique identifier
					const itemID = `${nftTokenAddress}-${NFTtokenID}`;

					// Check if NFT already exists in the itemsForSale array
					const existingNFT = itemsForSale.find(item => item[1] === nftTokenAddress && item[2] === NFTtokenID);

					if (existingNFT === undefined) {
						// If the NFT does not exist in the itemsForSale array, increment count
						count++;
					} else {
						// If the NFT already exists in the itemsForSale array, do not add it
						//console.log(`Duplicate NFT found: ${itemID}`);
						//console.log(count);

					}
				}
			}

			setCount(count);
			return count;
		} catch (error) {
			// Display error message if getItemsForSale function fails
			alert(error.message);
		
		}
}

async function displayNFTsFeatures() {
	const nftTokenAddress = "0x1632568C5DeA50b5738c6C7bE2786657A9840485";
	const marketplaceAddress = "0xa12A3A4ED947e38Ad0c177799De37DD77F520E62";

	// NEW FUNCTIONALITY 
	const nftContracts = [
		{
			address: "0x1632568C5DeA50b5738c6C7bE2786657A9840485",
			abi: CROCELLSABI,
		},
		{
			address: "0x2e756776A63F936a6010Dd9ee5C5fE77b5E02562",
			abi: CROBADGEABI,
		},
		{
			address: "0x230Bb7ce185CD0042973202f5F38B7072440e2C9",
			abi: ABI,
		},
		{
			address: bdlContract,
			abi: BDLABI,
		},
		{
			address: CroMinionsContract,
			abi: MINIONSABI,
		},
		{
			address: blumiesContract,
			abi: BlumiesABI,
		},
		// add more NFT contracts as needed
	];


	const NFTcontract = new Web3EthContract(CROCELLSABI, CROCELLSCONTRACT);
	const marketplaceContract = new Web3EthContract(testABI, testContract);


	try {
		// Check if user is logged in before calling getItemsForSale
		if (!blockchain.account) {
			// User is not logged in, display error message
			alert("Please log in to continue");
			return;
		}

		// Display notification while we are fetching the NFTs
		const loadingNotification = Swal.fire({
			title: 'Fetching NFTs',
			html: 'Please wait...',
			allowOutsideClick: true,
			didOpen: () => {
				Swal.showLoading();
			}
		});

		for (let i = 0; i < nftContracts.length; i++) {
			const contract = new Web3EthContract(nftContracts.find(nft => nft.address === nftTokenAddress).abi, nftTokenAddress);


			const itemsForSale = await marketplaceContract.methods.getItemsForSale().call({ from: blockchain.account });
			console.log(itemsForSale);
			console.log(itemsForSale.length);
			let forSaleCount = itemsForSale.length;
			setActiveListings(forSaleCount);


			console.log(activeListings);
			const marketplaceItemsDiv = document.getElementById("marketplaceItems");

			itemsForSale.forEach(async item => {
				const itemDiv = document.createElement("div");

				const ListingID = item[0];
				const nftTokenAddress = item[1];
				const NFTtokenID = item[2];
				const seller = item[3];
				const askingPrice = item[4];
				const isSold = item[5];

				// Add the item's metadata and image to the itemDiv
				const content = document.createElement("div");
				content.innerHTML = `
					<p>Listing ID: ${ListingID}</p>
					<p>NFT Token ID: ${NFTtokenID}</p>
					<p>Token Address: ${nftTokenAddress}</p>
					<p>Price: ${askingPrice}</p>
					`;
				itemDiv.appendChild(content);

				// Get the NFT metadata and image URI
				let uri, metadata, image;
				for (let j = 0; j < nftContracts.length; j++) {
					if (nftTokenAddress === nftContracts[j].address) {
						const contract = new Web3EthContract(nftContracts[j].abi, nftTokenAddress);
						uri = await contract.methods.tokenURI(NFTtokenID).call();
						const ipfsURL = addIPFSProxy(uri);
						const request = new Request(ipfsURL);
						const response = await fetch(request);
						metadata = await response.json();
						image = addIPFSProxy(metadata.image);
						break;
					}
				}

				// LETS ADD SOME MORE METADATA HERE SUCH AS THE NAME OF THE NFT ETC.

				

				// Create an <img> element for the NFT image
				const img = document.createElement('img');
				img.src = image;
				itemDiv.appendChild(img);

				// Create a Buy button element
				const buyButton = document.createElement("button");
				buyButton.innerHTML = `
  <span class="custom-icon" width="10px" height="10px">
    <img src="https://i.imgur.com/ItF0nFjs.png" width="10px" height="10px" alt="Custom Icon" />
  </span>
  Buy
`;

				// Create a new instance of the rewards contract
				const rewardsContract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);

				// Define the amount of ether to be sent as a reward
				const rewardAmount = 10;
				// Set the amount of tokens to transfer

				const amount = 100;
				// Convert the amount to wei

				

				// Update the buyItem function to add rewards to rewardBalances
				buyButton.addEventListener("click", async () => {
					try {
						// Call the "buyItem" function on the smart contract to purchase the NFT
						const result = await marketplaceContract.methods.buyItem(item[0]).send({ from: blockchain.account, value: Web3Utils.toWei(askingPrice, 'ether') });

						if (result.status) {
							const currentBalance = rewardBalances[blockchain.account] || 0;
    						const newBalance = currentBalance + 10;
							// Get the current reward balance for the user's account address
							
							// Update the reward balance in the state variable
							setRewardBalances({ ...rewardBalances, [blockchain.account]: newBalance });

							// Display success notification
							Swal.fire({
								icon: 'success',
								title: 'NFT Purchased successfully',
								text: 'You have been rewarded with 10 tokens!',
								showConfirmButton: false,
								timer: 5000
							});
						}
					} catch (error) {
						// Display error message if buyItem function fails
						alert(error.message);
					}
				});



				// Add the Buy button to the itemDiv
				itemDiv.appendChild(buyButton);

				// Check if NFT already exists in the marketplaceItemsDiv
				const existingNFTs = marketplaceItemsDiv.querySelectorAll(
					`div[data-tokenid='${NFTtokenID}']`
				);

				if (existingNFTs.length === 0) {
					// If the NFT does not exist in the marketplaceItemsDiv, add it
					itemDiv.setAttribute("data-tokenid", NFTtokenID);
					marketplaceItemsDiv.appendChild(itemDiv);
				} else {
					// If the NFT already exists in the marketplaceItemsDiv, do not add it
					console.log(`Duplicate NFT found: ${NFTtokenID}`);
				}
			});

		}
		// NEW FUNCTIONALITY 
		Swal.fire({
			title: 'NFTs displayed!',
			text: 'NFTs have been fetched and displayed successfully',
			icon: 'success',
			confirmButtonText: 'Ok'
		});
	} catch (error) {
		// Display error message if getItemsForSale function fails
		alert(error.message);
	}
}

async function displayNFTs() {
	// Show loading spinner while fetching NFTs
	const loadingSwal = Swal.fire({
		title: 'Loading NFTs',
		html: 'Please wait while we fetch your NFTs...',
		icon: 'info',
		allowOutsideClick: false,
		showConfirmButton: false,
		timer: 8000,
		onOpen: () => {
		  Swal.showLoading();
		},
	  });
  
	try {
	
		
	  // Call functions to get NFTs here
	//   getFirstTenBadges();
	//   getFirstTenCells();
	//   getFirstTen();
	//   getMinionsNFTs();
	//   getBdlNFTs();

	// Call functions to get NFTs here
	const firstTenBadges =  getFirstTenBadges();
	
	const firstTenCells = getFirstTenCells();
	const firstTen = getFirstTen();
	const minionsNFTs = getMinionsNFTs();
	const bdlNFTs = getBdlNFTs();
	

	//  Combine the fetched NFTs into a single array
	//  const allNFTs = [
		
	// 	...firstTenCells,
	// 	...firstTen,
	// 	...minionsNFTs,
	// 	...bdlNFTs,
	//   ];

	// //   Set the NFT data state
	//   setNFTData(allNFTs);
	  
	//   console.log(nftData)
	//   console.log(allNFTs);

  
	  // Close the loading spinner when NFTs are fetched successfully
	  await loadingSwal.close();
  
	  // Display success message to user
	  Swal.fire({
		title: 'Success!',
		text: 'NFTs fetched successfully.',
		icon: 'success',
		confirmButtonText: 'Ok',
		allowOutsideClick: false,
		timer: 8000,
		showConfirmButton: false,
	  });
	} catch (error) {
	  // Display error message to user if any of the functions fail
	  Swal.fire({
		title: 'Error',
		text: error.message,
		icon: 'error',
		confirmButtonText: 'Ok',
	  });
	}
}


// REWARDS FUNCTIONS
//-----------------------
const CheckRewards = async () => {

	const loadingSwal = Swal.fire({
		title: 'Loading Balalnces',
		html: 'Please wait while we fetch your Balances...',
		icon: 'info',
		allowOutsideClick: true,
		showConfirmButton: false,
		onOpen: () => {
		  Swal.showLoading();
		},
	  });
	try {
		const rewardsContract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);
		const balance = await rewardsContract.methods.balanceOf(blockchain.account).call();
		const formattedBalance = Math.floor(balance / (10 ** 18)).toString();
		//console.log(`Token balance of User: ${formattedBalance}`);
		setRewards(formattedBalance);
		loadingSwal.close();
		
	} catch (error) {
		console.error(`Error getting token balance: ${error}`);
	}
};

const handleTransferAmountChange = (event) => {
    setTransferAmount(event.target.value);
  };


function addIPFSProxy(ipfsHash) {
		const URL = "https://idm.infura-ipfs.io/ipfs/"
		const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
		const ipfsURL = URL + hash

		//console.log(ipfsURL)
		return ipfsURL
}


const handleTokenTransfer = async () => {
	try {
		console.log("running transfer")
		const RewardsContract = new Web3EthContract(cGoldABI, cGoldContract)
		console.log("Contract connected");



	 
	const transferAmountWei = Web3.utils.toWei(transferAmount.toString(), 'ether');

    // Perform the token transfer logic
    const transferResult = await RewardsContract.methods
      .transfer(toAddress, transferAmountWei)
      .send({ from: blockchain.account });


	  
  
	  // Handle the transfer result
	  console.log('Token transfer successful:', transferResult);
	} catch (error) {
	  console.error('Token transfer failed:', error);
	}
  };
  

  const handleToAddressChange = (event) => {
    setToAddress(event.target.value);
  };



const modalCloseButtons = document.querySelectorAll('.modal-close');
modalCloseButtons.forEach(button => {
	button.addEventListener('click', () => {
		const modal = button.closest('.modal');
		closeModal(modal);
	});
});

const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
	modal.addEventListener('click', event => {
		if (event.target === modal) {
			closeModal(modal);
		}
	});
});

const images = document.querySelectorAll('#marketplaceItems img');
images.forEach(image => {
	const targetSelector = image.dataset.modalTarget;
	if (targetSelector) {
		const targetModal = document.querySelector(targetSelector);
		if (targetModal) {
			image.addEventListener('click', () => {
				targetModal.style.display = 'block';
			});
		}
	}
});

const handleNotification = (message) => {
	setLoading(true);

	setTimeout(() => {
		setLoading(false);
		setNotification(message);

		setTimeout(() => {
			setNotification(null);
		}, 4000);
	}, 2000);
};


// USE EFFECTS
useEffect(() => {
	// Check if the wallet is connected before calling displayNFTs
	if (blockchain.account) {
		





	//   displayNFTs();
	}
  }, [blockchain.account]);
  

useEffect(() => {
	fetchBalance();
}, []);

useEffect(() => {
	console.log('Current reward balance:', rewardBalances);
  }, [rewardBalances]);
  


  useEffect(() => {
	function handleMouseDown(event) {
	  if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
		
	  }
	}


	
  
	document.addEventListener('mousedown', handleMouseDown);
	// Remember to remove event listeners in a cleanup function
	return () => {
	  document.removeEventListener('mousedown', handleMouseDown);
	};
  }, []);

  useEffect(() => {
	if (blockchain.connected && blockchain.account) {
	  // Account information is available after connecting
	  console.log(blockchain.account);
	}
  }, [blockchain.connected, blockchain.account]);

useEffect(() => {
    // Update displayed elements based on activeFeed value
    // Here, you can add your logic to render the appropriate elements
    console.log('Active feed:', activeFeed);
	

    if (activeFeed === 'market') {
      // Perform any logic specific to the Market Feed
      // For example, you can fetch market NFTs here
      displayNFTsFeatures();
    }
  }, [activeFeed]);


   // Load the reward balances from local storage on component mount
   useEffect(() => {
	const encryptedString = localStorage.getItem('rewardBalances');
	if (encryptedString) {
	  try {
		const decryptedBytes = CryptoJS.AES.decrypt(encryptedString, secretKey);
		const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
		const balances = JSON.parse(decryptedString);
		setRewardBalances(balances);
	  } catch (error) {
		console.error('Failed to decrypt and parse rewardBalances:', error);
		// Handle the error gracefully, e.g., display an error message or reset the rewardBalances
		setRewardBalances({});
	  }
	}
  }, []);
  


  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );






  const AccountModal = ({ isOpen, closeModal }) => {
	return (
	  <Modal isOpen={isOpen} onRequestClose={closeModal}>
		 <ModalContent>
          <Card>
            <ModalTitle>Account Information</ModalTitle>
            <Button onClick={updateRewardBalance}>Earn Rewards</Button>
           

            <StyledSidebarItem className="sidebar-item account">
              Account: <SidebarValue>{blockchain.account}</SidebarValue>
            </StyledSidebarItem>
            <StyledSidebarItem className="sidebar-item">
              Current Account Balance:{' '}
              <SidebarValue>
                {balance} $CRO
                <CustomIconWrapper src={CustomIcon} alt="Custom Icon" />
              </SidebarValue>
            </StyledSidebarItem>
			<p>Total Rewards Accrued: {balanceString}</p>
			<CustomIconWrapper src={CustomCgoldIcon} alt="Custom Icon" />
          </Card>

          <Card>
            <CardContent>
              <StyledSidebarHeader>NFTs</StyledSidebarHeader>
              <StyledSidebarItem className="sidebar-item">
                Total NFTs in Wallet: {/* Include the respective state variable */}
              </StyledSidebarItem>
              <StyledSidebarItem className="sidebar-item">
                Total NFTs Listed: <SidebarValue>{activeListings}</SidebarValue>
              </StyledSidebarItem>
              <StyledSidebarItem className="sidebar-item">
                LeaderBoard Position: {/* Include the respective state variable */}
              </StyledSidebarItem>
              <StyledSidebarItem className="sidebar-item">
			  <CustomIconWrapper src={CustomCgoldIcon} alt="Custom Icon" />
                Total Balance:{' '}
                <SidebarValue className="green">
                  {Rewards} $cGOLD
                 
                </SidebarValue>
              </StyledSidebarItem>
              <Button
                onClick={() => {
                  fetchBalance();
                  fetchData();
                  getNFTsCount();
                  CheckRewards();
                }}
              >
                Get Balances
              </Button>
            </CardContent>
          </Card>

		  <Card>
            <CardContent>
              <StyledSidebarHeader>$CGOLD Token Transfer</StyledSidebarHeader>
              <StyledSidebarItem className="sidebar-item">
                <label htmlFor="transferAmount">Transfer Amount:</label>
                <input
                  type="text"
                  id="transferAmount"
                  value={transferAmount}
                  onChange={handleTransferAmountChange}
                />
              </StyledSidebarItem>
              <StyledSidebarItem className="sidebar-item">
                <label htmlFor="toAddress">To Address:</label>
                <input
                  type="text"
                  id="toAddress"
                  value={toAddress}
                  onChange={handleToAddressChange}
                />
              </StyledSidebarItem>
              <Button onClick={handleTokenTransfer}>Transfer Tokens</Button>
            </CardContent>
          </Card>
        </ModalContent>
	  </Modal>
	);
  };

  return (
	<><>
	
	  </>
	  <Wrapper ref={wrapperRef}>
	  <Card>
		<CardContent>
		<HeaderTitle>
		</HeaderTitle>
		</CardContent>
	</Card>
		
	  

			  <Sidebar>
			  

				  <SidebarWrapper>
					  <img class="logo-img" src={logokitchen}></img>
					  <Navbar activeListings={activeListings} >
		</Navbar>

					  <Snackbar
						  open={open}
						  autoHideDuration={6000}
						  onClose={handleClose}
						  message="Note archived"
						  action={action} />

					  {/* ADD LOGO RIGHT HERE
    make it small 10x10
    */}
					  {/* Add account-related components and functionality here */}
					  {blockchain.account ? (
						  <div>

							  <Tooltip title="Account Information"><BigWhiteButton onClick={handleModalOpen}>
								  <FaUserCircle />
							  </BigWhiteButton>
							  </Tooltip>


							  <Tooltip title="Disconnect Wallet">
								  <BigWhiteButton>
									  <VscDebugDisconnect onClick={handleDisconnect} />
								  </BigWhiteButton>
							  </Tooltip>

							  <Tooltip title="Switch Feeds">
								  <BigWhiteButton><TiFlowSwitch onClick={handleSwitchFeed} />


								  </BigWhiteButton>
							  </Tooltip>

							  <Tooltip title="Go Back to Top of Page"><BigWhiteButton>
								  <AiOutlineVerticalAlignTop onClick={handleBackToTop} />
							  </BigWhiteButton>
							  </Tooltip>
							  <Tooltip title="Switch To Ethereum(Soon)"><BigWhiteButton>
								  <FaEthereum disabled />
							  </BigWhiteButton>
							  </Tooltip>

							  <a target="_blank" href="http://Twitter.com/@CroCryptoClub"><BigWhiteButton>
								  <AiFillTwitterCircle />
							  </BigWhiteButton>  </a>
							  <a target="_blank" href="https://discord.gg/RgyfqGnaGE"><BigWhiteButton>
								  <FaDiscord />
							  </BigWhiteButton>  </a>
							  <BigWhiteButton>
						  <a target="_blank" href="https://medium.com/@crooksofcronos"><FaMedium /> </a>
					  </BigWhiteButton>
					  <BigWhiteButton>
						  <a target="_blank" href="https://t.me/crooksofcronos"><FaTelegram /> </a>
					  </BigWhiteButton>
					  <BigWhiteButton>
						  <FcAbout onClick={openModal} />
					  </BigWhiteButton>
					  

							  <DisabledButton disabled>Appraise NFTs</DisabledButton>

							  {/* Add other account-related options */}



						  </div>
					  ) : (
						  <div>
							  <Tooltip title="Connect Wallet">
								  <BigWhiteButton>
									  <AiOutlineLogin onClick={handleConnect} />
								  </BigWhiteButton>
							  </Tooltip>
							  
						  </div>
					  )}



					  
					  {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
					  <MarketplaceModal isOpen={modalOpen} closeModal={closeModal} />
				  </SidebarWrapper>
			  </Sidebar>
			  <MainContent>
				  
				  <Content>
					  <AccountModal isOpen={modal2Open} closeModal={handleModalClose} />


					  <StyledCard>
      {!blockchain.account ? (
        <StyledHeading>Connect your wallet</StyledHeading>
      ) : activeFeed === 'nft' ? (
        <StyledHeading>NFT Feed</StyledHeading>
      ) : activeFeed === 'market' ? (
        <StyledHeading>Market Feed</StyledHeading>
      ) : (
        <StyledHeading>Please Connect Your Wallet!</StyledHeading>
      )}
    </StyledCard>

					  <Feed>

						  <>
							  <NFTContainer>
								  {activeFeed === "nft" && !isNFTCollapsed ? (
									  <div id="nftid" style={{ display: isNFTCollapsed ? 'none' : 'block' }}>
										  {/* Render NFT cards or content here */}
									  </div>
								  ) : activeFeed === "market" && isNFTCollapsed ? (
									  <div id="marketplaceItems">
										  {/* Render marketplace NFTs dynamically */}
									  </div>
								  ) : null}
							  </NFTContainer>


						  </>
					  </Feed>
					  {blockchain.account ? (<button onClick={handleNextClick}>Next</button>
					  ) : (<></>)}

				  </Content>
			  </MainContent>
		  </Wrapper></>
  );
};




export default Marketplace;