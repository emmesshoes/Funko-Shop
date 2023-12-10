import sequelize from '../config/sequelize.js'; // Ajusta la ruta según la ubicación de tu configuración de Sequelize
import { DataTypes } from 'sequelize';

const CarritoElemento = sequelize.define('carrito_elementos', {
  id_elemento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});



export default CarritoElemento;