import ProductosService from '../services/productosService.js';

const AdminController = {

  getAllProductsAdmin: async (req, res) => {
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
    
      return infoProductos;

      } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos desde la base de datos' });
      }
  },


  getProductAdmin: async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProductData = req.body;

    console.log('ID del PRODUCTO: ',productId);

    // Obtener el producto existente de la base de datos
    const existingProduct = await ProductosService.getProduct(productId);

    console.log('PRODUCTO A EDITAR: ', existingProduct);
     // Verificar la existencia del producto
    
     if (!existingProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    return existingProduct;

    /*
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
    const result = await ProductosService.editProduct({ id_producto: productId, ...validUpdatedProductData });  
  
    return result;
*/
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Error al obtener productos desde la base de datos' });
    }
  },

}




export default AdminController;
