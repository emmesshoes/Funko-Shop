import express from 'express';

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
import {chekSessionUser} from '../functions/sessionFunctions.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contactoRouter = express.Router();

contactoRouter.get('/contacto', async (req, res) => {
  if(chekSessionUser(req,res)){
    res.render("contacto", { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
  } else{
      res.render("ingresar", { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });  
  }
  
});

export default contactoRouter;





