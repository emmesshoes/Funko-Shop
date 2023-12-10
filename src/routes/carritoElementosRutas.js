import express from 'express';
import CarritoElementosController from '../controllers/carritoElementosController.js';

const router = express.Router();
// Agregar un producto al carrito
router.post('/carrito-elementos/add', async (req, res) => {
  const { carritoId, productoId, cantidad, precioUnitario } = req.body;
  try {
    const elementoId = await CarritoElementosController.addProductToCart(carritoId, productoId, cantidad, precioUnitario);
    res.json({ message: 'Producto agregado al carrito', elementoId });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

// Actualizar la cantidad de un producto en el carrito
router.put('/carrito-elementos/update-quantity', async (req, res) => {
  const { elementoId, nuevaCantidad } = req.body;
  try {
    const affectedRows = await CarritoElementosController.updateProductQuantity(elementoId, nuevaCantidad);
    if (affectedRows > 0) {
      res.json({ message: 'Cantidad de producto actualizada en el carrito' });
    } else {
      res.status(404).json({ error: 'Elemento del carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar la cantidad del producto en el carrito:', error);
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
  }
});

// Actualizar el precio unitario de un producto en el carrito
router.put('/carrito-elementos/update-price', async (req, res) => {
  const { elementoId, nuevoPrecio } = req.body;
  try {
    const affectedRows = await CarritoElementosController.updateProductPrice(elementoId, nuevoPrecio);
    if (affectedRows > 0) {
      res.json({ message: 'Precio del producto actualizado en el carrito' });
    } else {
      res.status(404).json({ error: 'Elemento del carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el precio del producto en el carrito:', error);
    res.status(500).json({ error: 'Error al actualizar el precio del producto en el carrito' });
  }
});

// Recuperar los elementos en un carrito
router.get('/carrito-elementos/:carritoId', async (req, res) => {
  const { carritoId } = req.params;
  try {
    const elementos = await CarritoElementosController.getCartItems(carritoId);
    res.json(elementos);
  } catch (error) {
    console.error('Error al recuperar elementos del carrito:', error);
    res.status(500).json({ error: 'Error al recuperar elementos del carrito' });
  }
});

export default router;
