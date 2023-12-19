import CarritoElementosService from '../services/carritoElementosService.js';
import CarritoService from '../services/carritoService.js';
import ProductoService from '../services/productosService.js';
import ProductosController from './productosController.js';

const CarritoElementosController = {
  addProductToCart: async (req, res) => {
    try {

      const { productoId, cantidad } = req.body;
      const carritoId = req.session.carrito.carrito[0].id_carrito;

      console.log('CANTIDADN QUE ME LLEGA A addProductCart: ', cantidad);

      //obtengo el stock del producto
      const stock = await ProductosController.getStock(productoId);

      //obtengo la cantidad del producto en el carrito
      const cantidadEnCarrito = await CarritoElementosService.getCantidadProductoEnCarrito(carritoId, productoId);

      //Controlo el límite superior
      if((cantidadEnCarrito + cantidad) > stock){
        return res.json({ message:"Cantidad máxima de producto alcanzada", resultCantidad: -1, tope: 'MAX'});
      }

      //Controlo el límite inferior
      if(cantidad < 1){
        return res.json({ message:"Cantidad minima de producto alcanzada", resultCantidad: -1, tope: 'MIN'});
      }
      
    //Obtengo el producto para obtener el precio
    const producto = await ProductoService.getProduct(productoId);
    const precioUnitario = producto.precio;
    
    // Verificar si el producto ya está en el carrito
    const existingProduct = await CarritoElementosService.getProductInCart(carritoId, productoId);
    
    if (existingProduct) {
        console.log('-------EL PRODUCTO EXIXTE EN EL CARRITO: ',existingProduct);
      // Si el producto ya está en el carrito, actualizar la cantidad
      const resultCantidad = cantidad + existingProduct.cantidad;
      await CarritoElementosService.updateProductQuantity(carritoId, productoId, resultCantidad);

      // Devolver la respuesta con la cantidad total
      return res.json({ message:"Cantidad de producto en carrito actualizada", resultCantidad: resultCantidad, tope: 'NONE'});
    
    } else {
      // Si el producto no está en el carrito, agregarlo
      
      await CarritoElementosService.addProductToCart(carritoId, productoId, cantidad, precioUnitario);
      return res.json({ message:"Cantidad minima de producto alcanzada", resultCantidad: cantidad, tope: 'NONE'});
      
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

    const nuevaCantidad =existingProduct.cantidad - cantidad;
    if(nuevaCantidad < 1){
      return res.json({ message:"Cantidad minima de producto alcanzada", resultCantidad: nuevaCantidad, tope: 'MIN'});
    }
    await CarritoElementosService.updateProductQuantity(carritoId, productoId, nuevaCantidad);
    
    return res.json({ message:"Cantidad minima de producto alcanzada", resultCantidad: nuevaCantidad, tope: 'NONE'});
  } else {
    // Si el producto no está en el carrito, mando mensaje de error
    //await CarritoElementosService.addProductToCart(carritoId, productoId, cantidad, precioUnitario);
    return res.json({ message:"el producto no se encuentra en el carrito", resultCantidad: -1, tope: 'ERROR'});
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

  deleteCartItem: async (req, res) => {
    try {
      const { productId } = req.body;
      const carritoId = req.session.carrito.carrito[0].id_carrito;
      console.log('ESTOY EN DELETECARTITEM');
      console.log('BODY: ', req.body);
      console.log('PRODUCTO ID: ', parseInt(productId));
      console.log('CARRITO ID: ', carritoId);

      return await CarritoElementosService.deleteCartItem(carritoId, productId);
    } catch (error) {
      throw error;
    }
  },

};



export default CarritoElementosController;
