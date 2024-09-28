import express from 'express';
import cors from 'cors';
import mariadb from 'mariadb';

// Crear una instancia de express
const app = express();
const port = 5000;

// Middleware para manejar JSON y CORS
app.use(cors());
app.use(express.json());

// Configuración del pool de conexiones para MariaDB
const pool = mariadb.createPool({
  host: 'database-1.c16666c4uxt3.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'mariadb1234',  // Coloca aquí la contraseña correcta
  database: 'innodb',  // Nombre correcto de la base de datos
  port: 3306,
  bigIntAsString: true  // Asegura que BigInt se maneje como string
});

// Ruta para manejar la inserción de datos
app.post('/save-data', async (req, res) => {
  const { nombre, email } = req.body;
  
  try {
    // Obtener una conexión del pool
    const conn = await pool.getConnection();
    console.log('Conexión exitosa a la base de datos');
    
    // Realizar la consulta de inserción
    const result = await conn.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email]);

    // Convertir BigInt a string para evitar problemas con JSON
    const safeResult = JSON.parse(JSON.stringify(result, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));

    // Liberar la conexión
    conn.release();

    // Enviar la respuesta con el resultado seguro
    res.status(200).json({ message: 'Datos guardados correctamente', result: safeResult });
  } catch (err) {
    // Manejar el error y devolver una respuesta con el error
    console.error('Error al conectar o guardar los datos:', err);
    res.status(500).json({ message: 'Error al guardar los datos', error: err });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
