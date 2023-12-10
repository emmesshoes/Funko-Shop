// models/authFuncionesModel.js
import bcrypt from 'bcrypt';
import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';


const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
  },
  apellido: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
  },
  rol: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
  },
  ultima_conexion: {
    type: DataTypes.DATE,
  },
});

async function checkAdminExists() {
  const count = await Usuario.count();
  return count > 0;
}

async function createDefaultAdmin() {
  const hashedPassword = await bcrypt.hash('tu_contraseña', 10);
  const admin = {
    nombre: 'Admin',
    apellido: 'User',
    correo: 'admin@example.com',
    contrasena: hashedPassword,
    rol: 'administrador',
    estado: 'activo',
  };

  const createdAdmin = await Usuario.create(admin);
  return createdAdmin.id;
}

async function login(email, password) {
  const user = await Usuario.findOne({ where: { correo: email } });

  if (!user || !(await bcrypt.compare(password, user.contrasena))) {
    throw new Error('Credenciales inválidas');
  }

  await Usuario.update({ ultima_conexion: new Date() }, { where: { id: user.id } });
  return user;
}

export default { checkAdminExists, createDefaultAdmin, login };
