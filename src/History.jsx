import { useNavigate } from 'react-router-dom'
import Translation from './Translation'
import { useState } from 'react'

function History() {
    const navigate = useNavigate()

    function goToHome() {
        navigate('/');
    }

    const [translations, setTranslations] = useState([
        {
            id: 1,
            english: 'hello',
            german: 'hallo',
            highlighted: false
        },
        {
            id: 2,
            english: 'country',
            german: 'Land',
            highlighted: true
        },
        {
            id: 3,
            english: 'man',
            german: 'Mann',
            highlighted: false
        },
    ])

    function handleHighlight(id) {
        console.log('highlight')
        setTranslations(prev => prev.map(
            translation => translation.id === id ?
                { ...translation, highlighted: !translation.highlighted }
                : translation
            )
        )
    }

    function handleDelete(id) {
        console.log('delete')
        setTranslations(prev => prev.filter(translation => translation.id != id))
    }

    const translationsList = translations.map(
        translation =>
            <Translation
                key={translation.id}
                data={translation}
                handleHighlight={() => handleHighlight(translation.id)}
                handleDelete={() => handleDelete(translation.id)}
            />
    )

    return (
        <main className="container">
            <section className="buttom-buttons">
                <button onClick={goToHome} className="box">Back to Home</button>
            </section>
            <div className="box sub-header">
                History
            </div>
            {translations.length > 0 ? translationsList : <div>No History</div>}
        </main>
    );
}

export default History;