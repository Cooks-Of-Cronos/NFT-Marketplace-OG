import { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardTitle, Row, Col, Table, Button } from "reactstrap";
import './styles/analytics.css';
const NFTContractAddress = "0x230Bb7ce185CD0042973202f5F38B7072440e2C9"; // replace with the contract address of the NFT you want to analyze

const Analytics = () => {
    const canvasRef = useRef(null);
    const [nftTransactions, setNFTTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchNFTTransactions = async () => {
            const apiKey = "WACBMAWJB6171MP98GMUPN585QSR7BWRU8";
            const url = `https://api.cronoscan.com/api?module=account&action=txlist&address=${NFTContractAddress}&startblock=1&endblock=99999999&sort=asc&apikey=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                const filteredData = data.result.filter(
                    (transaction) => transaction.value !== "0"
                );
                setNFTTransactions(filteredData);
                setFilteredTransactions(filteredData.slice(0, 10));
            } catch (error) {
                console.error(error);
            }
        };

        fetchNFTTransactions();
    }, []);

    const handleShowMore = () => {
        setShowMore(true);
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col md={6}>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">NFT Transactions</CardTitle>
                            <canvas ref={canvasRef}></canvas>
                            <div className="table-responsive">
                                <Table className="table-striped">
                                    <thead>
                                        <tr>
                                            <th>Transaction Hash</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTransactions.map((transaction) => (
                                            <tr key={transaction.hash}>
                                                <td>{transaction.hash}</td>
                                                <td>{transaction.from}</td>
                                                <td>{transaction.to}</td>
                                                <td>{transaction.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            {!showMore && (
                                <Button onClick={handleShowMore}>Show More</Button>
                            )}
                            {showMore && (
                                <div className="table-responsive">
                                    <Table className="table-striped">
                                        <thead>
                                            <tr>
                                                <th>Transaction Hash</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {nftTransactions.map((transaction) => (
                                                <tr key={transaction.hash}>
                                                    <td>{transaction.hash}</td>
                                                    <td>{transaction.from}</td>
                                                    <td>{transaction.to}</td>
                                                    <td>{transaction.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Other Analytics</CardTitle>
                            <p>Other analytics data goes here...</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );

};

export default Analytics;
