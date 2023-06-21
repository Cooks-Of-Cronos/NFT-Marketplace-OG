
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DISCONNECT_FAILED, disconnectFailed, disconnect, connect, isConnected } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import Web3EthContract from "web3-eth-contract";
import Modal from 'react-modal';
import { store, ReactNotification, NotificationContainer, NotificationManager } from 'react-notifications';
import CroboCopNFT from './images/CroboCopNFT.gif';

// IMPORT STYLES
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

//IMPORT OTHER COMPONENTS FROM PAGES WITHIN OUR DIRECTORY
import './App.js';
import './navbar.js';
import './styles/home.css';





import "animate.css/animate.min.css";




<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>





// IMPORTANT GLOBAL VARIABLES 
//----------------------------

// const CroCellsABI = 
// const CroMinionsABI = 
// const CroBadgesABI = 




//----------------------------
export const ABI = [
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


export const REWARDSABI = [
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
	}
]

export const REWARDSCONTRACT = "0x10e18383a6B02D19a21478c4F13C30E889a9218e"

export const CROCELLSABI = [
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
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

export const CROBADGEABI = [
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

const BN = require('bn.js');

export const CroBadgesContract = "0x2e756776A63F936a6010Dd9ee5C5fE77b5E02562"

export const NFTCONTRACT = "0x230Bb7ce185CD0042973202f5F38B7072440e2C9";









// STYLES 
// --------------
// --------------

const buttonStyles = {
	color: "white",
	background: "green",
	fontSize: "1rem",
	padding: "0.5rem 1rem",
	borderRadius: "5px",
	cursor: "pointer"
};

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



// -----------
// FUNCTIONS 
// -----------

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


	const [isLoading, setIsLoading] = useState(false);
	
	const handleClick = () => {
		setIsLoading(true);

		// Do something that takes a long time...
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	};

	// CONTRACTS 
	//----------
	/* const CroMinionsContract = "0x3E2f91c31daf2467B5360EE85D78E99338fd4976"
	 * const CroCellsContract = "0x1632568C5DeA50b5738c6C7bE2786657A9840485"
	 * const CroBadgesContract = "0x2e756776A63F936a6010Dd9ee5C5fE77b5E02562"
	 * 
	 * 
	 * 
	 * 
	 * 

	*/

	//----------
	var account = null;
	var contract = null;
	var vaultcontract = "0xe1882742713E415391b4815cB3833E9E03A6a895";

	
	const NFTCONTRACT = "0x230Bb7ce185CD0042973202f5F38B7072440e2C9";
	const STAKINGCONTRACT = "0xe1882742713E415391b4815cB3833E9E03A6a895"
	const CroMinionsContract = "0x3E2f91c31daf2467B5360EE85D78E99338fd4976"
	const CROCELLSCONTRACT = "0x1632568C5DeA50b5738c6C7bE2786657A9840485"
	const CroBadgesContract = "0x2e756776A63F936a6010Dd9ee5C5fE77b5E02562"

	// API VARIABLES - RANDOM ETC.
	const apikey = "33QYH2H847QF4WQMTXTM661GGVUKW1S9GM";
	const endpoint = "https://api-rinkeby.etherscan.io/api"
	const nftpng = "https://ipfs.io/ipfs/QmetESUb7wTPr8mBHWFsiSKMw6HTLWUGoL8DrkcaY9TTyh/";







	// STATE CONTROLLED VARIABLES 
		/* 
		 *
		 *
		 *
		 *
		 *

	*/
	const [CurrentRewardInfo, setCurrentRewardInfo] = useState(null);
	const [CurrentSInfo, setCurrentSInfo] = useState(null);
	const [CurrentNFTs, setCurrentNFTs] = useState(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [nfts, setNfts] = useState([]);

	const [CellNfts, setCellNfts] = useState([]);
	const [startIndex, setStartIndex] = useState(0);
	const [WhitelistStatus, setWhitelistStatus] = useState(null);
	const [CurrentSupply, setCurrentSupply] = useState(null);
	const [WalletCount, setWalletCount] = useState(null);
	const [WalletList, setWalletList] = useState(null);
	const [StakedCount, setStakedCount] = useState(null);












	// STATE CONTROLLED VARIABLES 
		/*
		 *Create a Button to check list all Crooks are in your wallet.
		walletOfOwner(address)

		async function listAllCrooksJ() {
			var address = blockchain.account
			const contract = new Web3EthContract(ABI, NFTCONTRACT)
			let wbalances = await contract.methods.walletOfOwner(address).call();
			setWalletList(wbalances);
		}

		Create button to check how many crooks are in a wallet
		balanceOf(address)
		async function countCrooksWallet() {
			var address = blockchain.account
			const contract = new Web3EthContract(ABI, NFTCONTRACT)
			let balances = await contract.methods.balanceOf(address).call();
			setWalletCount(balances)
			console.log(WalletCount)
		}

		Create button to check total supply of the NFT
		totalSupply()
		async function checkSupply() {
		const contract = new Web3EthContract(ABI, NFTCONTRACT);
		let Supply = await contract.methods.totalSupply();
	
	}

		Check Status of the Mint
		paused()

		Create Input for from addrss and to address and token id, and button to transfer NFTs.
	transferFrom(address, address, uint256)
		 *
		 *
		 *
		 *

*/

	async function countCrooksStaked() {
		setLoading(true);
		try {
			setNotification("Checking Staked Crooks");
			const address = blockchain.account;
			const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);
			const sbalances = await vaultcontract.methods.balanceOf(address).call();
			setStakedCount(sbalances);
			NotificationManager.success(StakedCount);
		} catch (error) {
			console.log(error);
			NotificationManager.error("Error counting staked crooks");
		} finally {
			setLoading(false);
			setNotification(null);
		}
	}

	async function countCrooksWallet() {
		try {
			setLoading(true);
			const address = blockchain.account;
			const contract = new Web3EthContract(ABI, NFTCONTRACT);
			const balances = await contract.methods.balanceOf(address).call();
			setWalletCount(balances);
			setLoading(false);
			NotificationManager.success(WalletCount);
		} catch (error) {
			setLoading(false);
			NotificationManager.error('Error counting crooks in wallet.');
			console.error(error);
		}
	}


	// APPROVE NFTS BUTTON 
	async function approveall() {
		try {
			handleNotification("Approving NFTs", false);
			setLoading(true);
			var tokenids = document.querySelector("[name=stkid]").value;
			const contract = new Web3EthContract(ABI, NFTCONTRACT);
			const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);
			await contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({ from: blockchain.account });
		} catch (error) {
			handleNotification("NFTs approved for staking", true);
			setLoading(false);
		}
	}




	// STAKE FUNCTION BUTTON
	async function stakeit() {
		try {
			setLoading(true);
			handleNotification("Staking", false);
			const tokenids = document.querySelector("[name=stkid]").value.split(",").map((x) => x.trim());
			const contract = new Web3EthContract(ABI, NFTCONTRACT);
			const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);
			await vaultcontract.methods.stake(tokenids.map(Number)).send({ from: blockchain.account });
			setLoading(false);
			NotificationManager.success("Successfully staked the NFT", tokenids);
		} catch (error) {
			setLoading(false);
			NotificationManager.error("ERROR: Failed to stake the NFT");
			console.error(error);
		}
		handleNotification("", true);
	}

	// UNSTAKE BUTTON FUNCTION
	async function unstakeit() {
		handleNotification("Unstaking");
		setLoading(true);
		var tokenids = (document.querySelector("[name=stkid]").value);
		tokenids = tokenids.split(',').map(x => parseInt(x.trim(), 10));

		const contract = new Web3EthContract(ABI, NFTCONTRACT);
		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);
		vaultcontract.methods.unstake(tokenids).send({ from: blockchain.account })
			.then(() => {
				NotificationManager.success("NFTs unstaked successfully!");
			})
			.catch((error) => {
				NotificationManager.error("Error unstaking NFTs: " + error);
			});
	}

	// CLAIM FUNCTION
	async function claimit() {
		
		handleNotification("Claiming");
		var tokenids = document.querySelector("[name=claimid]").value;
		tokenids = tokenids.toString().split(',').map(x => parseInt(x.trim(), 10));
		const contract = new Web3EthContract(ABI, NFTCONTRACT);
		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);

		try {
			await vaultcontract.methods.claim(tokenids).send({ from: blockchain.account });
			NotificationManager.success("Successfully claimed the rewards!");
		} catch (error) {
			NotificationManager.error("Failed to claim the rewards. ");
		}
	}
	
	// VIEW REWARDS BUTTON
	const rewardinfo = async () => {
		
		NotificationManager.info('Checking For Rewards');
		var tokenids = document.querySelector("[name=claimid]").value;
		tokenids = tokenids.toString().split(',').map(x => parseInt(x.trim(), 10));
		const contract = new Web3EthContract(ABI, NFTCONTRACT);
		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);


		let info = await Promise.all(tokenids.map(async (tokenId) => {
			return await vaultcontract.methods.earningInfo(blockchain.account, [tokenId]).call();
		}));

		let totalRewards = 0;
		info.forEach((reward) => {
			totalRewards += reward[0];
		});

		const rewardsInEther = totalRewards / 10 ** 18;

		console.log("Total rewards: ", totalRewards);
		console.log("Total rewards in Ether: ", rewardsInEther);
		setCurrentRewardInfo(rewardsInEther);
		console.log(info)
	};

	// VIEW TOTAL STAKED BUTTON
	const stakedinfo = async () => {
		
		NotificationManager.info('Fetching NFTs Staked');
		const contract = new Web3EthContract(ABI, NFTCONTRACT);
		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);
		
		let SInfo = await vaultcontract.methods.tokensOfOwner(blockchain.account).call();
		console.log(SInfo)
		let SInfoArray = SInfo.map(String);

		let strValue = SInfoArray.join(", ");
		let chunks = strValue.match(/.{1,10}/g);
		let formattedString = chunks.join("\n");
		console.log(formattedString);
		setCurrentSInfo(formattedString);
		//setCurrentSInfo(SInfo);
		//SInfo.truncate
		//let strValue = String(SInfo);
		//console.log(strValue);
		//setCurrentSInfo(strValue)
			
		console.log(SInfo)
		NotificationManager.success('SUCCESS');
		
	}

	const checkWhitelistStatus = async () => {
		// Call the "verifyUser" method of the contract
		
		
		handleNotification("Checking Whitelist");
		const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);
		const result = await vaultcontract.methods.verifyUser(blockchain.account).call();

		setWhitelistStatus(result);
		
		
		console.log(WhitelistStatus);

		if (result === true) {
			
			NotificationManager.success('User is WHITELISTED');
		} else {
			
			NotificationManager.error('User is NOT on the Whitelist');
		}
		


		let resultString = result.toString()

		setWhitelistStatus(resultString);
	};

