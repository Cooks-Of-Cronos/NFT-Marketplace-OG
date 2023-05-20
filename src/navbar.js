import { HashLink as Link } from 'react-router-hash-link'
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import "./styles/navbar.css"

const Navbar = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };

   



    return (
        <nav className="nav-wrap">
            <ul>
                <Link className="logo" to="/"><img src={"/config/images/logo.png"} width="63" height="60" /></Link>
                <li className="mintbox" onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());
                }}>
                    <Link to="/CroboCop">MINT</Link>
                </li>
                <li className="stakebox"><Link to="/CroboCop">2023</Link></li>
                <li className="stakebox"><Link to="/Watch2Earn">W2E</Link></li>
                <li className="stakebox"><Link to="/mint">STAKE</Link></li>
                <li className="stakebox"><Link to="">Home</Link></li>
                
            </ul>
        </nav>
    );
}

export default Navbar;
