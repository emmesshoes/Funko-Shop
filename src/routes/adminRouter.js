import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import AdminController from '../controllers/adminController.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminRouter = express.Router();

adminRouter.use(bodyParser.urlencoded({ extended: true }));
adminRouter.use(bodyParser.json());

adminRouter.get('/', async (req, res) => {
  try {
    const infoProductos = await AdminController.getAllProductsAdmin(req, res);  
    return res.status(200).render("listado-de-productos", { productos: infoProductos.productosDeLaPagina, currentPage: infoProductos.currentPage, totalPaginas: infoProductos.totalPaginas, loggedIn: req.session.loggedIn, email: req.session.user.email });  
    
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
  
});

adminRouter.get('/agregar-prod', async (req, res) => {
  try {
    res.render('agregar-producto', { loggedIn: req.session.loggedIn, email: req.session.user.email });
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
});

adminRouter.get('/editar-prod/:productId', async (req, res) => {
  try {
    
    if (!req.session.user) {
      req.session.user = {};
      req.session.user.email = "";
    }
    const producto = await AdminController.getProductAdmin(req, res);

    console.log("Este es el ID del producto", producto.id_producto);

    // Redirigir a la página de listado o a donde desees después de la edición
    res.render('editar-item', { producto: producto, loggedIn: req.session.loggedIn, email: req.session.user.email });
    
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto en la base de datos' });
  }
});

adminRouter.post('/editar-prod/:productId', async (req, res) => {
  try {
    
    if (!req.session.user) {
      req.session.user = {};
      req.session.user.email = "";
    }
    const producto = AdminController.getProductAdmin(req, res);
    // Redirigir a la página de listado o a donde desees después de la edición
    res.status(200).render('editar-item', { producto: producto, loggedIn: req.session.loggedIn, email: req.session.user.email });
    //res.status(200).render('editar-item', { loggedIn: req.session.loggedIn, email: req.session.user.email });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto en la base de datos' });
  }
});



adminRouter.get('/eliminar-prod', async (req, res) => {
  try {
    res.json('Esta seguro de eliminar el producto?');
    //res.render('eliminar-producto', { loggedIn: req.session.loggedIn, email: req.session.user.email });
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  } 
});  

export default adminRouter;