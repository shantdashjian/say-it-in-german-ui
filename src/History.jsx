import { useNavigate } from 'react-router-dom'
import Translation from './Translation'
import { useState, useEffect } from 'react'

function History() {
    const [apiUrl] = useState(import.meta.env.VITE_API_URL)
    const navigate = useNavigate()

    function goToHome() {
        navigate('/');
    }

    const [translations, setTranslations] = useState(null)

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

    async function handleHighlight(id) {
        const translation = {...translations.find(translation => translation.id === id)}
        translation.highlighted = !translation.highlighted
        const options = {
            method: 'PUT',
            body: JSON.stringify(translation),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            setTranslations(prev => prev.map(
                translation => translation.id === id ?
                    {...translation, highlighted: !translation.highlighted}
                    : translation
            )
            )
            let response = await fetch(apiUrl + 'translation/' + id, options)
            await response.json()
        }
        catch (err) {
            console.error(err);
        }
        
    }

    async function handleDelete(id) {
        const options = {
            method: 'DELETE'
        }
        try {
            setTranslations(prev => prev.filter(translation => translation.id != id))
            await fetch(apiUrl + 'translation/' + id, options)
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <main className="container">
            <section className="buttom-buttons">
                <button onClick={goToHome} className="box">Back to Home</button>
            </section>
            <div className="box sub-header">
                History
            </div>
            {translations === null ? null : translations.length > 0 ? translations.map(
                translation =>
                    <Translation
                        key={translation.id}
                        data={translation}
                        handleHighlight={() => handleHighlight(translation.id)}
                        handleDelete={() => handleDelete(translation.id)}
                    />
            ) : <div className='empty-history'>There are no translations in your history!</div>}
        </main>
    );
}

export default History;