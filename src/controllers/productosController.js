// controllers/productosController.js
import ProductoService from '../services/productosService.js'


const ProductosController = {
  
  getProducts: async (res, req) => {
    try {
      // Obtener productos desde la base de datos o donde los tengas almacenados
      const productos = await ProductoService.getAllProducts();
      return productos;

      } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos desde la base de datos' });
      }
  },

  getAllProducts: async (res, req) => {
    try {
      // Obtener productos desde la base de datos o donde los tengas almacenados
      const productos = await ProductoService.getAllProducts();
    
      const page = req.query.page || 1;
      const productosPorPagina = 9; // Número de productos que deseas mostrar por página

      // Calcular el índice de inicio y final para la página actual
      const inicio = (page - 1) * productosPorPagina;
      const fin = inicio + productosPorPagina;

      // Obtener los productos para la página actual
      const productosDeLaPagina = productos.slice(inicio, fin);

      // Calcular el número total de páginas
      const totalPaginas = Math.ceil(productos.length / productosPorPagina);

      const currentPage = parseInt(page);

      const infoProductos = {
        productosDeLaPagina: productosDeLaPagina,
        currentPage: currentPage,
        totalPaginas: totalPaginas,
      }
      
      return infoProductos;

      } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos desde la base de datos' });
      }
  },


  addProduct: async (newProduct) => {
    try {
      const idcreatedProduct = await ProductoService.addProduct(newProduct);
      return idcreatedProduct.id_producto;
    } catch (error) {
      throw error;
    }
  },

  editProduct: async (editedProduct) => {
    try {

      if(editedProduct.filePathFront)
      // Verificar si 'cuotas' es un número válido antes de la actualización
      if (editedProduct.cuotas !== null && !isNaN(editedProduct.cuotas)) {
        editedProduct.cuotas = parseInt(editedProduct.cuotas);
      } else {
        // Si 'cuotas' no es un número válido, puedes asignar un valor predeterminado o manejarlo de otra manera
        editedProduct.cuotas = 0; // O el valor predeterminado que desees
      }
      const editProduct = await ProductoService.editProduct(editedProduct);
      return editProduct;
    } catch (error) {
      throw error;
    }
  },

  getProduct: async (productId) => {
    try {
      const product = await ProductoService.getProduct(productId);
      return product;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const result = await ProductoService.deleteProduct(productId);
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default ProductosController;
