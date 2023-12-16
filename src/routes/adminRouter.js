import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import AdminController from '../controllers/adminController.js';
import ProductosService from '../services/productosService.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminRouter = express.Router();

adminRouter.use(bodyParser.urlencoded({ extended: true }));
adminRouter.use(bodyParser.json());

adminRouter.get('/', async (req, res) => {
  try {
    const infoProductos = await AdminController.getAllProductsAdmin(res, req);  
    return res.status(200).render("listado-de-productos", { productos: infoProductos.productosDeLaPagina, currentPage: infoProductos.currentPage, totalPaginas: infoProductos.totalPaginas, loggedIn: req.session.loggedIn, email: req.session.user.email });  
    
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
  
});

adminRouter.get('/editar-prod/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Obtener el objeto producto de la base de datos utilizando el ID
    const producto = await ProductosService.getProduct(productId);

    // Obtener valores de la consulta
    const productSku = req.query.sku;
    const productoDescuento = req.query.descuento;
    const productoPrecio = req.query.precio;

    res.render('editar-item', { productId, producto, productSku, productoDescuento, productoPrecio, loggedIn: req.session.loggedIn, email: req.session.user.email });
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
});


adminRouter.post('/editar-prod/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;

    // Obtener el producto existente de la base de datos
    const existingProduct = await ProductosService.getProduct(productId);

     // Verificar la existencia del producto
    
     if (!existingProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    // Validación de tipo de dato para precio
    if (existingProduct && existingProduct.precio !== null && !isNaN(existingProduct.precio)) {
      existingProduct.precio = parseFloat(existingProduct.precio).toFixed(2);
    }


   

    // Filtrar valores no deseados y asegurarse de que los tipos de datos sean correctos
    const validUpdatedProductData = {
      categoria: updatedProductData.categoria || existingProduct.categoria,
      licencia: updatedProductData.licencia || existingProduct.licencia,
      descripcion: updatedProductData.descripcion || existingProduct.descripcion,
      sku: updatedProductData.sku || existingProduct.sku,
      precio: updatedProductData.precio || existingProduct.precio,
      stock: updatedProductData.stock || existingProduct.stock,
      descuento: updatedProductData.descuento || existingProduct.descuento,
      cuotas: updatedProductData.cuotas || existingProduct.cuotas,
    };

    // Realizar la lógica para actualizar el producto en la base de datos
    await ProductosService.editProduct({ id_producto: productId, ...validUpdatedProductData });

    // Redirigir a la página de listado o a donde desees después de la edición
    res.redirect('/admin');
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto en la base de datos' });
  }
});



adminRouter.get('/eliminar-prod', async (req, res) => {
  try {
    res.json('Esta seguro de eliminar el producto?');
    //res.render('eliminar-producto', { loggedIn: req.session.loggedIn, email: req.session.user.email });
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  } 
});  

export default adminRouter;