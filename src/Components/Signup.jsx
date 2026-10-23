import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!username || !password) return alert("Please fill in all fields!");
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username)) {
      return alert("Username already exists! Please login.");
    }

    const newUser = { username, password, role: 'user' };
    localStorage.setItem('users', JSON.stringify([...users, newUser])); 
    setUser(newUser);
    navigate('/');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 25, borderRadius: 8, width: 300, marginTop:100,marginLeft:50,color:'white' }}>
      <h2>User Signup</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8, boxSizing: 'border-box' }} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 15, padding: 8, boxSizing: 'border-box' }} />
      <button onClick={handleSubmit} style={{ width: '100%', padding: 10, cursor: 'pointer' }}>Create Account</button>
      
      <p style={{ textAlign: 'center', marginTop: 15 }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}