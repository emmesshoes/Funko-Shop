import express from 'express';
import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import {insertUserIntoDatabase} from "../functions/registerFunctions.js"
import bodyParser from 'body-parser';

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const registerRouter = express.Router();

registerRouter.use(bodyParser.urlencoded({ extended: true }));
registerRouter.use(bodyParser.json());

registerRouter.get('/register', async (req, res) => {
  // Verifica si req.session.user está definido antes de intentar acceder a su propiedad email
  if (req.session.user) {
    req.session.user.email = "";
  } else {
    // Si req.session.user no está definido
    req.session.user = {};
    req.session.user.email = "";
  }
    res.render("registrarse", { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });

  });

  // Ruta para manejar el registro
  registerRouter.post('/register', async (req, res) => {
    try {
        console.log('Recibiendo solicitud POST en /register');

        // Obtener los datos del formulario de registro
        const { nombre, apellido, email, contraseña, contraseñarep } = req.body;
        await sequelize.sync();

        // Insertar los datos en la base de datos
        const newUser = await insertUserIntoDatabase(nombre, apellido, email, contraseña);

        //req.session.user = { email: email };

        res.redirect('/session/login');

    } catch (error) {
        console.error('Error al procesar el formulario de registro:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});


export default registerRouter;