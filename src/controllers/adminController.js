import ProductosService from '../services/productosService.js';

const AdminController = {

  getAllProductsAdmin: async (res, req) => {
    try {
      // Obtener productos desde la base de datos o donde los tengas almacenados
      const productos = await ProductosService.getAllProducts();

            // Verifica si req.session.user está definido antes de intentar acceder a su propiedad email
    
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
      
      console.log('-------------INFOPRODUCTOS--------------', infoProductos)
      return infoProductos;

      } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos desde la base de datos' });
      }
  },
}


export default AdminController;
