import React from "react";
import './Layout.css'
import { Outlet, Link } from "react-router-dom";


const Layout = () => {
    return (
        <div className="layout">
            <nav>
                <ul>
                    <li className="home-link" key="home-button">
                        <Link to="/">Crewmates</Link>
                    </li>
                    <li className="home-link" key="create">
                        <Link to="/new">Create New Crewmate</Link>
                    </li>
                </ul>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </div>

    )
}

export default Layout;