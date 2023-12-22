import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import AdminController from '../controllers/adminController.js';
import { chekSessionUser } from '../functions/sessionFunctions.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminRouter = express.Router();

adminRouter.use(bodyParser.urlencoded({ extended: true }));
adminRouter.use(bodyParser.json());

adminRouter.get('/', async (req, res) => {
  try {
    const result = chekSessionUser(req,res);
    if(result === false){
      return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
    }

    const infoProductos = await AdminController.getAllProductsAdmin(req, res);  
    return res.status(200).render("listado-de-productos", { productos: infoProductos.productosDeLaPagina, currentPage: infoProductos.currentPage, totalPaginas: infoProductos.totalPaginas, loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });  

  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
  
});

adminRouter.get('/agregar-prod', async (req, res) => {
  try {
    chekSessionUser(req,res);
    res.render('agregar-producto', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
});

adminRouter.get('/editar-prod/:productId', async (req, res) => {
  try {
    const result = chekSessionUser(req,res);
    if(result === false){
      return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
    }
    
    const producto = await AdminController.getProductAdmin(req, res);

    console.log("Este es el ID del producto", producto.id_producto);
    res.status(200).render('editar-item', { producto: producto, loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });


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
    res.status(200).render('editar-item', { producto: producto, loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });

  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto en la base de datos' });
  }
});

adminRouter.get('/eliminar-prod', async (req, res) => {
  try {
    const result = chekSessionUser(req,res);
    if(result === false){
      return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
    }
    res.json('Esta seguro de eliminar el producto?');
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
});

export default adminRouter;