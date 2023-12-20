import express from 'express';

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const shopRouter = express.Router();

shopRouter.get('/', (req, res) => {
  res.redirect('/productos'); // o cualquier otra acción que desees
});


export default shopRouter;





