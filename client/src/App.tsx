import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Default from './components/Default.tsx';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import InvalidPage from './components/InvalidPage';

import UserProvider from './context/UserContext.tsx';


const App = () => {
    const [logoutOpen, setLogoutOpen] = useState(false);

    return (
        <BrowserRouter>
            <UserProvider>
                <Header setLogoutOpen={setLogoutOpen} logoutOpen={logoutOpen} />
                <ToastContainer limit={5} pauseOnHover={false} autoClose={1500}/>
                <Routes>
                    <Route path="/" element={<Default />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout open={logoutOpen} setOpen={setLogoutOpen} />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<InvalidPage />} />
                </Routes>
                <Footer />
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;