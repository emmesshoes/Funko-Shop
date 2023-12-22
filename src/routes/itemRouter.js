import express from 'express';
import ProductoService from '../services/productosService.js';
//import authMiddleware from '../middleware/authMiddleware.js';
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import ejs from 'ejs';
import { chekSessionUser } from '../functions/sessionFunctions.js';

const routerItems = express.Router();

routerItems.get('/:productId', async(req, res) => {
  try {
    //chekSessionUser(req,res);
    // Obtener productos desde la base de datos o donde los tengas almacenados
    const producto = await ProductoService.getProduct(req.params.productId);
    const productos = await ProductoService.getAllProducts();
    const counterValue = 1;
    const carrito = req.session.carrito;

    // Renderizar la vista de productos y pasar la variable productos
    res.render("item", { counterValue, producto: producto, productos: productos, carrito: carrito, loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin});
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos desde la base de datos' });
  }
});

export default routerItems;