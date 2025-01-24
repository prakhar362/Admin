import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainLogin from './pages/Main/login';
import GuestLogin from './pages/Guest/login';
import './App.css'

function App() {


  return (
    <>
    <Routes>
    <Route exact path="/" element={<LandingPage/>} />
    <Route exact path="/main-admin/login" element={<MainLogin />} />
    <Route exact path="/guest-admin/login" element={<GuestLogin />} />
    </Routes>
      
    </>
  )
}

export default App
