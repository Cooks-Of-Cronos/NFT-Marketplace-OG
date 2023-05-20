import React, { useState } from 'react';
import {
    Typography,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Select,
    MenuItem,
    Button,
    Card,
    CardContent,
    CardActions,
    CardMedia,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExampleAppraisal from './components/getAppraisalWorking'
import ipfsClient from 'ipfs-http-client';
import Web3EthContract from "web3-eth-contract";
import { useDispatch, useSelector } from "react-redux";


import { DISCONNECT_FAILED, disconnectFailed, disconnect, connect, isConnected } from "./redux/blockchain/blockchainActions";

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        margin: '0 auto',
        marginTop: 50,
    },
    media: {
        height: 250,
    },
    formControl: {
        minWidth: 120,
        margin: '10px 0',
    },
});



/*NOTES

ERRORS: Unhandled Rejection(Error): Input not supported.Expected Buffer | ReadableStream | PullStream | File | Array < Object > got string.Check the documentation for more info https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#add

*/






//0x46f521847205364CE2a183D6E6a5f3bE69344780






const NFTMintingPage = () => {

	const newContractAddress = '0x46f521847205364CE2a183D6E6a5f3bE69344780';
	const newContractABI = [
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
		}
	]

	const newContract = new Web3EthContract(newContractABI, newContractAddress);


    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [totalSupply, setTotalSupply] = useState(1);
    const [amount, setAmount] = useState(1);
	const dispatch = useDispatch();
	const blockchain = useSelector((state) => state.blockchain);
	

    const [royalty, setRoyalty] = useState(10);
    const [benefits, setBenefits] = useState([
        'Exclusive access to community events',
        'Early access to new product releases',
        'Free merchandises',
    ]);
    const [externalLinks, setExternalLinks] = useState([
        {
            title: 'OpenSea Marketplace',
            link: 'https://opensea.io',
        },
        {
            title: 'Nifty Gateway',
            link: 'https://niftygateway.com',
        },
    ]);

    const handleTitleChange = (event) => setTitle(event.target.value);

    const handleDescriptionChange = (event) =>
        setDescription(event.target.value);

    const handlePriceChange = (event) => setPrice(event.target.value);

    const handleTotalSupplyChange = (event) => setTotalSupply(event.target.value);

    const handleRoyaltyChange = (event) => setRoyalty(event.target.value);

    const handleBenefitsChange = (event) => {
        const options = event.target.options;
        const values = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }
        setBenefits(values);
	};



	// IPFS 
	const ipfsClient = require('ipfs-http-client');

	const projectId = '2KhkyHx6ag97KJ6lJJpZaQdNF2h';
	const projectSecret = 'cda2a42846ea69280f94f263590af556';

	const ipfs = ipfsClient({
		host: 'ipfs.infura.io',
		port: 5001,
		protocol: 'https',
		apiPath: '/api/v0/',
		headers: {
			authorization: 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64')
		}
	});


	const handleSubmit = async (event) => {
		event.preventDefault();

		const ipfs = ipfsClient({
			host: 'ipfs.infura.io',
			port: 5001,
			protocol: 'https',
			apiPath: '/api/v0/',
			headers: {
				authorization: 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64')
			}
		});

		const fileInput = document.getElementById('fileInput');

		fileInput.addEventListener('change', async (event) => {
			const file = event.target.files[0];

			if (!file) {
				console.error('No file selected');
				return;
			}

			// Add the image data to IPFS to get an IPFS CID
			const { cid: imageCid } = await ipfs.add(file);
			const imageUri = `ipfs://${imageCid.toString()}`;

			// Create a JSON object containing the image URI, name, and description
			const metadata = {
				name: title,
				description: description,
				image: imageUri
			};

			// Add the metadata JSON to IPFS to get its IPFS CID
			const { cid: metadataCid } = await ipfs.add(JSON.stringify(metadata));
			const metadataUri = `ipfs://${metadataCid.toString()}/metadata.json`;

			// Call the contract's mint function with the metadata URI
			await newContract.methods.mint(name, description, price).send({
				from: '0x4B7051619d0AAa0EC056A18eceD5D8E06Dd55F33',
				tokenURI: metadataUri
			});
		});
	};




	function readFileContents(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = () => {
				resolve(reader.result);
			};

			reader.onerror = (error) => {
				reject(error);
			};

			reader.readAsArrayBuffer(file);
		});
	}



		const handleConnect = async () => {
			try {
				connectToBlockchain(blockchain.account);
				let isConnected = true;
			} catch (error) {
				console.log(error);
				disconnectFailed(DISCONNECT_FAILED);
			}
		};

		const handleDisconnect = () => {
			disconnect();
		};








    return (
		<div>
			{isConnected ? (
				<button onClick={handleDisconnect}>Disconnect</button>
			) : (
					<button onClick={() => {

						dispatch(connect());
					}}>Connect Wallet</button>
			)}
            <ExampleAppraisal />
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image="/images/nft-minting.jpg"
                    title="Mint your NFT"
                />
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Mint your NFT
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="title-input">Title</InputLabel>
                            <Input
                                id="title-input"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="description-input">Description</InputLabel>
                            <Input
                                id="description-input"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="price-input">Price</InputLabel>
                            <Input
                                id="price-input"
                                value={price}
                                onChange={handlePriceChange}
                            />
                            <FormHelperText>
                                Price per token in ETH (1 ETH = 1000000000000000000 wei)
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
							<InputLabel htmlFor="amount-input">Amount</InputLabel>
							<input type="file" id="fileInput"/>

                            <Select
                                id="amount-input"
                                value=""
                                onChange=""
                                displayEmpty
                                className={classes.selectEmpty}
                                inputProps={{ 'aria-label': 'Amount' }}
                            >
                                <MenuItem value="" disabled>
                                    Select amount
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={10000}>10000</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <Button variant="contained" color="primary" type="submit">
                                Mint NFT
                            </Button>
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
        </div >
    );
}
    export default NFTMintingPage;

