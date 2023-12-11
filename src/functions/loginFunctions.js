import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { comparePasswords, insertUserIntoDatabase } from './registerFunctions.js';
import dotenv from 'dotenv';
import Usuario from '../models/usuariosModel.js';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';



dotenv.config();

// const findUserByEmail = async (email) => {
//     try {
//       const user = await Usuario.findOne({
//         where: {
//           correo: email,
//         },
//       });
  
//       return user;
//     } catch (error) {
//       console.error('Error al buscar usuario por correo electrónico:', error);
//       throw error;
//     }
//   };
 
//   export { findUserByEmail };

// //Función para verificar las credenciales y generar un token
// const loginUser = async (email, plainPassword) => {
//     try {
//       const user = await findUserByEmail(email);
  
//       if (!user) {
//         throw new Error('Correo electrónico o contraseña incorrectos');
//       }
  
//       const match = await comparePasswords(plainPassword, user.contrasena);
  
//       if (!match) {
//         throw new Error('Correo electrónico o contraseña incorrectos');
//       }
  
//       const secret = process.env.JWT_SECRET;
//       const token = jwt.sign({ userId: user.id, email: user.correo }, secret, { expiresIn: '1h' });
  
//       return token;
//     } catch (error) {
//       console.error('Error al procesar el formulario de inicio de sesión:', error);
//       throw new Error('Error interno del servidor');
//     }
//   };
  
//   export default loginUser;



//--------------------------------------------------------------------------------------

// INCORPORACION DEL ADMIN 

//--------------------------------------------------------------------------------------

// Función para buscar un usuario por correo electrónico

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
    console.error('Error al buscar administrador por correo y contraseña:', error);
    throw error;
  }
};

// Función para verificar las credenciales y generar un token
const loginUser = async (email, plainPassword, isAdminMode) => {
  try {
    // Encuentra el usuario por su correo electrónico
    const user = await findUserByEmail(email);
    console.log('USER: ', user);


    if (isAdminMode) {
      // Si está en modo administrador, verifica las credenciales del administrador
      const isAdmin = await findAdmin(email, plainPassword);
      if (!isAdmin) {
        throw new Error('Acceso denegado. Credenciales de administrador incorrectas.');
      }

      // Genera un token JWT para el administrador
      const secret = process.env.JWT_SECRET;
      const tokenAdmin = jwt.sign({ userId: user.id_usuario, email: user.correo, isAdmin: true }, secret, { expiresIn: '1h' });

      return tokenAdmin;
    }

    // Si no está en modo administrador, verifica las credenciales del usuario
    if (!user) {
      throw new Error('Correo electrónico o contraseña incorrectos');
    }

    const match = await comparePasswords(plainPassword, user.contrasena);

    if (!match) {
      throw new Error('Correo electrónico o contraseña incorrectos');
    }

    // Genera un token JWT para el usuario
    const secret = process.env.JWT_SECRET;
    const tokenUser = jwt.sign({ userId: user.id_usuario, email: user.correo, isAdmin: false }, secret, { expiresIn: '1h' });
    

    return tokenUser;
  } catch (error) {
    console.error('Error al procesar el formulario de inicio de sesión:', error);
    throw new Error('Error interno del servidor');
  }
};

export { findUserByEmail, findAdmin, loginUser };
