import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Mint from './mint'


import Marketplace from './marketplace';
import NFTCollectionPage from './NFTPage';  // import the NFTCollectionPage
import { NFTProvider } from './components/nftcontext'; // import the NFTProvider
import NFTMinter from './pages/mintNFTs';
import Dashboard from './pages/Dashboard';
import PreviewUI from './pages/Preview';
import BattleUI from './BattleRoyale';
import NFTContractUI from './vote';


const App = () => {
    return (
        <NFTProvider>
        <Router>
            <main>
                
            <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/mint" element={<Mint />} />
            
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/minter" element={<NFTMinter />} />
            <Route path="/collection" element={<NFTCollectionPage />} /> 
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/preview" element={<PreviewUI />} />
            <Route path="/battle" element={<BattleUI />} />
            <Route path="/vote" element={<NFTContractUI />} />
          </Routes>
          

            </main>
        </Router>
        </NFTProvider>
    )
}

export default App