import carritoElementosFunctions from '../functions/carritoElementosFunctions.js';
import CarritoService from '../services/carritoService.js';

const CarritoElementosController = {
  addProductToCart: async (carritoId, productoId, cantidad, precioUnitario) => {
    try {
      return await CarritoService.addProductToCart(carritoId, productoId, cantidad, precioUnitario);
    } catch (error) {
      throw error;
    }
  },

  updateProductQuantity: async (elementoId, nuevaCantidad) => {
    try {
      return await carritoElementosFunctions.updateProductQuantity(elementoId, nuevaCantidad);
    } catch (error) {
      throw error;
    }
  },

  updateProductPrice: async (elementoId, nuevoPrecio) => {
    try {
      return await carritoElementosFunctions.updateProductPrice(elementoId, nuevoPrecio);
    } catch (error) {
      throw error;
    }
  },

  getCartItems: async (carritoId) => {
    try {
      return await carritoElementosFunctions.getCartItems(carritoId);
    } catch (error) {
      throw error;
    }
  },
};

export default CarritoElementosController;
