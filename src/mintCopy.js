import ReactDOM from 'react-dom';
import $ from 'jquery';
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect, isConnected } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import './App.js';
import './navbar.js';
import './styles/home.css';
import Web3Modal from 'web3modal';
import Web3EthContract from "web3-eth-contract";
import Web3 from 'web3';
import axios from 'axios';
import { providerOptions } from './provider/providerOptions';
import { Button } from 'antd';
import { balance, rewards } from "./redux/stakeData/dataActions";
import { DeFiWeb3Connector } from 'deficonnect'

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
const ABI = [
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

const VAULTABI = [
	{
		"inputs": [
			{
				"internalType": "contract ERC721Enumerable",
				"name": "_nft",
				"type": "address"
			},
			{
				"internalType": "contract crookRewards",
				"name": "_token",
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
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Claimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "NFTStaked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "NFTUnstaked",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_addressToWhitelist",
				"type": "address"
			}
		],
		"name": "addUser",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "claimForAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "earningInfo",
		"outputs": [
			{
				"internalType": "uint256[1]",
				"name": "info",
				"type": "uint256[1]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addressFromWhitelist",
				"type": "address"
			}
		],
		"name": "example",
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
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "pure",
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
				"internalType": "address",
				"name": "_addressToWhitelist",
				"type": "address"
			}
		],
		"name": "removeUser",
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
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "tokensOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "ownerTokens",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalStaked",
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
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vault",
		"outputs": [
			{
				"internalType": "uint24",
				"name": "tokenId",
				"type": "uint24"
			},
			{
				"internalType": "uint48",
				"name": "timestamp",
				"type": "uint48"
			},
			{
				"internalType": "address",
				"name": "owner",
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
				"name": "_whitelistedAddress",
				"type": "address"
			}
		],
		"name": "verifyUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]











const truncate = (input, len) =>
	input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function Mint() {
	const dispatch = useDispatch();
	const blockchain = useSelector((state) => state.blockchain);
	const data = useSelector((state) => state.data);
	const [claimingNft, setClaimingNft] = useState(false);
	const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
	const [mintAmount, setMintAmount] = useState(1);
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



	var account = null;
	var contract = null;
	var vaultcontract = "0xe1882742713E415391b4815cB3833E9E03A6a895";



	const NFTCONTRACT = "0x230Bb7ce185CD0042973202f5F38B7072440e2C9";
	const STAKINGCONTRACT = "0xe1882742713E415391b4815cB3833E9E03A6a895"
	const apikey = "33QYH2H847QF4WQMTXTM661GGVUKW1S9GM";
	const endpoint = "https://api-rinkeby.etherscan.io/api"
	const nftpng = "https://ipfs.io/ipfs/QmetESUb7wTPr8mBHWFsiSKMw6HTLWUGoL8DrkcaY9TTyh/";
	const [CurrentRewardInfo, setCurrentRewardInfo] = useState(null);
	const [CurrentSInfo, setCurrentSInfo] = useState(null);



	// APPROVE NFTS BUTTON 
	async function approveall() {
		var tokenids = (document.querySelector("[name=stkid]").value);
		const contract = new Web3EthContract(ABI, NFTCONTRACT);
		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);
		contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({ from: blockchain.account });
	}

	// STAKE FUNCTION BUTTON
	async function stakeit() {

		var tokenids = (document.querySelector("[name=stkid]").value);

		const contract = new Web3EthContract(ABI, NFTCONTRACT);
		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);




		vaultcontract.methods.stake([tokenids]).send({ from: blockchain.account });
	};

	// UNSTAKE BUTTON FUNCTION
	async function unstakeit() {

		var tokenids = (document.querySelector("[name=stkid]").value);


		const contract = new Web3EthContract(ABI, NFTCONTRACT);
		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);
		vaultcontract.methods.unstake([tokenids]).send({ from: blockchain.account });
	}


	// CLAIM REWARDS BUTTON FUNCTION
	async function claimit() {
		var tokenids = Number(document.querySelector("[name=claimid]").value);
		const contract = new Web3EthContract(ABI, NFTCONTRACT);
		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);

		vaultcontract.methods.claim([tokenids]).send({ from: blockchain.account });
	}


	// VIEW REWARDS BUTTON
	const rewardinfo = async () => {
		var tokenids = Number(document.querySelector("[name=claimid]").value);
		const contract = new Web3EthContract(ABI, NFTCONTRACT);
		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);

		let info = await vaultcontract.methods.earningInfo(blockchain.account, [tokenids]).call();
		setCurrentRewardInfo(info);
		console.log(info)
	}


	// VIEW TOTAL STAKED BUTTON
	const stakedinfo = async () => {
		var tokenids = Number(document.querySelector("[name=claimid]").value);
		const contract = new Web3EthContract(ABI, NFTCONTRACT);
		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);

		let SInfo = await vaultcontract.methods.tokensOfOwner(blockchain.account).call();
		setCurrentSInfo(SInfo);
		SInfo.truncate
		let strValue = String(SInfo);
		console.log(strValue);
		setCurrentSInfo(strValue)

		console.log(SInfo)


	}




	const addTokenToMM = async () => {
		try {
			const { ethereum } = window;
			await ethereum.request({
				method: 'wallet_watchAsset',
				params: {
					type: 'ERC20',
					options: {
						address: '0x10e18383a6B02D19a21478c4F13C30E889a9218e', // ERC20 token address
						symbol: `cGOLD`,
						decimals: 18,
						image: 'https://i.imgur.com/nT0cIaC.png',
					},
				},
			});
		} catch (ex) {
			// We don't handle that error for now
			// Might be a different wallet than Metmask
			// or user declined
			console.error(ex);
		}
	};




	// async function connectdots() {
	//const connector = new DeFiWeb3Connector({
	//  display: {
	//    logo: "",
	//    name: "Defi Wallet",
	//   description: "Connect to your Defi Wallet account"
	//},
	// supportedChainIds: [1, 25],

	// rpc: {
	//    1: 'https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a',
	//    25: "https://evm.cronos.org/", // cronos mainet
	//    },
	//pollingInterval: 15000,
	// })
	// connector.activate()
	//    .catch(error => alert(error.message))
	//}

	// async function disconnect() {
	// disconnect the Wallet
	//await connector.deactivate()}


	const claimNFTs = () => {
		let cost = CONFIG.WEI_COST;
		let gasLimit = CONFIG.GAS_LIMIT;
		let totalCostWei = String(cost * mintAmount);
		let totalGasLimit = String(gasLimit * mintAmount);
		console.log("Cost: ", totalCostWei);
		console.log("Gas limit: ", totalGasLimit);
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
	};

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

	const getData = () => {
		if (blockchain.account !== "" && blockchain.smartContract !== null) {
			dispatch(fetchData(blockchain.account));
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

	useEffect(() => {
		getData();
	}, [blockchain.account]);



	return (
		<s.Screen>
			<s.Container
				flex={1}
				ai={"center"}
				style={{ padding: 24, backgroundColor: "var(--primary)" }}
				image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
			>
				<StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
				<s.SpacerSmall />
				<ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
					<s.Container flex={1} jc={"center"} ai={"center"}>
						<StyledImg alt={"example"} src={"/config/images/example.gif"} />
					</s.Container>
					<s.SpacerLarge />
					<s.Container
						flex={2}
						jc={"center"}
						ai={"center"}
						style={{
							backgroundColor: "var(--accent)",
							padding: 24,
							borderRadius: 24,
							border: "4px dashed var(--secondary)",
							boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
						}}
					>
						<s.TextTitle
							style={{
								textAlign: "center",
								fontSize: 50,
								fontWeight: "bold",
								color: "var(--accent-text)",
							}}
						>
							{data.totalSupply} / {CONFIG.MAX_SUPPLY}
						</s.TextTitle>
						<s.TextDescription
							style={{
								textAlign: "center",
								color: "var(--primary-text)",
							}}
						>
							<StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
								{truncate(CONFIG.CONTRACT_ADDRESS, 15)}
							</StyledLink>
						</s.TextDescription>
						<s.SpacerSmall />
						{Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
							<>
								<s.TextTitle
									style={{ textAlign: "center", color: "var(--accent-text)" }}
								>
									The sale has ended.
								</s.TextTitle>
								<s.TextDescription
									style={{ textAlign: "center", color: "var(--accent-text)" }}
								>
									You can still find {CONFIG.NFT_NAME} on
								</s.TextDescription>
								<s.SpacerSmall />
								<StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
									{CONFIG.MARKETPLACE}
								</StyledLink>
							</>
						) : (
							<>
								<s.TextTitle
									style={{ textAlign: "center", color: "var(--accent-text)" }}
								>
									1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
									{CONFIG.NETWORK.SYMBOL}.
								</s.TextTitle>
								<s.SpacerXSmall />
								<s.TextDescription
									style={{ textAlign: "center", color: "var(--accent-text)" }}
								>
									Excluding gas fees.
								</s.TextDescription>
								<s.SpacerSmall />
								{blockchain.account === "" ||
									blockchain.smartContract === null ? (
									<s.Container ai={"center"} jc={"center"}>
										<s.TextDescription
											style={{
												textAlign: "center",
												color: "var(--accent-text)",

											}}
										>
											Connect to the {CONFIG.NETWORK.NAME} network
										</s.TextDescription>
										<s.SpacerSmall />
										<StyledButton
											onClick={(e) => {
												e.preventDefault();
												dispatch(connect());
												getData();
											}}
										>
											CONNECT
										</StyledButton><br></br>
										<div>
											<br></br>
											<br></br>


										</div>
										<p>Use the Button Above for Other Wallet's beside's Metamask!
										</p>

										{blockchain.errorMsg !== "" ? (
											<>
												<s.SpacerSmall />
												<s.TextDescription
													style={{
														textAlign: "center",
														color: "var(--accent-text)",
													}}
												>
													{blockchain.errorMsg}
												</s.TextDescription>
											</>
										) : null}
									</s.Container>
								) : (
									<>
										<s.TextDescription
											style={{
												textAlign: "center",
												color: "var(--accent-text)",
											}}
										>
											{feedback}
										</s.TextDescription>
										<s.SpacerMedium />
										<s.Container ai={"center"} jc={"center"} fd={"row"}>
											<StyledRoundButton
												style={{ lineHeight: 0.4 }}
												disabled={claimingNft ? 1 : 0}
												onClick={(e) => {
													e.preventDefault();
													decrementMintAmount();
												}}
											>
												-
											</StyledRoundButton>
											<s.SpacerMedium />
											<s.TextDescription
												style={{
													textAlign: "center",
													color: "var(--accent-text)",
												}}
											>
												{mintAmount}
											</s.TextDescription>
											<s.SpacerMedium />
											<StyledRoundButton
												disabled={claimingNft ? 1 : 0}
												onClick={(e) => {
													e.preventDefault();
													incrementMintAmount();
												}}
											>
												+
											</StyledRoundButton>
										</s.Container>
										<s.SpacerSmall />
										<s.Container ai={"center"} jc={"center"} fd={"row"}>
											<StyledButton
												disabled={claimingNft ? 1 : 0}
												onClick={(e) => {

												}}
											>
												{claimingNft ? "BUSY" : "MINT ENDED"}
											</StyledButton></s.Container><s.Container><br></br>
											<div class=".[name=stkid]"><input type="text" id="stkid" name="stkid" /><label htmlFor="name" className="labels" >Input NFT ID FOR APPROVE/STAKE</label><br></br>

												<Button class="button" onClick={stakeit}>STAKE</Button>&nbsp;&nbsp;
												<Button style={{ color: "white", background: "green" }} onClick={unstakeit}>UNSTAKE</Button>&nbsp;&nbsp;
												<Button style={{ color: "white", background: "green" }} onClick={approveall}>APPROVE</Button>

												<blockquote className="reward"><span>Crooks In Jail(Staked)</span>
													{' '}
													{CurrentSInfo}
													{' '}$CROOKS
												</blockquote></div>
											<div><input type="text" name="claimid" id="claimid" /><label>Input NFT ID FOR CLAIM</label><br></br>
												<Button class="button" onClick={claimit}>CLAIM REWARDS</Button>&nbsp;&nbsp;
												<Button class="button" onClick={rewardinfo}>VIEW REWARDS </Button>&nbsp;&nbsp;
												<Button class="button" onClick={stakedinfo}>VIEW Total Staked</Button>

												<blockquote className="reward"><span>Rewards Balance</span>
													{' '}
													{CurrentRewardInfo}
													{' '}$cGOLD
												</blockquote>

												<button
													class="button button"
													style={{ color: "Red", background: "orange" }}
													onClick={addTokenToMM}
													className="p-3 bg-blue-600 text-white rounded-lg font-bold"
												>
													Add cGOLD to MetaMask
												</button>










											</div>
										</s.Container>
									</>
								)}
							</>
						)}
						<s.SpacerMedium />
					</s.Container>
					<s.SpacerLarge />
					<s.Container flex={1} jc={"center"} ai={"center"}>
						<StyledImg
							alt={"example"}
							src={"/config/images/example.gif"}
							style={{ transform: "scaleX(-1)" }}
						/>
					</s.Container>
				</ResponsiveWrapper>
				<s.SpacerMedium />
				<s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
					<s.TextDescription
						style={{
							textAlign: "center",
							color: "var(--primary-text)",
						}}
					>
						Please make sure you are connected to the right network (
						{CONFIG.NETWORK.NAME} Mainnet) and the correct address. Please note:
						Once you make the purchase, you cannot undo this action.
					</s.TextDescription>
					<s.SpacerSmall />
					<s.TextDescription
						style={{
							textAlign: "center",
							color: "var(--primary-text)",
						}}
					>
						We have set the gas limit to {CONFIG.GAS_LIMIT} for the contract to
						successfully mint your NFT. We recommend that you don't lower the
						gas limit.
					</s.TextDescription>
				</s.Container>
			</s.Container>


		</s.Screen>
	);
}

export default Mint;
