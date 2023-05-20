/*import Web3Modal from "web3modal";
import { DeFiWeb3Connector } from 'deficonnect'
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import React, { useEffect, useState, useRef } from "react";
import Web3EthContract from "web3-eth-contract";
import styled from 'styled-components';
import { testABI } from './TestComp.js';
import { testContract } from './TestComp.js';

import { REWARDSABI } from '../mint';
import { REWARDSCONTRACT } from '../mint'; import { useDispatch, useSelector } from "react-redux"
import { CROCELLSABI } from '../mint';
import { CROBADGECONTRACT } from '../mint';


import { Jumbotron } from 'styled-jumbotron-component';
import '../styles/market.css';
import { Container, Row, Col, Button, Card, Badge, Form } from 'react-bootstrap';

import ReactDOM from 'react-dom';
import $ from 'jquery';




;
import { fetchData } from "../redux/data/dataActions";
import { DISCONNECT_FAILED, disconnectFailed, disconnect, connect, isConnected } from "../redux/blockchain/blockchainActions";


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



import getTest from './TestComp.js';
import addItemToMarket from './TestComp.js';


import { store, ReactNotification, NotificationContainer, NotificationManager } from 'react-notifications';
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import NFTTransaction from "./NFTTransaction"






//NEW IMPORTS FOR MARKETPLACE 
/////////////////////////////
import Web3 from 'web3';
//import { providerOptions } from './provider/providerOptions';

////////////////////-----------






////////////////////----------
async function getCellNFTs() {
	const contract = new Web3EthContract(CROCELLSABI, CROCELLSCONTRACT)
	// initial loading screen
	handleNotification("Getting Staked NFTs");

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
	console.log(totalNFTs)
	console.log('totalNFTs:', totalNFTs);
	// Loop through all of the NFTs held by the user



	for (let i = 0; i < totalNFTs; i++) {

		// Get the token ID for the current NFT
		const tokenId = await contract.methods.tokenOfOwnerByIndex(blockchain.account, i).call();
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
		nfts.push({
			tokenId: tokenId,
			metadata: metadata,
			image: image,

		});
		console.log(nfts);


		// Build and display the HTML element for each NFT
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
							<input type="number" class="form-control" name="AskingPrice" id="priceInput" placeholder="Enter price">
						  </div>
					  <button type="button" class="btn btn-primary stake-btn zoom" name="Tid" data-tokenid="${tokenId}">List NFT</button>
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

		document.getElementById("nftid3").innerHTML += content;



		// Add event listener to stake buttons
		// change this to List Function


		*//*
		 * 
		 * 
		 * 
		 * 
		 * 
		 * 
		 * // Add event listener to stake buttons
			document.querySelectorAll('.stake-btn').forEach(btn => {
				btn.addEventListener('click', async event => {
				const tokenId = event.target.dataset.tokenid;

				const contract = new Web3EthContract(ABI, NFTCONTRACT);
				const vaultcontract = new Web3EthContract(VAULTABI, STAKINGCONTRACT);

				vaultcontract.methods.stake([tokenId]).send({ from: blockchain.account });
			});

		*//*

		document.querySelectorAll('.stake-btn').forEach(async (btn) => {
			btn.addEventListener('click', async event => {
				const tokenId = event.target.dataset.tokenid;
				var askingPrice = document.querySelector("[name=AskingPrice]").value;;
				askingPrice = tokenids.toString().split(',').map(x => parseInt(x.trim(), 10));

				const nftTokenAddress = "0x1632568C5DeA50b5738c6C7bE2786657A9840485";
				const marketplaceAddress = "0xa12A3A4ED947e38Ad0c177799De37DD77F520E62";

				const contract = new Web3EthContract(testABI, testContract);
				const rewardcontract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);
				const NFTcontract = new Web3EthContract(CROCELLSABI, CROCELLSCONTRACT);

				//approve transfer for NFT Marketplace Contract
				// Approve transfer of cGOLD to Marketplace contract
				// Add cGOLD tokens to Marketplace Balance.
				//await NFTcontract.methods.setApprovalForAll(marketplaceAddress, true).send({ from: blockchain.account });
				//const gasLimit = await contract.methods.addItemToMarket(tokenId, nftTokenAddress, askingPrice).estimateGas({ from: blockchain.account });

				await NFTcontract.methods.approve(marketplaceAddress, tokenId).send({ from: blockchain.account });
				await contract.methods.addItemToMarket(tokenId, nftTokenAddress, askingPrice).send({ from: blockchain.account });
				const marketplaceItemsDiv = document.getElementById("marketplaceItems");

				const itemsForSale = await contract.methods.getItemsForSale().call({ from: blockchain.account });

				itemsForSale.forEach(item => {
					const itemDiv = document.createElement("div");

					const tokenId = item[0];
					const nftTokenAddress = item[1];
					const askingPrice = item[2];
					const seller = item[3];
					const timeAdded = item[4];
					const isSold = item[5];

					// Add the item's metadata and image to the itemDiv
					// ...

					marketplaceItemsDiv.appendChild(itemDiv);
				});


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

		*//*loadMoreBtn.addEventListener("click", async () => {
			startIndex += 10;
			await getCellNFTs();
		});*//*



	}
	console.log(nfts);



}


export default getCellNFTs();

*/