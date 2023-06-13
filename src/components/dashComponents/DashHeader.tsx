import { Link } from 'react-router-dom'
import Logo from '../Logo'
import Navbar from '../Navbar'

const DashHeader = () => {

    const content = (
        <header style={{position: 'fixed', top: '0', left: '0', width: '100%', color: "#000", background: "#fff"}}>
                    <Logo />
                    <Navbar />
            </header>
    )

    return content
}
export default DashHeader