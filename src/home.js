import { HashLink as Link } from 'react-router-hash-link'
import { useDispatch, useSelector } from "react-redux";
import { connectM } from "./redux/blockchain/blockchainActions";
import { fetchDataM } from "./redux/data/dataActions";
import './styles/home.css';
import React, { useState } from "react";
import { Typography, Box, Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, TextField  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { DISCONNECT_FAILED, disconnectFailed, disconnect, connect, isConnected } from "./redux/blockchain/blockchainActions";
// import NFTLendingPool from "./contracts/NFTLendingPool.json";
// NFT LENDING POOL ABI 
// NFT LENDING POOL CONTRACT ADDR
import Footer from './Footer';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


const useStyles = makeStyles(theme => ({
    text: {
      textAlign: 'center',
      fontSize: '1.2rem',
      lineHeight: '1.5',
      '& span': {
        fontWeight: 'bold',
        fontStyle: 'italic',
        textDecoration: 'underline'
      }
    }
  }));

const home = () => {
    const classes = useStyles();

    const [nftName, setNftName] = useState("");
    const [nftId, setNftId] = useState("");
    const [appraisal, setAppraisal] = useState("");
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nftData, setNftData] = useState(null);
    const [account, setAccount] = useState("");
    const blockchain = useSelector((state) => state.blockchain);

    // const handleAppraisal = () => {
    //     setDialogOpen(true);
    //     setLoading(true);
    //     // Simulating API call
    //     setTimeout(() => {
    //         setLoading(false);
            
    //         setNftData({
    //             amountOffered: 10,
    //             collectionVolume: 50,
    //             floorPrice: 0.5
    //         });
    //         /*alert(
    //             `Amount Of CRO Offered: ${Math.floor(Math.random() * 100)}\nNFT Collection Volume: ${Math.floor(
    //                 Math.random() * 1000
    //             )}\nFloor Price: ${Math.floor(Math.random() * 10)} CRO`
    //         );*/
    //     }, 4000);
    // };

    // const handleAgree = async () => {
    //     const nftLendingPoolAddress = "0x123456789...";
    //     const nftLendingPool = new ethers.Contract(
    //         nftLendingPoolAddress,
    //         NFTLendingPool.abi,
    //         library.getSigner(account)
    //     );
    //     await nftLendingPool.createLoan(nftName, nftId, appraisal);
    //     setOpen(false);
    // };

    // const handleDisagree = () => {
    //     setOpen(false);
    // };

    // const handleCloseDialog = () => {
    //     setDialogOpen(false);
    // }

    // const handleClose = () => {
    //     setDialogOpen(false);
    // };






    return (
        <div className="homeContainer">
            

                    <div class="navbarHome">
						<div class="navbar-left">
							<a href="/"><img src="https://i.imgur.com/ItF0nFj.png" alt="Logo" /></a>
							</div>
						<div class="home-bar">

                            
							<a href="/"><img src="https://i.imgur.com/ItF0nFj.png" alt="Logo" /></a>
                            <Typography variant="h4" gutterBottom>
                            Welcome to 3C's
                        </Typography>
                        <div class="barButtons"><button onClick={() => window.open("#/CroBoCop", "_blank")}>Mint</button>
                        </div>
							
							
							
						<div>
                                <ul>
                                    <li>
                                        
                                    {blockchain.smartContract ? (
									<p>Connected as {blockchain.account}</p>
								) : (
									<button onClick={async () => {
										Swal.fire({
										  title: 'Connecting...',
										  allowOutsideClick: false,
										  didOpen: async () => {
											try {
											  await dispatch(connect());
											  handleConnect();
											  
											} catch (error) {
											  console.log(error);
											  Swal.fire({
												icon: 'error',
												title: 'Oops...',
												text: 'Connection failed. Please try again!',
											  });
											}
										  },
										});
									  }}>
										Connect
									  </button>
									  
								)}
                                            
                                        
                                    </li>
                                </ul>
                            </div>
						</div>
					</div>

            <section className="section2">
                <div className="video">
                    <iframe
                        width="100%"
                        height="auto"
                        src="https://www.youtube.com/embed/JHalzMLR0tM"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                    <div className="videoText">
                        <Typography variant="h4" gutterBottom>
                            Welcome to 3C's
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Join the Revolution of Seamless and Secure Transactions in a Sustainable NFT Ecosystem
                        </Typography>
                        <Typography variant="body1" gutterBottom className={classes.text}>
      Our platform is designed to deliver a <span>seamless</span> and <span>secure</span> user experience, ensuring that every <span>transaction</span> is <span>smooth</span> and <span>easy</span>. We are committed to building a <span>sustainable</span> NFT ecosystem by focusing on both <span>utility</span> and <span>advanced utility</span>, which is a testament to our <span>dedication</span> to the growth and development of the NFT industry. Join us today and experience the world of NFTs like never before. Click the links below to learn more about our NFT Platforms, products and blockchain services or start purchasing NFTs by visiting the <span>First Rewards Based NFT Marketplace</span>.
    </Typography>
                        <a target="_blank" href="https://medium.com/@crooksofcronos" className="learn-more-btn">
                            Learn More
                        </a>
                        <a href="/#/marketplace" className="learn-more-btn">
                            Visit NFT Marketplace
                        </a>
                    </div>
                </div>
            </section>

            <section className="section3">
                <Typography
                    style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    Features and Platforms
                </Typography>
                <div className="features">
                    <div className="feature" onClick={() => window.open("#/marketplace", "_blank")}>
                        <img src="https://i.imgur.com/F2nloYD.png" alt="" />
                        <Typography variant="h5" gutterBottom>
                            NFT Marketplaces
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Our platform is designed for users by users, giving you the freedom and creativity to mint your own NFTs and showcase them to the world.
                        </Typography>
                    </div>
                    <div className="feature" onClick={() => window.open("https://cooks-of-cronos.github.io/Cronos-Crooks-NFT/games.html", "_blank")}>
                        <img src="https://i.imgur.com/r3AuCCZ.png" alt="" />
                        <Typography variant="h5" gutterBottom>
                            Play-To-Earn
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Immerse yourself in the world of blockchain gaming and earn real cryptocurrency by playing our Play-to-Earn games. With exciting gameplay and lucrative rewards, you won't want to miss out on this new way to game.
                        </Typography>
                    </div>
                    <div className="feature" onClick={() => window.open("https://cronosclassroom.art/", "_blank")}>
                        <img src="https://i.imgur.com/uH4AbNp.png" alt="" />
                        <Typography variant="h5" gutterBottom>
                            Web2 Blockchain Platforms
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Experience the best of both worlds with our Web2 Blockchain Platforms that combine the power of traditional web platforms with the security and immutability of blockchain technology.
                        </Typography>
                    </div>
                    <div className="feature" onClick={() => window.open("#/Watch2Earn", "_blank")}>
                        <img src="https://i.imgur.com/7PvNo9d.png" alt="" />
                        <Typography variant="h5" gutterBottom>
                            Watch-To-Earn(Youtube Integration)
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Earn cryptocurrency simply by watching your favorite Youtube videos! Our Watch-To-Earn Youtube Integration allows you to seamlessly earn crypto rewards while enjoying your favorite content.
                        </Typography>
                    </div>
                    <div className="feature" onClick={() => window.open("#/CroboCop", "_blank")}>
                        <img src="https://i.imgur.com/7Fm6G1g.gif" alt="" />
                        <Typography variant="h5" gutterBottom>
                            2023 Kickoff NFT Collection
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Earn cryptocurrency simply by watching your favorite Youtube videos! Our Watch-To-Earn Youtube Integration allows you to seamlessly earn crypto rewards while enjoying your favorite content.
                        </Typography>
                    </div>
                    <div className="feature" onClick={() => window.open("https://cronos-nav.netlify.app/", "_blank")}>
                        <img src="https://i.imgur.com/vOtaiaZ.png" alt="" />
                        <Typography variant="h5" gutterBottom>
                            Cronos Ecosystem Directory
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Earn cryptocurrency simply by watching your favorite Youtube videos! Our Watch-To-Earn Youtube Integration allows you to seamlessly earn crypto rewards while enjoying your favorite content.
                        </Typography>
                    </div>
                </div>
            </section>

            <section className="section4">
                <div className="backgroundImage">
                    <div className="overlay">
                        <h2>Ethereum Expansion</h2>
                        <p>Due to limited resources on Cronos, we are expanding to Ethereum to provide a better user experience and greater access to liquidity. We appreciate our Cronos users and look forward to continuing to grow with them.</p>
                        <div className="button-container">
                            <a target="_blank" href="https://medium.com/@crooksofcronos" className="buttonLink">
                                Read More
                            </a>
                            <a target="_blank" href="https://opensea.io/collection/cro-county-eth" className="buttonLinketh">
                                Mint an Eth NFT
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section5">
                <div className="buttons">
                    <div className="button-row">
                        <a target="_blank" href="#/CroboCop" className="buttonLink">
                            Mint Cronos NFT
                        </a>
                    </div>
                    <div className="button-row">
                        <a target="_blank" href="https://discord.gg/RgyfqGnaGE" className="buttonLink2">
                            Join Discord
                        </a>
                    </div>
                    <div className="button-row">
                        <a target="_blank" href="http://Twitter.com/@CrooksCronos" className="buttonLink3">
                            Follow Twitter
                        </a>
                    </div>
                </div>
            </section>

            <div className="footer">Made with <img src="https://i.ibb.co/44ZjM2B/pngwing-com.png" alt="pngwing-com" className="love" /> By Cro County Crypto Team</div>

            <Footer />
        </div>


    );
}

export default home