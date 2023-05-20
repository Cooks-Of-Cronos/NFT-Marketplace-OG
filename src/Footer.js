import React from 'react';
import { FaTwitter, FaDiscord, FaTiktok, FaTelegram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <ul className="footer-links">
                            <li><a href="#" style={{ fontSize: '16px', zoom: '1.2' }}>Disclaimer</a></li>
                            <li><a href="#" style={{ fontSize: '16px', zoom: '1.2' }}>Terms of Use</a></li>
                            <li><a href="#" style={{ fontSize: '16px', zoom: '1.2' }}>Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <ul className="social-icons" style={{ display: 'flex', justifyContent: 'center' }}>
                            <li><a target="_blank" href="http://Twitter.com/@CrooksCronos" style={{ zoom: '1.2' }}><FaTwitter /></a></li>
                            <li><a target="_blank" href="https://discord.gg/RgyfqGnaGE" style={{ zoom: '1.2' }}><FaDiscord /></a></li>
                            <li><a target="_blank" href="https://www.tiktok.com/@crooksofcronosnft" style={{ zoom: '1.2' }}><FaTiktok /></a></li>
                            <li><a target="_blank" href="https://t.me/crooksofcronos" style={{  zoom: '1.2' }}><FaTelegram /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <ul className="footer-links" style={{ fontFamily: 'sans-serif', color: 'black'}}>
                            <li><a target="_blank" href="#" style={{ fontSize: '16px', zoom: '1.2', color: 'black' }}>NFT Launchpad Application</a></li>
                            <li><a target="_blank" href="#" style={{ fontSize: '16px', zoom: '1.2' }}>Staking Application</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <ul className="footer-links">
                            <li><a target="_blank" href="#/CroboCop" style={{ fontSize: '16px', zoom: '1.2' }}>Mint CROBO NFTs</a></li>
                            <li><a target="_blank" href="#/Watch2Earn" style={{ fontSize: '16px', zoom: '1.2' }}>Watch & Earn Crypto</a></li>
                            <li><a target="_blank" href="#/marketplace" style={{ fontSize: '16px', zoom: '1.2' }}>Marketplace</a></li>

                            <li><a target="_blank" href="." style={{ fontSize: '16px', zoom: '1.2' }}>Home</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;
