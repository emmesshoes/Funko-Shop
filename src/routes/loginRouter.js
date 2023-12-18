import express from 'express';
//mport cors from 'cors';
//import ProductosController from '../views/pages/';
import authMiddleware from '../middleware/authMiddleware.js';
import bodyParser from 'body-parser';
import { findUserByEmail, findAdmin, loginUser } from '../functions/loginFunctions.js';
//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
import ejs from 'ejs';
import CarritosController from '../controllers/carritosController.js';
import {decodeTokenUser} from '../functions/jwtFunctions.js';
import flash from 'express-flash';


const __dirname = path.dirname(fileURLToPath(import.meta.url));


const loginRouter = express.Router();



loginRouter.use(bodyParser.urlencoded({ extended: true }));
loginRouter.use(bodyParser.json());





  loginRouter.get('/login', async (req, res) => {
     // Verifica si req.session.user está definido antes de intentar acceder a su propiedad email
  if (req.session.user) {
    req.session.user.email = "";
  } else {
    // Si req.session.user no está definido, puedes inicializarlo con un objeto vacío
    req.session.user = {};
    req.session.user.email = "";
  }
    req.session.loggedIn = false;
    const messages = req.flash();

    res.render("ingresar.ejs", { messages, loggedIn: req.session.loggedIn, email: req.session.user.email });

  });

  loginRouter.post('/login', async (req, res) => {
    try {
      console.log('Recibiendo solicitud POST en /login');
  
      const { email, contraseña } = req.body;
      console.log('Datos del formulario de inicio de sesión:', { email, contraseña });
  
      // Verifica si se trata de un inicio de sesión de administrador
      const isAdminMode = email === 'admin@admin.com';
      
      // Llama a la función loginUser con el nuevo parámetro isAdminMode
      const token = await loginUser(email, contraseña, isAdminMode);
  
      req.session.loggedIn = true;
      req.session.user.email = email;
      req.session.user.token = token;
      console.log('*******SESSION************ ', req.session.user);

      const tokenDecode= decodeTokenUser(token);
      console.log('TOKEN DECODIFICADO****************** ', tokenDecode);

      // Redirige al usuario según si es administrador o no
      if (isAdminMode) {
        
        res.redirect("/admin");

      } else {
        console.log('TOKEN: ', token);
        const decodedToken = decodeTokenUser(token);

        // Acceder a userId y otras propiedades si es necesario
        const userId = decodedToken.userId;
        const userEmail = decodedToken.email;

    
        const carrito = await CarritosController.createCart(userId);
        req.session.carrito = { carrito: carrito };

        console.log('-------INFORMACION DE SESSION-------', req.session);
        console.log('-------INFORMACION DE CARRITO-------',JSON.stringify(req.session.carrito, null, 2));

        res.redirect("/productos");
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      req.flash('error', 'Nombre de usuario o Contraseña equivocada');
      res.redirect('/login'); // Redirige a la página de inicio de sesión
    }
});


  
  
  export default loginRouter;


