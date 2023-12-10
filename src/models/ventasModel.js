// Archivo: ventasModel.js

import sequelize from '../config/sequelize.js'; // Ajusta la ruta según tu configuración de Sequelize
import { DataTypes } from 'sequelize';

const Ventas = sequelize.define('Ventas', {
  id_venta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  fecha_venta: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad_vendida: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total_venta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  metodo_pago: {
    type: DataTypes.ENUM('efectivo', 'tarjeta_credito', 'transferencia', 'otros'),
    allowNull: false,
  },
  descuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  impuestos: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  notas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Ventas;
