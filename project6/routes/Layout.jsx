import React from "react";
import { Outlet, Link } from "react-router-dom";


const Layout = () => {
    return (
        <div className="layout">
            <nav>
                <h2>Dashboard</h2>
                <ul>
                    <li className="home-link" key="home-button">
                        <Link to="/home">🏠 Home</Link>
                    </li>
                    <li className="home-link" key="Popular">
                        <Link to="/">🔥 Popular</Link>
                    </li>
                    <li className="home-link" key="Top-Rated">
                        <Link to="/">👑 Top Rated</Link>
                    </li>
                    <li className="home-link" key="Upcoming">
                        <Link to="/">🏃‍♂️ Upcoming</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>

    )
}

export default Layout;