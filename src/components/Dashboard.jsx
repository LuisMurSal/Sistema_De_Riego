import { useNavigate, Outlet } from 'react-router-dom';
import { auth } from '../services/firebase/firebase';
import { signOut } from 'firebase/auth';
import { RiHome2Line, RiBarChart2Line, RiHeart2Line, RiLogoutBoxLine } from "react-icons/ri";
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Menú</h2>
        <ul>
          <li onClick={() => navigate('/inicio')}>
            <RiHome2Line /> Inicio
          </li>
          <li onClick={() => navigate('/beneficios')}>
            <RiHeart2Line /> Beneficios
          </li>
          <li onClick={() => navigate('/datos')}>
            <RiBarChart2Line /> Datos
          </li>
          <li onClick={handleLogout}>
            <RiLogoutBoxLine /> Cerrar sesión
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
