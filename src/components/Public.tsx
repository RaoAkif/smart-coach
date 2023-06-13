import { useState } from 'react';

const Public = () => {
    const [year] = useState(new Date().getFullYear());

    const content = (
        <section className="public">
            <header style={{color: "#fff", textAlign: 'center', fontSize: '2.5rem', marginBottom: '-20vh', marginTop: '5vh'}}>
                <h1>CompanyLogo</h1>
            </header>
            <main className="public__main">
                <h1>Welcome to the Landing Page!</h1>
                <div style={{margin: 'auto', display: 'flex', flexDirection: 'column', width: '10vw', marginTop: '20px'}}>
                    <button style={{padding: '5px', marginTop: '15px'}}><a style={{color: '#000'}} href="./register">Register</a></button>
                    <button style={{padding: '5px', marginTop: '15px'}}><a style={{color: '#000'}} href="./login">Login</a></button>
                </div>
            </main>
            <footer style={{position: 'fixed', bottom: '0', left: '0', width: '100%', textAlign: 'center', background: '#fff', color: '#000'}}>
                © {year} - Developed by Company
            </footer>
        </section>

    )
    return content
}
export default Public