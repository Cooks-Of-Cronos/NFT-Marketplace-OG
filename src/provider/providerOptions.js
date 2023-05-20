import { DeFiWeb3Connector } from "deficonnect";

// provider options
export const providerOptions = {

    "custom-example": {

        display: {
            logo:"",
            name: "Defi Wallet",
            description: "Connect to your Defi Wallet account"
        },

        package: DeFiWeb3Connector,
        options: {
            supportedChainIds: [1, 25],
            rpc: {
                1: "https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a",
                25: "https://evm.cronos.org/", // cronos mainet
                0x13881: "https://mainnet.infura.io/v3/c66d5493eff848ca89349923e7d1131a,"
            },
            pollingInterval: 15000,
        },

        connector: async (ProviderPackage, options) => {
            const connector = new ProviderPackage(options);
            await connector.activate();
            let provider = await connector.getProvider()
            return provider;
        }

    },
};

