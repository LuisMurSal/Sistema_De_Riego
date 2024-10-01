import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Inicio from './components/Inicio';
import PrivateRoute from './components/PrivateRoute'; 

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
              <Routes>
                <Route path="/inicio" element={<Inicio />} />
                
              </Routes>
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')).render(<App />);