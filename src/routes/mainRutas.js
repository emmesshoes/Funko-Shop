import express from 'express';

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import ejs from 'ejs';

import MainController from '../controllers/mainController.js';

const router = express.Router();

router.get('/', (req, res) => {
  // Verifica si req.session.user está definido antes de intentar acceder a su propiedad email
  if (req.session.user) {
    req.session.user.email = "";
  } else {
    // Si req.session.user no está definido, puedes inicializarlo con un objeto vacío
    req.session.user = {};
    req.session.user.email = "";
  }
    res.render('index', { loggedIn: req.session.loggedIn, email: req.session.user.email });
    
  });

router.get('/home', async (req, res) => {
    try {
        //res.render('index', false );
        const results = await MainController.getHome();
        res.json(results);
    } catch (error) {
        console.error('Error al obtener datos desde la base de datos:', error);
        res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
    }
});

router.get('/contact', async (req, res) => {
    try {
        const result = await MainController.getContact();
        res.json({ message: result });
    } catch (error) {
        console.error('Error al obtener la ruta de contact:', error);
        res.status(500).json({ error: 'Error al obtener la ruta de contact' });
    }
});

router.get('/about', async (req, res) => {
    try {
        const result = await MainController.getAbout();
        res.json({ message: result });
    } catch (error) {
        console.error('Error al obtener la ruta de about:', error);
        res.status(500).json({ error: 'Error al obtener la ruta de about' });
    }
});

router.get('/faqs', async (req, res) => {
    try {
        const result = await MainController.getFaqs();
        res.json({ message: result });
    } catch (error) {
        console.error('Error al obtener la ruta de faqs:', error);
        res.status(500).json({ error: 'Error al obtener la ruta de faqs' });
    }
});

export default router;
