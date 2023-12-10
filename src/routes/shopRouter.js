import express from 'express';

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const shopRouter = express.Router();

shopRouter.get('/', (req, res) => {
  res.redirect('/productos'); // o cualquier otra acción que desees
  /*
  if (req.session && req.session.user) {
    console.log('muestro productos')
    console.log('res.locals.loggedIn', res.locals.loggedIn)
    res.render("productos.ejs", { loggedIn: res.locals.loggedIn, email: res.locals.user.email });
  } else {
    console.log('me redirecciona a /login')
    // Manejar el caso en que no haya sesión o user en la sesión
    res.redirect('/productos'); // o cualquier otra acción que desees
  }
  */
});

//loginrouter.post('/', async(req,res)=>{
//const result = await users.postUsers(req.body);
//})

export default shopRouter;





