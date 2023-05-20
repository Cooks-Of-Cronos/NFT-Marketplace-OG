import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Mint from './mint'

import Staking from './staking'
import Home from './home'
import Marketplace from './marketplace';
import Watch2Earn from './Watch2Earn';
import CroboCop from './CroboCop';
import NFTMintingPage from './Test';

const App = () => {
    return (
        <Router>
            <main>
                
                <Routes>
                    <Route exact path="/" element={<Home />}
                        render={(props) =>
                        (
                            <Home {...props}

                            />
                        )
                        }
                    />
                    <Route exact path="/mint" element={<Mint />}
                        render={(props) =>
                        (
                            <Mint {...props}

                            />
                        )
                        }
                    />
                    <Route path="/staking" element={<Staking />}
                        render={(props) =>
                        (
                            <Staking {...props}

                            />
                        )
                        }
                    />
                    <Route path="/marketplace" element={<Marketplace />}
                        render={(props) =>
                        (
                            <Staking {...props}

                            />
                        )
                        }
                    />
                    <Route path="/Watch2Earn" element={<Watch2Earn />}
                        render={(props) =>
                        (
                            <Staking {...props}

                            />
                        )
                        }
                    />
                    <Route path="/CroboCop" element={<CroboCop />}
                        render={(props) =>
                        (
                            <Staking {...props}

                            />
                        )
                        }
                    />
                    <Route path="/Test" element={<NFTMintingPage />}
                        render={(props) =>
                        (
                            <Staking {...props}

                            />
                        )
                        }
                    />
                </Routes>

            </main>
        </Router>
    )
}

export default App