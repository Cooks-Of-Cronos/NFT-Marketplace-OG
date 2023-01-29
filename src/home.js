import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { useDispatch, useSelector } from "react-redux";
import { connectM } from "./redux/blockchain/blockchainActions";
import { fetchDataM } from "./redux/data/dataActions";
import './styles/home.css';

const home = () => {
  return (
    <div className="homeContainer">
    <div className="intro">
    <img src={"/config/images/logo.png"} alt="" className="wolf" />
    <p className="h1">Cro Crooks NFT</p>
    </div>
    <div className="hero">
    <div className="svgcont">
        <img src="https://i.imgur.com/wcTlExF.png" alt="" className="heroimg" />
    </div>
    <div className="herotext">

    <p className="h2">Mint and Stake Cro Crooks to earn cGOLD Tokens</p>
    <div className="text">
    <p>Mint a Cro Crook at a price of 99 $CRO</p>
    <p>Stake your Crook NFT to earn passive income, earn cool Crooks Gold Tokens</p>
    </div>
    <Link className="button" to="/mint"><p className="h3">Join The Gang</p></Link>
    </div>
    </div>
    <div>
    <h1 className="container">Mint Crooks</h1>
    </div>  
    <div className="link">
    <Link className="stake" to="/mint">Stake</Link>
    <Link className="mint" to="/mint">Mint</Link>
    </div>
    <div className="footer">Made with  <img src="https://i.ibb.co/44ZjM2B/pngwing-com.png" alt="pngwing-com" className="love"/> By Cro Kitchen Team</div>
        {/* <li className="mintbox" onClick={(e) => {
                    e.preventDefault();
                    dispatch(connectM());
                }}>
                <Link to="/mint">MINT</Link>
                </li> */}

    </div>
  )
}

export default home