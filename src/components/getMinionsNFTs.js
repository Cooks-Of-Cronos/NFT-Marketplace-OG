////////////////////-----------
async function getMinionsNFTs(startIndex) {
	const contract = new Web3EthContract(MINIONSABI, CroMinionsContract)
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
	console.log(totalNFTs)
	console.log('totalNFTs:', totalNFTs);


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
		console.log('tokenId:', tokenId);


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
										
										<input type="number" name="AskingPrice" class="form-control" id="askingPriceInput" placeholder="Enter price">
									  </div>
					  <button type="button" class="btn btn-primary stake-btn zoom" data-tokenid="${tokenId}">List NFT</button>
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



		// Add event listener to stake buttons
		// change this to List Function

		document.querySelectorAll('.stake-btn').forEach(btn => {
			btn.addEventListener('click', async event => {
				const tokenId = event.target.dataset.tokenid;
				const askingPriceInput = document.getElementById('askingPriceInput');
				const askingPrice = Number(askingPriceInput.value);
				console.log(askingPrice);






				const nftTokenAddress = "0x3E2f91c31daf2467B5360EE85D78E99338fd4976";
				const marketplaceAddress = "0xa12A3A4ED947e38Ad0c177799De37DD77F520E62"

				const contract = new Web3EthContract(testABI, testContract);
				const rewardcontract = new Web3EthContract(REWARDSABI, REWARDSCONTRACT);
				const NFTcontract = new Web3EthContract(MINIONSABI, CroMinionsContract);

				//approve transfer for NFT Marketplace Contract
				// Approve transfer of cGOLD to Marketplace contract
				// Add cGOLD tokens to Marketplace Balance.
				await NFTcontract.methods.approve(marketplaceAddress, tokenId).send({ from: blockchain.account });
				await contract.methods.addItemToMarket(tokenId, nftTokenAddress, askingPrice).send({ from: blockchain.account });
			});
		});



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