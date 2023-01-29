import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Mint from './mint'
import Navbar from './navbar'
import Staking from './staking'
import Home from './home'

const App = () => {
    return (
        <Router>
            <main>
                <Navbar />
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
                </Routes>
            </main>
        </Router>
    )
}

export default App