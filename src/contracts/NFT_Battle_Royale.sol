// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721.sol";
import "./IERC721Receiver.sol";

contract NFTBattleRoyale is IERC721Receiver {
    struct Player {
        address owner;
        uint256 nftId;
    }

    mapping(address => Player) public players;
    address[] public activePlayers;
    address public winner;
    uint256 public prize;

    event PlayerJoined(address indexed player, uint256 indexed nftId);
    event PlayerEliminated(address indexed player);
    event WinnerAnnounced(address indexed winner, uint256 prize);

    constructor(uint256 _prize) {
        prize = _prize;
    }

    function joinBattleRoyale(address _nftContract, uint256 _nftId) external {
        require(IERC721(_nftContract).ownerOf(_nftId) == msg.sender, "You don't own this NFT");
        require(players[msg.sender].nftId == 0, "You have already joined the battle royale");

        players[msg.sender] = Player(msg.sender, _nftId);
        activePlayers.push(msg.sender);

        IERC721(_nftContract).transferFrom(msg.sender, address(this), _nftId);

        emit PlayerJoined(msg.sender, _nftId);
    }

    function eliminatePlayer(address _player) internal {
        require(players[_player].nftId != 0, "Player not found");

        delete players[_player];

        for (uint256 i = 0; i < activePlayers.length; i++) {
            if (activePlayers[i] == _player) {
                activePlayers[i] = activePlayers[activePlayers.length - 1];
                activePlayers.pop();
                break;
            }
        }

        emit PlayerEliminated(_player);
    }

    function startBattleRoyale() external {
        require(activePlayers.length > 1, "Insufficient players");

        while (activePlayers.length > 1) {
            uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % activePlayers.length;
            address eliminatedPlayer = activePlayers[randomIndex];
            eliminatePlayer(eliminatedPlayer);
        }

        winner = activePlayers[0];

        emit WinnerAnnounced(winner, prize);
    }

    function withdrawPrize() external {
        require(msg.sender == winner, "Only the winner can withdraw the prize");

        // Transfer the prize to the winner
        // Implement your preferred method of prize transfer here

        prize = 0; // Reset the prize amount after withdrawal
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        // Handle the received NFT (optional)
        return this.onERC721Received.selector;
    }
}
