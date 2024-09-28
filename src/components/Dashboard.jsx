import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase/firebase';
import { signOut } from 'firebase/auth';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setNombre('');
        setEmail('');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error al conectar con el servidor: ' + error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li onClick={() => navigate('/dashboard')}>Dashboard</li>
          <li onClick={() => navigate('/other-page')}>Otra Página</li>
          <li onClick={handleLogout}>Cerrar Sesión</li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Bienvenido al Dashboard</h1>
        <p>Este es tu panel de control.</p>

        <div className="form-container">
          <h2>Formulario de Registro</h2>
          <form className="formulario" onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
            
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            
            <button type="submit">Guardar</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
