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
import loginRouter from '../routes/loginRouter.js';
import flash from 'express-flash';

import productosRoutes from '../routes/productosRutas.js';
import carritosRoutes from '../routes/carritosRutas.js';
import carritoElementosRoutes from '../routes/carritoElementosRutas.js';
import ventasRoutes from '../routes/ventasRutas.js';
import mainRoutes from '../routes/mainRutas.js';
import logoutRouter from '../routes/logoutRouter.js';
import contactoRouter from '../routes/contactoRouter.js';
import shopRouter from '../routes/shopRouter.js';




const __dirname = path.dirname(fileURLToPath(import.meta.url));








/*
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
*/

// Carga las variables de entorno para el server
const app = express();
dotenv.config();
const port = process.env.SERVER_PORT;

app.use(session({
    secret: 'palabara secreta', //process.env.JWT_SECRETA,
    resave: true,
    saveUninitialized: true,
  }));

  app.use(flash());

// Configuración body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views/partials'));
app.set('views', path.join(__dirname, '../views'));

app.use((req, res, next) => {
  console.log('Middleware de sesión:', req.session);
  res.locals.loggedIn = req.session.loggedIn || false;
  res.locals.user = req.session.user || null;
  console.log('Variables locales después del middleware:', res.locals);
  next();
});

  
app.use((req, res, next) => {
    res.locals.req = req;
    res.locals.res = res;  // Añade esta línea para asegurarte de que res está disponible en res.locals
    
    next();
});


app.use(cors());
// Configura express.static para servir archivos estáticos desde la carpeta 'public'


app.use(express.json());

// Rutas que requieren autenticación con token
app.use('/productos', productosRoutes);
app.use('/carritos', carritosRoutes);
app.use('/carrito-elementos', carritoElementosRoutes);
app.use('/ventas', ventasRoutes);

//app.use('/users', authRoutes);
app.use('/', mainRoutes);

app.use('/', loginRouter);
app.use('/', logoutRouter);
// Usa el enrutador de logout
app.use('/logout', logoutRouter);
app.use('/', registerRouter);
app.use('/', contactoRouter);
app.use('/shop', shopRouter);

app.set('port', port);




export default app; // Exporta la instancia de Express o el servidor configurado
