// models/productosModel.js

import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';

const Producto = sequelize.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  licencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  cuotas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imagen_front: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen_back: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Producto;