//-----------------------------------------------------------------------------
// END SECTION 









// START SECTION: UNUSED CODE SNIPPETS 
	//-------------------------------------------------------------------------------


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






		//------------------------------------
		/* GETTING ALL STAKED NFTS - ALTERNATE
		 * //---------------------------------
		 * 
		 * 
		 * 
		 * 
		 * 
		async function getNFTsInJail() {
			// Get the address of the Vault contract
			const vaultAddress = STAKINGCONTRACT;

			// Connect to the Vault contract
			const vault = new Web3EthContract(VAULTABI, STAKINGCONTRACT);

			// Get the events from the NFTStaked event
			const events = await vault.getPastEvents("NFTStaked", { fromBlock: 0, toBlock: "2000" });

			// Filter the events to get only the tokenIds that are currently in jail
			const tokenIds = events
				.filter(event => event.returnValues.value > 0)
				.map(event => event.returnValues.tokenId);

			// Return the tokenIds
		
			console.log("NFT'S IN LOCK UP: ", tokenIds);
		}




	

		async function getNFTsInJail() {
			// Get the address of the Vault contract
			const vaultAddress = STAKINGCONTRACT;

			// Connect to the Vault contract
			const vault = new web3.eth.Contract(VAULTABI, vaultAddress);

			let fromBlock = 0;
			let toBlock = 2000;
			let allEvents = [];

			// Get the events in chunks of 2000 blocks
			while (fromBlock <= 'latest') {
				const events = await vault.getPastEvents("NFTStaked", { fromBlock, toBlock });
				allEvents = allEvents.concat(events);

				fromBlock = toBlock + 1;
				toBlock = toBlock + 2000;
			}

			// Filter the events to get only the tokenIds that are currently in jail
			const tokenIds = allEvents
				.filter(event => event.returnValues.value > 0)
				.map(event => event.returnValues.tokenId);

			// Return the tokenIds
			return tokenIds;
			console.log("NFT'S IN LOCK UP: ", tokenIds);
		}


	*/




		//---------------

		// GET NFTS USER 
	
		//---------------

			/*
				async function getNFTs() {
					const contract = new Web3EthContract(ABI, NFTCONTRACT)
					const address = blockchain.account;


					let totalNFTs = 0;
					let nfts = [];
			

					// Get the total number of NFTs held by the user
					totalNFTs = await contract.methods.balanceOf(address).call();

					// Loop through all of the NFTs held by the user
					for (let i = 0; i < totalNFTs; i++) {

						// Get the token ID for the current NFT
						const tokenId = await contract.methods.tokenOfOwnerByIndex(address, i).call();

						// Get the NFT metadata and image URI
						const uri = await contract.methods.tokenURI(tokenId).call();
						let uriJson = JSON.parse(uri);
						let name = uriJson["name"];
						let image = uriJson["image"].replace("ipfs://", "https://ipfs.infura.io/ipfs/");
				
						console.log(uri);
						console.log(nfts)





						// Add the NFT information to the array
						nfts.push({
							tokenId: tokenId,
							metadata: name,
							image: image
						});
					}
			



					// Display the NFT information in a user-friendly manner
					let output = '';
					nfts.forEach(nft => {
						output += `
						  <div>
							<p>Token ID: ${nft.tokenId}</p>
							<p>Metadata: ${nft.metadata}</p>
							<img src="${nft.image}" alt="NFT Image">
						  </div>
						`;
					});

					document.getElementById("output").innerHTML = output;
			
				}
			*/
	


	////////////////////////////
	// GETNFTS: WORKING FUNCTION
	//---------------------------

	// Handle IPFS Metadata
	function addIPFSProxy(ipfsHash) {
		const URL = "https://idm.infura-ipfs.io/ipfs/"
		const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
		const ipfsURL = URL + hash

		console.log(ipfsURL)
		return ipfsURL
	}

	// Load More NFTs
	const loadMore = () => {
		setStartIndex(startIndex + 10);
		getNFTs(startIndex + 10);
	};

	// Load First Ten NFTs
	const getFirstTen = () => {
		setStartIndex(startIndex + 0);
		getNFTs(startIndex + 0);
	};

	// Full getNFTs Function
	//-----------------------
	async function getNFTs(startIndex) {
		const contract = new Web3EthContract(ABI, NFTCONTRACT)
		const address = blockchain.account;

		
		let totalNFTs = 0;
		let nfts = [];
		


		// Get the total number of NFTs held by the user
		totalNFTs = await contract.methods.balanceOf(address).call();
		console.log('totalNFTs:', totalNFTs);
		// Loop through all of the NFTs held by the user

		

		for (let i = startIndex; i < 100 && i < totalNFTs; i++) {
			if (i >= totalNFTs) {
				break;
			}
			// Get the token ID for the current NFT
			const tokenId = await contract.methods.tokenOfOwnerByIndex(address, i).call();
			console.log('tokenId:', tokenId);
			// Get the NFT metadata and image URI
			const uri = await contract.methods.tokenURI(tokenId).call();
			const ipfsURL = addIPFSProxy(uri);
			const request = new Request(ipfsURL);
			const response = await fetch(request);
			const metadata = await response.json();
			console.log(metadata.name); // Metadata in JSON

			const image = addIPFSProxy(metadata.image);
			let jsonData = {};
			console.log('uri:', uri);
			console.log(metadata);
			console.log(metadata.artist);
			console.log(image);


			let jsonString = JSON.stringify(uri.replace(/ipfs:\/\//g, "https://"));

			jsonData = JSON.parse(jsonString);
			console.log(jsonData);
			



			let name = addIPFSProxy(metadata.name);
			console.log(metadata.name);
			let description = addIPFSProxy(metadata.description);
			console.log(description)


			// Add the NFT information to the array
			const existingNFT = nfts.find(nft => nft.tokenId === tokenId);
			if (!existingNFT) {
				nfts.push({
					tokenId: tokenId,
					metadata: metadata,
					image: image,
				});
			}
			console.log(nfts);

			// Build and display the HTML element for each NFT
			// Build and display the HTML element for each NFT
			let content = `

			<div class="card col-md-3">
    <img src="${image}" class="card-img-top" alt="${name}" width="300" height="300">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${description}</p>
      <button class="btn btn-primary stake-btn zoom" data-tokenid="${tokenId}">Stake</button>
    </div>
  </div>

<style>
  .card {
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: none;
    margin-bottom: 20px;
  }

  .card-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
    text-align: center;
  }

  .card-text {
color: black;
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
    height: 80px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .card-img-top {
    height: auto;
    max-width: 100%;
    object-fit: cover;
    margin-bottom: 10px;
  }

  .btn {
    transition: background-color 0.5s ease;
    color: #fff;
    display: block;
    margin: 0 auto;
    margin-top: 10px;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 25px;
    background-color: blue;
  }

  .btn:hover {
    background-color: #2d6ae8;
  }

  .zoom {
    transition: transform 0.5s ease;
  }

  .zoom:hover {
    transform: scale(1.1);
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
  #claimBtn.loading:after {
    /* styles for loading indicator */
  }

  @media only screen and (max-width: 768px) {
    .card {
      width: 45%;
    }
  }

  @media only screen and (max-width: 480px) {
    .card {
      width: 100%;
    }
  }
</style>


			
			`;

			document.getElementById("nftid").innerHTML += content;

			// Add event listener to stake buttons
			document.querySelectorAll('.stake-btn').forEach(btn => {
				btn.addEventListener('click', async event => {
					const tokenId = event.target.dataset.tokenid;

					const contract = new Web3EthContract(ABI, NFTCONTRACT);
					const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);

					vaultcontract.methods.stake([tokenId]).send({ from: blockchain.account });
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

			loadMoreBtn.addEventListener("click", async () => {
				startIndex += 10;
				await getNFTs(startIndex);
			});


			
		}
		setNfts(nfts);
		return nfts;
		

		
	}
	

// START getStakedNFTs Function
	//----------------------------
	async function getNFTsInJail() {
		
		const contract = new Web3EthContract(VAULTABI, STAKINGCONTRACT)
		const address = blockchain.account;
		let totalNFTs = 0;
		let nfts = [];

		// Get the total number of NFTs held by the user
		totalNFTs = await contract.methods.balanceOf(address).call();
		console.log('totalNFTs:', totalNFTs);
		// Loop through all of the NFTs held by the user

		for (let i = 0; i < totalNFTs; i++) {

			if (i === 10) {
				break;
			}
			// Get the token ID for the current NFT
			const tokenId = await contract.methods.tokensOfOwner(address).call();
			console.log('tokenId:', tokenId);

			// Add the NFT information to the array
			nfts.push({
				tokenId: tokenId,
			});
			console.log(nfts);

			// Build and display the HTML element for each NFT
			let contents = "";
			for (let i = 0; i < tokenId.length; i++) {
				let tokenIds = tokenId[i];
				contents += `
			<div class="card col-md-3">
			  
			  <div class="card-body">
				<img src="https://images.pexels.com/photos/4291/door-green-closed-lock.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="card-img-top" width=300 height=300>
				<h5 class="card-title">Token ID: ${tokenIds}</h5>
				<button data-tokenid="${tokenIds}" class="btn btn-primary unstake-btn zoom" style="width: 100%; padding: 10px; margin-top: 10px;">
				Unstake
				<span style="font-size: 0.7em; color: gray; display: block;">Coming Soon</span>
			</button>

						  </div>

						  <style>
							  .card {
								background-color: #fff;
								box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
								border-radius: 10px;
								border: 1px solid #ccc;
								margin-bottom: 20px;
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

							  #stakeBtn.loading:after, #unstakeBtn.loading:after,		#claimBtn.loading:after,
						</style>
			</div>
	`;
			}
			document.getElementById("nftid2").innerHTML += `
		<div class="d-flex flex-wrap justify-content-center">
			${contents}
		</div>

	`;



			// Add event listener to stake buttons
			document.querySelectorAll('.unstake-btn').forEach(btn => {
				btn.addEventListener('click', async event => {
					const tokenId = event.target.dataset.tokenid;

					const contract = new Web3EthContract(ABI, NFTCONTRACT);
					const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);

					vaultcontract.methods.unstake([tokenId]).send({ from: blockchain.account });
				});
			});
		}
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


	////////////////////////////////////////////////////////////////////////////////////


	//////////////////////////////////
	// CROOKS NFT CONTRACT FUNCTIONS 
	//--------------------------------
	/*
	async function getUserNFTs() {
		var nft =
		const rewardscontract = new Web3EthContract(NFTSABI, NFTSCONTRACT);
    }
	*/

	// CGOLD CONTRACT FUNCTIONS 


	// BURN FUNCTION 
	//async function burnFrom() {
	//	var amount = Number(document.querySelector("[name=burnid]").value);
	//	const rewardscontract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);
		

	//	rewardscontract.methods.burnFrom(blockchain.account, "1000000000000000000").send({ from: blockchain.account });
	//}

	// TRANSFER FUNCTION 
	//async function transfer() {
		
	//	var address = Number(document.querySelector("[name=burnaddress]").value);
	//	const rewardscontract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);

	//	rewardscontract.methods.transfer(address, "1000000000000000000").send({ from: blockchain.account });
	//}


	// REDEEM MERCH - Wallpaper Pack FUNCTION 
	//async function burnFrom() {
	//	var amount = Number(document.querySelector("[name=burnid]").value);
	//	const rewardscontract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);


	//	rewardscontract.methods.burnFrom(blockchain.account, "100000000000000000000").send({ from: blockchain.account });
	//
	// REDEEM MERCH - T-Shirt 
	//async function burnFrom() {
	//	var amount = Number(document.querySelector("[name=burnid]").value);
	//	const rewardscontract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);


	//	rewardscontract.methods.burnFrom(blockchain.account, "1000000000000000000000").send({ from: blockchain.account });
	//}

	// REDEEM MERCH - HOODIE
	//async function burnFrom() {
	//	var amount = Number(document.querySelector("[name=burnid]").value);
	//	const rewardscontract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);


	//	rewardscontract.methods.burnFrom(blockchain.account, "5000000000000000000000").send({ from: blockchain.account });
	//}
	const [showBetaWarning, setShowBetaWarning] = useState(true);
	const [notification, setNotification] = useState(null);
	const [loading, setLoading] = useState(false);

	const [Progress, setProgress] = useState(0);
	const [TotalSupply, setTotalSupply] = useState(0);
	const [MaxSupply, setMaxSupply] = useState(0);

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
				updateProgress();
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


	////////////////////////////////////////////////////////////////////////////////////


	/////----------------------------START DISPLAYED DATA----------------------------////


	////////////////////////////////////////////////////////////////////////////////////





	try {
		return (

			<s.Screen>
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
				<button onClick={() => handleNotification("")}>Show Notification</button>
				<button onClick={handleClick}>Test</button>
				
				{showBetaWarning && (
					<div style={{ height: "60%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", zIndex: 2 }}>
						<div style={{ backgroundColor: "#f5f51f", padding: "2em", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", width: "80%" }}>
							<h3 style={{ textAlign: "center", marginBottom: "1em" }}>Beta Warning</h3>
							<img src="https://media.giphy.com/media/1XgIXQEzBu6ZWappVu/giphy.gif" alt="Beta Warning Animation" style={{ maxHeight: "20%", maxWidth: "30%" }} />
							<div style={{ display: "flex", justifyContent: "flex-end" }}>
								
								<p style={{ textAlign: "center", marginBottom: "1em" }}>
									This app is currently in beta stages and users should be aware of
									potential bugs or issues while utilizing certain features.
								</p>
								<button style={{ padding: "0.5em 1em", borderRadius: "5px", backgroundColor: "#1f87f5", color: "#fff", fontWeight: "bold", cursor: "pointer" }} onClick={() => setShowBetaWarning(false)}>Close</button>
							</div>
						</div>
					</div>
				)}


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
															checkWhitelistStatus();
												}}
											>
												CONNECT
													</StyledButton>
													<br></br>
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

													<img
														src={CroboCopNFT}
														alt="Staking NFTs"
														style={{
															width: "100%",
															height: "auto",
															objectFit: "cover",
															borderRadius: "10px",
															boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)"
														}}
													/>



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
																e.preventDefault();
																claimNFTs();
																getData();

															}}
														>
															{claimingNft ? "BUSY" : "MINT LIVE NOW"}
														</StyledButton>
														) : (
														<StyledButton
															onClick={(e) => {
																e.preventDefault();
																dispatch(disconnect());
															}}
														>
															DISCONNECT
															<span style={{ fontSize: "0.7em", color: "gray" }}>Coming Soon</span>
														</StyledButton>
											</s.Container>
											<s.Container>

												<br></br>
												<div className="stkid-container">

															<Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
																<div className="modal-content">
																	<div className="modal-section">
																		<h3>NFTs In Wallet</h3>
																		<div id="nftid" className="nft-container"></div>
																		<button id="load-more-btn" className="button load-more-btn" onClick={loadMore}>Load More</button>
																		<button className="button show-wallet-btn" onClick={getFirstTen}>Show NFTs In Wallet</button>
																	</div>
																	<div className="modal-section">
																		<h3>NFTs In Jail (Staked)</h3>
																		<div id="nftid2" className="nft-container"></div>
																		<button className="button show-jail-btn" onClick={getNFTsInJail}>Show NFTs In Jail (Staked)</button>
																		<span className="coming-soon">(Coming Soon)</span>
																	</div>
																	<div className="modal-section">
																		<h3>Action Buttons</h3>
																		<button className="button close-btn" onClick={() => setModalIsOpen(false)}>Close</button>
																	</div>
																</div>
															</Modal>



															<div className="staking-explanation">
																
																
														<img
																	src="https://i.imgur.com/y0HZJ8l.gif"
															alt="Staking NFTs"
																	style={{
																		width: "100%",
																		height: "auto",
																		objectFit: "cover",
																		borderRadius: "10px",
																		boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)"
																	}}
																/>


																<section style={{
																	backgroundColor: "darkred",
																	padding: "2rem",
																	borderRadius: "10px",
																	marginBottom: "2rem"
																}}>
																	<h2 style={{
																		fontSize: "1.75rem",
																		textAlign: "center",
																		color: "#ffffff",
																		marginBottom: "1rem"
																	}}>
																		Staking NFTs Made Easy
																	</h2>
																	<p style={{
																		fontSize: "1rem",
																		textAlign: "center",
																		color: "#ffffff",
																		marginBottom: "1rem"
																	}}>
																		Staking NFTs is a great way to earn rewards and show your support for the project. Here's how to get started:
																	</p>
																	<ul style={{
																		listStyle: "none",
																		padding: "0",
																		marginBottom: "1rem"
																	}}>
																		<li style={{
																			fontSize: "0.9rem",
																			color: "#ffffff",
																			marginBottom: "0.5rem",
																			display: "flex",
																			alignItems: "center"
																		}}>
																			<span style={{ marginRight: "1rem" }}>1.</span>
																			Obtain NFTs that are eligible for staking
																		</li>
																		<li style={{
																			fontSize: "0.9rem",
																			color: "#ffffff",
																			marginBottom: "0.5rem",
																			display: "flex",
																			alignItems: "center"
																		}}>
																			<span style={{ marginRight: "1rem" }}>2.</span>
																			Enter the Token ID's of the NFTs you want to stake into the input field
																		</li>
																		<li style={{
																			fontSize: "0.9rem",
																			color: "#ffffff",
																			marginBottom: "0.5rem",
																			display: "flex",
																			alignItems: "center"
																		}}>
																			<span style={{ marginRight: "1rem" }}>3.</span>
																			Click the "Stake" button to confirm the staking transaction
																		</li>
																		<li style={{
																			fontSize: "0.9rem",
																			color: "#ffffff",
																			marginBottom: "0.5rem",
																			display: "flex",
																			alignItems: "center"
																		}}>
																			<span style={{ marginRight: "1rem" }}>4.</span>
																			Start earning rewards for your staked NFTs
																		</li>
																	</ul>
																</section>

													</div>


															<label style={{
																color: '#ffffff'
															}} className="stkid-label">Enter Token ID's For Staking</label>
													<input
														className="stkid-input"
														type="text"
														id="stkid"
														name="stkid"
														placeholder="1,2,3,4,5"
														onChange={e => {
															const stkidArray = e.target.value.split(',').map(stkid => stkid.trim());
															// Do something with the stkidArray, such as updating the state
														}}
													/>
													<br></br>



													<div id="actionButtons">
														<button className="button" onClick={stakeit}>STAKE</button>&nbsp;&nbsp;
														<button className="button" onClick={unstakeit}>UNSTAKE</button>&nbsp;&nbsp;
														<button className="button" onClick={approveall}>APPROVE</button>
													</div>


												</div>



												<div className="input-container">
													<img
																src="https://media1.giphy.com/media/Y0OHXYB5bdyq5yF8DG/giphy.webp?cid=ecf05e47injorr7krrcfqjuckybjdy3vaoghj9061bstpx2l&rid=giphy.webp&ct=s
"
														alt="Staking NFTs"
																style={{
																	width: "100%",
																	height: "auto",
																	objectFit: "cover",
																	borderRadius: "10px",
																	boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)"
																}}
													/>
															<div className="rewards-section">
																<h2 className="rewards-section-title">Claim Your Rewards</h2>
																<p className="rewards-section-description">
																	Claiming Rewards and Viewing Rewards Per Crook is the Same as Staking.
																</p>
																<div className="rewards-table">
																	<div className="rewards-row">
																		<div className="rewards-cell">
																			<div className="rewards-step-number">1</div>
																			<div className="rewards-step-description">
																				Obtain NFTs that are already staked
																			</div>
																		</div>
																	</div>
																	<div className="rewards-row">
																		<div className="rewards-cell">
																			<div className="rewards-step-number">2</div>
																			<div className="rewards-step-description">
																				Enter the Token ID's of the NFTs you want to claim rewards for into the input field
																			</div>
																		</div>
																	</div>
																	<div className="rewards-row">
																		<div className="rewards-cell">
																			<div className="rewards-step-number">3</div>
																			<div className="rewards-step-description">
																				Click the "claim rewards" button to confirm the claim transaction
																			</div>
																		</div>
																	</div>
																	<div className="rewards-row">
																		<div className="rewards-cell">
																			<div className="rewards-step-number">4</div>
																			<div className="rewards-step-description">
																				Complete the transfer of rewards for your staked NFTs to your Metamask Wallet.
																			</div>
																		</div>
																	</div>
																</div>
															</div>

													<input
														type="text"
														name="claimid"
														id="claimid"
														className="cool-input"
														placeholder="Enter NFT ID for claim"
													/>

													<br></br>
													<button class="button" onClick={claimit}>CLAIM REWARDS</button>&nbsp;&nbsp;
													<button class="button" onClick={rewardinfo}>VIEW REWARDS </button>&nbsp;&nbsp;

													<button class="button" onClick={() => { setModalIsOpen(true); stakedinfo() }} >
														View Staked CROOKS
													</button>

															<blockquote style={{ color: "white", background: "black" }} className="reward">
																<span>Rewards Balance</span>
																{' '}
																{CurrentRewardInfo}
																{' '}$cGOLD
															</blockquote>
												</div>






														<div className="button-container">
															<div className="button-row">
																<button className="button" onClick={addTokenToMM}>
																	Add cGOLD to MetaMask
																</button>
																<button className="button" onClick={checkWhitelistStatus}>
																	Check Whitelist
																</button>
																<button className="button" onClick={countCrooksWallet}>
																	Count Crooks in Wallet
																</button>
															</div>
															<div className="button-row">
																<button className="button" onClick={countCrooksStaked}>
																	Count Crooks Staked
																</button>
																
																<blockquote style={{ color: "white", background: "black" }} className="reward">
																	<span>Whitelist Status:</span> {WhitelistStatus}
																</blockquote>
															</div>
														</div>

														<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
															<h2 style={{ fontSize: "1.75rem", textAlign: "center", color: "#ffffff", marginTop: "1rem" }}>Dashboard</h2>
															<div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
																<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
																	<div style={{ fontWeight: 'bold' }}>Total NFTs in Wallet:</div>
																	<div>{WalletCount}</div>
																</div>
																<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
																	<div style={{ fontWeight: 'bold' }}>Total NFTs Staked by User:</div>
																	<div>{StakedCount}</div>
																</div>
																<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
																	<div style={{ fontWeight: 'bold' }}>Total NFTs Staked in Contract:</div>
																	<div></div>
																</div>
																<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																	<div style={{ fontWeight: 'bold' }}>Total Rewards Accrued:</div>
																	<div></div>
																</div>
															</div>
															<div id="nftid3"></div>
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
	} catch (error) {
		console.error(error);
    }
} 

export default Mint;

