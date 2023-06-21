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
	import { DISCONNECT_FAILED, disconnectFailed, disconnect, connect, isConnected } from "./redux/blockchain/blockchainActions.js";
	import './styles/market.css';
	import { fetchData } from "./redux/data/dataActions.js";
	import Footer from './Footer.js';



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

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 1rem;
  transition: transform 0.3s ease;
  transform: translateX(${props => (props.showSidebar ? '0' : '-100%')});
  z-index: 1;
  
  .sidebar-toggle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
  
  .sidebar-content {
    margin-top: 2rem;
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
	  color: black;
    }
    
    p {
      margin-bottom: 0.5rem;
	  color: black;
    }
  }
`;
const ChainName = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const Logo = styled.img`
  height: 40px;
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
	const [showModal, setShowModal] = useState(false);
	const [account, setAccount] = useState("");
	const [smartContract, setSmartContract] = useState(null);
	const [connector, setConnector] = useState(null);
	const [balances, setBalances] = useState({});
	const [userNfts, setUserNfts] = useState([]);
	const [Nfts, setNfts] = useState([]);
	const [listedNfts, setListedNfts] = useState([]);
	const [selectedNft, setSelectedNft] = useState(null);
	const [sellPrice, setSellPrice] = useState('');
	const [startIndex, setStartIndex] = useState(0);

	const blockchain = useSelector((state) => state.blockchain);
	const data = useSelector((state) => state.data);
	const dispatch = useDispatch();
	const [sellTokenId, setSellTokenId] = useState(null);
	const [count, setCount] = useState(0);
	const [Rewards, setRewards] = useState(0);
	const [rewardBalance, setRewardBalance] = useState(() => {
		const initialBalance = localStorage.getItem(`${blockchain.account}-rewards`);
		return initialBalance ? Number(initialBalance) : 0;
	  });
	  
	const [isLoading, setIsLoading] = useState(false);

	//pawnshop
	const [nftAddress, setNftAddress] = useState('');
	const [volatility, setVolatility] = useState(0);
	const [lastPrice, setLastPrice] = useState(0);
	const [loanAmount, setLoanAmount] = useState(0);
	const [appraisalData, setAppraisalData] = useState(null);
	const [id, setId] = useState('');


	const generateRandomData = () => {
		// Generate random values within the desired range
		const loanAmountOffered = Math.floor(Math.random() * (1000 - 100) + 100);
		const ltvRatio = Math.floor(Math.random() * (80 - 60) + 60);
		// Add other relevant loan/appraisal data properties
	  
		// Return the generated random data as an object
		return {
		  loanAmountOffered,
		  ltvRatio,
		  // Add other relevant loan/appraisal data properties
		};
	  };

	// Function to submit an appraisal
	const submitAppraisal = async (nftAddress, volatility, lastPrice, loanAmount) => {
		try {
			// Connect to the Appraiser contract using the contract address and ABI
			const appraiserContract = new Web3EthContract(appraiserContractABI, appraiserContractAddress);

			// Prepare the parameters for the setAppraisal function
			const params = [nftAddress, volatility, lastPrice, loanAmount];
			console.log('Params:', params);

			// Call the setAppraisal function
			await appraiserContract.methods.setAppraisal(...params).send({
				from: '0x4B7051619d0AAa0EC056A18eceD5D8E06Dd55F33' });

			console.log('Appraisal submitted successfully!');
		} catch (error) {
			console.error('Error submitting appraisal:', error);
		}
	};


	// Function to get an appraisal
	const getAppraisal = async (nftAddress, id) => {
		try {
			// Connect to the Appraiser contract using the contract address and ABI
			const appraiserContract = new Web3EthContract(appraiserContractABI, appraiserContractAddress);

			// Call the getAppraisal function
			const appraisal = await appraiserContract.methods.getAppraisal(nftAddress, id).call();

			console.log('Appraisal:', appraisal);
			// Handle the appraisal data as needed
			const randomData = generateRandomData();
    		setAppraisalData(randomData);

		} catch (error) {
			console.error('Error getting appraisal:', error);
		}
	};

	const depositNFT = async (nftAddress, tokenId) => {
		try {
			// Connect to the NFTLendingPool contract using the contract address and ABI
			const nftLendingPoolContract = new Web3EthContract(lendingPoolContractABI, lendingPoolContractAddress);

			// Prepare the parameters for the depositNFT function
			const params = [nftAddress, tokenId];

			// Call the depositNFT function
			await nftLendingPoolContract.methods.depositNFT(...params).send({ from: blockchain.account });

			console.log('NFT deposited successfully!');
		} catch (error) {
			console.error('Error depositing NFT:', error);
		}
	};


	const withdrawNFT = async (nftContract, tokenId) => {
		try {
			// Connect to the NFTLendingPool contract using the contract address and ABI
			const nftLendingPoolContract = new Web3EthContract(nftLendingPoolContractABI, nftLendingPoolContractAddress);

			// Prepare the parameters for the withdrawNFT function
			const params = [nftContract, tokenId];

			// Call the withdrawNFT function
			await nftLendingPoolContract.methods.withdrawNFT(...params).send({ from: blockchain.account });

			console.log('NFT withdrawn successfully!');
		} catch (error) {
			console.error('Error withdrawing NFT:', error);
		}
	};


	// Function to borrow tokens
	const borrowTokens = async (borrowAmount) => {
		try {
			// Connect to the NFTLendingPool contract using the contract address and ABI
			const nftLendingPoolContract = new Web3EthContract(nftLendingPoolContractABI, nftLendingPoolContractAddress);

			// Prepare the parameters for the borrow function
			const params = [borrowAmount];

			// Call the borrow function
			await nftLendingPoolContract.methods.borrow(...params).send({ from: blockchain.account });

			console.log('Tokens borrowed successfully!');
		} catch (error) {
			console.error('Error borrowing tokens:', error);
		}
	};


	// Function to repay borrowed tokens
	const repayTokens = async (repayAmount) => {
		try {
			// Connect to the NFTLendingPool contract using the contract address and ABI
			const nftLendingPoolContract = new Web3EthContract(nftLendingPoolContractABI, nftLendingPoolContractAddress);

			// Prepare the parameters for the repayBorrow function
			const params = [repayAmount];

			// Call the repayBorrow function
			await nftLendingPoolContract.methods.repayBorrow(...params).send({ from: blockchain.account });

			console.log('Tokens repaid successfully!');
		} catch (error) {
			console.error('Error repaying tokens:', error);
		}
	};


	// Function to liquidate a borrower's NFT collateral
	const liquidateCollateral = async (nftAddress, tokenId) => {
		try {
			// Connect to the NFTLendingPool contract using the contract address and ABI
			const nftLendingPoolContract = new Web3EthContract(nftLendingPoolContractABI, nftLendingPoolContractAddress);

			// Prepare the parameters for the liquidateBorrow function
			const params = [nftAddress, tokenId];

			// Call the liquidateBorrow function
			await nftLendingPoolContract.methods.liquidateBorrow(...params).send({ from: blockchain.account });

			console.log('Collateral liquidated successfully!');
		} catch (error) {
			console.error('Error liquidating collateral:', error);
		}
	};

	// Function to calculate the collateral value
	const calculateCollateralValue = async (borrower) => {
		try {
			// Connect to the NFTLendingPool contract using the contract address and ABI
			const nftLendingPoolContract = new Web3EthContract(nftLendingPoolContractABI, nftLendingPoolContractAddress);

			// Prepare the parameters for the calculateCollateralValue function
			const params = [borrower];

			// Call the calculateCollateralValue function
			const collateralValue = await nftLendingPoolContract.methods.calculateCollateralValue(...params).call();

			console.log('Collateral value:', collateralValue);
		} catch (error) {
			console.error('Error calculating collateral value:', error);
		}
	};

	const getChainName = (chainId) => {
		console.log(blockchain.chainId)
		if (chainId === '338') {
		  return 'Cronos Testnet';
		} else if (blockchain.chainId === '25') {
		  return 'Cronos';
		} else if (chainId === '3') {
		  return 'Chain Name 3';
		}
		// Add more conditions for other chain IDs
		return 'Unknown Chain';
	  };



	//   In the context of your question, you have a button with the class sidebar-toggle and always-visible that toggles the showSidebar state when clicked. The button contains an icon with class fa fa-bars and the text "Menu".
	//   To close the sidebar when a user clicks outside of it, you will need to use a ref and the useEffect hook. Here's how you might modify your code:
	//   Next, in a useEffect hook, add an event listener that listens for mousedown events on the document. When such an event occurs, the listener checks whether the event's target is inside the sidebar (using the ref). If it isn't, the sidebar is hidden:
	//   With this setup, whenever a user clicks outside the sidebar, the handleMouseDown function is called, hiding the sidebar if the click was outside of it.

	const [showSidebar, setShowSidebar] = useState(false);
	const sidebarRef = useRef(null);




