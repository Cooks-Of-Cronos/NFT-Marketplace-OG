// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import { DeFiWeb3Connector } from 'deficonnect'

// log
import { fetchData } from "../data/dataActions";


const INFURA_ID = "c66d5493eff848ca89349923e7d1131a";




const providerOptions = {
    display: {
        logo: "",
        name: "Defi Wallet",
        description: "Connect to your Defi Wallet account"
    },
    package: DeFiWeb3Connector,
    options: {
        supportedChainIds: [1, 25, 338],
        rpc: {
            1: "https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a",
            25: "https://evm.cronos.org/",
            338: "https://evm-t3.cronos.org", // cronos testnet
        },
        pollingInterval: 15000,
    },
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: INFURA_ID,
            rpc: {
                1: "https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a",
                25: "https://evm.cronos.org/",
                338: "https://evm-t3.cronos.org", // cronos testnet
            },
        },
    },
    walletlink: {
        package: WalletLink,
        options: {
            appName: "Ava Sharks",
            infuraId: "c66d5493eff848ca89349923e7d1131a",
            rpc: "https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a",
            chainId: 25,
            appLogoUrl: null,
            darkMode: false,
        },
    },
};


const connectRequest = () => {
    return {
        type: "CONNECTION_REQUEST",
    };
};

const connectSuccess = (payload) => {
    return {
        type: "CONNECTION_SUCCESS",
        payload: payload,
    };
};

const connectFailed = (payload) => {
    return {
        type: "CONNECTION_FAILED",
        payload: payload,
    };
};

const updateAccountRequest = (payload) => {
    return {
        type: "UPDATE_ACCOUNT",
        payload: payload,
    };
};
export let isConnected = false;

export const DISCONNECT_FAILED = "DISCONNECT_FAILED";


export const connect = () => {
    return async (dispatch) => {
        dispatch(connectRequest());
        try {
            const abiResponse = await fetch("/config/abi.json", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const abi = await abiResponse.json();
            const configResponse = await fetch("/config/config.json", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const CONFIG = await configResponse.json();
            localStorage.removeItem("walletconnect");
            localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
            const web3Modal = new Web3Modal({
                network: "mainnet", // optional
                cacheProvider: false, // optional
                providerOptions, // required
            });
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            console.log("web", web3);

            Web3EthContract.setProvider(provider);
            const accounts = await web3.eth.getAccounts();
            const networkId = await provider.request({
                method: "net_version",
            });

            
            console.log("networkId", networkId);
            if (networkId == CONFIG.NETWORK.ID) {
                const SmartContractObj = new Web3EthContract(
                    abi,
                    CONFIG.CONTRACT_ADDRESS
                );
                dispatch(
                    connectSuccess({
                        account: accounts[0],
                        smartContract: SmartContractObj,
                        web3: web3,
                    })
                );
                // Add listeners start

                // Subscribe to session connection
                provider.on('connect', () => {
                    console.log('connect')
                })

                provider.on("accountsChanged", (accounts) => {
                    dispatch(updateAccount(accounts[0]));
                });
                provider.on("chainChanged", () => {
                    window.location.reload();
                });
                // Add listeners end
            } else {
                dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
            }
        } catch (err) {
            console.log("error", err, " message", err.message);
            if (
                typeof err !== "undefined" &&
                typeof err.message !== "undefined" &&
                err.message.includes("User Rejected")
            ) {
                dispatch(connectFailed("User rejected the request"));
            } else if (
                (typeof err === "string" || err instanceof String) &&
                err.includes("Modal closed by user")
            ) {
                dispatch(connectFailed("Modal closed by user"));
            } else {
                dispatch(connectFailed("Something went wrong."));
            }
        }
    };
};


export const disconnect = () => {
    return async (dispatch) => {
        try {
            const web3Modal = new Web3Modal({
                network: "mainnet",
                cacheProvider: false,
                providerOptions,
            });
            setAccount("");
            setSmartContract(null);
            setConnector(null);

            await web3Modal.close();
            dispatch(disconnectSuccess());
            // remove listeners start
            const provider = web3Modal.provider;
            provider.removeAllListeners();
            // remove listeners end
        } catch (err) {
            dispatch(disconnectFailed("Something went wrong."));
        }
    };
};

export const disconnectFailed = (error) => {
    return {
        type: DISCONNECT_FAILED,
        error: error
    };
};

const disconnectSuccess = () => {
    return {
        type: "DISCONNECT_SUCCESS",
    };
};




export const updateAccount = (account) => {
    return async (dispatch) => {
        dispatch(updateAccountRequest({ account: account }));
        dispatch(fetchData(account));
    };
};