import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import bodyParser from 'body-parser';
import { findUserByEmail, findAdmin, loginUser } from '../functions/loginFunctions.js';
import CarritosController from '../controllers/carritosController.js';
import {decodeTokenUser} from '../functions/jwtFunctions.js';
import SessionController from '../controllers/sessionControllers.js';
import {  } from '../functions/sessionFunctions.js';

const sessionRouter = express.Router();



sessionRouter.use(bodyParser.urlencoded({ extended: true }));
sessionRouter.use(bodyParser.json());





sessionRouter.get('/login', async (req, res) => {
  try {
    const result = (req,res);
    if(result === false){
      return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
    }
  
    const messages = req.flash();

    res.render("ingresar", { messages, loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
    
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.redirect('session/login'); // Redirige a la página de inicio de sesión
  }  

  });

  sessionRouter.post('/login', async (req, res) => {
    try {
      console.log('Recibiendo solicitud POST en /login');
      
      const result = await SessionController.loginProcess(req, res);
      if(result){
        // Redirige al usuario según si es administrador o no
        if (req.session.user.isAdmin) {
          res.redirect("/admin");
        } else {
            res.redirect("/productos");
        } 
      } else{
        req.flash('error', 'Correo electrónico o contraseña incorrectos');
        res.redirect('/session/login');
      }

      
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      req.flash('error', 'Nombre de usuario o Contraseña equivocada');
      res.redirect('session/login'); // Redirige a la página de inicio de sesión
    }
});

sessionRouter.get('/logout', async (req, res) => {
  const result = await SessionController.logoutProcess(req, res);
 
  res.redirect('/session/login');
 
});

sessionRouter.post('/logout', async (req, res) => {
 
  const result = await SessionController.logoutProcess(req, res);
 
  res.redirect('/session/login');
 
   
});

export default sessionRouter;

