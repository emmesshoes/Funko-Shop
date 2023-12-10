// Archivo: clientesModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

 // Ajusta la ruta según tu configuración de Sequelize

 const Clientes = sequelize.define('Clientes', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  codigo_postal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fecha_registro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Clientes;
