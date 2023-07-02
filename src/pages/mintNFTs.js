import React, {  useEffect, useState } from 'react';
import Web3 from 'web3';
import Web3EthContract from 'web3-eth-contract';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from '../redux/blockchain/blockchainActions';
import { fetchData } from "../redux/data/dataActions.js";

import Dashboard from './Dashboard';
import { CroBadgesContract } from '../mint';
import { REWARDSCONTRACT } from '../mint';
import { NFTCONTRACT } from '../mint';
import { ABI } from '../mint';
import { Button, Grid, TextField } from '@material-ui/core';
import styled from 'styled-components';
import nftImage from '../images/nft.png'




// 0x54d2a5B51FF06dcf01a3AB1646A995855336a064
//old: 0x0f89DB081b0C988967de134E43F8A3988D5c1f47
const INFURA_ID = 'c66d5493eff848ca89349923e7d1131a';
const contractAddress = '0x54d2a5B51FF06dcf01a3AB1646A995855336a064';
const projectId = '2KhkyHx6ag97KJ6lJJpZaQdNF2h';
const projectSecret = 'cda2a42846ea69280f94f263590af556';
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
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
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "mint",
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
				"name": "data",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "descriptions",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "names",
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
		"inputs": [],
		"name": "tokenId",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenURIs",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const abi2 = [
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
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
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "safeMint",
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
				"name": "data",
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
	}
]


const BannerImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;


