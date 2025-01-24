import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainLogin from './pages/Main/login';
import GuestLogin from './pages/Guest/login';
import { UserContextProvider } from './context/UserContext';  // Import UserContextProvider
import Mainadmindashboard from './pages/Main/dashboard';
import './App.css'

function App() {


  return (
    <>
    <UserContextProvider>
    <Routes>
    <Route exact path="/" element={<LandingPage/>} />
    <Route exact path="/main-admin/login" element={<MainLogin />} />
    <Route exact path="/guest-admin/login" element={<GuestLogin />} />
    <Route exact path="/main-admin/dashboard" element={<Mainadmindashboard />} />
    </Routes>
    </UserContextProvider>
      
    </>
  )
}

export default App
