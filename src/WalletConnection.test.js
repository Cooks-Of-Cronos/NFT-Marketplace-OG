// WalletConnection.test.js

// Import the necessary functions or modules
import { connect, isConnected } from './redux/blockchain/blockchainActions'; // Update the module path accordingly

import fetchMock from 'jest-fetch-mock';


// Mock the isConnected function
jest.mock('./redux/blockchain/blockchainActions', () => ({
    ...jest.requireActual('./redux/blockchain/blockchainActions'),
    isConnected: jest.fn(),
}));

// Test case for connecting the wallet
describe('Wallet Connection', () => {
    

    it('should connect the wallet successfully', () => {
        // Mock any necessary dependencies or setup

        // Call the connect function
        const result = connect();

        // Assert the expected result
        expect(result).toBeTruthy(); // Assuming the connect function returns a truthy value upon successful connection
    });


   
});




