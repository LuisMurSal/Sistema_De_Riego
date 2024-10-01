import pkg from 'pg'; // Importamos el paquete 'pg'
const { Pool } = pkg; // Extraemos 'Pool' del paquete
import express from 'express';
import cors from 'cors';

const app = express();
const pool = new Pool({
  user: 'postgres', // Cambia por tu usuario de PostgreSQL
  host: 'database-2.c16666c4uxt3.us-east-2.rds.amazonaws.com', // Cambia por tu endpoint de Amazon RDS
  database: 'postgres', // Cambia por el nombre de tu base de datos
  password: 'sistemariego123', // Cambia por tu contraseña
  port: 5432, // El puerto por defecto de PostgreSQL
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(cors());
app.use(express.json());

app.post('/save-data', async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *',
      [nombre, email]
    );
    res.status(200).json({ message: 'Datos guardados correctamente', data: result.rows[0] });
  } catch (error) {
    console.error('Error al conectar o guardar los datos:', error);
    res.status(500).json({ message: 'Error al conectar o guardar los datos' });
  }
});

app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
