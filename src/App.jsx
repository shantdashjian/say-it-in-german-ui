import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import History from './History';

function App() {
    return (
        <div className="main-container">
            <header>
                <div className="box header">
                    Say It in German
                </div>
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/history" element={<History />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
