import CarritoElementosService from '../services/carritoElementosService.js';
import CarritoService from '../services/carritoService.js';
import ProductoService from '../services/productosService.js';

const CarritoElementosController = {
  addProductToCart: async (req, res) => {
    try {

      const { productoId, cantidad } = req.body;
      const carritoId = req.session.carrito.carrito[0].id_carrito;

    //Obtengo el producto para obtener el precio
    const producto = await ProductoService.getProduct(productoId);
    const precioUnitario = producto.precio;
    //inserto en la tabla de elementos del carrito el producto con su precio y cantidad
    console.log('Datos para addProductToCart', carritoId, productoId, cantidad, precioUnitario);

    // Verificar si el producto ya está en el carrito
    const existingProduct = await CarritoElementosService.getProductInCart(carritoId, productoId);
    
    if (existingProduct) {
        console.log('-------EL PRODUCTO EXIXTE EN EL CARRITO: ',existingProduct);
      // Si el producto ya está en el carrito, actualizar la cantidad
      const resultCantidad = cantidad + existingProduct.cantidad;
      await CarritoElementosService.updateProductQuantity(carritoId, productoId, resultCantidad);

      // Devolver la respuesta con la cantidad total
      return resultCantidad;
    } else {
      // Si el producto no está en el carrito, agregarlo
      
      await CarritoElementosService.addProductToCart(carritoId, productoId, cantidad, precioUnitario);
      return cantidad;
    }
  } catch (error) {
    throw error;
  }
},

subProductToCart: async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    const carritoId = req.session.carrito.carrito[0].id_carrito;
  //Obtengo el producto para obtener el precio
  const producto = await ProductoService.getProduct(productoId);
  const precioUnitario = producto.precio;
  //inserto en la tabla de elementos del carrito el producto con su precio y cantidad
  console.log('Datos para addProductToCart', carritoId, productoId, cantidad, precioUnitario);

  // Verificar si el producto ya está en el carrito
  const existingProduct = await CarritoElementosService.getProductInCart(carritoId, productoId);
  
  if (existingProduct) {
      console.log('-------EL PRODUCTO EXIXTE EN EL CARRITO: ',existingProduct);
    // Si el producto ya está en el carrito, actualizar la cantidad

    const nuevaCantidad =existingProduct.cantidad  - cantidad;
    await CarritoElementosService.updateProductQuantity(carritoId, productoId, nuevaCantidad);
    
    return nuevaCantidad ;
  } else {
    // Si el producto no está en el carrito, mando mensaje de error
    //await CarritoElementosService.addProductToCart(carritoId, productoId, cantidad, precioUnitario);
    return -1;
  }
} catch (error) {
  throw error;
}
},
  updateProductPrice: async (elementoId, nuevoPrecio) => {
    try {
      return await CarritoElementosService.updateProductPrice(elementoId, nuevoPrecio);
    } catch (error) {
      throw error;
    }
  },

  getCartItems: async (carritoId) => {
    try {
      return await CarritoElementosService.getCartItems(carritoId);
    } catch (error) {
      throw error;
    }
  },
};

export default CarritoElementosController;
