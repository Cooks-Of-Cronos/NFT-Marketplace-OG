import { useSelector } from 'react-redux';

// Inside your component
export const connected = useSelector((state) => state.blockchain.connected);

export const ConnectButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: connected ? 'green' : '#000',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '4px',
        marginBottom: '20px',
        cursor: 'pointer',
      }}
    >
      {connected ? 'CONNECTED' : 'CONNECT'}
    </button>
  );
};

