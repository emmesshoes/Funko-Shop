import express from 'express';
import bodyParser from 'body-parser';
import { findUserByEmail, findAdmin, loginUser } from '../functions/loginFunctions.js';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const editarProdRouter = express.Router();

editarProdRouter.use(bodyParser.urlencoded({ extended: true }));
editarProdRouter.use(bodyParser.json());

editarProdRouter.get('/editar-prod', (req, res) => {
    res.render('editar-producto', { email: req.session.user.email });
  });
  

export default editarProdRouter;