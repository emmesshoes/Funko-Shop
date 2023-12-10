
import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import Usuario from '../models/usuariosModel.js';


async function hashPassword(plainPassword) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}


async function insertUserIntoDatabase(nombre, apellido, email, contraseña) {
    try {
      const hashedPassword = await hashPassword(contraseña);
  
      // Crea un nuevo usuario utilizando el modelo Usuario
      const newUser = await Usuario.create({
        nombre: nombre,
        apellido: apellido,
        correo: email,
        contrasena: hashedPassword, 
      });
  
      return newUser;

    } catch (error) {
      console.error('Error al insertar usuario en la base de datos:', error);
      throw error;
    }
  }

async function comparePasswords(plainPassword, hashedPassword) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    console.log(plainPassword);
    console.log(hashedPassword)
    return match;
    
}

export { comparePasswords, insertUserIntoDatabase } 
