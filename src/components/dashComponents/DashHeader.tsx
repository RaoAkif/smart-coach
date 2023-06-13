import { Link } from 'react-router-dom'

const DashHeader = () => {

    const content = (
        <header style={{position: 'fixed', top: '0', left: '0', width: '100%', color: "#000", background: "#fff"}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 20px'}} id='header-items'>
                    <div id='logo-container'>
                        <p>CompanyLogo</p>
                    </div>
                    <nav id="nav">
                        <ul style={{display: 'flex', listStyle: 'none'}} id="nav-items">
                            <li style={{paddingLeft: '20px'}} className="nav-item">About Us</li>
                            <li style={{paddingLeft: '20px'}} className="nav-item">Blogs</li>
                            <li style={{paddingLeft: '20px'}} className="nav-item">Contact Us</li>
                        </ul>
                    </nav>
                </div>
            </header>
    )

    return content
}
export default DashHeader