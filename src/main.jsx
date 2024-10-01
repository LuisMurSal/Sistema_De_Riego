import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute'; 
import Dashboard from './components/Dashboard';
import Inicio from './components/Inicio';
import Beneficios from './components/Beneficios';
import Datos from './components/Datos';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/*" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="inicio" element={<Inicio />} />
          <Route path="beneficios" element={<Beneficios />} />
          <Route path="datos" element={<Datos />} />
        </Route>
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')).render(<App />);
