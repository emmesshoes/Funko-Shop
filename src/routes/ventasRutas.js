import express from 'express';
import VentasController from '../controllers/ventasController.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Usa el middleware de autenticación en todas las rutas a continuación
//router.use(authMiddleware);
const router = express.Router();

router.get('/get-all', async (req, res) => {
    try {
        const results = await VentasController.getAllVentas();
        res.json(results);
    } catch (error) {
        console.error('Error al obtener datos desde la base de datos:', error);
        res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
    }
});

router.post('/add', async (req, res) => {
    console.log(req.body);
    try {
        const ventaId = await VentasController.addVenta(req.body);
        res.json({ message: 'Venta agregada exitosamente', ventaId });
    } catch (error) {
        console.error('Error al agregar venta:', error);
        res.status(500).json({ error: 'Error al agregar venta a la base de datos' });
    }
});

// Ruta para completar una compra
router.post('/complete-purchase', async (req, res) => {
    // Los datos de la compra deben estar en el cuerpo de la solicitud
    const ventaData = req.body;
    try {
        const ventaId = await VentasController.completeVenta(ventaData);
        res.status(200).json({ message: 'Compra completada exitosamente', ventaId });
    } catch (error) {
        console.error('Error al completar la compra:', error);
        res.status(500).json({ error: 'Error al completar la compra' });
    }
});

router.post('/edit', async (req, res) => {
    try {
        await VentasController.editVenta(req.body);
        res.json({ message: 'Venta editada exitosamente' });
    } catch (error) {
        console.error('Error al editar venta:', error);
        res.status(500).json({ error: 'Error al editar venta en la base de datos' });
    }
});

router.get('/get/:ventaId', async (req, res) => {
    try {
        const venta = await VentasController.getVenta(req.params.ventaId);
        res.json(venta);
    } catch (error) {
        console.error('Error al obtener venta:', error);
        res.status(500).json({ error: 'Error al obtener venta de la base de datos' });
    }
});

router.delete('/delete/:ventaId', async (req, res) => {
    try {
        await VentasController.deleteVenta(req.params.ventaId);
        res.json({ message: 'Venta eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar venta:', error);
        res.status(500).json({ error: 'Error al eliminar venta de la base de datos' });
    }
});


export default router;
