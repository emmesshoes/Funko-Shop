import dotenv from 'dotenv'; 
import { Sequelize } from 'sequelize';

// Carga las variables de entorno para la base de datos desde el archivo .env.db
dotenv.config();

// Accede a las variables de entorno para la base de datos
const dbDialect = process.env.DB_DIALECT;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

const sequelize = new Sequelize({
  dialect: dbDialect,
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  define: {
    timestamps: false, // Si no deseas las columnas createdAt y updatedAt
  },
});

// Verificar la conexión a la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

export default sequelize;
