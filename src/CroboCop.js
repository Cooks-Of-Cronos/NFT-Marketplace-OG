import Web3Modal from "web3modal";
	import WalletConnectProvider from "@walletconnect/web3-provider";
	import WalletLink from "walletlink";
	import React, { useEffect, useState, useRef } from "react";
	import Web3EthContract, { Contract } from "web3-eth-contract";
	import styled from 'styled-components';
	import { testABI } from './components/TestComp.js';
	import { testContract } from './components/TestComp.js';
	import { Spinner } from "react-bootstrap";
	import NFTMarketPlaceLeaderboard from "./components/Leaderboard.js";
	import Analytics from "./Analytics.js";
	import MintedRewardedTotalVolume from "./components/MintedRewardedTotalVolume";
	import Statistics from "./pages/CroboColl";
	import GetStats from "./pages/getStatus";
	import InfoSection from "./pages/SectionForInfo";
	import { REWARDSABI } from './mint';
	import { REWARDSCONTRACT } from './mint';
	import { useDispatch, useSelector } from "react-redux"
	import { CROCELLSABI } from './mint';
	import { CROBADGEABI } from './mint';
	import getBadgeNFTs from './components/getBadgeNFTs';
	import getCellNFTs from './components/getCellNFTs';
	import { Jumbotron } from 'styled-jumbotron-component';
	import './styles/market.css';
	import ReactDOM from 'react-dom';
	import $ from 'jquery';
	import { fetchData } from "./redux/data/dataActions";
	import { DISCONNECT_FAILED, disconnectFailed, disconnect, connect, isConnected } from "./redux/blockchain/blockchainActions";
	import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
	import getTest  from './components/TestComp.js';
	import addItemToMarket from './components/TestComp.js';
	import { store, ReactNotification, NotificationContainer, NotificationManager } from 'react-notifications';
	import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
	import NFTab from './Tabs';

	import NFTTransaction from "./components/NFTTransaction";
	import Footer from './Footer';
	import NFTMintingPage from './Test.js';
	import Web3 from 'web3';
	//import { providerOptions } from './provider/providerOptions';

	// ES6 Modules or TypeScript
	import Swal from 'sweetalert2';

import { useWeb3React } from "@web3-react/core";

import { DeFiWeb3Connector } from 'deficonnect'
import CroboCopImage from './images/CroboCop.gif';
import CroboCopCarImage from './images/CroboCopCar.gif';
import CroboCopCarcImage from './images/CroboCopc.gif';
import CroboCopNFT from './images/CroboCopNFT.gif';
import CroboCopNFT2 from './images/CroboCopNFT2.gif';
import CroboCopNFT3 from './images/CroboNFT3.gif';


import Peak1 from './images/SneakPeeks/peak1.png';
import Peak2 from './images/SneakPeeks/peak2.png';
import Peak3 from './images/SneakPeeks/peak3.png';
import Peak4 from './images/SneakPeeks/sneak1.jpg';
import Peak5 from './images/SneakPeeks/peak5.png';
import Peak6 from './images/SneakPeeks/sneak2.jpg';



import { Modal } from 'react-bootstrap';
import logo from './images/logo.png';
import './styles/Crobo.css';
import 'react-notifications-component/dist/theme.css';
import vec from './images/vec.mov';

import { providerOptions } from './provider/providerOptions';

import Snackbar from '@material-ui/core/Snackbar';


import {  TextField } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Grid,
	Typography,
} from "@material-ui/core";

// UNUSED IMPORTS 

const CROBOABI = [
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
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
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
	}
]

const CROBOCONTRACT = "0x646f4afb0cea2fab3c44282bd764a91637d7781d"
const NFTCONTRACT = "0x230Bb7ce185CD0042973202f5F38B7072440e2C9";



// Custom styles for Material-UI components
//------------------------------------------
const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
	loginButton: {
		margin: theme.spacing(2),
	},
	nftGrid: {
		margin: theme.spacing(2),
	},
	logo: {
		height: "auto",
		maxWidth: "50%",
		border: "3px solid #ccc",
		borderRadius: "10px",
	  },
}));




// VARIABLES 
//----------
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





