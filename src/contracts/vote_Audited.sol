import "./CroCrooks.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VotingContract {
    CrooksNFT public nftContract;
    uint256 public proposalFee; // Proposal fee variable

    struct Voter {
        uint256 vote;
        bool voted;
        uint256 weight;
    }

    struct Proposal {
        bytes32 name;
        uint256 voteCount;
    }

    Proposal[] public proposals;
    mapping(address => Voter) public voters;
    mapping(address => uint256) public nftBalances;

    address public chairperson;
    uint256 public nftRequirement;
    address public tokenAddress;

    constructor(
        bytes32[] memory proposalNames,
        uint256 _nftRequirement,
        address _tokenAddress,
        address _nftAddress,
        uint256 _proposalFee
    ) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        nftRequirement = _nftRequirement;
        tokenAddress = _tokenAddress;
        nftContract = CrooksNFT(_nftAddress);
        proposalFee = _proposalFee;

        for (uint256 i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    function createProposal(bytes32 proposalName) public {
        require(
            nftBalances[msg.sender] >= nftRequirement,
            "You don't have enough NFTs to create a proposal"
        );
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), proposalFee);
        proposals.push(Proposal({name: proposalName, voteCount: 0}));
    }

    function balanceOf(address account) public view returns (uint256) {
        return nftContract.balanceOf(account);
    }

    function totalSupply() public view returns (uint256) {
        return nftContract.totalSupply();
    }

    function giveRightToVote(address voter) public {
        require(msg.sender == chairperson, "Only chairperson can give the right to vote.");
        require(!voters[voter].voted, "The voter already voted.");
        require(voters[voter].weight == 0, "The voter already has voting rights.");
        voters[voter].weight = balanceOf(voter) * totalSupply();
    }

    function vote(uint256 proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote.");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;
        proposals[proposal].voteCount += sender.weight;
    }

    function getProposalFee() public view returns (uint256) {
        return proposalFee;
    }

    function setProposalFee(uint256 _fee) public {
        require(msg.sender == chairperson, "Only chairperson can set the proposal fee.");
        proposalFee = _fee;
    }
}
