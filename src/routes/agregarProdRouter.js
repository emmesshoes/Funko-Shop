import express from 'express';
import bodyParser from 'body-parser';
import { findUserByEmail, findAdmin, loginUser } from '../functions/loginFunctions.js';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const agregarProdRouter = express.Router();

agregarProdRouter.use(bodyParser.urlencoded({ extended: true }));
agregarProdRouter.use(bodyParser.json());

agregarProdRouter.get('/agregar-prod', (req, res) => {
    res.render('agregar-producto', { email: req.session.user.email });
  });
  

export default agregarProdRouter;