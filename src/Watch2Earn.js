
import { DeFiWeb3Connector } from 'deficonnect'


import React, { useEffect, useState, useRef } from "react";
import Web3EthContract from "web3-eth-contract";

import './styles/w2e.css';
import MyContract from './redux/MyContract.json';



const Watch2Earn = () => {


	var account = null;
	
    const [balance, setBalance] = useState(null);
    const [address, setAddress] = useState('');
	

    const connectWeb3 = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(window.ethereum);
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = MyContract.networks[networkId];
                const contract = new web3.eth.Contract(
                    MyContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                setWeb3(web3);
                setContract(contract);
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Please install MetaMask!');
        }
	};




	//DEFI WALLET CONNECTION
	 async function connectdots() {

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
			 .catch(error => alert(error.message))

	}

	async function disconnect() {
	//disconnect the Wallet
		await connector.deactivate()
	}





	/*
    const getBalance = async () => {
        const balance = await web3.eth.getBalance(address);
        setBalance(balance);
    };

    const sendTransaction = async () => {
        const amount = web3.utils.toWei('1', 'ether');
        const tx = await web3.eth.sendTransaction({
            from: await web3.eth.getCoinbase(),
            to: address,
            value: amount,
        });
        console.log(tx);
	};

*/



	// Import the required libraries
	const axios = require('axios');
	


	// Replace <YOUR_API_KEY> with your actual YouTube API key
	const API_KEY = 'AIzaSyA9aah1syJjkEtOvgkbpdeYimh3yIW-G_s';

	// Define the YouTube API endpoint
	const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCDfH7mI_yGJcgu8_0swH9gg&maxResults=50&key=AIzaSyA9aah1syJjkEtOvgkbpdeYimh3yIW-G_s`;

	/*// Connect to the Ethereum network
	const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a'));*/

	// Replace <YOUR_CONTRACT_ADDRESS> with the actual address of your contract
	const contractAddress = '0x6e84894E856Ed193516AdBdF2848d61BcC4ee3b0';
	const user = '0x4B7051619d0AAa0EC056A18eceD5D8E06Dd55F33';

	// Replace <YOUR_ABI> with the actual ABI of your contract
	const abi = [
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "videoId",
					"type": "bytes32"
				},
				{
					"internalType": "string",
					"name": "title",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "length",
					"type": "uint256"
				}
			],
			"name": "addVideo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"internalType": "bytes32",
					"name": "videoId",
					"type": "bytes32"
				}
			],
			"name": "getWatchTime",
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
					"name": "",
					"type": "address"
				},
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"name": "userVideos",
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
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"name": "videos",
			"outputs": [
				{
					"internalType": "string",
					"name": "title",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "length",
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
					"name": "user",
					"type": "address"
				},
				{
					"internalType": "bytes32",
					"name": "videoId",
					"type": "bytes32"
				}
			],
			"name": "watchVideo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	];

	// Create an instance of the contract
	const contract = new Web3EthContract(abi, contractAddress);

	// Get the current account
	//const account = web3.eth.defaultAccount;

	// Function to watch a video

	/*
	async function watchVideo(user, videoId) {
		// Call the watchVideo function on the contract
		const result = await contract.methods.watchVideo(user, videoId).send({ from: account });

		// Check if the transaction was successful
		if (result.status) {
			console.log(`Successfully watched video ${videoId}`);
		} else {
			console.error(`Failed to watch video ${videoId}`);
		}
	}
	

	// Function to retrieve the watch time
	async function getWatchTime(user, videoId) {
		// Call the getWatchTime function on the contract
		const watchTime = await contract.methods.getWatchTime(user, videoId).call({ from: account });

		console.log(`You have watched video ${videoId} for ${watchTime} seconds`);
	}

	// Function to verify the transaction
	async function verifyTransaction(transactionHash) {
		// Get the transaction receipt
		const receipt = await web3.eth.getTransactionReceipt(transactionHash);

		// Check if the transaction was successful
		if (receipt.status) {
			console.log(`Transaction ${transactionHash} was successful`);
		} else {
			console.error(`Transaction ${transactionHash} failed`);
		}





	}
	*/


	
		// Fetch the video data from the API
		axios.get(API_URL, {
			params: {
				part: 'snippet',
				maxResults: 12,
				q: 'watch-to-earn rewards',
				type: 'video',
				videoDefinition: 'high',
				key: API_KEY
			},
			// Set the cache key to the API URL and the cache lifetime to one hour (in milliseconds)
			cache: {
				key: API_URL,
				maxAge: 3600000
			}
		})
			.then(function (response) {
				const videos = response.data.items;
				const videoGrid = document.getElementById('video-grid');
				videos.forEach(function (video) {
					console.log(`Video ID: ${video.id.videoId}`);
					console.log(`Title: ${video.snippet.title}`);
					console.log(`Thumbnail: ${video.snippet.thumbnails.default.url}`);

					// Create a new div to hold the video data
					const videoCard = document.createElement('div');
					videoCard.classList.add('video-card');
					videoCard.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
					videoCard.style.transition = 'transform 0.5s';
					videoCard.addEventListener('mouseover', () => {
						videoCard.style.transform = 'scale(1.1)';
					});
					videoCard.addEventListener('mouseout', () => {
						videoCard.style.transform = 'scale(1)';
					});

					// Create the container element for the thumbnail and the play icon
					const thumbnailContainer = document.createElement('div');
					thumbnailContainer.classList.add('thumbnail-container');
					videoCard.appendChild(thumbnailContainer);

					// Create the thumbnail image element
					const thumbnail = document.createElement('img');
					thumbnail.src = video.snippet.thumbnails.default.url;
					thumbnail.alt = 'Video thumbnail';
					thumbnailContainer.appendChild(thumbnail);

					// Create the play icon element and position it on top of the thumbnail
					const playIcon = document.createElement('div');
					playIcon.classList.add('play-icon');
					thumbnailContainer.appendChild(playIcon);


					// Create the table
					const videoTable = document.createElement('table');
					videoCard.appendChild(videoTable);

					// Create the table row for the title
					const titleRow = document.createElement('tr');
					videoTable.appendChild(titleRow);

					// Create the table header for the title
					const titleHeader = document.createElement('th');
					titleHeader.textContent = 'Title';
					titleRow.appendChild(titleHeader);

					// Create the table data for the title
					const titleData = document.createElement('td');
					titleData.textContent = video.snippet.title;
					titleRow.appendChild(titleData);

					// Create the table row for the ID
					const idRow = document.createElement('tr');
					videoTable.appendChild(idRow);

					// Create the table header for the ID
					const idHeader = document.createElement('th');
					idHeader.textContent = 'Video ID';
					idRow.appendChild(idHeader);

					// Create the table data for the ID
					const idData = document.createElement('td');
					idData.textContent = video.id.videoId;
					idRow.appendChild(idData);

					// Create a new button element for each card
					const watchButton = document.createElement('button');
					watchButton.classList.add('watch-button');
					watchButton.textContent = 'Start Watching';
					videoCard.appendChild(watchButton);

					// Append the video div to the parent container
					videoGrid.appendChild(videoCard);







					watchButton.addEventListener('click', function () {
						// Open a new window or tab with the video player URL
						window.open('https://www.youtube.com/watch?v=' + video.id.videoId);
					});


					// Create the video player iframe element and add it to the thumbnail container
					const videoPlayer = document.createElement('iframe');
					videoPlayer.src = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=0`;
					videoPlayer.allowFullscreen = true;
					thumbnailContainer.appendChild(videoPlayer);

					// Add event listener to track the duration watched
					let watchedDuration = 0;
					const rewardThreshold = videoPlayer.duration * 0.9;

					// Define currentVideoPlayer and set it to null
					let currentVideoPlayer = null;

					// Define the function that will track the video's duration watched
					function trackDurationWatched(videoPlayer, rewardThreshold) {
						let watchedDuration = 0;
						let isPlaying = false;

						videoPlayer.addEventListener('play', () => {
							if (currentVideoPlayer && currentVideoPlayer !== videoPlayer) {
								// Pause the current video if there is one playing
								currentVideoPlayer.pause();
							}
							currentVideoPlayer = videoPlayer;
							isPlaying = true;
						});

						videoPlayer.addEventListener('pause', () => {
							if (isPlaying && videoPlayer.currentTime !== videoPlayer.duration) {
								// Unset the currentVideoPlayer if the user pauses the video
								currentVideoPlayer = null;
							}
							isPlaying = false;
						});

						videoPlayer.addEventListener('ended', () => {
							// Unset the currentVideoPlayer if the video ends
							currentVideoPlayer = null;
							isPlaying = false;
						});

						videoPlayer.addEventListener('timeupdate', () => {
							if (isPlaying) {
								watchedDuration = videoPlayer.currentTime;
								const percentageWatched = (watchedDuration / videoPlayer.duration) * 100;
								console.log(`Percentage watched: ${percentageWatched}%`);

								// Check if user watched entire video or at least 90% of it
								if (watchedDuration >= rewardThreshold) {
									// Reward user with cryptocurrency
									console.log('User rewarded with cryptocurrency!');
								}
							}
						});
					}

					watchButton.addEventListener('click', function () {
						if (currentVideoPlayer) {
							// Pause the current video if there is one playing
							currentVideoPlayer.pause();
						}

						// Create the video player iframe element and add it to the thumbnail container
						const videoPlayer = document.createElement('iframe');
						videoPlayer.src = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=0`;
						videoPlayer.allowFullscreen = true;
						thumbnailContainer.appendChild(videoPlayer);

						// Add event listener to track the duration watched
						const rewardThreshold = videoPlayer.duration * 0.9;
						trackDurationWatched(videoPlayer, rewardThreshold);
					});


				});
			})
			.catch(function (error) {
				console.error(error);
			});



	

	function addIPFSProxy(ipfsHash) {
		const URL = "https://idm.infura-ipfs.io/ipfs/"
		const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
		const ipfsURL = URL + hash

		console.log(ipfsURL)
		return ipfsURL
	}


	return (
		
		
		<div>
		<div className="video-grid-container" >
			<div className=".intro-sectionw2e">
				<div className="header">
					<img src="https://img.icons8.com/color/256/play-button-circled.png" alt="Logo" className="w2elogo" />
					<h1>WATCH-TO-EARN REWARDS</h1>
				</div>
				<div className="intro-content">
					<div className="intro-text">
						<h2>Introducing the first Watch-to-Earn Crypto Rewards Platform Program</h2>
						<p>Get rewarded for watching YouTube videos with our new Watch-to-Earn program! Our platform makes it easy for content creators and viewers to earn cryptocurrency rewards in exchange for watching or sharing videos. Check out our platform and start earning today!</p>
					</div>
					<div className="intro-video">
						<iframe width="560" height="315" src="https://player.vimeo.com/external/313712200.sd.mp4?s=f4c98a8df9c12267bb14b406c8d605e63b3dfa9e&profile_id=164&oauth2_token_id=57447761" title="Watch-to-Earn Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
					</div>
				</div>
			</div>

			<div className="hero-section">
				<h1 className="hero-title">Watch-To-Earn Dashboard</h1>
				<img src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/256/external-youtube-content-creator-xnimrodx-lineal-color-xnimrodx-2.png" alt="Youtube" />

				<div className="analytics-table">
					<table>
						<thead>
							<tr>
								<th>Total Watch Time</th>
								<th>Videos Watched</th>
								<th>Rewards Accrued</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>#</td>
								<td>#</td>
								<td>#</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>


                
				

			<div className="ButtonsSection">
				<button className="connect-button zoom" style={{ backgroundColor: 'Red', color: 'white', padding: '10px', borderRadius: '5px', border: 'none'  }} onClick={connectdots}>Connect Defi Wallet</button>
				<button className="connect-button zoom" style={{ backgroundColor: 'orange', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={connectWeb3}>Connect to MetaMask</button>
				
			</div>

            
			<div className="video-section">
				
				<div id="video-grid">
					<div id="video-container"></div>
				</div>
					
			</div>

					

           
		</div>
		</div>
		

    );


}

export default Watch2Earn;