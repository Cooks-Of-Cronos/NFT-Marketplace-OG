import Web3Modal from "web3modal";
import { DeFiWeb3Connector } from 'deficonnect'
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import React, { useEffect, useState, useRef } from "react";
import Web3EthContract from "web3-eth-contract";
import styled from 'styled-components';
import { testABI } from '.components/TestComp.js';
import { testContract } from './components/TestComp.js';

import { REWARDSABI } from './mint';
import { REWARDSCONTRACT } from './mint'; import { useDispatch, useSelector } from "react-redux"
import { CROCELLSABI } from './mint';
import { CROBADGEABI } from './mint';


import { Jumbotron } from 'styled-jumbotron-component';
import './styles/market.css';
import { Container, Row, Col, Button, Card, Badge, Form } from 'react-bootstrap';

import ReactDOM from 'react-dom';
import $ from 'jquery';




;
import { fetchData } from "./redux/data/dataActions";
import { DISCONNECT_FAILED, disconnectFailed, disconnect, connect, isConnected } from "./redux/blockchain/blockchainActions";
import NFTContract from './nft_abi';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



import getTest from '.components/TestComp.js';
import addItemToMarket from '.components/TestComp.js';


import { store, ReactNotification, NotificationContainer, NotificationManager } from 'react-notifications';
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import NFTab from './Tabs';

import NFTTransaction from "./NFTTransaction"






//NEW IMPORTS FOR MARKETPLACE 
/////////////////////////////
import Web3 from 'web3';
//import { providerOptions } from './provider/providerOptions';

////////////////////-----------





async function displayNFTsFeatures() {
	const nftTokenAddress = "0x1632568C5DeA50b5738c6C7bE2786657A9840485";
	const marketplaceAddress = "0xa12A3A4ED947e38Ad0c177799De37DD77F520E62";


	const NFTcontract = new Web3EthContract(CROCELLSABI, CROCELLSCONTRACT);
	const contract = new Web3EthContract(testABI, testContract);


	try {
		// Check if user is logged in before calling getItemsForSale
		if (!blockchain.account) {
			// User is not logged in, display error message
			alert("Please log in to continue");
			return;
		}

		const itemsForSale = await contract.methods.getItemsForSale().call({ from: blockchain.account });
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
			const content = document.createTextNode(`Listing ID: ${ListingID} | NFT Token ID: ${NFTtokenID} | Token Address: ${nftTokenAddress} | Price: ${askingPrice}`);
			itemDiv.appendChild(content);

			// Get the NFT metadata and image URI
			const uri = await NFTcontract.methods.tokenURI(NFTtokenID).call();
			const ipfsURL = addIPFSProxy(uri);
			const request = new Request(ipfsURL);
			const response = await fetch(request);
			const metadata = await response.json();
			const image = addIPFSProxy(metadata.image);

			// Create an <img> element for the NFT image
			const img = document.createElement('img');
			img.src = image;
			itemDiv.appendChild(img);

			// Create a Buy button element
			const buyButton = document.createElement("button");
			buyButton.innerHTML = "Buy";

			// Add a click event listener to the Buy button
			buyButton.addEventListener("click", async () => {
				try {
					// Call the "buyItem" function on the smart contract to purchase the NFT
					await contract.methods.buyItem(item[0]).send({ from: blockchain.account, value: Web3Utils.toWei(askingPrice, 'ether') });
				} catch (error) {
					// Display error message if buyItem function fails
					alert(error.message);
				}
			});

			// Add the Buy button to the itemDiv
			itemDiv.appendChild(buyButton);

			marketplaceItemsDiv.appendChild(itemDiv);
		});
	} catch (error) {
		// Display error message if getItemsForSale function fails
		alert(error.message);
	}
}

