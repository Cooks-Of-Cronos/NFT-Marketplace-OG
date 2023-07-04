import "./NFTContract.sol";




NFTContract public nftContract;


struct Voter {
    uint vote;
    bool voted;
    uint weight;
}

struct Proposal {
    bytes32 name;
    uint voteCount;
}

Proposal[] public proposals;
mapping(address => Voter) public voters;
mapping(address => uint) public nftBalances; // new mapping to track NFT balances

address public chairperson;
uint public nftRequirement; // new variable to set the required NFT balance for creating proposals
address public tokenAddress; // new variable to set the address of the ERC-20 token used for payment

constructor(bytes32[] memory proposalNames, uint _nftRequirement, address _tokenAddress, address _nftAddress) {
    chairperson = msg.sender;
    voters[chairperson].weight = 1;
    for (uint i = 0; i < proposalNames.length; i++) {
        proposals.push(Proposal({
            name: proposalNames[i],
            voteCount: 0
        }));
    }
    nftRequirement = _nftRequirement;
    tokenAddress = _tokenAddress;

    // create an instance of the NFT contract using its address
    nftContract = NFTContract(_nftAddress);
}


function createProposal(bytes32 proposalName) public {
    require(nftBalances[msg.sender] >= nftRequirement, "You don't have enough NFTs to create a proposal");
    // transfer the required amount of ERC-20 tokens from the sender to the contract
    IERC20(tokenAddress).transferFrom(msg.sender, address(this), proposalFee);
    proposals.push(Proposal({
        name: proposalName,
        voteCount: 0
    }));
}

function balanceOf(address account) external view returns (uint256) {
    // get the balance of a certain NFT for an address using the nftContract reference
    return nftContract.balanceOf(account);
}

function totalSupply() external view returns (uint256) {
    // get the total supply of the NFT using the nftContract reference
    return nftContract.totalSupply();
}


function giveRightToVote(address voter) public {
    require(msg.sender == chairperson, "Only chairperson can give right to vote.");
    require(!voters[voter].voted, "The voter already voted.");
    require(voters[voter].weight == 0);
    voters[voter].weight = balanceOf(voter) * totalSupply(); // new calculation based on NFT balance
}

function vote(uint proposal) public {
    Voter storage sender = voters[msg.sender];
    require(sender.weight != 0, "Has no right to vote");
    require(!sender.voted, "Already voted.");
    sender.voted = true;
    sender.vote = proposal;
    proposals[proposal].voteCount += sender.weight;
}
