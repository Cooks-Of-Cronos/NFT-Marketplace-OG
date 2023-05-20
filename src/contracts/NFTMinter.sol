pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CronosKitchenNFT is ERC721 {
    uint256 public tokenId = 0;
    mapping (uint256 => string) public names;
    mapping (uint256 => string) public descriptions;
    mapping (uint256 => string) public tokenURIs;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(string memory name, string memory description, string memory tokenURI) public {
        tokenId++;
        _safeMint(msg.sender, tokenId);
        names[tokenId] = name;
        descriptions[tokenId] = description;
        tokenURIs[tokenId] = tokenURI; // store the IPFS hash of the metadata file
    }
}
