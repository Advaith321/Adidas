import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Login from './Components/Login';
import Signup from './Components/Signup';
import Admin from './Components/Admin';
import MainPage from './Components/MainPage';
import CategoryPage from './Components/CategoryPage';
import PaymentPage from './Components/PaymentPage';
import AdminDashboard from './Components/AdminDashboard';
import CartPage from './Components/CartPage';


function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 


  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  
  const handleLogout = () => {
    setUser(null);
    navigate('/login'); 
  };

  return (
    <>
      
      {user ? (
        <Routes>
          <Route path="/" element={<MainPage user={user} handleLogout={handleLogout} />} />
          <Route path="/men" element={<CategoryPage category="Men" user={user} handleLogout={handleLogout} />} />
          <Route path="/women" element={<CategoryPage category="Women" user={user} handleLogout={handleLogout} />} />
          <Route path="/kids" element={<CategoryPage category="Kids" user={user} handleLogout={handleLogout} />} />
          <Route path="/payment" element={<PaymentPage user={user} handleLogout={handleLogout} />} />
          <Route path="/cart" element={<CartPage user={user} handleLogout={handleLogout} />} />
          
       
          <Route 
            path="/admin-dashboard" 
            element={
              user.role === 'admin' ? (
                <AdminDashboard user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/"  /> 
              )
            } 
          />
        </Routes>
      ) : (
        
        <div style={{
          backgroundImage: 'url(/bg.jpg)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
         
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
          
          
          <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Routes>
              <Route path="/" element={<Login setUser={setUser} />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/signup" element={<Signup setUser={setUser} />} />
              <Route path="/admin-login" element={<Admin setUser={setUser} />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

