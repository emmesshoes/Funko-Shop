import express from 'express';
import bodyParser from 'body-parser';
import { findUserByEmail, findAdmin, loginUser } from '../functions/loginFunctions.js';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoutRouter = express.Router();

logoutRouter.use(bodyParser.urlencoded({ extended: true }));
logoutRouter.use(bodyParser.json());

logoutRouter.get('/logout', (req, res) => {
    console.log('GET LOGOUT')
    req.session.destroy();
    // Puedes descomentar la siguiente línea si necesitas utilizar loggedIn
    // loggedIn = false;
    req.session.loggedIn = false;
    res.redirect('/');
});

logoutRouter.post('/logout', (req, res) => {
    console.log('POST LOGOUT')
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
        } else {
            res.redirect('/shop'); // Reemplaza con la URL deseada
        }
    });
});

export default logoutRouter;



