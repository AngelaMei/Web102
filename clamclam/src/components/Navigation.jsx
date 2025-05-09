import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/logo.svg" alt="ClamClam Logo" className="logo-image" />
          <span className="site-title">ClamClam</span>
        </Link>
        <div className="nav-links">
          <Link to="/create-topic" className="create-topic-btn">
            創建主題
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 