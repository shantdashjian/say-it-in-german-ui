import { useState } from "react"
import { useNavigate } from 'react-router-dom'

function Home() {

    const [englishText, setEnglishText] = useState('')
    const [germanText, setGermanText] = useState('')
    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_API_URL
    const elevenLabsApiKey = import.meta.env.VITE_ELEVEN_LABS_API_KEY

    async function handleTranslate() {
        if (englishText !== '') {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    "englishText": englishText
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            try {

                let response = await fetch(apiUrl + 'translation', options)
                response = await response.json()
                setGermanText(response.germanText)
            }
            catch (err) {
                console.error(err);
            }
        }
    }

    async function handleSpeak() {
        if (germanText !== '') {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'xi-api-key': elevenLabsApiKey,
                    'Content-Type': 'application/json'
                },
                body: `{"model_id":"eleven_multilingual_v2","text": "${germanText}"}`
            };

            try {
                const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB?output_format=mp3_22050_32', options)
                const mp3Data = await response.blob();
                const mp3Url = URL.createObjectURL(mp3Data);
                const audio = new Audio(mp3Url);
                audio.play();
            }
            catch (err) {
                console.error(err);
            }
        }
    }

    function handleClear() {
        setEnglishText('')
        setGermanText('')
    }

    function goToHistory() {
        navigate('/history');
    }

    return (
        <main className="container">
            <section>
                <textarea className="box" value={englishText} onChange={(e) => setEnglishText(e.target.value)} rows="6"></textarea>
            </section>
            <section className="buttons">
                <button className="box" onClick={handleTranslate}>Translate</button>
                <button className="box" onClick={handleSpeak}><i className="fa-solid fa-volume-high"></i></button>
                <button className="box" onClick={handleClear}>Clear</button>
            </section>
            <section>
                <textarea className="box" value={germanText} onChange={(e) => setGermanText(e.target.value)} rows="6"></textarea>
            </section>
            <section className="buttom-buttons">
                <button onClick={goToHistory} className="box">Manage History</button>
            </section>
        </main>
    )
}

export default Home
