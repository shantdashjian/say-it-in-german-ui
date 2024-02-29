import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import History from './History';

function App() {
    const [apiUrl] = useState(import.meta.env.VITE_API_URL)
    const [translations, setTranslations] = useState([])

    function updateTranslations(translations) {
        setTranslations(translations)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await fetch(apiUrl + 'translation')
                response = await response.json()
                setTranslations(response.translations)
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchData()
    }, [apiUrl])

    return (
        <div className="main-container">
            <header>
                <div className="box header">
                    Say It in German
                </div>
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home translations={translations} updateTranslations={updateTranslations}/>} />
                    <Route path="/history" element={<History translations={translations} updateTranslations={updateTranslations}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
