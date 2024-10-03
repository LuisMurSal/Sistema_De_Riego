import pkg from 'pg';
const { Pool } = pkg;

// Configuración del pool de PostgreSQL
const pool = new Pool({
  user: 'postgres', 
  host: 'database-2.c16666c4uxt3.us-east-2.rds.amazonaws.com', 
  database: 'postgres', 
  password: 'sistemariego123', 
  port: 5432,
});

// Inicializa Express
import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta para obtener los datos de riego
app.get('/datos-riego', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM riego');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Ruta para insertar datos de riego
app.post('/guardar-datos-riego', async (req, res) => {
  const { fecha, hora, cantidad_de_veces_regadas, cantidad_de_agua_regada } = req.body;

  try {
    const query = 'INSERT INTO riego (fecha, hora, cantidad_veces, cantidad_agua) VALUES ($1, $2, $3, $4)';
    const values = [fecha, hora, cantidad_de_veces_regadas, cantidad_de_agua_regada];
    
    await pool.query(query, values);
    res.status(201).json({ message: 'Datos de riego guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar los datos de riego:', error);
    res.status(500).json({ error: 'Error al guardar los datos' });
  }
});

// Ruta para verificar si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
