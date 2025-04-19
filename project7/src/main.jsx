import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Layout from './routes/Layout';
import CreatePost from './pages/createPost'
import ReadPost from './pages/readPost.jsx';
import EditPost from './pages/editPost.jsx';
import CrewmateDetail from './pages/crewmateDetail.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} path="/" element={<App />} />
          <Route index={true} path="/" element={<ReadPost />} />
          <Route index={false} path="/new" element={<CreatePost />}/>
          <Route index={false} path="/edit/:id" element={<EditPost />}/>
          <Route index={false} path="/detail/:id" element={<CrewmateDetail />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
