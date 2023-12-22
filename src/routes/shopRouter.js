import express from 'express';
import {  } from '../functions/sessionFunctions.js';

const shopRouter = express.Router();

shopRouter.get('/', (req, res) => {
  try {
    //(req,res);
    res.redirect('/productos'); // o cualquier otra acción que desees
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos desde la base de datos' });
  }
});


export default shopRouter;





