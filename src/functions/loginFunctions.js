import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { comparePasswords, insertUserIntoDatabase } from './registerFunctions.js';
import dotenv from 'dotenv';
import Usuario from '../models/usuariosModel.js';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import flash from 'express-flash';

dotenv.config();

const findUserByEmail = async (email) => {

  try {
    const user = await Usuario.findOne({
      where: {
        correo: email,
      },
    });

    return user;

  } catch (error) {
    console.error('Error al buscar usuario por correo electrónico:', error);
    throw error;
  }
};

// Función para buscar un administrador por correo electrónico y contraseña
const findAdmin = async (email, plainPassword) => {
  try {
    if (email !== 'admin@admin.com') {
      return null; // Devuelve null si el correo no es el del administrador
    }

    const userAdmin = await Usuario.findOne({
      where: {
        correo: email,
        contrasena: {
          [Op.not]: null,
        },
      },
    });

    if (!userAdmin) {
      return null; // Devuelve null si no se encuentra al administrador
    }
    const match = await bcrypt.compare(plainPassword, userAdmin.contrasena);

    if (!match) {
      return null; // Devuelve null si las contraseñas no coinciden
    }

    return userAdmin;

  } catch (error) {
    req.flash('error','Error al buscar administrador por correo y contraseña:');
    throw error;
  }
};

// Función para verificar las credenciales y generar un token
const loginUser = async (email, plainPassword) => {
  try {
    
    let isAdmin = false;
    
    // Encuentra el usuario por su correo electrónico
    const user = await findUserByEmail(email);
    console.log('USER: ', user);

    if(!user){
      flash('error', 'Correo electrónico o contraseña incorrectos');
      return null;
    }

    const match = await bcrypt.compare(plainPassword, user.contrasena);

    if (!match) {
      return null; // Devuelve null si las contraseñas no coinciden
    }


    //veo si es administrador
    isAdmin = await findAdmin(email, plainPassword);

    // Genera un token JWT para el usuario
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id_usuario, email: user.correo, isAdmin }, secret, { expiresIn: '1h' });  

    return token;
    

  } catch (error) {
    console.error('Error al procesar el formulario de inicio de sesión:', error);
    req.flash('error', 'Error interno del servidor');
    return null;
  }
};

const getIfLogin = (req) => {
  try {
    
    if(req.session.user.email !== '' && req.session.user.email !== null){
      return true;
    }

    return false;

  } catch (error) {
    console.error('Error al buscar usuario por correo electrónico:', error);
    throw error;
  }
};


export { findUserByEmail, findAdmin, loginUser, getIfLogin };
