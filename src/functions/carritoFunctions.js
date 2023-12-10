import CarritoElemento from '../models/carritoElementosModel.js';
import Carritos from '../models/carritosModel.js';

async function getCart(userId) {
  try {
    const resutlCart = await createCart(userId);
  
    return resutlCart;
  } catch (error) {
    throw error;
  }
};

// Crear carrito para un cliente
async function createCart (clienteId) {
  try {
    // Verificar si el cliente existe
    const existingClient = await Clientes.findByPk(clienteId);
    
    if (!existingClient) {
      throw new Error('Cliente no encontrado');
    }

    // Verificar si ya existe un carrito activo para el cliente
    const existingCart = await Carritos.findAll({
      where: {
        id_cliente: clienteId,
        estado_carrito: 'activo',
      },
      include: [
        {
          model: CarritoElemento,
          as: 'carrito_elementos',
          attributes: ['id_producto', 'cantidad', 'precio_unitario'],
        },
      ],
    });

    if (existingCart.length > 0){
      // Si ya hay un carrito activo, puedes retornar toda su información
      return existingCart;
    }

    // Crear un nuevo carrito si no hay uno activo para el cliente
    const newCart = await Carritos.create({
      id_cliente: clienteId,
      estado_carrito: 'activo',
    });

    // Crear el carritoElementos asociado al carrito
    const newElementsCart = await CarritoElemento.create({
      id_carrito: newCart.id_carrito, // Utiliza el ID del carrito recién creado
      id_producto: null ,
      cantidad: 0,
      precio_unitario: 0.0,
    });

    // Obtener la información completa del carrito y sus elementos
    const carritoInfo = await Carritos.findOne({
      where: { id_carrito: newCart.id_carrito },
      include: [
        {
          model: CarritoElemento,
          as: 'carrito_elementos',
          attributes: ['id_producto', 'cantidad', 'precio_unitario'],
        },
      ],
    });

    return carritoInfo;
  } catch (error) {
    throw error;
  }
};

export {
  getCart,
};

