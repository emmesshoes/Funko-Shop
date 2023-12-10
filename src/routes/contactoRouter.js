import express from 'express';

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));




const contactoRouter = express.Router();

contactoRouter.get('/contacto', async (req, res) => {
   
    res.render("contacto", { loggedIn: res.locals.loggedIn, email: res.locals.user.email });
  });
  

//loginrouter.post('/', async(req,res)=>{
//const result = await users.postUsers(req.body);
//})

export default contactoRouter;





