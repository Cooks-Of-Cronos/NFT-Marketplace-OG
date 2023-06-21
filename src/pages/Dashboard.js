import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Web3EthContract from "web3-eth-contract";

import { CroBadgesContract } from '../mint';
import { REWARDSCONTRACT } from '../mint';
import { NFTCONTRACT } from '../mint';
import { ABI } from '../mint';


import { useDispatch, useSelector } from 'react-redux';
import { connect } from '../redux/blockchain/blockchainActions';
import { fetchData } from "../redux/data/dataActions.js";



const CardGridContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  
  

  @media (max-width: 768px) {
    /* Styles for mobile devices */
    grid-template-columns: 1fr;
  }
`;
const Card = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  max-width: 100%;
  box-sizing: border-box; /* Ensure padding and border are included in the width */

`;

const CardImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
`;

const Heading = styled.h2`
  font-size: 18px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #ccc;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const Key = styled.span`
  font-weight: bold;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;


const croboABI = [
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

const croboContract = "0x646f4AfB0CEa2FAB3c44282BD764A91637D7781d"


const croPugContract = "0x82E0Cbd053Fbbcd522A7B7470293755278e491EE"

const croPugABI = 
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


//add crobadge ABIs

const Dashboard = () => {
    const [contractData, setContractData] = useState({
        balance: '',
        supply: '',
        owner: '',
        cost: '',
        maxMint: '',
        name: '',
        paused: '',
      });
      const [firstContractData, setFirstContractData] = useState({
        balance: '',
        supply: '',
        owner: '',
        cost: '',
        maxMint: '',
        name: '',
        paused: '',
      });
      
      const [secondContractData, setSecondContractData] = useState({
        balance: '',
        supply: '',
        owner: '',
        cost: '',
        maxMint: '',
        name: '',
        paused: '',
      });
    const [ supply, setSupply] = useState('')
    const [ owner, setOwner] = useState('')
    const [ cost, setCost] = useState('')
    const [maxMint, setMaxMint] = useState('')
    const [fName, setFname] = useState('')
    const [thirdAddress, setThirdAddress] = useState('');

    const dispatch = useDispatch();
    const [account, setAccount] = useState('');
    const blockchain = useSelector((state) => state.blockchain);


    const [pauseState, setPauseState] = useState(false);
    const [transferFromFrom, setTransferFromFrom] = useState('');
    const [transferFromTo, setTransferFromTo] = useState('');
    const [transferFromTokenId, setTransferFromTokenId] = useState('');
    // Define other necessary state variables and setters
    


 


    //SETTER METHODS: 
    const handlePauseToggle = (checked) => {
        setPauseState(checked);
      };
      
      const handlePause = async () => {
        const firstContract = new Web3EthContract(ABI, NFTCONTRACT);
        await firstContract.methods.pause(pauseState).send({ from: blockchain.account });
      };
      
      const handleRenounceOwnership = async () => {
        const firstContract = new Web3EthContract(ABI, NFTCONTRACT);
        await firstContract.methods.renounceOwnership().send({ from: blockchain.account });
      };
      
      const handleReveal = async () => {
        const firstContract = new Web3EthContract(ABI, NFTCONTRACT);
        await firstContract.methods.reveal().send({ from: blockchain.account });
      };

      const handleTransferFrom = async () => {
        const firstContract = new Web3EthContract(ABI, NFTCONTRACT);
        await firstContract.methods
          .safeTransferFrom(transferFromFrom, transferFromTo, transferFromTokenId)
          .send({ from: blockchain.account });
      };




      const handlePauseToggleSecond = (checked) => {
        setPauseStateSecond(checked);
      };
      
      const handlePauseSecond = async () => {
        const secondContract = new Web3EthContract(croboABI, croboContract);
        await secondContract.methods.pause(pauseStateSecond).send({ from: blockchain.account });
      };
      
      const handleRenounceOwnershipSecond = async () => {
        const secondContract = new Web3EthContract(croboABI, croboContract);
        await secondContract.methods.renounceOwnership().send({ from: blockchain.account });
      };
      
      const handleRevealSecond = async () => {
        const secondContract = new Web3EthContract(croboABI, croboContract);
        await secondContract.methods.reveal().send({ from: blockchain.account });
      };
      
      const handleTransferFromSecond = async () => {
        const secondContract = new Web3EthContract(croboABI, croboContract);
        await secondContract.methods
          .safeTransferFrom(transferFromFromSecond, transferFromToSecond, transferFromTokenIdSecond)
          .send({ from: blockchain.account });
      };


      const getSymbol = async () => {
        const firstContract = new Web3EthContract(ABI, NFTCONTRACT);
        const symbol = await firstContract.methods.symbol().call();
        console.log(symbol);
      };
      
      const getTokenByIndex = async (index) => {
        const firstContract = new Web3EthContract(ABI, NFTCONTRACT);
        const token = await firstContract.methods.tokenByIndex(index).call();
        console.log(token);
      };
      
      const getTokenOfOwnerByIndex = async (owner, index) => {
        const firstContract = new Web3EthContract(ABI, NFTCONTRACT);
        const token = await firstContract.methods.tokenOfOwnerByIndex(owner, index).call();
        console.log(token);
      };
      
      const getTokenURI = async (tokenId) => {
        const firstContract = new Web3EthContract(ABI, NFTCONTRACT);
        const tokenURI = await firstContract.methods.tokenURI(tokenId).call();
        console.log(tokenURI);
      };
      
      const getWalletOfOwner = async (owner) => {
        const firstContract = new Web3EthContract(ABI, NFTCONTRACT);
        const wallet = await firstContract.methods.walletOfOwner(owner).call();
        console.log(wallet);
      };
      
      const withdrawFunds = async () => {
        const firstContract = new Web3EthContract(ABI, NFTCONTRACT);
        await firstContract.methods.withdraw().send({ from: blockchain.account, value: 0 });
      };
      


// Method to handle button click and fetch contract data
    const handleButtonClick = async () => { //getCroCrookNFTData
        // your code to fetch contract data here 
        // For now, let's set a placeholder string 
        const address = blockchain.account;

        //croCrookContract
		const firstContract = new Web3EthContract(ABI, NFTCONTRACT);

        // READ METHODS
        //croCrookBalance, croCrookSupply etc.
		const firstBalance = await firstContract.methods.balanceOf(address).call();
       const firstSupply = await firstContract.methods.totalSupply().call();
        console.log(firstSupply)
        const firstOwner = await firstContract.methods.owner().call();
        const firstCost = await firstContract.methods.cost().call();
        const firstMaxMint = await firstContract.methods.maxMintAmount().call();
        const firstMaxSupply = await firstContract.methods.maxSupply().call();
        const firstName = await firstContract.methods.name().call();
        const firstPaused = await firstContract.methods.paused().call();


        //WRITE METHODS
        //const [CroCrookNFTData, setCroCrookNFTData] = useState({})
        setContractData({ //setCroCrookNFTData
            balance: String(firstBalance),
            totalSupply: String(firstSupply),
            owner: String(firstOwner),
            cost: String(firstCost),
            maxMint: String(firstMaxMint),
            maxSupply: String(firstMaxSupply),
            name: String(firstName),
            paused: String(firstPaused),
        });

        console.log(firstBalance);
    
    console.log(firstOwner);
    console.log(firstCost);
    console.log(firstMaxMint);
    console.log(firstMaxSupply);
    console.log(firstName);
    console.log(firstPaused);
    };

    const [transferFromFromSecond, setTransferFromFromSecond] = useState('');
    const [transferFromToSecond, setTransferFromToSecond] = useState('');
    const [transferFromTokenIdSecond, setTransferFromTokenIdSecond] = useState(0);
    const [pauseStateSecond, setPauseStateSecond] = useState(false);


    const getContract2Data = async () => { //getCroboNFTData
        // your code to fetch contract data here 
        // For now, let's set a placeholder string 
        const address = blockchain.account;
        //croboContract
		const secondContract = new Web3EthContract(croboABI, croboContract);


        // READ METHODS
        // croboBalance, croboCost etc.
		const secondBalance = await secondContract.methods.balanceOf(address).call();
       
        const secondOwner = await secondContract.methods.owner().call();
        const secondCost = await secondContract.methods.cost().call();
        const secondMaxMint = await secondContract.methods.maxMintAmount().call();
        const secondMaxSupply = await secondContract.methods.maxSupply().call();
        const secondName = await secondContract.methods.name().call();
        const secondPaused = await secondContract.methods.paused().call();


        //WRITE METHODS
        setFirstContractData({ //CroboNFTData
            balance: String(secondBalance),
            
            owner: String(secondOwner),
            cost: String(secondCost),
            maxMint: String(secondMaxMint),
            maxSupply: String(secondMaxSupply),
            name: String(secondName),
            paused: String(secondPaused),
        });

            console.log(firstBalance);
            
            console.log(secondOwner);
            console.log(secondCost);
            console.log(secondMaxMint);
            console.log(secondMaxSupply);
            console.log(secondName);
            console.log(secondPaused);


    
    
        const handlePauseToggleSecond = (checked) => {
                setPauseStateSecond(checked);
        };
            
        const handlePauseSecond = async () => {
                await secondContract.methods.pause(pauseStateSecond).send({ from: blockchain.account });
        };
            
        const handleRenounceOwnershipSecond = async () => {
                await secondContract.methods.renounceOwnership().send({ from: blockchain.account });
        };
            
        const handleRevealSecond = async () => {
                await secondContract.methods.reveal().send({ from: blockchain.account });
        };
            
        const handleTransferFromSecond = async () => {
                
                await secondContract.methods
                .safeTransferFrom(transferFromFromSecond, transferFromToSecond, transferFromTokenIdSecond)
                .send({ from: blockchain.account });
        };


    }

    // Method to handle button click and fetch contract data
const handleThirdButtonClick = async () => { //getCroBadgeNFTData()
    // your code to fetch contract data here
    // For now, let's set a placeholder string
    
    const address = blockchain.account;
    const thirdContract = new Web3EthContract(croPugABI,croPugContract);
   <Input
    type="text"
    placeholder="type address here"
    onChange={(event) => setThirdAddress(event.target.value)}
  />
    // READ METHODS
    // croBadgeNFTBalance, croBadgeNFTOwner etc.
    const thirdBalance = await thirdContract.methods.balanceOf(address).call();
  
    const thirdOwner = await thirdContract.methods.owner().call();
    const thirdCost = await thirdContract.methods.cost().call();
    const thirdMaxMint = await thirdContract.methods.maxMintAmount().call();
    const thirdMaxSupply = await thirdContract.methods.maxSupply().call();
    const thirdName = await thirdContract.methods.name().call();
    const thirdPaused = await thirdContract.methods.paused().call();
  
    // WRITE METHODS
    setSecondContractData({ //setCrobadgeNFTData
      balance: String(thirdBalance),
      owner: String(thirdOwner),
      cost: String(thirdCost),
      maxMint: String(thirdMaxMint),
      maxSupply: String(thirdMaxSupply),
      name: String(thirdName),
      paused: String(thirdPaused),
    });
  
    console.log(thirdBalance);
    console.log(thirdOwner);
    console.log(thirdCost);
    console.log(thirdMaxMint);
    console.log(thirdMaxSupply);
    console.log(thirdName);
    console.log(thirdPaused);
  };
  

    useEffect(() => {
        
        
    }, []);

    return (
        <div>
      <Button onClick={() => dispatch(connect())}>CONNECT</Button>
      <Button>FETCH</Button>
      <h1>Application</h1>
	  <CardGridContainer>
      <CardGrid>
        <Card>
            <h2>Cro Crooks NFT Contract</h2>
            <CardImage src="https://i.imgur.com/0WgD1as.png" alt="NFT Image" />
          <button onClick={handleButtonClick}>Get Crook Data</button>
          <Input type="text" placeholder="type address here" />
          {contractData && (
            <Table>
            <tbody>
              <TableRow>
                <TableHeader>Key</TableHeader>
                <TableHeader>Value</TableHeader>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Key>Balance:</Key>
                </TableCell>
                <TableCell>{contractData.balance}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Key>Supply:</Key>
                </TableCell>
                <TableCell>{contractData.totalSupply}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Key>Owner:</Key>
                </TableCell>
                <TableCell>{contractData.owner}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Key>Cost:</Key>
                </TableCell>
                <TableCell>{contractData.cost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Key>Max Mint:</Key>
                </TableCell>
                <TableCell>{contractData.maxMint}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Key>Max Supply:</Key>
                </TableCell>
                <TableCell>{contractData.maxSupply}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Key>Name:</Key>
                </TableCell>
                <TableCell>{contractData.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Key>Paused:</Key>
                </TableCell>
                <TableCell>{contractData.paused}</TableCell>
              </TableRow>
            </tbody>
          </Table>
          
          )}
         <Wrapper>
  <FormWrapper>
    <FormGroup>
      <Label htmlFor="pause">Pause:</Label>
      <Input
        type="checkbox"
        id="pause"
        onChange={(event) => handlePauseToggle(event.target.checked)}
      />
    </FormGroup>
    <Button onClick={handlePause}>Pause</Button>
  </FormWrapper>
  <Button onClick={handleRenounceOwnership}>Renounce Ownership</Button>
  <Button onClick={handleReveal}>Reveal</Button>
  <FormWrapper>
    <FormGroup>
      <Label htmlFor="from">From:</Label>
      <Input
        type="text"
        id="from"
        value={transferFromFrom}
        onChange={(event) => setTransferFromFrom(event.target.value)}
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="to">To:</Label>
      <Input
        type="text"
        id="to"
        value={transferFromTo}
        onChange={(event) => setTransferFromTo(event.target.value)}
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="tokenId">Token ID:</Label>
      <Input
        type="number"
        id="tokenId"
        value={transferFromTokenId}
        onChange={(event) => setTransferFromTokenId(event.target.value)}
      />
    </FormGroup>
    <Button onClick={handleTransferFrom}>Transfer From</Button>
  </FormWrapper>
  <Button onClick={() => getSymbol()}>Get Symbol</Button>
  <Button onClick={() => getTokenByIndex(0)}>Get Token By Index</Button>
  <Button onClick={() => getTokenOfOwnerByIndex(blockchain.account, 0)}>Get Token Of Owner By Index</Button>
  <Button onClick={() => getTokenURI(999)}>Get Token URI</Button>
  <Button onClick={() => getWalletOfOwner(blockchain.account)}>Get Wallet Of Owner</Button>
  <Button onClick={() => withdrawFunds()}>Withdraw Funds</Button>
</Wrapper>
          
        </Card>

        <Card>
            <h2>CroboCop NFT Contract</h2>
        <CardImage src="https://i.imgur.com/7Fm6G1g.gif" alt="NFT Image" />
          <button onClick={getContract2Data}>Get Crobo Data</button>
          <Input type="text" placeholder="ThirdAddress" />
          {firstContractData && (
  <Table>
    <tbody>
      <TableRow>
        <TableHeader>Key</TableHeader>
        <TableHeader>Value</TableHeader>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Balance:</Key>
        </TableCell>
        <TableCell>{firstContractData.balance}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Supply:</Key>
        </TableCell>
        <TableCell>{firstContractData.supply}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Owner:</Key>
        </TableCell>
        <TableCell>{firstContractData.owner}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Cost:</Key>
        </TableCell>
        <TableCell>{firstContractData.cost}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Max Mint:</Key>
        </TableCell>
        <TableCell>{firstContractData.maxMint}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Max Supply:</Key>
        </TableCell>
        <TableCell>{firstContractData.maxSupply}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Name:</Key>
        </TableCell>
        <TableCell>{firstContractData.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Paused:</Key>
        </TableCell>
        <TableCell>{firstContractData.paused}</TableCell>
      </TableRow>
    </tbody>
  </Table>
)}
<div>
    <Label htmlFor="pauseSecond">Pause:</Label>
    <Input
      type="checkbox"
      id="pauseSecond"
      onChange={(event) => handlePauseToggleSecond(event.target.checked)}
    />
    <Button onClick={handlePauseSecond}>Pause</Button>
  </div>
  <div>
    <Button onClick={handleRenounceOwnershipSecond}>Renounce Ownership</Button>
  </div>
  <div>
    <Button onClick={handleRevealSecond}>Reveal</Button>
  </div>
  <div>
    <Label htmlFor="fromSecond">From:</Label>
    <Input
      type="text"
      id="fromSecond"
      value={handleTransferFromSecond}
      onChange={(event) =>  setTransferFromToSecond(event.target.value)}
    />
    <Label htmlFor="toSecond">To:</Label>
    <Input
      type="text"
      id="toSecond"
      value={transferFromToSecond}
      onChange={(event) => setTransferFromToSecond(event.target.value)}
    />
    <Label htmlFor="tokenIdSecond">Token ID:</Label>
    <Input
      type="number"
      id="tokenIdSecond"
      value={transferFromTokenIdSecond}
      onChange={(event) => setTransferFromTokenIdSecond(event.target.value)}
    />
    <Button onClick={handleTransferFromSecond}>Transfer From</Button>
  </div>
        </Card>
        <Card>
		<CardImage src="https://i.imgur.com/kYL6q8p.png" alt="NFT Image" />
          <button onClick={handleThirdButtonClick} >Button</button>
          <Input
    type="text"
    placeholder="type address here"
    onChange={(event) => setThirdAddress(event.target.value)}
  />
          {secondContractData && (
  <Table>
    <tbody>
      <TableRow>
        <TableHeader>Key</TableHeader>
        <TableHeader>Value</TableHeader>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Balance:</Key>
        </TableCell>
        <TableCell>{secondContractData.balance}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Supply:</Key>
        </TableCell>
        <TableCell>{secondContractData.supply}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Owner:</Key>
        </TableCell>
        <TableCell>{secondContractData.owner}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Cost:</Key>
        </TableCell>
        <TableCell>{secondContractData.cost}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Max Mint:</Key>
        </TableCell>
        <TableCell>{secondContractData.maxMint}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Max Supply:</Key>
        </TableCell>
        <TableCell>{secondContractData.maxSupply}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Name:</Key>
        </TableCell>
        <TableCell>{secondContractData.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Key>Paused:</Key>
        </TableCell>
        <TableCell>{secondContractData.paused}</TableCell>
      </TableRow>
    </tbody>
  </Table>
)}
        </Card>
        <Card>
          <button >Get CroBadge Data</button>
          <Input type="text" placeholder="input 4" />
          <Heading>Contract Data</Heading>
		  <CardImage src="https://i.imgur.com/A6sbnlk.png" alt="NFT Image" />
        </Card>
        <Card>
          <button>Get CroMinion Data</button>
          <Input type="text" placeholder="input 5" />
          <Heading>Contract Data</Heading>
		  <CardImage src="https://i.imgur.com/3K1di27.png" alt="NFT Image" />
        </Card>
      </CardGrid>
	  </CardGridContainer>
    </div>
    )
};

export default Dashboard;