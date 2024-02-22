import { useNavigate } from 'react-router-dom'

function History() {
    const navigate = useNavigate()

    function goToHome() {
        navigate('/');
    }

    return (
        <main className="container">
            <section className="buttom-buttons">
                <button onClick={goToHome} className="box">Back to Home</button>
            </section>
            <div className="box sub-header">
                History
            </div>
        </main>
    );
}

export default History;