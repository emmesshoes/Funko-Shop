import express from 'express';
import multer from 'multer';
import path from 'path';
import ProductosController from '../controllers/productosController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import ejs from 'ejs';

const router = express.Router();

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

// En tu ruta de productos
router.get('/', async(req, res) => {
  try {
    // Obtener productos desde la base de datos o donde los tengas almacenados
    const productos = await ProductosController.getAllProducts();

        // Verifica si req.session.user está definido antes de intentar acceder a su propiedad email
  if (req.session.user) {
    req.session.user.email = "";
  } else {
    // Si req.session.user no está definido, puedes inicializarlo con un objeto vacío
    req.session.user = {};
    req.session.user.email = "";
  }
  console.log(productos)

  const page = req.query.page || 1;
  const productosPorPagina = 9; // Número de productos que deseas mostrar por página

  // Calcular el índice de inicio y final para la página actual
  const inicio = (page - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;

  // Obtener los productos para la página actual
  const productosDeLaPagina = productos.slice(inicio, fin);

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

    // Renderizar la vista de productos y pasar la variable productos
    res.render("productos.ejs", { productos: productosDeLaPagina, currentPage: parseInt(page), totalPaginas, loggedIn: req.session.loggedIn, email: req.session.user.email });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos desde la base de datos' });
  }
});

router.get('/get-all', async (req, res) => {
  try {
    const results = await ProductosController.getAllProducts();
    res.json(results);
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
});

router.post('/add', upload.fields([{ name: 'imagen_front', maxCount: 1 }, { name: 'imagen_back', maxCount: 1 }]), async (req, res) => {
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

router.post('/edit', async (req, res) => {
  try {
    await ProductosController.editProduct(req.body);
    res.json({ message: 'Product edited successfully' });
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ error: 'Error editing product in the database' });
  }
});

router.get('/get/:productId', async (req, res) => {
  try {
    const product = await ProductosController.getProduct(req.params.productId);
    res.json(product);
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ error: 'Error getting product from the database' });
  }
});

router.delete('/delete/:productId', async (req, res) => {
  try {
    await ProductosController.deleteProduct(req.params.productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product from the database' });
  }
});

export default router;
