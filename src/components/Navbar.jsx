import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "./style/navbar.css";
import { AiOutlineClose } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    return (
        <div className={`navbar`}>
            <div className="right-col">
                <img src={logo} alt="logo" className="logo" />

                <div
                    onClick={() => setOpenMobileMenu(false)}
                    className={`nav-links-wrapper ${
                        openMobileMenu && "open-mobile-menu"
                    }`}
                >
                    <div
                        onClick={() => setOpenMobileMenu(false)}
                        className="icon close-icon"
                    >
                        <AiOutlineClose />
                    </div>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="nav-links"
                    >
                        <nav>
                            <Link
                                onClick={() => setOpenMobileMenu(false)}
                                to={"/"}
                            >
                                <span>Movies</span>
                            </Link>
                            <Link
                                onClick={() => setOpenMobileMenu(false)}
                                to={"/shows"}
                            >
                                <span>Shows</span>
                            </Link>
                            <Link
                                onClick={() => setOpenMobileMenu(false)}
                                to={"/trending"}
                            >
                                <span>Trending</span>
                            </Link>
                            <Link
                                onClick={() => setOpenMobileMenu(false)}
                                to={"/upcoming"}
                            >
                                <span>Up Coming</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="left-col">
                <div
                    onClick={() => setOpenMobileMenu(true)}
                    className="mobile-menu"
                >
                    <span className="icon hamburger-menu">
                        <IoMenu />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
