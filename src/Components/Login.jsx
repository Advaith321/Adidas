import { useState } from 'react';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!username || !password) return alert("Please fill in all fields!");

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
      if (existingUser.password === password) {
        setUser(existingUser);
      } else {
        alert("Wrong password!");
      }
    } else {
      const newUser = { username, password, role: 'user' };
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      setUser(newUser);
      alert("Account created and you are logged in!");
    }
  };

  return (
    <div style={{ 
      border: '2px solid #fff', 
      padding: '40px 50px', 
      borderRadius: '12px', 
      width: '450px', 
      textAlign: 'left',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      <h3 style={{ marginTop: 0, textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '25px' }}>
        User Login
      </h3>
      
      <input 
        placeholder="Username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
        style={{ 
          display: 'block', 
          width: '100%', 
          marginBottom: '15px', 
          padding: '14px 16px', 
          boxSizing: 'border-box',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '6px'
        }}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        style={{ 
          display: 'block', 
          width: '100%', 
          marginBottom: '20px', 
          padding: '14px 16px', 
          boxSizing: 'border-box',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '6px'
        }}
      />
      
      <button 
        onClick={handleSubmit} 
        style={{ 
          width: '100%', 
          padding: '14px', 
          backgroundColor: '#fff', 
          color: '#000', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer', 
          fontWeight: 'bold',
          fontSize: '1.1rem',
          marginBottom: '15px'
        }}
      >
        Login
      </button>

      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ccc' }} />

      <button 
        style={{ 
          width: '100%', 
          padding: '14px', 
          cursor: 'pointer', 
          background: '#fff', 
          border: 'none', 
          borderRadius: '6px', 
          fontWeight: 'bold',
          fontSize: '1.1rem',
          marginBottom: '20px'
        }}
        onClick={() => alert("Just type a new username and password above to automatically sign up!")}
      >
        Go to Signup Page
      </button>

      <p style={{ textAlign: 'center', margin: 0, fontSize: '1rem', color: '#555' }}>
        Are you an admin?{' '}
        <span style={{ color: 'red', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
          Click here
        </span>
      </p>
    </div>
  );
}