// MAIN PAGE FUNCTION
//----------------------
const CroboCop = () => {
	const [showModal, setShowModal] = useState(false);
	const [account, setAccount] = useState("");
	const [smartContract, setSmartContract] = useState(null);
	const [connector, setConnector] = useState(null);
	const [balances, setBalances] = useState({});
	const [userNfts, setUserNfts] = useState([]);
	const [listedNfts, setListedNfts] = useState([]);
	const [selectedNft, setSelectedNft] = useState(null);
	const [sellPrice, setSellPrice] = useState('');
	const blockchain = useSelector((state) => state.blockchain);
	const data = useSelector((state) => state.data);
	const dispatch = useDispatch();
	const [sellTokenId, setSellTokenId] = useState(null);
	const [isConnected, setIsConnected] = useState(false);


	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);
	const [notificationMessage, setNotificationMessage] = useState("");


	const [mintAmount, setMintAmount] = useState(1);
	const [claimingNft, setClaimingNft] = useState(false);
	const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);

	const [nftMinted, setNftMinted] = useState(0);
	const [totalNft, setTotalNft] = useState(10);
	const [contractBalance, setContractBalance] = useState(0);
	const [totalFundsNeeded, setTotalFundsNeeded] = useState(100);
	const [Progress, setProgress] = useState(0);
	const [TotalSupply, setTotalSupply] =  useState(0);
	const [MaxSupply, setMaxSupply] = useState(0);

	const [CONFIG, SET_CONFIG] = useState({
		CONTRACT_ADDRESS: "",
		SCAN_LINK: "",
		NETWORK: {
			NAME: "",
			SYMBOL: "",
			ID: 0,
		},
		NFT_NAME: "",
		SYMBOL: "",
		MAX_SUPPLY: 1,
		WEI_COST: 0,
		DISPLAY_COST: 0,
		GAS_LIMIT: 0,
		MARKETPLACE: "",
		MARKETPLACE_LINK: "",
		SHOW_BACKGROUND: false,
	});

	const classes = useStyles();



	const claimNFTs = async () => {
		const cost = CONFIG.WEI_COST;
		const gasLimit = CONFIG.GAS_LIMIT;
		const totalCostWei = String(cost * mintAmount);
		const totalGasLimit = String(gasLimit * mintAmount);
	  
		Swal.fire({
		  title: "Are you sure?",
		  text: `You will spend ${totalCostWei} Wei and ${totalGasLimit} Gas limit to mint ${mintAmount} ${CONFIG.NFT_NAME} NFTs.`,
		  icon: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#3085d6",
		  cancelButtonColor: "#d33",
		  confirmButtonText: "Yes, mint it!",
		}).then((result) => {
		  if (result.isConfirmed) {
			setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
			setClaimingNft(true);
			blockchain.smartContract.methods
			  .mint(mintAmount)
			  .send({
				gasLimit: String(totalGasLimit),
				to: CONFIG.CONTRACT_ADDRESS,
				from: blockchain.account,
				value: totalCostWei,
			  })
			  .once("error", (err) => {
				console.log(err);
				setFeedback("Sorry, something went wrong please try again later.");
				setClaimingNft(false);
			  })
			  .then((receipt) => {
				console.log(receipt);
				setFeedback(
				  `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Crosea.io to view it. Be sure to Check the Discord for Detailed Guides!`
				);
				setClaimingNft(false);
				dispatch(fetchData(blockchain.account));
			  });
		  }
		});
	  };
	

	//CONNECT USER TO DAPP
	//---------------------

	//---------------------
	const logout = () => {
		setAccount("");
		setSmartContract(null);
		setConnector(null);
	};



	// CONNECT TO PROVIDER - DAPP
	//------------------------

	//-------------------------

	/*
	const connect = async () => {
		try {
			NotificationManager.info('Loading Metamask Wallet', 'Please Confirm Wallet Connection In Metamask');
			handleNotification("Loading Metamask Wallet");

			if (window.ethereum) {
				// Request account access
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const web3 = new Web3(window.ethereum);
				const accounts = await web3.eth.getAccounts();
				const account = accounts[0];
				console.log(blockchain.account);
				console.log("Connected to account:", account);
				store.addNotification({
					title: "Connected!",
					message: "Successfully connected to MetaMask",
					type: "success",
					container: "top-right",
					animationIn: ["animate__animated", "animate__fadeIn"],
					animationOut: ["animate__animated", "animate__fadeOut"],
					dismiss: {
						duration: 0,
						onScreen: true,
						showIcon: true,
					},
					width: 400,
					insert: "top",
					backgroundColor: "#4BB543",
					color: "#FFFFFF",
				});
				return account;
			} else {
				console.log("Please install MetaMask");
			}
		} catch (error) {
			console.error(error);
			if (error.code === 4001) {
				// User rejected the request
				NotificationManager.error('User Rejected');
			} else {
				console.log("Error connecting to provider");
				NotificationManager.error('Error connecting to provider');
			}
		}
		
	};

*/

	async function connectdots() {
		// handleNotification("Connecting to Defi");
		const loadingSwal = Swal.fire({
			title: 'Connecting',
			html: 'Opening Defi Wallet',
			icon: 'info',
			allowOutsideClick: true,
			showConfirmButton: false,
			onOpen: () => {
			  Swal.showLoading();
			},
		  });
		  try {
			const connector = new DeFiWeb3Connector({
			display: {
				logo: "",
				name: "Defi Wallet",
				description: "Connect to your Defi Wallet account"
			},
			supportedChainIds: [1, 25],

			rpc: {
				1: 'https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a',
				25: "https://evm.cronos.org/", // cronos mainet
			},
			pollingInterval: 15000,
		})
			connector.activate()
				.catch(error => NotificationManager
				.error('User Rejected'))
			loadingSwal.close()
		  } catch (error) {
			console.error(`Error Connecting ${error}`);
			}


		

	}

	//DISCONNECT FROM DAPP
	//------------------------

	//-------------------------
	const disconnect = async () => {
		try {
			if (window.ethereum) {
				window.ethereum = null;
				setAccount = null;
				window.location.reload();

				setisConnected(false);
				console.log("Disconnected from MetaMask");
				window.close();

			}
		} catch (error) {
			console.error(error);
			console.log("Error disconnecting from provider");
		}
	};


	async function mintNFT(amount) {
		handleNotification("Loading");

		const contract = new Web3EthContract(CROBOABI, "0x9294eA5cd74956fA4E67BDBA5de5D32E77548A12");
		const web3 = new Web3(window.ethereum);
		const accounts = await web3.eth.getAccounts();
		const BN = web3.utils.BN;
		const cost = '500';


		//const mintCost = web3.utils.toWei((amount * cost).toString(), "ether");
		const mintCost = web3.utils.toWei(cost, "ether");

		console.log("Minting NFT...");
		NotificationManager.info("Minting NFT...");

		console.log(`Amount: ${amount}`);
		console.log(`Mint Cost: ${mintCost}`);
		console.log(`From Account: ${accounts[0]}`);

		try {
			const result = await contract.methods.mint(1).send({
				from: accounts[0],
				value: mintCost
			});

			console.log(`${amount} NFT(s) minted successfully!`);
			console.log(result);
			NotificationManager.info("NFT(s) minted successfully");
		} catch (error) {
			console.error("Failed to mint NFT:", error);
			NotificationManager.error("Failed to mint NFT:", error);
		}
	}

	async function mintNFT2(amount) {
		const contract = new Web3EthContract(CROBOABI, "0x9294eA5cd74956fA4E67BDBA5de5D32E77548A12");
		const web3 = new Web3(window.ethereum);
		console.log(contract);
		console.log(web3);
		const account = web3.currentProvider.selectedAddress;
		const mintCost = web3.utils.toWei((amount * cost).toString(), "ether");
		NotificationManager.info("Minting NFT...");
		try {
			const receipt = await contract.methods.mint(amount).send({
				from: account,
				value: mintCost
			});

			console.log(`${amount} NFT(s) minted successfully! Transaction receipt:`, receipt);
			NotificationManager.info("NFT(s) minted successfully");
		} catch (error) {
			console.error("Failed to mint NFT:", error);
			NotificationManager.error("Failed to mint NFT:", error);
		}
	}

	/*
	const claimNFTs = () => {
		const smartContract = new Web3EthContract(CROBOABI, "0x9294eA5cd74956fA4E67BDBA5de5D32E77548A12");
		let cost = CONFIG.WEI_COST;
		let gasLimit = CONFIG.GAS_LIMIT;
		let totalCostWei = String(cost * mintAmount);
		let totalGasLimit = String(gasLimit * mintAmount);
		NotificationManager.info("Minting NFT...");

		console.log("Cost: ", totalCostWei);
		console.log("Gas limit: ", totalGasLimit);
		setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
		setClaimingNft(true);
		smartContract.methods
			.mint(mintAmount)
			.send({
				gasLimit: String(totalGasLimit),
				to: CONFIG.CONTRACT_ADDRESS,
				from: account[0],
				value: totalCostWei,
			})
			.once("error", (err) => {
				console.log(err);
				setFeedback("Sorry, something went wrong please try again later.");
				setClaimingNft(false);
			})
			.then((receipt) => {
				console.log(receipt);
				setFeedback(
					`WOW, the ${CONFIG.NFT_NAME} is yours! go visit Crosea.io to view it. Be sure to Check the Discord for Detailed Guides!`
				);
				setClaimingNft(false);
				dispatch(fetchData(blockchain.account));
			});
	};
	*/



	//LOAD SMART CONTRACT DATA
	//------------------------

	//-------------------------

	const loadNfts = async () => {
		// Use your own code to load NFTs here
		setUserNfts([
			{ tokenId: 1, name: 'NFT 1', description: 'This is NFT 1' },
			{ tokenId: 2, name: 'NFT 2', description: 'This is NFT 2' },
			{ tokenId: 3, name: 'NFT 3', description: 'This is NFT 3' }
		]);
	}

	const loadAccount = async () => {
		try {
		const web3Modal = new Web3Modal({
			network: 'localhost',
			providerOptions,
		});
		const provider = await web3Modal.connect();
		const web3 = new Web3(provider);
		const accounts = await web3.eth.getAccounts();

			setAccount(accounts[0]);
		} catch (error) {
			NotificationManager.error('User Rejected');
		}
	}

	useEffect(() => {
		loadNfts();
		loadAccount();
	}, []);

	const getData = () => {
		if (blockchain.account !== "" && blockchain.smartContract !== null) {
			dispatch(fetchData(blockchain.account));
		}
	};


	// HANDLE METADATA LINKS/FETCH


	//------------------
	function addIPFSProxy(ipfsHash) {
		const URL = "https://idm.infura-ipfs.io/ipfs/"
		const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
		const ipfsURL = URL + hash

		console.log(ipfsURL)
		return ipfsURL
	}


	//VARIABLES


	// -------------
	const [showBetaWarning, setShowBetaWarning] = useState(true);

	

	useEffect(() => {
			getData();
		}, [blockchain.account]);

	// NFTS FOR SALE 



	// -------------

	const NFTs = [
		{
			id: 1,
			name: 'CroBoCop 3D Character NFT',
			description: "Get ready to add a one-of-a-kind CroCop character to your collection! These limited-edition NFTs feature a range of unique designs and styles, each showcasing the iconic look of the CroCop police force. Whether you're a fan of the classic 80s cartoon aesthetic or prefer a more futuristic, sci-fi vibe, there's a CroCop character that's perfect for you. But that's not all - as a proud owner of a CroCop NFT, you'll also gain exclusive access to our upcoming Metaverse experience, where you can explore a fully- realized virtual world and interact with other members of the community.Plus, as we continue to expand the CroCop universe, your NFT may unlock additional perks and bonuses in the future - so don't miss out on this exciting opportunity to become a part of the CroCop legacy!",
			price: '500 CRO',
			image: CroboCopNFT2 ,
		}
		
	];

	const decrementMintAmount = () => {
		let newMintAmount = mintAmount - 1;
		if (newMintAmount < 1) {
			newMintAmount = 1;
		}
		setMintAmount(newMintAmount);
	};

	const incrementMintAmount = () => {
		let newMintAmount = mintAmount + 1;
		if (newMintAmount > 10) {
			newMintAmount = 10;
		}
		setMintAmount(newMintAmount);
	};


	const [quantity, setQuantity] = useState(1);

	const incrementQuantity = () => {
			setQuantity(quantity + 1);
		};

	const decrementQuantity = () => {
			if (quantity > 1) {
				setQuantity(quantity - 1);
			}
	};


	const getConfig = async () => {
		const configResponse = await fetch("/config/config.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		const config = await configResponse.json();
		SET_CONFIG(config);
	};

	useEffect(() => {
		getConfig();
	}, []);


	const [notification, setNotification] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleNotification = (message) => {
		setLoading(true);
		NotificationManager.info("Loading");

		setTimeout(() => {
			setLoading(false);
			setNotification(message);

			setTimeout(() => {
				setNotification(null);
			}, 1000);
		}, 1000);
	};
	
	useEffect(() => {
		// fetch contract balance here
		setContractBalance(3);
	}, []);

	




// Load First Ten NFTs
const getFirstTen = () => {
	setStartIndex(startIndex + 0);
	getNFTs(startIndex + 0);
};

	const [startIndex, setStartIndex] = useState(0);

	async function getNFTs(startIndex) {
		const contract = new Web3EthContract(CROBOABI, CROBOCONTRACT)
		const address = blockchain.account;
		//userNfts, setUserNfts


		let totalNFTs = 0;
		let nfts = [];



		// Get the total number of NFTs held by the user
		totalNFTs = await contract.methods.balanceOf(address).call();
		//console.log('totalNFTs:', totalNFTs);
		// Loop through all of the NFTs held by the user
		setUserNfts(totalNFTs);
		console.log(userNfts);



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
			let content = `
			<div class="row justify-content-center">
			  <div class="col-md-4">
				<div class="carnft-wrapper">
				  <div class="cardnft">
					<img src="${image}" class="cardnft-img-top" width="100%" height="auto" />
					<div class="cardnft-body">
					  <h5 class="cardnft-title">${metadata.name}</h5>
				  
							<div class="form-group">
							
									  </div>
					  <button type="button" class="btn btn-primary stake-btn zoom" >View on Tofu</button>
									
									
					</div>
				  </div>
				</div>
			  </div>
			</div>

							  <style>
				.cardnft-wrapper {
  width: 100%;
  max-width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
}
.cardnft {
  background-color: #fff;
  border: 2px solid #1f87f5;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  flex-grow: 1;
  height: 100%;
}

  .cardnft-title {
	font-size: 24px;
	font-weight: 700;
	margin-bottom: 10px;
  }

  .cardnft-text {
	font-size: 16px;
	margin-bottom: 20px;
  }

  .cardnft-img-top {
	height: 100%;
	max-width: 100%;
	object-fit: cover;
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

				  #stakeBtn, #unstakeBtn, #claimBtn {
					position: relative;
				  }

				  #stakeBtn:after, #unstakeBtn:after, #claimBtn:after {
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

				  #stakeBtn.loading:after, #unstakeBtn.loading:after, #claimBtn.loading:after,
				</style>
			</div>
			`;

			document.getElementById("nftid").innerHTML += content;

			// Add event listener to stake buttons
			document.querySelectorAll('.stake-btn').forEach(btn => {
				btn.addEventListener('click', async event => {
					const tokenId = event.target.dataset.tokenid;
					const askingPriceInput = document.getElementById('askingPriceInput');
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
		setUserNfts(nfts);


	}






	const handleConnect = async () => {
		// if (isUserLoggedIn()) {
		//   getFirstTenBadges();
		//   getFirstTenCells();
		//   getFirstTen();
		//   getMinionsNFTs();
		//   getBdlNFTs();
		//   console.log("User is logged in")
		// } else {
		//   // Prompt the user to connect first
		//   console.log("need to log in")
		// }
		try {
			await dispatch(connect());
			connectSuccess({ account: blockchain.account }); // Call connectSuccess with the account address
			console.log("Connected:", account);
		// Display success notification
		Swal.fire({
			icon: 'success',
			title: 'Connected successfully',
			showConfirmButton: false,
			timer: 1500
		});
		  } catch (err) {
			console.log("Connection failed:", err);
		  }

		
	  }

	const connectSuccess = (payload) => {
		return {
		  type: "CONNECTION_SUCCESS",
		  payload: payload,
		  onSuccess: () => {
			getFirstTen();
		  }
		};
	  };
	  









	/*
	 * 
	 * 
	 * START RETURNED DATA
	 * 
	 * To Study:
	 * Render VS. Return 
	 * Props
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * */

 async function updateProgress() {
		try {
			const contract = new Web3EthContract(CROBOABI, CROBOCONTRACT);
			const maxSupply = await contract.methods.maxSupply().call();
			const totalSupply = await contract.methods.totalSupply().call();
			const progress = (totalSupply / maxSupply) * 100;

			setProgress(progress);
			setTotalSupply(totalSupply);
			setMaxSupply(maxSupply)
			console.log(progress)
			console.log(totalSupply);
		} catch (error) {
			console.error(error);
		}
	}






	updateProgress()







	return (

		<div>


			<div className="notification-wrapper">
				<NotificationContainer position="top-center" contentClassName="custom-notification" />





			</div>
			
			<div className="notification-wrapper">
				<NotificationContainer position="top-center" contentClassName="custom-notification" />





			</div>


			{/* <button onClick={() => handleNotification("")}>Show Notification</button> */}
			{showBetaWarning && (
				<div style={{ height: "60%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", zIndex: 2 }}>
					<div style={{ backgroundColor: "#f5f51f", padding: "2em", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", width: "80%" }}>
						<h3 style={{ textAlign: "center", marginBottom: "1em" }}>Beta Warning</h3>
						<p style={{ textAlign: "center", marginBottom: "1em" }}>This app is currently in beta stages and users should be aware of potential bugs or issues while utilizing certain features.</p>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<button style={{ padding: "0.5em 1em", borderRadius: "5px", backgroundColor: "#1f87f5", color: "#fff", fontWeight: "bold", cursor: "pointer" }} onClick={() => setShowBetaWarning(false)}>Close</button>
						</div>
					</div>
				</div>
			)}
			<div class="navbarHome">
						<div class="navbar-left">
							<a href="/"><img src="https://i.imgur.com/ItF0nFj.png" alt="Logo" /></a>
							</div>
						<div class="home-bar">

                            
							<a href="/"><img src="https://i.imgur.com/ItF0nFj.png" alt="Logo" /></a>
                            <Typography variant="h4" gutterBottom>
                            Welcome to 3C's
                        </Typography>
                        <div class="barButtons"><button onClick={() => window.open("#/CroBoCop", "_blank")}>Mint</button>
                        </div>
							
							
							
						<div>
                                <ul>
                                    <li>
                                        
									{blockchain.smartContract ? (
									<p>Connected as {blockchain.account}</p>
								) : (
									<button onClick={async () => {
										Swal.fire({
										  title: 'Connecting...',
										  allowOutsideClick: false,
										  didOpen: async () => {
											try {
											  await dispatch(connect());
											  handleConnect();
											  getFirstTen();
											  
											} catch (error) {
											  console.log(error);
											  Swal.fire({
												icon: 'error',
												title: 'Oops...',
												text: 'Connection failed. Please try again!',
											  });
											}
										  },
										});
									  }}>
										Connect
									  </button>
									  
								)}
                                            
                                        
                                    </li>
                                </ul>
                            </div>
						</div>
					</div>
			
			

			
			<div className="intro-section">
				<div className="header">
					<img src={logo} alt="Logo" className="logomain" />
					
				</div>
				<div className="intro-content">
					<div className="intro-text">
						<h2>Introducing the 2023 NFT Kickoff Collection</h2>
						<p>Welcome to the "CroBoCops" 2023 Kickoff Collection, where you can mint your very own unique NFTs featuring Robocop-themed police officers. Show your support for law enforcement and sci-fi enthusiasts alike by owning a piece of this exciting new collection. With each NFT offering distinct characteristics and abilities, you won't want to miss the chance to add a "CroBoCop" to your digital collection.</p>
					</div>
					<div className="intro-video">
						<iframe width="560" height="315" src="https://www.youtube.com/embed/No9e64-Yh6I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
						
						
					</div>
				</div>
			</div>
			
			<header>
				<div className="notification-wrapper">


					<NotificationContainer position="top-center" contentClassName="custom-notification"
						timeout={1000} // set timeout to 3 seconds
					/>
				</div>


					<img src={logo} alt="Logo" />
				
					{isConnected ? (
						<div>
						<p>Connected with address: {account}</p>
						<button onClick={disconnect}>Disconnect</button>
						</div>
					) : (
						<div>
							<Button variant="contained" color="orange" onClick={(e) => {
								e.preventDefault();
								dispatch(connect());
								getData();
								updateProgress();
							}}>
									Connect to MetaMask
							
							</Button>
							<Button variant="contained" color="primary" onClick={connectdots}>
								Connect to Defi
							</Button>
						</div>
					)}


				
			</header>

			<div class="header">
				<img src="https://i.imgur.com/SAFRYt7.png" alt="Check Stats" class="logo"></img>
			</div>
			<section className={classes.logo}>
				<img src="https://i.imgur.com/7Fm6G1g.gif" height="250px" width="150px" alt="Check Stats" class="logo"></img>
				<div id="nftid"></div>

				<h2 className="section-title">CroboCop NFT Mint Progress</h2>
				<div className="progress-bar-wrapper">
					<div
						className="progress-bar"
						style={{ width: `${(TotalSupply / MaxSupply) * 100}%` }}
						role="progressbar"
						aria-valuenow={TotalSupply}
						aria-valuemin="0"
						aria-valuemax={MaxSupply}
					>
						<span className="progress-bar-text">{`${((TotalSupply / MaxSupply) * 100).toFixed(2)}%`}</span>

					</div>
				</div>

				<button className="mint-button" onClick={claimNFTs}>Mint NFT</button>
				<button className="mint-button" onClick={getFirstTen}>Show NFTs</button>
				
				
			</section>
			<section className={classes.logo}>
				<img src="https://i.imgur.com/GRWYV9D.png" height="250px" width="150px" alt="Check Stats" class="logo"></img>
				<div id="nftid"></div>

				
				<div><h2 className="section-title">LP Initializer Fund Progress</h2>
				<div className="progress-bar-wrapper">
					<img src="https://i.imgur.com/7Fm6G1g.gif" height="250px" width="150px" alt="Check Stats" class="logo"></img>
					<div
						className="progress-bar"
						style={{ width: `${(contractBalance / totalFundsNeeded) * 100}%` }}
						role="progressbar"
						aria-valuenow={contractBalance}
						aria-valuemin="0"
						aria-valuemax={totalFundsNeeded}
					>
						<span className="progress-bar-text">{`${(contractBalance / totalFundsNeeded) * 100}%`}</span>
					</div>
				</div>
				<p className="funds-needed">Total funds needed: {totalFundsNeeded}</p>
				<p className="contract-balance">Contract balance: {contractBalance}</p></div>
				
			</section>
				
			<div class="header">
				<img src="https://i.imgur.com/uJ95M3t.png" alt="Mint NFTs" class="logo"></img>
			</div>
			<div className="gridContainer">
				<Grid container spacing={4}>
					{NFTs.map((nft) => (
						<Grid item xs={12} sm={6} md={4} key={nft.id}>
							<Card className="Card" style={{ backgroundColor: "red" }} >
								<CardActionArea>
									<CardMedia
										component="img"
										alt={nft.name}
										
										className="card-image"
										image={nft.image}
										title={nft.name}
										style={{ objectFit: 'cover', color: "white" }}
									/>
									<CardContent style={{ color: 'white' }}>
										<Typography gutterBottom variant="h5" component="h2">
											{nft.name}
										</Typography>
										<Typography variant="body2" component="p">
											{nft.description}
										</Typography>
										<Typography variant="h6" >
											Price: {nft.price}
										</Typography>
									</CardContent>

								</CardActionArea>
								<CardActions style={{ color: 'white' }}>
									<Button size="small" color="primary" onClick={decrementQuantity}>
										-
									</Button>
									<Typography>{quantity}</Typography>
									<Button size="small" color="primary" onClick={incrementQuantity}>
										+
									</Button>
									<Button onClick={claimNFTs}>
										Buy now
									</Button>
									<a target="_blank" href="https://cooks-of-cronos.github.io/Cronos-Crooks-NFT/crobocop.html"><Button size="small" color="primary" >
										Learn more
									</Button></a>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
				<Modal show={showModal} onHide={handleCloseModal}>
					<Modal.Header closeButton>
						<Modal.Title>Modal Title</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Modal body text goes here.</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseModal}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>


			</div>

			<div className="roadmap-section">
				<div class="header">
					<img src="https://i.imgur.com/vTfurwl.png" alt="Roadmap" class="logo"></img>
</div>

				<div className="roadmap-content">
					<div className="roadmap-column">
						<div className="card">
							<img src="https://media.tenor.com/q1k29R6nfz8AAAAd/robo-cop-movie-poster.gif" alt="Roadmap Image 1" className="roadmap-image" />
							<div className="card-overlay">
								<h3>Phase 1: Kickoff Launch</h3>
								<ul>
									<li>CroBo Cop NFT Launch - 3/1</li>
									<li>CroBo Cop NFT Airdrops - DAO</li>
									<li>CroBo Cop NFT Airdrops - Stakers</li>
									<li>Ethereum NFT Giveaways Bonus Entries </li>
									<li>3D Crook NFT Conversions - DAO</li>
									<li>30% Minted - Mystery Blue Chip NFT Giveaway</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="roadmap-column">
						<div className="card">
							<img src="https://media.tenor.com/mIPp0cECcnUAAAAC/robo-cop-dead-or-alive.gif" alt="Roadmap Image 2" className="roadmap-image" />
							<div className="card-overlay">
								<h3>Phase 2:</h3>
								<ul>
									<li>CroBo Cruzer NFT Launch - 3/3</li>
									<li>CroBo Cruzer NFT Airdrops - DAO</li>
									<li>CroBo Cruzer NFT Airdrops - Stakers</li>
									<li>Gaming Competitions + Crypto Prizes</li>
									<li>Staking Multiplier Added for Cop Holders</li>
									<li>NFT Marketplace Raffles Start - Bonus Entries</li>
									<li>60% Minted - 1500 $CRO (Minters Only)</li>
								</ul>
								<p>Smart contract development and deployment on the Ethereum blockchain</p>
							</div>
						</div>
					</div>
					<div className="roadmap-column">
						<div className="card">
							<img src="https://media.tenor.com/7cdJbHWR-ZcAAAAd/robocop-robocop-ed209.gif" alt="Roadmap Image 3" className="roadmap-image" />
							<div className="card-overlay">
								<h3>Phase 3: Royalty Distribution</h3>
								<ul>
									<li>Royalties Smart Contract Deploy</li>
									<li>NFT Multipliers Initiated - Staking x1.5</li>
									<li>CroBo Cruiser 3D OBJ - Airdrop</li>
									<li>Gaming Competitions</li>
									</ul>
							</div>
						</div>
					</div>
					
					<div className="roadmap-column">
						<div className="card">
							<img src="https://media.tenor.com/jF-19rkyXc4AAAAC/robocop.gif" alt="Roadmap Image 4" className="roadmap-image" />
							<div className="card-overlay">
								<h3>Phase 4</h3>
								<ul>
									<li>80% Minted - HUGE 10,000 CRO Giveaway</li>
									<li>NFT Multiplier Initiated - Staking x2</li>
									<li>CroBoCop 3D OBJ - Airdrop</li>
									<li>Gaming Competitions</li>
									<li>Staking Multiplier Adding</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="roadmap-column">
						<div className="card">
						<img src="https://media.tenor.com/xEMr27UdEP8AAAAd/robocop-walking.gif" alt="Roadmap Image 5" className="roadmap-image" />
						<h3>Phase 5</h3>
							<ul>
								<li>80% Minted - HUGE 10,000 CRO Giveaway</li>
								<li>Expansion of the CroBoCops universe</li>
								<li>Development of new NFT collections
</li>
								<li>Adding utility and function to our NFTs
</li>
								<li>Utilizing resources in AI technology
</li>
							</ul>
							</div>
					</div>
				</div>




				<div className="bonus-section">
					<div className="bonus-item">
						<img src={Peak2} alt="Bonus NFT Sneak Peek 1" />
					</div>
					<div className="bonus-item">
						<img src={Peak3} alt="Bonus NFT Sneak Peek 2" />
					</div>
					<div className="bonus-item">
						<img src={Peak4} alt="Bonus NFT Sneak Peek 3" />
					</div>
					<div className="bonus-item">
						<img src={Peak5} alt="Bonus NFT Sneak Peek 4" />
					</div>
					<div className="bonus-item">
						<img src={Peak6} alt="Bonus NFT Sneak Peek 5" />
					</div>
					<div className="bonus-item">
						<img src={Peak1} alt="Bonus NFT Sneak Peek 5" />
					</div>
				</div>

				<div className="nft-section">
					<h2 className="nft-section__title">View Your NFTs</h2>
					<div className="nft-section__gallery">
						<div className="nft-section__item">
							<img onClick={() => window.open("https://tofunft.com/", "_blank")} src="https://i.imgur.com/S67VFLd.png" alt="NFT 1" />
						</div>
						<div className="nft-section__item">
							<img onClick={() => window.open("https://cronosclassroom.art/", "_blank")} src="https://i.imgur.com/GfYxtpe.jpg" alt="NFT 2" />
						</div>
						<div className="nft-section__item">
							<img onClick={() => window.open("https://crosea.io", "_blank")} src="https://i.imgur.com/Av8nbtb.png" alt="NFT 3" />
						</div>
						<div className="nft-section__item">
							<img onClick={() => window.open("/#/marketplace", "_blank")} src="https://i.imgur.com/8OKwwRb.png" alt="NFT 4" />
						</div>
						
					</div>
				</div>

				<div className="nft-section">
					<h2 className="nft-section__title">Utility</h2>
					<div className="nft-section__gallery">
						<div className="nft-section__item">
							<img onClick={() => window.open("https://tofunft.com/", "_blank")} src="https://i.imgur.com/H5gNtKt.jpg" alt="Comics" />
						</div>
						<div className="nft-section__item">
							<img onClick={() => window.open("https://cronosclassroom.art/", "_blank")} src="https://i.imgur.com/duJRKyP.png" alt="Metaverse Avatar" />
						</div>
						<div className="nft-section__item">
							<img onClick={() => window.open("https://crosea.io", "_blank")} src="https://i.imgur.com/RHGD4gx.png" alt="Token Airdrops" />
						</div>
						<div className="nft-section__item">
							<img onClick={() => window.open("/#/marketplace", "_blank")} src="https://i.imgur.com/5uUSJnC.png" alt="NFT Airdrops" />
						</div>

					</div>
				</div>

					
				<Footer />
			</div>
			
			
			

			
		</div>
	);
}

export default CroboCop;