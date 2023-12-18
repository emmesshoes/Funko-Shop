import express from 'express';
import ProductoService from '../services/productosService.js';
//import authMiddleware from '../middleware/authMiddleware.js';
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import ejs from 'ejs';

const routerItems = express.Router();


// En tu ruta de productos
routerItems.get('/:productId', async(req, res) => {
  try {
    // Obtener productos desde la base de datos o donde los tengas almacenados
    const producto = await ProductoService.getProduct(req.params.productId);
    const productos = await ProductoService.getAllProducts();
    const counterValue = 1;
    const carrito = req.session.carrito;

        // Verifica si req.session.user está definido antes de intentar acceder a su propiedad email
  if (!req.session.user) {
  
    // Si req.session.user no está definido, puedes inicializarlo con un objeto vacío
    req.session.user = {};
    req.session.user.email = "";
  }
  console.log('EL PRODUCTO ES: ', producto);

    // Renderizar la vista de productos y pasar la variable productos
    res.render("item", { counterValue, producto: producto, productos: productos, carrito: carrito, loggedIn: req.session.loggedIn, email: req.session.user.email });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos desde la base de datos' });
  }
});


export default routerItems;