import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Mint from './mint'

import Staking from './staking'
import Home from './home'
import Marketplace from './marketplace';
import Watch2Earn from './Watch2Earn';
import NFTCollectionPage from './NFTPage';  // import the NFTCollectionPage
import { NFTProvider } from './components/nftcontext'; // import the NFTProvider
import NFTMinter from './pages/mintNFTs';


const App = () => {
    return (
        <NFTProvider>
        <Router>
            <main>
                
            <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/Watch2Earn" element={<Watch2Earn />} />
            <Route path="/minter" element={<NFTMinter />} />
            <Route path="/collection" element={<NFTCollectionPage />} />  {/* add this line */}
          </Routes>
          

            </main>
        </Router>
        </NFTProvider>
    )
}

export default App