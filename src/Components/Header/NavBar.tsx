import { useState } from 'react'
import './NavBar.css'
import { HiBars3 } from "react-icons/hi2";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from 'react-router';

const NavBar = () => {
    const [isShow, setShow] = useState<boolean>(false)

    return (
        <div className='nav_container'>
            <nav>
                <div className='left'>
                    <div className='logo'>
                        <Link className='link' to="/">
                            <h1>Logo</h1>
                        </Link>

                    </div>
                </div>

                <div className='mid_nav md'>
                    <ul className='nav_links'>
                        <li className='nav_link'> <Link className='link' to="/Shop"></Link> Home</li>
                        <li className='nav_link'> <Link className='link' to="/About"></Link> About</li>
                        <li className='nav_link'> <Link className='link' to="/Contact"></Link> Contact</li>
                    </ul>
                </div>

                <div className='right_nav md'>
                    <Link className='link' to="/Login">
                        <button className='btn-login' id='login_btn'>Login</button>
                    </Link>
                    <Link className='link' to="/Signup">
                        <button className='btn-signup' id='signup_btn'>Signup</button>
                    </Link>
                </div>

                <div className='right mobile'>
                    {!isShow ?
                        <HiBars3 aria-label="Toggle menu" aria-expanded={isShow} size={40} onClick={() => setShow(!isShow)} /> :
                        <HiBars3BottomRight aria-label="Toggle menu" aria-expanded={isShow} size={40} onClick={() => setShow(!isShow)} />}
                </div>

                <div className={`dropdown ${isShow ? "show" : ""}`}>
                    <ul className="nav-list">
                        <li className="nav-item"> <Link className='link' to="/Shop">Home</Link></li>
                        <li className="nav-item"> <Link className='link' to="/About">About</Link></li>
                        <li className="nav-item"> <Link className='link' to="/Contact">Contact</Link></li>
                    </ul>
                    <div className='group-btn'>
                        <Link className='link' to="/Login">
                            <button className='btn-login' id='login_btn'>
                                Login
                            </button>
                        </Link>
                        <Link className='link' to="/Signup">
                            <button className='btn-signup' id='signup_btn'>Signup</button>
                        </Link>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default NavBar