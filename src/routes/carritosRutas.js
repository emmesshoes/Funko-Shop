import express from 'express';
import CarritosController from '../controllers/carritosController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
//router.use(authMiddleware);

router.post('/nuevo/:clienteId', async (req, res) => {
  const clienteId = req.params.clienteId;

  try {
    // Llamar a la función createCart que ahora devuelve toda la información del carrito y sus elementos
    const carritoInfo = await CarritosController.createCart(clienteId);

    res.status(201).json({ message: 'Carrito creado con éxito', carrito: carritoInfo });
  } catch (error) {
    console.error('Error al crear el carrito:', error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

/*
router.post('/nuevo/:clienteId', async (req, res) => {
  const clienteId = req.params.clienteId;

  try {
    const carritoId = await CarritosController.createCart(clienteId);
    res.status(201).json({ message: 'Carrito creado con éxito', carritoId });
  } catch (error) {
    console.error('Error al crear el carrito:', error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});
*/

router.put('/completar/:carritoId', async (req, res) => {
  const carritoId = req.params.carritoId;

  try {
    const affectedRows = await CarritosController.completeCart(carritoId);
    if (affectedRows === 0) {
      res.status(404).json({ error: 'Carrito no encontrado' });
    } else {
      res.json({ message: 'Carrito completado con éxito' });
    }
  } catch (error) {
    console.error('Error al completar el carrito:', error);
    res.status(500).json({ error: 'Error al completar el carrito' });
  }
});

router.put('/cancelar/:carritoId', async (req, res) => {
  const carritoId = req.params.carritoId;

  try {
      const affectedRows = await CarritosController.cancelCart(carritoId);
      if (affectedRows === 0) {
          res.status(404).json({ error: 'Carrito no encontrado' });
      } else {
          res.json({ message: 'Carrito cancelado con éxito' });
      }
  } catch (error) {
      console.error('Error al cancelar el carrito:', error);
      res.status(500).json({ error: 'Error al cancelar el carrito' });
  }
});

router.get('/historial/:clienteId', async (req, res) => {
  const clienteId = req.params.clienteId;

  try {
    const historialCompras = await CarritosController.getPurchaseHistory(clienteId);
    res.json(historialCompras);
  } catch (error) {
    console.error('Error al obtener el historial de compras:', error);
    res.status(500).json({ error: 'Error al obtener el historial de compras' });
  }
});

export default router;
