event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
event itemAdded(uint256 indexed id, uint256 indexed tokenId, address nftTokenAddress, uint256 askingPrice)
event itemSold(uint256 indexed id, address indexed buyer, uint256 askingPrice)





function addItemToMarket(uint256 tokenId, address nftTokenAddress, uint256 askingPrice) external returns (uint256)
function buyItem(uint256 id) payable external
function cancelSale(uint256 id) external
function cancelSaleByOwner(uint256 id) external
function getItemsForSale() external view returns (tuple[])
function getPlatformFeePercentage() external view returns (uint256)



function itemsForSale(uint256) external view returns (uint256 id, address nftTokenAddress, uint256 tokenId, address payable seller, uint256 askingPrice, bool isSold)
function owner() external view returns (address)
function renounceOwnership() external
function rewardBuyer(uint256 id) external
function rewardLister() external
function rewardSeller(uint256 id) external




function sellers(address) external view returns (bool)
function setToken(address _token) external
function setTokenAddress(address _tokenAddress) external
function token() external view returns (contract ERC20)
function tokenAddress() external view returns (address)
function transferOwnership(address newOwner) external
function updatePlatformFee(uint256 newFeePercentage) external
function userBalances(address) external view returns (uint256)

function getItemsForSale() external view returns (tuple[])
function userBalances(address) external view returns (uint256)
event itemAdded(uint256 indexed id, uint256 indexed tokenId, address nftTokenAddress, uint256 askingPrice)
event itemSold(uint256 indexed id, address indexed buyer, uint256 askingPrice)








REWARDS CONTRACT METHODS: 

constructor: A special method that runs only once when the contract is created.
addController: Adds a new controller to the contract.
allowance: Returns the amount of token that the spender is allowed to spend on behalf of the owner.
balanceOf: Returns the token balance of the specified address.
burn: Burns a specified amount of tokens.
burnFrom: Burns a specified amount of tokens from the specified account.
decimals: Returns the number of decimal places used by the token.
decreaseAllowance: Decreases the amount of token that the spender is allowed to spend on behalf of the owner.
increaseAllowance: Increases the amount of token that the spender is allowed to spend on behalf of the owner.
mint: Mints new tokens and adds them to the specified address.
name: Returns the name of the token.
owner: Returns the owner of the contract.
removeController: Removes a controller from the contract.
renounceOwnership: Allows the current owner to give up control of the contract.
symbol: Returns the symbol of the token.
totalSupply: Returns the total supply of the token.
transfer: Transfers tokens from the sender's account to the specified account.
transferFrom: Transfers tokens from the specified account to the recipient's account, but only if the spender is allowed to spend on behalf of the owner.
transferOwnership: Transfers ownership of the contract to a new owner.


setApprovalForAll





MARKETPLACE CONTRACT: 0xa12A3A4ED947e38Ad0c177799De37DD77F520E62


TODO: 
	verify Contracts 

