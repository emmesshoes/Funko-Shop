import CarritoElemento from '../models/carritoElementosModel.js';

async function addProductToCart(carritoId, productoId, cantidad, precioUnitario) {
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
}

async function updateProductQuantity(carritoId, productoId, cantidad) {
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
}

async function updateProductPrice(elementoId, nuevoPrecio) {
  try {
    const [_, affectedRows] = await CarritoElemento.update(
      { precio_unitario: nuevoPrecio },
      { where: { id: elementoId } }
    );

    return affectedRows;
  } catch (error) {
    throw error;
  }
}

async function getCartItems(carritoId) {
  try {
    const elementos = await CarritoElemento.findAll({
      where: { id_carrito: carritoId },
    });

    return elementos;
  } catch (error) {
    throw error;
  }
}

async function getProductInCart(carritoId, productoId) {
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



export default {
  addProductToCart,
  updateProductQuantity,
  updateProductPrice,
  getCartItems,
  getProductInCart,
};

