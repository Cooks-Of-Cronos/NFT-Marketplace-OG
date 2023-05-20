import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
    margin-top: 1rem;
    font-size: 1.2rem;

    th {
      background-color: #f7f7f7;
      color: #444;
      text-align: left;
      padding: 0.5rem;
    }

    td {
      border: 1px solid #ddd;
      padding: 0.5rem;
      text-align: center;
    }

    tbody tr:hover {
      background-color: #f5f5f5;
    }
  }
`;

/*const Leaderboard = ({ userAddress, userStats }) => {



    //{userAddress}
    //{userStats.nftsForSale}
   // { userStats.nftsSold }
   // { userStats.rewardsAccrued }
    return (
        <LeaderboardContainer>
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>NFTs For Sale</th>
                        <th>NFTs Sold</th>
                        <th>Rewards Accrued</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </LeaderboardContainer>
    );
};*/



const Leaderboard = ({ contractAddress }) => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const contractAddress = "0x230Bb7ce185CD0042973202f5F38B7072440e2C9";
            const apiUrl = `https://api.cronoscan.com/api?module=account&action=txlist&address=${contractAddress}&startblock=1&endblock=99999999&sort=asc&apikey=WACBMAWJB6171MP98GMUPN585QSR7BWRU8`;
            const response = await axios.get(apiUrl, { responseType: 'json' });
            const data = response.data;
            console.log(typeof response.data.result);
            console.log(data);
            const transactions = response.data.result.filter(
                (tx) => tx.contractAddress === contractAddress
            );
            const counts = {};
            for (let i = 0; i < transactions.length; i++) {
                const from = transactions[i].from;
                const to = transactions[i].to;
                if (from && from !== "0x0000000000000000000000000000000000000000") {
                    if (counts[from]) {
                        counts[from]++;
                    } else {
                        counts[from] = 1;
                    }
                }
                if (to && to !== "0x0000000000000000000000000000000000000000") {
                    if (counts[to]) {
                        counts[to]++;
                    } else {
                        counts[to] = 1;
                    }
                }
            }
            const leaderboard = Object.entries(counts)
                .sort((a, b) => b[1] - a[1])
                .map(([address, count]) => ({ address, count }));
            setLeaderboard(leaderboard);
        };
        fetchLeaderboard();
    }, [contractAddress]);

    return (
        <LeaderboardContainer>
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Transactions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((item, index) => (
                        <tr key={index}>
                            <td>{item.address}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </LeaderboardContainer>
    );
};




export default Leaderboard;
