import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import CarritoElemento from './carritoElementosModel.js';

const Carritos = sequelize.define('Carritos', {
  id_carrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  estado_carrito: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Carritos.hasMany(CarritoElemento, { foreignKey: 'id_carrito', as: 'carrito_elementos' });

CarritoElemento.belongsTo(Carritos, { foreignKey: 'id_carrito' });



export default Carritos;
