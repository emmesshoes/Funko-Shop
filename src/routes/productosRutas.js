import express from 'express';
import multer from 'multer';
import path from 'path';
import ProductoService from '../services/productosService.js';
import authMiddleware from '../middleware/authMiddleware.js';
import ejs from 'ejs';
import ProductosController from '../controllers/productosController.js';

const routerProductos = express.Router();

// Configuración de Multer para almacenar archivos en una carpeta temporal
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Ruta donde se almacenarán los archivos temporalmente
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Usa el nombre original del archivo
    }
});

const upload = multer({ storage: storage });

//ruta de productos
routerProductos.get('/', async(req, res) => {
  try {

    if (!req.session.user) {
      req.session.user = {};
      req.session.user.email = "";
    }
    const infoProductos = await ProductosController.getAllProducts(res, req);
    return res.render("productos", { productos: infoProductos.productosDeLaPagina, currentPage: infoProductos.currentPage, totalPaginas: infoProductos.totalPaginas, loggedIn: req.session.loggedIn, email: req.session.user.email });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos desde la base de datos' });
  }
});

routerProductos.get('/get-all', async (req, res) => {
  try {
    const productos = await ProductosController.getAllProducts(req, res);
    if (!req.session.user) {
      req.session.user = {};
      req.session.user.email = "";
    }
    // Renderizar la vista de productos y pasar la variable productos
    res.render("index", { productos: productos, loggedIn: req.session.loggedIn, email: req.session.user.email });
    //res.json(productos);
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
});

routerProductos.post('/add', upload.fields([{ name: 'imagen_front', maxCount: 1 }, { name: 'imagen_back', maxCount: 1 }]), async (req, res) => {
  // Accede a los datos enviados desde el formulario
  const { categoria, licencia, nombre, descripcion, sku, precio, stock, descuento, cuotas } = req.body;

  try {
    // Accede a las rutas de los archivos (imágenes) como desees
    const filePathFront = req.files['imagen_front'][0].path;
    const filePathBack = req.files['imagen_back'][0].path;

    // Llamada a la función del controlador para agregar el producto
    const productId = await ProductosController.addProduct({
      categoria,
      licencia,
      nombre,
      descripcion,
      sku,
      precio,
      stock,
      descuento,
      cuotas,
      imagen_front: filePathFront,
      imagen_back: filePathBack,
    });

    res.json({ message: 'Product added successfully', productId });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Error adding product to the database' });
  }
});

routerProductos.post('/edit', upload.fields([{ name: 'imagen_front', maxCount: 1 }, { name: 'imagen_back', maxCount: 1 }]), async (req, res) => {
  // Accede a los datos enviados desde el formulario
  const { id_producto, categoria, licencia, nombre, descripcion, sku, precio, stock, descuento, cuotas } = req.body;

  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++');
  console.log('body: ', req.body);
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++');

  try {
    // Verifica si existen los archivos en req.files antes de acceder a sus propiedades
    const filePathFront = req.files && req.files['imagen_front'] && req.files['imagen_front'][0] ? req.files['imagen_front'][0].path : '';
    const filePathBack = req.files && req.files['imagen_back'] && req.files['imagen_back'][0] ? req.files['imagen_back'][0].path : '';

       // Verifica si id_producto es un número válido
    const parsedId = parseInt(id_producto);
    if (isNaN(parsedId) || !Number.isInteger(parsedId)) {
      throw new Error('Invalid id_producto');
    }

    console.log('producto a editar**************** : ', req.body);
    // Llamada a la función del controlador para agregar el producto
    const productId = await ProductosController.editProduct({
      id_producto: parsedId,
      categoria,
      licencia,
      nombre,
      descripcion,
      sku,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      descuento: parseFloat(descuento),
      cuotas: parseInt(cuotas),
      imagen_front: filePathFront,
      imagen_back: filePathBack,
    });

    res.json({ message: 'Producto editado con éxito!!!!' });
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ error: 'Error editing product in the database' });
  }
});

routerProductos.get('/get/:productId', async (req, res) => {
  try {
    console.log(req.params.productId);
    const product = await ProductosController.getProduct(req.params.productId);
    res.json(product);
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ error: 'Error getting product from the database' });
  }
});

routerProductos.delete('/delete/:productId', async (req, res) => {
  try {
    await ProductosController.deleteProduct(req.params.productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product from the database' });
  }
});

export default routerProductos;
