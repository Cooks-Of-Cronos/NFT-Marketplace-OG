import React, { useState } from 'react';
import Web3 from 'web3';
import Web3EthContract from 'web3-eth-contract';
/*import IPFS, { create } from 'ipfs-http-client';
import { useDropzone } from 'react-dropzone';

const web3 = new Web3('https://cronos-testnet.crypto.org:8545');
const contractAddress = '0x1234567890123456789012345678901234567890';
const abi = [];

const ipfs = IPFS.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});*/

const NFTMinter = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageHash, setImageHash] = useState('');

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const { path } = await ipfs.add(file);
    setImageHash(path);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contract = new Web3EthContract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const metadata = {
      name,
      description,
      image: `ipfs://${imageHash}`,
    };
    const { path } = await ipfs.add(JSON.stringify(metadata));
    const result = await contract.methods
      .mintNFT(accounts[0], `ipfs://${path}`)
      .send({ from: accounts[0] });
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {imageHash ? (
              <img src={`https://ipfs.infura.io/ipfs/${imageHash}`} alt="NFT" />
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </div>
        <button type="submit">Mint NFT</button>
      </form>
    </div>
  );
};

export default NFTMinter;