const handleButtonClick = () => {
	setShowSidebar(false);
  };

	const [connecting, setConnecting] = useState(false);
	const handleConnect = async () => {
		
		// setShowSidebar(false);
	  
		// Check if already connecting
		if (connecting) {
		  return;
		}

		// When a user logs in, retrieve their total rewards
		const initialRewardBalance = localStorage.getItem(`${blockchain.account}-rewards`);
		setRewardBalance(Number(initialRewardBalance) || 0);
		console.log(initialRewardBalance)
		

	  
		// Set the connecting flag
		setConnecting(true);
		 

		// Show the "Connecting..." modal
		Swal.fire({
		  title: 'Connecting...',
		  allowOutsideClick: true,
		  showConfirmButton: false,
		  timer: 500, // Display for 1 second
		  didOpen: async () => {
			try {
			  await dispatch(connect());
			  // Update the connected account state after connecting
			  
			  // This can be done by dispatching an action to update the blockchain state
			} catch (error) {
			  console.log(error);
			  Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Connection failed. Please try again!',
			  });
			} finally {
			  // Reset the connecting flag
			  setConnecting(false);
			}
		  },
		});
	  };

	  const handleDisconnect = async () => {
		// Check if already disconnected
		if (!isConnected) {
		  return;
		}
	  
		// Show the "Disconnecting..." modal
		Swal.fire({
		  title: 'Disconnecting...',
		  allowOutsideClick: true,
		  showConfirmButton: false,
		  timer: 500, // Display for 1 second
		  didOpen: async () => {
			try {
			  await dispatch(disconnect());
			  // Update the connected account state after disconnecting
			  // This can be done by dispatching an action to update the blockchain state
			} catch (error) {
			  console.log(error);
			  Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Disconnection failed. Please try again!',
			  });
			}
		  },
		});
	  };
	  
	  
	 



	const handleClick = () => {
		setIsLoading(true);

		// Do something that takes a long time...
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	};


	const [notification, setNotification] = useState(null);
	const [loading, setLoading] = useState(false);

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
					.card-wrapper {
	  width: 100%;
	  max-width: 100%;
	  padding: 20px;
	  box-sizing: border-box;
	  display: flex;
	  align-items: stretch;
	}
	.card {
	  background-color: #fff;
	  border: 2px solid #1f87f5;
	  border-radius: 10px;
	  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	  margin-bottom: 20px;
	  padding: 20px;
	  flex-grow: 1;
	  height: 100%;
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
						setRewardBalance(prevReward => {
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
				let content = `
				<div class="row justify-content-center">
				  <div class="col-md-4">
					<div class="card-wrapper">
					  <div class="card">
						<img src="${image}" class="card-img-top" width="100%" height="auto" />
						<div class="card-body">
						  <h5 class="card-title">${metadata.name}</h5>
					  
								<div class="form-group">
										
								<input type="number" name="AskingPrice" class="form-control" id="askingPriceInput-${tokenId}" placeholder="Enter price">		
										  </div>
						  <button type="button" class="btn btn-primary cell-btn zoom" data-tokenid="${tokenId}">List NFT</button>
						</div>
					  </div>
					</div>
				  </div>
				</div>

								  <style>
						.card {
					  background-color: #fff;
					  border: 2px solid #1f87f5;
					  border-radius: 10px;
					  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
					  margin-bottom: 20px;
					  padding: 20px;
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
					  height: auto;
					  max-width: 100%;
					  object-fit: cover;
					}


					  .card-wrapper {
						width: 100%;
						max-width: 33.33%;
						padding: 20px;
						box-sizing: border-box;
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

				document.getElementById("nftid3").innerHTML += content;

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
				let content = `
				<div class="row justify-content-center">
				  <div class="col-md-4">
					<div class="card-wrapper">
					  <div class="card">
						<img src="${image}" class="card-img-top" width="100%" height="auto" />
						<div class="card-body">
						  <h5 class="card-title">${metadata.name}</h5>
					  
								<div class="form-group">
										
								<input type="number" name="AskingPrice" class="form-control" id="askingPriceInput-${tokenId}" placeholder="Enter price">

										  </div>
						  <button type="button" class="btn btn-primary badge-btn zoom" data-tokenid="${tokenId}">List NFT</button>
						</div>
					  </div>
					</div>
				  </div>
				</div>

								  <style>
						.card {
					  background-color: #fff;
					  border: 2px solid #1f87f5;
					  border-radius: 10px;
					  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
					  margin-bottom: 20px;
					  padding: 20px;
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
					  height: auto;
					  max-width: 100%;
					  object-fit: cover;
					}


					  .card-wrapper {
						width: 100%;
						max-width: 33.33%;
						padding: 20px;
						box-sizing: border-box;
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

				document.getElementById("nftid4").innerHTML += content;



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
			let content = `
			<div class="row">
			  <div class="col-md-4">
				<div class="card-wrapper">
				  <div class="card">
					<img src="${image}" class="card-img-top" width="100%" height="auto" />
					<div class="card-body">
					  <h5 class="card-title">${metadata.name}</h5>
					  <p class="card-text">${metadata.description}</p>
						<div class="form-group">
							<label for="priceInput">Price:</label>
							<input type="number" name="AskingPrice" class="form-control" id="askingPriceInput-${tokenId}" placeholder="Enter price">
						  </div>
					  <button type="button" class="m-btn btn-primary  zoom" name="Tid" data-tokenid="${tokenId}">List NFT</button>
					</div>
				  </div>
				</div>
			  </div>
			</div>

				  <style>
				  .card {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-wrapper {
  max-width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-description {
  font-size: 14px;
  margin-bottom: 15px;
}

.price-label {
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
}

.price-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.btn {
  transition: background-color 0.5s ease;
  color: #fff;
  display: inline-block;
  text-align: center;
  background-color: #1f87f5;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: auto;
}

.btn:hover {
  background-color: #1a73e8;
}

.btn:active {
  transform: translateY(2px);
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 80%;
  max-width: 600px;
  max-height: 90%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-description {
  font-size: 18px;
  margin-bottom: 20px;
}

.modal-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.modal-price {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-price-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.modal-btn {
  background-color: #1f87f5;
  border: none;
box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(0, 0, 0, 0.6);
transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
border-color: #1f87f5;
outline: 0;
box-shadow: 0 0 0 0.2rem rgba(31, 135, 245, 0.25);
}

.form-group label {
font-size: 16px;
font-weight: 600;
margin-bottom: 5px;
}

.form-group input[type="number"] {
appearance: textfield;
-moz-appearance: textfield;
width: 100%;
height: calc(2.25rem + 2px);
font-size: 16px;
line-height: 1.5;
color: #495057;
background-color: #fff;
background-clip: padding-box;
border: 1px solid #ccc;
border-radius: 5px;
transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
padding: 0.375rem 0.75rem;
}

.form-group input[type="number"]::-webkit-inner-spin-button,
.form-group input[type="number"]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;
}

.form-group .input-group-text {
font-size: 16px;
font-weight: 600;
background-color: #fff;
border: 1px solid #ccc;
border-radius: 5px;
padding: 0.375rem 0.75rem;
margin-right: -1px;
white-space: nowrap;
}

.modal {
display: none;
position: fixed;
z-index: 1;
padding-top: 100px;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
background-color: #fefefe;
margin: auto;
padding: 20px;
border: 1px solid #888;
width: 80%;
max-width: 600px;
border-radius: 10px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
position: relative;
}

.close {
color: #aaa;
float: right;
font-size: 28px;
font-weight: bold;
}

.close:hover,
.close:focus {
color: black;
text-decoration: none;
cursor: pointer;
}

.modal-header {
padding: 2px 16px;
background-color: #1f87f5;
color: white;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
}

.modal-body {
padding: 20px;
}

.modal-footer {
padding: 20px;
background-color: #f9f9f9;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
}

.modal-footer .btn {
border: none;
border-radius: 5px;
padding: 10px 20px;
}
.btn:focus {
  outline: none;
}

.form-control {
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
}

.form-control:focus {
  outline: none;
  box-shadow: 0 0 0 2px #1f87f5;
}

.form-group {
  margin-bottom: 20px;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.card-text {
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  width: 80%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.modal-header {
  background-color: #f5f5f5;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
}

.modal-body {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
  font-size: 16px;
  line-height: 1.5;
}

.modal-close {
  color: #aaa;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
}

.modal-close:hover {
  color: #777;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  animation: spinner 1s ease-in-out infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}


				</style>
			</div>
			`;

			document.getElementById("nftidM").innerHTML += content;

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
		totalNFTs = await contract.methods.balanceOf(blockchain.account).call();
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
			let content = `
			<div class="row">
			  <div class="col-md-4">
				<div class="card-wrapper">
				  <div class="card">
					<img src="${image}" class="card-img-top" width="100%" height="auto" />
					<div class="card-body">
					  <h5 class="card-title">${metadata.name}</h5>
					  <p class="card-text">${metadata.description}</p>
						<div class="form-group">
							<label for="priceInput">Price:</label>
							<input type="number" name="AskingPrice" class="form-control" id="askingPriceInput-${tokenId}" placeholder="Enter price">
						  </div>
					  <button type="button" class="bdl-btn btn-primary bdl-btn zoom" name="Tid" data-tokenid="${tokenId}">List NFT</button>
					</div>
				  </div>
				</div>
			  </div>
			</div>

				  <style>
							  .card {
			  background-color: #fff;
			  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			  border-radius: 10px;
			  border: 1px solid #ccc;
			  width: 100%;
			  height: 100%;
			  display: flex;
			  flex-direction: column;
			}

			.card-wrapper {
			  max-width: 100%;
			  padding: 20px;
			  box-sizing: border-box;
			}

			.card-title {
			  font-size: 20px;
			  font-weight: bold;
			  margin-bottom: 10px;
			}

			.card-description {
			  font-size: 14px;
			  margin-bottom: 15px;
			}

			.price-label {
			  font-size: 14px;
			  margin-bottom: 5px;
			  font-weight: bold;
			}

			.price-input {
			  width: 100%;
			  padding: 10px;
			  margin-bottom: 20px;
			  font-size: 14px;
			  border-radius: 5px;
			  border: 1px solid #ccc;
			  box-sizing: border-box;
			}

			.btn {
			  transition: background-color 0.5s ease;
			  color: #fff;
			  display: inline-block;
			  text-align: center;
			  background-color: #1f87f5;
			  border: none;
			  border-radius: 5px;
			  padding: 10px 20px;
			  font-size: 16px;
			  cursor: pointer;
			  margin-top: auto;
			}

			.btn:hover {
			  background-color: #1a73e8;
			}

			.btn:active {
			  transform: translateY(2px);
			}

			.modal-background {
			  position: fixed;
			  top: 0;
			  left: 0;
			  width: 100%;
			  height: 100%;
			  background-color: rgba(0, 0, 0, 0.5);
			  z-index: 999;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			}

			.modal {
			  background-color: #fff;
			  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			  border-radius: 10px;
			  border: 1px solid #ccc;
			  width: 80%;
			  max-width: 600px;
			  max-height: 90%;
			  overflow-y: auto;
			  display: flex;
			  flex-direction: column;
			  padding: 20px;
			  box-sizing: border-box;
			}

			.modal-close {
			  position: absolute;
			  top: 20px;
			  right: 20px;
			  font-size: 20px;
			  cursor: pointer;
			}

			.modal-title {
			  font-size: 24px;
			  font-weight: bold;
			  margin-bottom: 10px;
			}

			.modal-description {
			  font-size: 18px;
			  margin-bottom: 20px;
			}

			.modal-image {
			  width: 100%;
			  height: auto;
			  margin-bottom: 20px;
			}

			.modal-price {
			  font-size: 16px;
			  font-weight: bold;
			  margin-bottom: 10px;
			}

			.modal-price-input {
			  width: 100%;
			  padding: 10px;
			  margin-bottom: 20px;
			  font-size: 16px;
			  border-radius: 5px;
			  border: 1px solid #ccc;
			  box-sizing: border-box;
			}

			.modal-btn {
			  background-color: #1f87f5;
			  border: none;
			box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(0, 0, 0, 0.6);
			transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
			}

			.form-control:focus {
			border-color: #1f87f5;
			outline: 0;
			box-shadow: 0 0 0 0.2rem rgba(31, 135, 245, 0.25);
			}

			.form-group label {
			font-size: 16px;
			font-weight: 600;
			margin-bottom: 5px;
			}

			.form-group input[type="number"] {
			appearance: textfield;
			-moz-appearance: textfield;
			width: 100%;
			height: calc(2.25rem + 2px);
			font-size: 16px;
			line-height: 1.5;
			color: #495057;
			background-color: #fff;
			background-clip: padding-box;
			border: 1px solid #ccc;
			border-radius: 5px;
			transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
			padding: 0.375rem 0.75rem;
			}

			.form-group input[type="number"]::-webkit-inner-spin-button,
			.form-group input[type="number"]::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;
			}

			.form-group .input-group-text {
			font-size: 16px;
			font-weight: 600;
			background-color: #fff;
			border: 1px solid #ccc;
			border-radius: 5px;
			padding: 0.375rem 0.75rem;
			margin-right: -1px;
			white-space: nowrap;
			}

			.modal {
			display: none;
			position: fixed;
			z-index: 1;
			padding-top: 100px;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			overflow: auto;
			background-color: rgba(0, 0, 0, 0.4);
			}

			.modal-content {
			background-color: #fefefe;
			margin: auto;
			padding: 20px;
			border: 1px solid #888;
			width: 80%;
			max-width: 600px;
			border-radius: 10px;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			position: relative;
			}

			.close {
			color: #aaa;
			float: right;
			font-size: 28px;
			font-weight: bold;
			}

			.close:hover,
			.close:focus {
			color: black;
			text-decoration: none;
			cursor: pointer;
			}

			.modal-header {
			padding: 2px 16px;
			background-color: #1f87f5;
			color: white;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			}

			.modal-body {
			padding: 20px;
			}

			.modal-footer {
			padding: 20px;
			background-color: #f9f9f9;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			}

			.modal-footer .btn {
			border: none;
			border-radius: 5px;
			padding: 10px 20px;
			}
			.btn:focus {
			  outline: none;
			}

			.form-control {
			  border: none;
			  border-radius: 5px;
			  padding: 10px;
			  font-size: 16px;
			  background-color: #f5f5f5;
			  margin-bottom: 10px;
			}

			.form-control:focus {
			  outline: none;
			  box-shadow: 0 0 0 2px #1f87f5;
			}

			.form-group {
			  margin-bottom: 20px;
			}

			.card-title {
			  font-size: 24px;
			  font-weight: 600;
			  margin-bottom: 10px;
			}

			.card-text {
			  font-size: 16px;
			  margin-bottom: 20px;
			  line-height: 1.5;
			}

			.modal {
			  position: fixed;
			  top: 0;
			  left: 0;
			  right: 0;
			  bottom: 0;
			  background-color: rgba(0, 0, 0, 0.5);
			  display: flex;
			  align-items: center;
			  justify-content: center;
			}

			.modal-dialog {
			  width: 80%;
			  max-width: 800px;
			  background-color: #fff;
			  border-radius: 10px;
			  overflow: hidden;
			}

			.modal-header {
			  background-color: #f5f5f5;
			  padding: 20px;
			  display: flex;
			  align-items: center;
			  justify-content: space-between;
			  font-size: 24px;
			  font-weight: 600;
			  border-bottom: 1px solid #ccc;
			}

			.modal-body {
			  padding: 20px;
			  max-height: 60vh;
			  overflow-y: auto;
			  font-size: 16px;
			  line-height: 1.5;
			}

			.modal-close {
			  color: #aaa;
			  font-size: 24px;
			  font-weight: 600;
			  cursor: pointer;
			}

			.modal-close:hover {
			  color: #777;
			}

			.overlay {
			  position: fixed;
			  top: 0;
			  left: 0;
			  right: 0;
			  bottom: 0;
			  background-color: rgba(0, 0, 0, 0.5);
			  display: flex;
			  align-items: center;
			  justify-content: center;
			}

			.spinner {
			  width: 40px;
			  height: 40px;
			  border-radius: 50%;
			  border: 3px solid rgba(255, 255, 255, 0.3);
			  border-top-color: #fff;
			  animation: spinner 1s ease-in-out infinite;
			}

			@keyframes spinner {
			  to {
				transform: rotate(360deg);
			  }
			}


				</style>
			</div>
			`;

			document.getElementById("nftidA").innerHTML += content;

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

					// Create an <img> element for the NFT image
					const img = document.createElement('img');
					img.src = image;
					itemDiv.appendChild(img);

					// Create a Buy button element
					const buyButton = document.createElement("button");
					buyButton.innerHTML = "Buy";

					// Create a new instance of the rewards contract
					const rewardsContract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);

					// Define the amount of ether to be sent as a reward
					const rewardAmount = 10;
					// Set the amount of tokens to transfer

					const amount = 100;
					// Convert the amount to wei

					

					// Update the buyItem function to add rewards to rewardBalance
					buyButton.addEventListener("click", async () => {
						try {
							// Call the "buyItem" function on the smart contract to purchase the NFT
							const result = await marketplaceContract.methods.buyItem(item[0]).send({ from: blockchain.account, value: Web3Utils.toWei(askingPrice, 'ether') });

							if (result.status) {
								// Get the current reward balance for the user's account address
								const currentBalance = rewardBalances[blockchain.account] || 0;

								// Increment the reward balance by the amount earned
								const newBalance = currentBalance + 10;

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
		  onOpen: () => {
			Swal.showLoading();
		  },
		});
	  
		try {
		  // Call functions to get NFTs here
		  await getFirstTenBadges();
		  await getFirstTenCells();
		  await getFirstTen();
		  await getMinionsNFTs();
		  await getBdlNFTs();
	  
		  // Close the loading spinner when NFTs are fetched successfully
		  loadingSwal.close();
	  
		  // Display success message to user
		  Swal.fire({
			title: 'Success!',
			text: 'NFTs fetched successfully.',
			icon: 'success',
			confirmButtonText: 'Ok',
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

	function addIPFSProxy(ipfsHash) {
			const URL = "https://idm.infura-ipfs.io/ipfs/"
			const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
			const ipfsURL = URL + hash

			//console.log(ipfsURL)
			return ipfsURL
	}

		// SHOW AND HIDE NFTS 
		/////////////////////
	const [showNfts, setShowNfts] = useState(false);

	function handleShowNfts() {
			setShowNfts(true);
			getBadgeNFTs();
	}

	function handleHideNfts() {
			setShowNfts(false);
	}



		// LATE VARIABLES
		//////////////////
	const [showBetaWarning, setShowBetaWarning] = useState(true);
	const [itemsForSale, setItemsForSale] = useState([]);

	const getData = () => {
			if (blockchain.account !== "") {
				dispatch(fetchData(blockchain.account));
			}
	};

	const [balance, setBalance] = useState(null);

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

	function closeModal(modal) {
		modal.style.display = 'none';
	}

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


	// USE EFFECTS
	useEffect(() => {
		fetchBalance();
	}, []);

	useEffect(() => {
		console.log('Current reward balance:', rewardBalance);
	  }, [rewardBalance]);
	  
	useEffect(() => {
		// check if blockchain.account has a value
		if (blockchain.account) {
		  const initialRewardBalance = localStorage.getItem(`${blockchain.account}-rewards`);
		  // convert string to number and set rewardBalance
		  setRewardBalance(Number(initialRewardBalance) || 0);
		  console.log(initialRewardBalance)
		}
	  }, [blockchain.account]);  // dependency array, re-run this effect when blockchain.account changes
	
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


	return (
		
		<div>
			
			<div className="notification-wrapper">
				<NotificationContainer position="top-center" contentClassName="custom-notification" />
			</div>
			{notification && (
				<div className="notification animateanimated animatefadeIn">{notification}</div>
			)}
			{loading && (
				<div className="loading-screen">
					<div className="loading-screen-c">
						<img src="https://media1.giphy.com/media/YlMQG67goHGP93dMKp/giphy.gif?cid=ecf05e470l9sgqcylt8eih8jocmbhsv7pbm3ep2uxnv3avyr&rid=giphy.gif&ct=s" alt="Loading" />
					</div>
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>`
					<div className="loading-screen-content">
						<p></p>
					</div>
				</div>
			)}
				<div className="intro-content">
					<div className="intro-image text-center img-center">
						<img src="https://i.imgur.com/DXvGEnC.png" height="150px" width="150px" alt="Your Image" />
					</div>
					<div className="intro-text">
						<h2>Welcome to the Cronos Kitchen: A Marketplace of Unique NFT Recipes</h2>
						<p>Welcome to our user-built NFT marketplace, where you have the power to create and own unique NFTs like never before. Our platform is designed for users by users, giving you the freedom and creativity to mint your own NFTs and showcase them to the world.</p>
						<StyledButton
						bgColor="#28a745"
						color="#fff"
						hoverBgColor="#218838"
						className="zoom btn-hover"
						onClick={() => {
							document.getElementById('nftMarketplace').scrollIntoView({ behavior: 'smooth' });
						}}
>
							Start Cooking!
							</StyledButton>

					</div>
					<div class="intro-video">
						<iframe width="560" height="315" src="https://www.youtube.com/embed/ppYJPrqSGow" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
					</div>

				</div>
			

			<section className="transactions">

				{/* existing transactions content goes here */}

			</section>

			<section className="trending-collections">
				<h2>Trending Collections</h2>
				<div className="card-container">
					<div className="trending-card">
						<div className="card-image">
							<img src="https://i.imgur.com/OjVbJez.png" alt="Collection" />
						</div>
						<div className="card-content">
							<h3>Cro Crook NFT</h3>
							<p>Floor Price: 99 CRO</p>
							<p>Total Volume: 100 CRO</p>
						</div>
					</div>
					<div onClick={() => window.open("https://crobadge.shop/", "_blank")} className="trending-card">
						<div className="card-image">
							<img src="https://i.imgur.com/A6sbnlk.png" alt="Collection" />
						</div>
						<div className="card-content">
							<h3>Crobadge NFT</h3>
							<p>Floor Price: 50 CRO</p>
							<p>Total Volume: 10 CRO</p>
						</div>
					</div>
					<div className="trending-card">
						<div className="card-image">
							<img src="https://i.imgur.com/kYL6q8p.png" alt="Collection" />
						</div>
						<div className="card-content">
							<h3>CCPD: CroPugs NFT</h3>
							<p>Floor Price: 50 CRO</p>
							<p>Total Volume: 10 CRO</p>
						</div>
					</div>

					<div onClick={() => window.open("#/CroboCop", "_blank")} className="trending-card">
						<div className="card-image">
							<img src="https://i.imgur.com/Kz83Itp.jpg" alt="Collection" />
						</div>
						<div className="card-content">
							<h3>CroBo Cruiser's NFT</h3>
							<p>Floor Price: 800 CRO</p>
							<p>Total Volume: 10 CRO</p>
						</div>
					</div>

					<div onClick={() => window.open("#/CroboCop", "_blank")} className="trending-card">
						<div className="card-image">
							<img src="https://i.imgur.com/6En0QF1.gif" alt="Collection" />
						</div>
						<div className="card-content">
							<h3>CroBo Cops NFT</h3>
							<p>Floor Price: 500 CRO</p>
							<p>Total Volume: 10 CRO</p>
						</div>
					</div>
				</div>
			</section>


			<GetStats
			/>
			<div className="boomSection">
			<div className="boom">

				
			<NavbarContainer>
      <div className="navbar-left">
        <a href="/">
          <Logo src="https://i.imgur.com/8OKwwRb.png" alt="Logo" />
        </a>
      </div>
      <SearchBar>
        <a href="/">
          <Logo src="https://i.imgur.com/8OKwwRb.png" alt="Logo" />
        </a>
        <input type="text" placeholder="Search items, collectibles, and users" />
        <button>Search</button>
      </SearchBar>
      <div className="sidebar">
    <button className="sidebar-toggle always-visible" ref={sidebarRef} onClick={() => setShowSidebar(!showSidebar)}>
      <i className="fa fa-bars">Menu</i>
    </button>

    <Sidebar showSidebar={showSidebar}>
      <div className="sidebar-content">
	  <ListGroup>
	  <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <h3 className="sidebar-heading">Connected Account:</h3>
		</ListGroup>
        {blockchain.smartContract ? (
            <div>
              <p className="sidebar-item account">Account: <span className="sidebar-value">{blockchain.account}</span></p>
              <button className="disconnect-button" onClick={handleDisconnect()}>Disconnect</button>
              <p className="sidebar-item">Current Account Balance: <span className="sidebar-value">{balance} $CRO</span></p>
              <p className="sidebar-item">Total NFTs in Wallet: {/* Include the respective state variable */}</p>
              <p className="sidebar-item">Total NFTs Listed: <span className="sidebar-value">{count}</span></p>
              <p className="sidebar-item">LeaderBoard Position: {/* Include the respective state variable */}</p>
              <p className="sidebar-item">Total Rewards Accrued: <span className="sidebar-value">{rewardBalance} $cGOLD</span></p>
              <p className="sidebar-item">Total Balance: <span className="sidebar-value green">{Rewards} $cGOLD</span></p>
              <button className="button button--test zoom" onClick={() => {
                fetchBalance();
                fetchData();
                getNFTsCount();
                CheckRewards();
              }}>
                Get Balances
              </button>

			  <button onClick={handleButtonClick}>Close Sidebar</button>
            </div>
        ) : (
            <button className="connect-button" onClick={handleConnect}>Connect Wallet</button>
        )}
       <h3 className="sidebar-heading">Chain ID:</h3>
        <p className="sidebar-item">{blockchain.chainId}</p>
        <ChainName className="sidebar-item">{getChainName(blockchain.chainId)}</ChainName>
		<ListGroup>
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
        
      </div>
    </Sidebar>
  </div>


    </NavbarContainer>


					<div class="collapse" id="nftMarketplace">
						<div id="confetti-container"></div>

						<Jumbotron className="jumbotron-container">
	<Icon src="https://i.imgur.com/8OKwwRb.png" alt="icon" />
	<Title>Welcome to the NFT Marketplace!</Title>
	<Description>
		This is where you can view and list your NFTs for sale.
	</Description>
	<StyledButton
		bgColor="#28a745"
		color="#fff"
		hoverBgColor="#218838"
		className="zoom btn-hover"
		onClick={displayNFTs
		}
	>
		SHOW MY NFTS
	</StyledButton>
	

	{/* Carousel or Grid View of Categories */}
	<div className="categories-container">
		<div className="category">
			<h2>CroCell NFTs</h2>
			{/* Display NFTs in a grid layout here */}
			<div className="nft-grid" id="nftid3"></div>
		</div>

		<div className="category">
			<h2>CroBadge NFTs</h2>
			<div className="nft-grid" id="nftid4"></div>
		</div>

		<div className="category">
			<h2>Crook NFTs</h2>
			<div className="nft-grid" id="nftid"></div>
		</div>

		<div className="category">
			<h2>CCPD: CroPugs</h2>
			<div className="nft-grid" id=""></div>
		</div>

		<div className="category">
			<h2>croMinions</h2>
			<div className="nft-grid" id="nftidM"></div>
		</div>

		<div className="category">
			<h2>External Projects</h2>
			<div className="nft-grid" id="nftidA"></div>
		</div>
	</div>
</Jumbotron>

				</div>
				</div>
				</div>
		

			{/*{showBetaWarning && (
				<div style={{ height: "60%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", zIndex: 2 }}>
					<div style={{ backgroundColor: "#f5f51f", padding: "2em", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", width: "80%" }}>
						<h3 style={{ textAlign: "center", marginBottom: "1em" }}>Beta Warning</h3>
						<p style={{ textAlign: "center", marginBottom: "1em" }}>This app is currently in beta stages and users should be aware of potential bugs or issues while utilizing certain features.</p>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<button style={{ padding: "0.5em 1em", borderRadius: "5px", backgroundColor: "#1f87f5", color: "#fff", fontWeight: "bold", cursor: "pointer" }} onClick={() => setShowBetaWarning(false)}>Close</button>
						</div>
					</div>
				</div>
			)}*/}
			<div class="parent">
			<Title class="Title">Featured NFTs</Title>
			<StyledButton
				class="StyledButton"
				bgColor="#007bff"
				color="#fff"
				hoverBgColor="#0069d9"
				onClick={displayNFTsFeatures}
			>
				View Listed NFTs
  			</StyledButton>
				{loading && <div>Loading...</div>}
				{notification && <div>{notification}</div>}
				<div id="marketplaceItems"></div>


			</div>
			



			


			<Footer />

			
		</div>

		


	);


	
}

export default Marketplace;