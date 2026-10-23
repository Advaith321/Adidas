import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin({ setUser }) {
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleAdminLogin = () => {
    if (password === 'admin123') {
      setUser({ username: 'Admin', role: 'admin' });
      navigate('/admin-dashboard'); 
    } else {
      alert('Wrong password!');
    }
  };

  return (
    <div style={{ border: '2px solid darkred', padding: 25, borderRadius: 8, width: 280, textAlign: 'left' }}>
      <h3 style={{ color: 'darkred', marginTop: 0, textAlign: 'center' }}>🔒 Admin Login</h3>
      <input 
        type="password" 
        placeholder="Password (hint: admin123)" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
        style={{ display: 'block', width: '100%', marginBottom: 15, padding: 8, boxSizing: 'border-box' }}
      />
      <button 
        onClick={handleAdminLogin} 
        style={{ width: '100%', padding: 10, backgroundColor: 'darkred', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 'bold' }}
      >
        Login as Admin
      </button>
    </div>
  );
}