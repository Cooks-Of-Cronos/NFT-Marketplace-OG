import React from 'react';
import { FaTwitter, FaDiscord, FaTiktok, FaTelegram } from 'react-icons/fa';
import './styles/footer.css'; // Assume we have a dedicated CSS file for Footer styling

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-row">
        <div className="footer-column">
          <FooterButton href="#">Disclaimer</FooterButton>
          <FooterButton href="#">Terms of Use</FooterButton>
          <FooterButton href="#">Privacy Policy</FooterButton>
        </div>
        <div className="footer-column">
          <FooterSocialButton href="http://Twitter.com/@CroCryptoClub" Icon={FaTwitter} />
          <FooterSocialButton href="https://discord.gg/RgyfqGnaGE" Icon={FaDiscord} />
          <FooterSocialButton href="https://www.tiktok.com/@crooksofcronosnft" Icon={FaTiktok} />
          <FooterSocialButton href="https://t.me/crooksofcronos" Icon={FaTelegram} />
        </div>
      </div>
      <div className="footer-row">
        <div className="footer-column">
          <FooterButton href="#">NFT Launchpad Application</FooterButton>
          <FooterButton href="#">Staking Application</FooterButton>
        </div>
        <div className="footer-column">
          
          <FooterButton href="#/marketplace">Marketplace</FooterButton>
          
        </div>
      </div>
    </div>
  </footer>
);

const FooterButton = ({ href, children }) => (
  <button className="footer-button" onClick={() => window.location.href = href}>
    {children}
  </button>
);

const FooterSocialButton = ({ href, Icon }) => (
  <a className="social-button" href={href} target="_blank" rel="noopener noreferrer">
    <Icon />
  </a>
);

export default Footer;
