import express from 'express';
const routerUsuario = express.Router();
import UserController from '../controllers/userController.js';

//Obtiene el token del usuario
routerUsuario.get('/get-token-user', async (req, res) => {
    try {
      console.log(req.params.productId);
      const token = await UserController.getTokenUser(req.params.userId);
      res.json(token);
    } catch (error) {
      console.error('Error getting product:', error);
      res.status(500).json({ error: 'Error getting product from the database' });
    }
  });

export default routerUsuario;
