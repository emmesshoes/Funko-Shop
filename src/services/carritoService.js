import carritoElementosFunctions from '../functions/carritoElementosFunctions.js';

const CarritoService = {
     
    addProductToCart: async (carritoId, productoId, cantidad, precioUnitario) => {
      try {
        // Verificar si el producto ya está en el carrito
        const existingProduct = await carritoElementosFunctions.getProductInCart(carritoId, productoId);
        
        if (existingProduct) {
            console.log('-------EL PRODUCTO EXIXTE EN EL CARRITO: ',existingProduct);
          // Si el producto ya está en el carrito, actualizar la cantidad
          await carritoElementosFunctions.updateProductQuantity(carritoId, productoId, cantidad + existingProduct.cantidad);
          return { mensaje: 'Cantidad de producto actualizada en el carrito' };
        } else {
          // Si el producto no está en el carrito, agregarlo
          await carritoElementosFunctions.addProductToCart(carritoId, productoId, cantidad, precioUnitario);
          return { mensaje: 'Producto agregado al carrito' };
        }
      } catch (error) {
        throw error;
      }
    },
};
  
export default CarritoService;