import { useNavigate } from 'react-router-dom'
import Translation from './Translation'
import { useState } from 'react'
import PropTypes from 'prop-types'

function History({ translations, updateTranslations }) {
    const [apiUrl] = useState(import.meta.env.VITE_API_URL)
    const navigate = useNavigate()

    function goToHome() {
        navigate('/');
    }

    async function handleHighlight(id) {
        const translation = { ...translations.find(translation => translation.id === id) }
        translation.highlighted = !translation.highlighted
        const options = {
            method: 'PUT',
            body: JSON.stringify(translation),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            updateTranslations(translations.map(
                translation => translation.id === id ?
                    { ...translation, highlighted: !translation.highlighted }
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
            updateTranslations(translations.filter(translation => translation.id != id))
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

History.propTypes = {
    translations: PropTypes.array.isRequired,
    updateTranslations: PropTypes.func.isRequired
};

export default History;