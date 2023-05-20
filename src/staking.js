import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, balance, rewards } from "./redux/stakeData/dataActions";
import { fetchDataM, hasApproved } from "./redux/data/dataActions2";
import ReactDOM from 'react-dom';
import { connect, isConnected } from "./redux/blockchain/blockchainActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import './App.js';
import Web3Modal from 'web3modal';
import Web3EthContract from "web3-eth-contract";
import Web3 from 'web3';
import axios from 'axios';
import { providerOptions } from './provider/providerOptions';
import { Button } from 'antd';
import { DeFiWeb3Connector } from 'deficonnect'


import "./styles/stake.module.css";


const CONTRACT_ADDRESS = "0xe1882742713E415391b4815cB3833E9E03A6a895"
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








const Staking = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [feedback, setFeedback] = useState("STAKE");
    const [claiming, setClaiming] = useState(false)
    const [staking, setStaking] = useState(false);
    const [unstaking, setUnstaking] = useState(false);
    const [hasStaked, setHasStaked] = useState(false);
    const [_stake, _unStake] = useState("STAKE");
    const account = blockchain.account;
    const [tokenId, setTokenId] = useState([]);
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
	const [nftsInJail, setnftsInJail] = useState([]);





    useEffect(() => {
        dispatch(connect())

    }, [])

    useEffect(() => {
        setTimeout(() => {
            hasApproved ? dispatch(connect()) : dispatch(connect())
        }, 3000);
    }, [])
    const getConfig = async () => {
        const configResponse = await fetch("/stakeConfig/config.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const config = await configResponse.json();
        SET_CONFIG(config);
    };
    const getDataM = () => {
        if (account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchDataM())
        }
    };
    const getData = () => {
        if (account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData())
        }
    };
    useEffect(() => {
        getConfig();
        
    }, []);
    useEffect(() => {
        getDataM();
        getData();
    }, [account]);

	
    const stake = (tokenId) => {
        setStaking(true);
        setFeedback("BUSY")
        dispatch(connect())
        blockchain.smartContract.methods.stake([tokenId])
            .send({
                to: CONFIG.CONTRACT_ADDRESS,
                from: account
            })
            .once("error", (err) => {
                console.log(err)
                setStaking(false)
            })
            .then((Response) => {
                setStaking(false)
            })

        setFeedback("STAKE")
    }


    const unStake = async (tokenId) => {
        setUnstaking(true)
        dispatch(connect())
        blockchain.smartContract.methods.unstake([tokenId])
            .send({
                to: CONFIG.CONTRACT_ADDRESS,
                from: account
            })
            .once("error", (err) => {
                console.log(err)
                setUnstaking(false)
            })
            .then((Response) => {
                setUnstaking(false)
            })
    }

    const unstakeAll = () => {
        setUnstaking(true)
        dispatch(connect())
        blockchain.smartContract.methods._unstakeMany()
            .send({
                to: CONFIG.CONTRACT_ADDRESS,
                from: account
            })
            .once("error", (err) => {
                console.log(err)
                setUnstaking(false)
            })
            .then((Response) => {
                setUnstaking(false)
            })
    }

    const approve = async () => {
        dispatch(connect());
        await blockchain.smartContract.methods
            .setApprovalForAll(CONFIG.CONTRACT_ADDRESS, true)
            .send({
                to: CONFIG.CONTRACT_ADDRESS,
                from: account
            })
        dispatch(connect())
    }

    const claim = async (tokenId) => {
        setClaiming(true)
        dispatch(connect())
        await blockchain.smartContract.methods.claim([tokenId])
            .send({
                to: CONFIG.CONTRACT_ADDRESS,
                from: account
            })
            .once("error", (err) => {
                console.log(err)
                setClaiming(false)
            })
            .then((Response) => {
                setClaiming(false)
            })
        
    };
    
    const handleChange = (e) => {
        e.preventDefault();
        setTokenId(parseInt(e.target.value.split(" ")));
    }





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
	// END getNFTs Function
	//-----------------------




	// START getStakedNFTs Function
	//----------------------------
	async function getNFTsInJail() {

		const contract = new Web3EthContract(VAULTABI, STAKINGCONTRACT)
		const address = blockchain.account;
		let totalNFTs = 0;
		let Jailnfts = [];

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
			Jailnfts.push({
				tokenId: tokenId,
			});
			console.log(Jailnfts);
			setnftsInJail(Jailnfts);

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








        return (
			<main className="stake-app">
				<div className="row">
					<div className="col-md-4">
						<h1 style={{ color: "#ff5722" }}>STAKE</h1>
						<h2>Stake WOLFGANG NFT($WOLF) to earn WOLF TOKEN($WOLF)</h2>
						<h2>
							{staking ? "staking.." : ""}
							{unstaking ? "unstaking.." : ""}
							{claiming ? "claiming.." : ""}
						</h2>
						<button
							className="connect-btn"
							onClick={(e) => {
								!isConnected ?
									dispatch(connect())
									: e.preventDefault()
							}}
						>
							{!isConnected ? "CONNECT WALLET" : account.slice(0, 10)}
						</button>
						<div>
							<div>
								<p>Stake WOLFGANG NFT</p>
								<p>Earn WOLF</p>
							</div>
							<blockquote className="reward"><span>BALANCE</span>
								{' '}
								{balance / 10 ** 18}
								{' '}$WOLF
							</blockquote>
							<blockquote className="reward"><span>REWARDS</span>
								{' '}
								{rewards / 10 ** 18}
								{' '}$WOLF
							</blockquote>
							<form className="form" onChange={handleChange}>
								<input
									type="all"
									placeholder="Enter TokenId"
									className=""
									required
								/>
								<button
									className="btn stake-btn"
									onClick={hasApproved ? (e) => {
										e.preventDefault()
										stake(tokenId)
									} :
										(e) => {
											e.preventDefault()
											approve(tokenId)
										}}
								>
									{hasApproved ? "STAKE" : "APPROVE"}
								</button>
								<button
									onClick={(e) => {
										e.preventDefault();
										dispatch(connect());
										getData();
									}}
								>
									CONNECT
								</button>
							</form>
							<form className="form" onChange={handleChange}>
								<input
									type="all"
									placeholder="Enter TokenId"
									className=""
									required
								/>
								<button
									className="btn stake-btn"
									onClick={(e) => {
										e.preventDefault()
										unStake(tokenId)
									}}>
									UNSTAKE
								</button>
							</form>
							<div>
								<button
									className="btn"
									onClick={claim}>
									CLAIM cGOLD
								</button>
							</div>
							<div className="row">
							</div>
							<div className="">
								<button
									className="btn mb-5"
									onClick={unstakeAll}>
									UNSTAKE ALL
								</button>
							</div>
						</div>
					</div>

					<div className="col-md-4">
						<h2>NFTs in Wallet</h2>
						<div id="nftid" class="container"></div>
						<button id="load-more-btn" style={{ color: "white", background: "green", }} onClick=""> Load More!</button>
						<button
							className="button"
							style={{ color: "white", background: "red" }}
							onClick={getFirstTen}
						>
							Show NFTs In Wallet
						</button>
					</div>

					<div className="col-md-4">
					<h2>NFTs in Jail</h2>
					<div className="card-container">
						{nfts.map((nft) => (
							<div className="card col-md-3">
								<img src={nft.image} className="card-img-top" alt={nft.name} width="300" height="300" />
								<div className="card-body">
									<h5 className="card-title">{nft.name}</h5>
									<p className="card-text">{nft.description}</p>
									<button className="btn btn-primary unstake-btn zoom" data-tokenid={nft.tokenId} onClick={(e) => unStake(e, nft.tokenId)}>Unstake</button>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="col-md-4">
					<h2>All NFTs</h2>
					<div className="card-container">
						{nftsInJail.map((nft) => (
							<div className="card col-md-3">
								<img src={nft.image} className="card-img-top" alt={nft.name} width="300" height="300" />
								<div className="card-body">
									<h5 className="card-title">{nft.name}</h5>
									<p className="card-text">{nft.description}</p>
									{!nft.inJail ? <button className="btn btn-primary stake-btn zoom" data-tokenid={nft.tokenId} onClick={(e) => stake(e, nft.tokenId)}>Stake</button> :
										<button className="btn btn-primary unstake-btn zoom" data-tokenid={nft.tokenId} onClick={(e) => unStake(e, nft.tokenId)}>Unstake</button>}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="col-md-4">
					<h2>Actions</h2>
					<div className="card-container">
						<form className="form" onChange={handleChange}>
							<input
								type="all"
								placeholder="Enter TokenId"
								className=""
								required
							/>
							<button
								className="btn stake-btn"
								onClick={hasApproved ? (e) => {
									e.preventDefault()
									stake(tokenId)
								} :
									(e) => {
										e.preventDefault()
										approve(tokenId)
									}}
							>
								{hasApproved ? "STAKE" : "APPROVE"}
							</button>
						</form>
						<form className="form" onChange={handleChange}>
							<input
								type="all"
								placeholder="Enter TokenId"
								className=""
								required
							/>
							<button
								className="btn unstake-btn"
								onClick={(e) => {
									e.preventDefault()
									unStake(tokenId)
								}}>
								UNSTAKE
							</button>
						</form>
						<div className="row">
							<button
								className="btn mb-5"
								onClick={unstakeAll}>
								UNSTAKE ALL
							</button>
						</div>
						<div className="row">
							<button
								className="btn"
								onClick={claim}>
								CLAIM cGOLD
							</button>
						</div>
					</div>
				</div>
			</div>

</main >
    );
}
export default Staking;
