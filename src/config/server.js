import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import ejs from 'ejs';
import authMiddleware from '../middleware/authMiddleware.js';
import session from 'express-session';
import {fileURLToPath} from 'url';
import registerRouter from '../routes/registerRouter.js';

import flash from 'express-flash';

import productosRoutes from '../routes/productosRouter.js';
import carritosRoutes from '../routes/carritosRouter.js';
import carritoElementosRoutes from '../routes/carritoElementosRouter.js';
import ventasRoutes from '../routes/ventasRouter.js';
import mainRoutes from '../routes/mainRouter.js';

import contactoRouter from '../routes/contactoRouter.js';
import shopRouter from '../routes/shopRouter.js';
import routerItems from '../routes/itemRouter.js';
import adminRouter from '../routes/adminRouter.js';
import sessionRouter from '../routes/sessionRouter.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carga las variables de entorno para el server
const app = express();
dotenv.config();
const port = process.env.SERVER_PORT;

const secretWord = process.env.JWT_SECRET;

app.use(session({
    secret: secretWord,
    resave: true,
    saveUninitialized: true,
  }));

app.use(flash());

// Configuración body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views/partials'));
app.set('views', path.join(__dirname, '../views'));



app.use((req, res, next) => {
  console.log('Middleware de sesión:', req.session);
  //res.locals.loggedIn = req.session.loggedIn || false;
  res.locals.user = req.session.user || null;
  next();
});


app.use((req, res, next) => {
    res.locals.req = req;
    res.locals.res = res;  // res está disponible en res.locals

    next();
});



app.use(cors());

app.use(express.json());

// Rutas que requieren autenticación con token
app.use('/productos', productosRoutes);
app.use('/carrito', carritosRoutes);
app.use('/carrito-elementos', carritoElementosRoutes);
app.use('/ventas', ventasRoutes);

app.use('/', mainRoutes);

app.use('/session', sessionRouter);
app.use('/', registerRouter);
app.use('/', contactoRouter);
app.use('/shop', shopRouter);
app.use('/item', routerItems);
app.use('/admin', adminRouter);

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).redirect('/'); // Redirige a la página de inicio
});


app.set('port', port);




export default app; // Exporta la instancia de Express o el servidor configurado
