import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { loginUser } from '../functions/loginFunctions.js'
import { getCart } from '../functions/carritoFunctions.js';
import { decodeTokenUser } from '../functions/jwtFunctions.js';
import CarritosController from './carritosController.js';

dotenv.config();

const SessionController = {
    loginProcess: async (req, res) => {
        try {
          let resultLogin = false;
          const { email, contraseña } = req.body;
          console.log('Datos del formulario de inicio de sesión:', { email, contraseña }); 
          // Llama a la función loginUser
          const token = await loginUser(email, contraseña);
        
          if(token){

            resultLogin = true;
            const tokenDecode= decodeTokenUser(token);
            //Guardo las credenciales de la session
            req.session.user = {};
            req.session.user.loggedIn = true;
            req.session.user.isAdmin = tokenDecode.isAdmin;
            req.session.user.email = email;
            req.session.user.token = token;

            console.log('*******SESSION************ ', req.session.user);
            console.log('TOKEN DECODIFICADO****************** ', tokenDecode);

            //Si no es un administrador, traemos el carrito
            if (!req.session.user.isAdmin) {
            // Acceder a userId
            const userId = tokenDecode.userId;
            const userEmail = tokenDecode.email;

            const carrito = await CarritosController.createCart(userId);
            req.session.carrito = { carrito: carrito };

            console.log('-------INFORMACION DE SESSION-------', req.session);
            console.log('-------INFORMACION DE CARRITO-------',JSON.stringify(req.session.carrito, null, 2));
            }    
          }
            
          return resultLogin;

        } catch (error) {
          throw error;
        }
      },


    logoutProcess: async (req, res) => {
      try {
        const result = req.session.destroy((err) => {
          if (err) {
              res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
          } else {
              console.log('LOGOUT')
              /*
              req.session.user= {};
              req.session.user.loggedIn = false;
              req.session.user.email = '';
              req.session.user.token = '';
              */
            return result;
          }
      });
      

      } catch (error) {
        throw error;
      }
    },
  };


    export default SessionController;