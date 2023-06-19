import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style/navbar.css'
import ToggleBtn from './ToggleBtn'
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {

    const [openMobileMenu, setOpenMobileMenu] = useState(false)

    const handleToggle = () => {
        alert('toggled')
    }

    return (
        <div className='navbar'>
            <div className="right-col">
                <h2 className="logo">ALVO<span>CINE</span></h2>

                <div
                    onClick={() => setOpenMobileMenu(false)}
                    className={`nav-links-wrapper ${openMobileMenu && 'open-mobile-menu'}`}
                >
                    <div
                        onClick={() => setOpenMobileMenu(false)}
                        className="icon close-icon">
                        < AiOutlineClose />
                    </div>
                    <div
                        onClick={e => e.stopPropagation()}
                        className="nav-links"
                    >
                        <nav>
                            <Link onClick={() => setOpenMobileMenu(false)} to={'/'}>
                                <span>Movies</span>
                            </Link>
                            <Link onClick={() => setOpenMobileMenu(false)} to={'/shows'}>
                                <span>Shows</span>
                            </Link>
                            <Link onClick={() => setOpenMobileMenu(false)} to={'/trending'}>
                                <span>Trending</span>
                            </Link>
                            <Link onClick={() => setOpenMobileMenu(false)} to={'/upcoming'}>
                                <span>Up Coming</span>
                            </Link>
                        </nav>
                        <ToggleBtn handleToggle={handleToggle} />
                    </div>
                </div>

            </div>

            <div className="left-col">
                <div
                    onClick={() => setOpenMobileMenu(true)}
                    className="mobile-menu">
                    <span className="icon hamburger-menu">&</span>
                </div>
            </div>

        </div>
    )
}

export default Navbar
