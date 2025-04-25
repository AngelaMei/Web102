import React from "react";
import './Layout.css'
import { Outlet, Link, useLocation } from "react-router-dom";
import { AiFillHome, AiFillPlusCircle } from "react-icons/ai";


const Layout = () => {

    const location = useLocation();

    return (
        <div className="layout">
            <div className="topnav">
                <img src="./logo.svg" alt="logo" />
                <nav>
                    <ul>
                        <li
                        className={`home-link ${location.pathname === '/' ? 'active' : ''}`}
                        key="home-button"
                        >
                        <AiFillHome /><Link to="/">Forum Home</Link>
                        </li>
                        <li
                        className={`home-link ${location.pathname === '/new' ? 'active' : ''}`}
                        key="create"
                        >
                        <AiFillPlusCircle /><Link to="/new">Create New Post</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <main className="main-content">
                <Outlet />
            </main>
        </div>

    )
}

export default Layout;