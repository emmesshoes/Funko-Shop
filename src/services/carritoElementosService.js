import CarritoElemento from '../models/carritoElementosModel.js';

const CarritoElementosService = {

  addProductToCart: async (carritoId, productoId, cantidad, precioUnitario) => {
    try {
      const carritoElemento = await CarritoElemento.create({
        id_carrito: carritoId,
        id_producto: productoId,
        cantidad: cantidad,
        precio_unitario: precioUnitario,
      });

      return carritoElemento.id;
    } catch (error) {
      throw error;
    }
  },

  updateProductQuantity: async (carritoId, productoId, cantidad) => {
    try {
      const [_, affectedRows] = await CarritoElemento.update(
        { cantidad: cantidad },
        {where: {
          id_carrito: carritoId,
          id_producto: productoId,
        }},
      );

      return affectedRows;
    } catch (error) {
      throw error;
    }
  },

updateProductPrice: async (elementoId, nuevoPrecio) => {
  try {
    const [_, affectedRows] = await CarritoElemento.update(
      { precio_unitario: nuevoPrecio },
      { where: { id: elementoId } }
    );

    return affectedRows;
  } catch (error) {
    throw error;
  }
},

getCartItems: async (carritoId) => {
  try {
    const elementos = await CarritoElemento.findAll({
      where: { id_carrito: carritoId },
    });

    return elementos;
  } catch (error) {
    throw error;
  }
},

getProductInCart: async (carritoId, productoId) => {
  try {
    const elemento = await CarritoElemento.findOne({
      where: {
        id_carrito: carritoId,
        id_producto: productoId,
      },
    });

    return elemento;
  } catch (error) {
    throw error;
  }
}

}

export default CarritoElementosService;