const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.5;
`;



const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
// Define the Transfer event signature from the ERC721 standard
const transferEventSignature = web3.utils.keccak256('Transfer(address,address,uint256)');


const NFTMinter = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageHash, setImageHash] = useState('');
  const blockchain = useSelector((state) => state.blockchain);
  const [account, setAccount] = useState('');
  const [latestNFT, setLatestNFT] = useState(null);
  const [contractData, setContractData] = useState('')
//   const onDrop = async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const reader = new FileReader();
//     reader.onload = async () => {
//       const fileData = Buffer.from(reader.result);
//       const formData = new FormData();
//       formData.append('file', fileData);
  
//       try {
//         const response = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
//           method: 'POST',
//           body: formData,
//           headers: {
//             Authorization: `Basic ${btoa(`${projectId}:${projectSecret}`)}`,
//           },
//         });
  
//         const data = await response.json();
//         setImageHash(data.Hash);
//       } catch (error) {
//         console.error('Error uploading file to IPFS:', error);
//       }
//     };
  
//     reader.readAsArrayBuffer(file);
//   };


const handleButtonClick = async () => {
	// your code to fetch contract data here 
	// For now, let's set a placeholder string 
	const address = blockchain.account;
	const firstContract = new Web3EthContract(ABI, NFTCONTRACT);
	const firstBalance = await firstContract.methods.balanceOf(address).call();
	setContractData(firstBalance);
	console.log(firstBalance);
};

const onDrop = async (acceptedFiles) => {
	const file = acceptedFiles[0];
  
	try {
	  const formData = new FormData();
	  formData.append('file', file, file.name);
  
	  const response = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
		method: 'POST',
		body: formData,
		headers: {
		  Authorization: `Basic ${btoa(`${projectId}:${projectSecret}`)}`,
		},
	  });
  
	  const data = await response.json();
	  setImageHash(data.Hash);
  
	  // Prepare metadata with the image hash
	  const metadata = {
		name,
		description,
		image: `ipfs://${data.Hash}`,
	  };
	  const metadataJson = JSON.stringify(metadata);
	  const metadataData = new Blob([metadataJson], { type: 'application/json' });
  
	  // Upload the metadata file to IPFS
	  const metadataFormData = new FormData();
	  metadataFormData.append('file', metadataData);
	  const metadataResponse = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
		method: 'POST',
		body: metadataFormData,
		headers: {
		  Authorization: `Basic ${btoa(`${projectId}:${projectSecret}`)}`,
		},
	  });
	  const metadataResponseData = await metadataResponse.json();
	  const metadataHash = metadataResponseData.Hash;
  
	  // Perform further operations with the metadataHash
	  // ...
  
	  // Set the image hash in the state
	  setImageHash(data.Hash);
	} catch (error) {
	  console.error('Error uploading files to IPFS:', error);
	}
  };
  
  
  

  const { getRootProps, getInputProps } = useDropzone({ onDrop });


  const getData = () => {
    if (blockchain.account !== "") {
      dispatch(fetchData(blockchain.account));
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    ethereum.request({ method: 'eth_requestAccounts' })
  .then((accounts) => {
    const loggedInAccount = accounts[0];
    console.log(loggedInAccount);
    setAccount(loggedInAccount)
    // Use the logged-in account for further operations
  })
  .catch((error) => {
    console.log(error);
    // Handle the error
  });


    
    const metadata = {
      name,
      description,
      image: `ipfs://${imageHash}`,
    };
    
	const formData = new FormData();
    console.log(formData)
    console.log(metadata)
    formData.append('file', JSON.stringify(metadata));
  
    try {
      const response = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Basic ${btoa(`${projectId}:${projectSecret}`)}`,
        },
      });
  
      const data = await response.json();
      const ipfsHash = data.Hash;
      console.log(response);
      console.log(data)
      console.log(name);
      console.log(description)
      console.log(account)
  
      const contract = new Web3EthContract(abi2, contractAddress);
      // Mint NFT with the IPFS metadata hash
      contract.methods.safeMint("0x4B7051619d0AAa0EC056A18eceD5D8E06Dd55F33", ipfsHash).send({ from: "0x4B7051619d0AAa0EC056A18eceD5D8E06Dd55F33"})
        .then(async (result) => {
          console.log(result);
		  
		 
		  setLatestNFT(ipfsHash);
        })
        .catch((error) => {
          console.error('Error minting NFT:', error);
        });
    } catch (error) {
      console.error('Error uploading metadata to IPFS:', error);
    }
  };




  	const [nfts, setNfts] = useState([]);

	// Function to fetch minted NFTs
	const fetchMintedNfts = async () => {
		console.log("running")
		const contract = new Web3EthContract(abi2, contractAddress);
	
		const tokenCount = await contract.methods.totalSupply().call();
		console.log(tokenCount)
		const nftsData = [];
	let tokenId = 0;

	for (let i = 0; i < tokenCount; i++) {
	tokenId = await contract.methods.tokenByIndex(i).call();
	console.log(tokenId)
	if (tokenId > 0) {
		const tokenUri = await contract.methods.tokenURI(tokenId).call();
		const ipfsURL = addIPFSProxy(tokenUri);
		console.log(ipfsURL)
		const request = new Request(ipfsURL);
		console.log(request)
		const response = await fetch(request);
		const metadata = await response.json();
		const image = addIPFSProxy(metadata.image);

		nftsData.push({
		tokenId,
		metadata: metadata,
		image: image,
		});
	}
	}

	setNfts(nftsData);
	console.log(nftsData);
	
		
	};
  
  function addIPFSProxy(ipfsHash) {
	const URL = "https://idm.infura-ipfs.io/ipfs/"
	const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
	const ipfsURL = URL + hash

	//console.log(ipfsURL)
	return ipfsURL
}

// Call fetchMintedNfts whenever account changes
useEffect(() => {
  if(account) {
    fetchMintedNfts();
  }
}, [account, latestNFT]);


  return (
    <div>

<BannerImage src={nftImage} alt="NFT Minter Banner" />

<div style={{ textAlign: 'center', padding: '20px' }}>
<Title>Create Your Own NFTs</Title>
    <Description>
      Mint and customize unique NFTs effortlessly with the NFT Minter. Empower your creativity and explore the world of digital art and collectibles.
    </Description>

</div>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(connect())}
          >
            CONNECT
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchMintedNfts}
          >
            FETCH
          </Button>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              value={name}
              onChange={handleNameChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                border: '2px dashed #ccc',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {imageHash ? (
                <img
                  src={`https://ipfs.infura.io/ipfs/${imageHash}`}
                  alt="NFT"
                  style={{
                    maxWidth: '200px',
                  }}
                />
              ) : (
                <div style={{ textAlign: 'center' }}>
  <div
    style={{
      width: '200px',
      height: '200px',
      border: '2px dashed #ccc',
      borderRadius: '4px',
      margin: '10px auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    {...getRootProps()}
  >
    <input {...getInputProps()} />
    <p
      style={{
        color: '#999',
      }}
    >
      Drag 'n' drop some files here, or click to select files
    </p>
  </div>
</div>

              )}
            </div>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Mint NFT
            </Button>
          </Grid>
        </Grid>
      </form>

      <div style={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          {nfts.map((nft) => (
            <Grid item key={nft.tokenId} xs={12} sm={4}>
              <div
                style={{
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
              >
                <img
                  src={nft.image}
                  alt={nft.name}
                  style={{
                    maxWidth: '200px',
                    height: 'auto',
                    borderRadius: '4px',
                  }}
                />
                <h2
                  style={{
                    marginTop: '10px',
                    fontSize: '18px',
                  }}
                >
                  {nft.metadata.name}
                </h2>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#888',
                  }}
                >
                  {nft.metadata.description}
                </p>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>

      <Button onClick={handleButtonClick}>Button</Button>
      <TextField type="text" placeholder="Input 2" />
      <h2>{contractData}</h2>
    </div>
  );
};

export default NFTMinter;
