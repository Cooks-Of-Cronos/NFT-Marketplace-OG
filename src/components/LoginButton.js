import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect, disconnect, updateConnectionStatus } from '../redux/blockchain/blockchainActions';

export const useBlockchainAccount = () => {
    return useSelector((state) => state.blockchain.account);
  };

const LoginButton = () => {
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.blockchain.connected);
     const account = useSelector((state) => state.blockchain.account);

    const handleConnect = () => {
        dispatch(connect());
        dispatch(updateConnectionStatus(true));
        console.log(account)
    };

    const handleDisconnect = () => {
    dispatch(disconnect());
    dispatch(updateConnectionStatus(false));

    };

return (
    <div>
      {connected ? (
        <button onClick={handleDisconnect}>Disconnect</button>
      ) : (
        <>
        <button onClick={handleConnect}>Connect</button>
        <p>Connected Account: {account}</p>
        </>
      )}
    </div>
  );
};

export default LoginButton;