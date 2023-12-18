import CarritoElementosService from '../services/carritoElementosService.js';
import CarritoService from '../services/carritoService.js';
import ProductoService from '../services/productosService.js';

const CarritoElementosController = {
  addProductToCart: async (carritoId, productoId, cantidad, precioUnitario) => {
    try {
      return await CarritoService.addProductToCart(carritoId, productoId, cantidad, precioUnitario);
    } catch (error) {
      throw error;
    }
  },

  updateProductQuantity: async (productId, action) => {
    try {
      const producto = ProductoService.getProduct(productId);
      const stock = producto.stock;



      return await CarritoElementosService.updateProductQuantity(elementoId, nuevaCantidad);
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
