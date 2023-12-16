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
    const {
      id_producto,
      categoria,
      licencia,
      nombre,
      descripcion,
      sku,
      precio,
      stock,
      descuento,
      cuotas,
      imagen_front,
      imagen_back } = editedProduct;
    try {

      const existingProduct = ProductoService.getProduct(id_producto);
      
      // Filtrar valores no deseados y asegurarse de que los tipos de datos sean correctos
      const validUpdatedProductData = {
        categoria: categoria || existingProduct.categoria,
        licencia: licencia || existingProduct.licencia,
        descripcion: descripcion || existingProduct.descripcion,
        sku: sku || existingProduct.sku,
        precio: precio || existingProduct.precio,
        stock: stock || existingProduct.stock,
        descuento: descuento || existingProduct.descuento,
        cuotas: cuotas || existingProduct.cuotas,
        imagen_front: imagen_front || existingProduct.imagen_front,
        imagen_back: imagen_back || existingProduct.imagen_back,
      };
      
      const editadoProduct = await ProductoService.editProduct({ id_producto: id_producto, ...validUpdatedProductData });
      return editadoProduct;
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
