import React, { useState, useEffect } from "react";

function NFTTransaction(props) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.cronoscan.com/api?module=account&action=txlistnft&address=${props.contractAddress}&sort=desc&apikey=WACBMAWJB6171MP98GMUPN585QSR7BWRU8`);
            const data = await response.json();
            setTransactions(data.result);
        };
        fetchData();
    }, [props.contractAddress]);

    return (
        <div>
            <h2>NFT Transactions for {props.contractAddress}</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.hash}>
                        <p>From: {transaction.from}</p>
                        <p>To: {transaction.to}</p>
                        <p>Value: {transaction.value}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NFTTransaction;
