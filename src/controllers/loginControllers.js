import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { loginUser } from '../functions/loginFunctions.js'
import { getCart } from '../functions/carritoFunctions.js';
import { decodeTokenUser } from '../functions/jwtFunctions.js';

dotenv.config();

const LoginController = {
    loginProcess: async (email, contraseña, isAdminMode) => {
        try {
            // Llama a la función loginUser con el nuevo parámetro isAdminMode
            const token = await loginUser(email, contraseña, isAdminMode);

            const resultLogin = {
                "token": token,
                "carrito":[],
            }

            //Obtengo el Id del usuario
            const userId = decodeTokenUser(token);
            
            //Si no es administrador, retorno un carrito
            if(!isAdminMode) {
                const resultLogin = await getCart(userId);
            }

          return resultLogin;

        } catch (error) {
          throw error;
        }
      },
    };

    export default LoginController;