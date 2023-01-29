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


import "./styles/stake.css";



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




        return (
        <main className="stake-app">
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
            <div className="card-container">
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
        </main>
    );
}
export default Staking;
