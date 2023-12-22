import express from 'express';

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import ProductoController from '../controllers/productosController.js';
import MainController from '../controllers/mainController.js';
import { chekSessionUser } from '../functions/sessionFunctions.js';



const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const result = chekSessionUser(req,res);
        if(result === false){
        return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
        }
  
        // Obtener productos
        const productos = await ProductoController.getProducts(req, res);

        res.render('index', { productos: productos, loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });

    } catch (error) {
        console.error('Error al obtener datos desde la base de datos:', error);
        res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
    }
});

router.get('/home', async (req, res) => {
    try {
        const result = chekSessionUser(req,res);
        if(result === false){
        return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
        }
        const result2 = await MainController.getHome();
        res.json(result2);
    } catch (error) {
        console.error('Error al obtener datos desde la base de datos:', error);
        res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
    }
});

router.get('/contact', async (req, res) => {
    try {
        const result = chekSessionUser(req,res);
        if(result === false){
        return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
        }
        const result2= await MainController.getContact();
        res.json({ message: result2 });
    } catch (error) {
        console.error('Error al obtener la ruta de contact:', error);
        res.status(500).json({ error: 'Error al obtener la ruta de contact' });
    }
});

router.get('/about', async (req, res) => {
    try {
        const result = chekSessionUser(req,res);
        if(result === false){
        return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
        }
        const result2 = await MainController.getAbout();
        res.json({ message: result2 });
    } catch (error) {
        console.error('Error al obtener la ruta de about:', error);
        res.status(500).json({ error: 'Error al obtener la ruta de about' });
    }
});

router.get('/faqs', async (req, res) => {
    try {
        const result = chekSessionUser(req,res);
        if(result === false){
        return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
        }
        const result2 = await MainController.getFaqs();
        res.json({ message: result2 });
    } catch (error) {
        console.error('Error al obtener la ruta de faqs:', error);
        res.status(500).json({ error: 'Error al obtener la ruta de faqs' });
    }
});

export default router;
