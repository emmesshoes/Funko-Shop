import express from 'express';
import { chekSessionUser } from '../functions/sessionFunctions.js';
import CarritoElementosController from '../controllers/carritoElementosController.js'
import {decodeTokenUser} from '../functions/jwtFunctions.js';
import ProductoService from '../services/productosService.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const result = chekSessionUser(req,res);
    console.log('result fuera de chekSessionUser. ', result)
    if(result === false){
      return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
    }
    const refreshDataOnly = req.query.refreshDataOnly === 'true';
    
  
    console.log('LA PUTA MADRE');

    let carritoId = '';

    if (req.session.carrito && req.session.carrito.carrito) {
      if (req.session.carrito.carrito.id_carrito) {
        carritoId = req.session.carrito.carrito.id_carrito;
      } else if (req.session.carrito.carrito[0] && req.session.carrito.carrito[0].id_carrito) {
        carritoId = req.session.carrito.carrito[0].id_carrito;
      }
    }

    if (!carritoId) {
      return res.redirect('/session/login');
    }

    // Obtener todos los elementos del carrito
    const carritoElementos = await CarritoElementosController.getCartItems(carritoId);
    // Obtener la información del producto asociado para cada elemento del carrito
    const productosPromises = carritoElementos.map(async (elemento) => {
      const producto = await ProductoService.getProduct(elemento.id_producto);
      return { elemento, producto };
    });

    // Esperar a que se resuelvan todas las promesas
    const productosInfo = await Promise.all(productosPromises);

    const cantidadTotal = productosInfo.reduce((total, info) => {
      return total + info.elemento.cantidad;
    }, 0);

    const subTotal = productosInfo.reduce((subTotal, info) => {
      return subTotal + (info.elemento.cantidad * info.elemento.precio_unitario) ;
    }, 0);

    // Generar un número aleatorio para el costo de envío entre 5 y 20 con dos decimales
    const costoEnvio = (Math.random() * (5000 - 3000) + 5).toFixed(2);
    const totalPagar= parseFloat(subTotal) + parseFloat(costoEnvio);

    //Solo refresco datos
    if (refreshDataOnly){
      return res.json({productosInfo, cantidadTotal: cantidadTotal, subTotal: subTotal, costoEnvio: costoEnvio, totalPagar: totalPagar});
    } else {
      // Renderizar la página elementos-del-carrito y pasar la información
    return res.render('carrito-de-compras', { productosInfo, cantidadTotal: cantidadTotal, subTotal: subTotal, costoEnvio: costoEnvio, totalPagar: totalPagar, loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
    }

  } catch (error) {
    console.error('Error al obtener elementos del carrito:', error);
    res.status(500).json({ error: 'Error al obtener elementos del carrito' });
  }
});

// Agregar un producto al carrito
router.post('/add', async (req, res) => {
  try {
    if(!req.session.user.email){
      return res.json({ message: 'Debe estar logueado para poder agregar productos al carrito', resultCantidad: -1});  
    }
    const result = await CarritoElementosController.addProductToCart(req, res);
    return result;
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).res.json({ error: 'Error al agregar producto al carrito' });
  }
});

// Agregar un producto al carrito
router.put('/sub', async (req, res) => {
  try {
    if(!req.session.user.email){
      return res.json({ message: 'Debe estar logueado para poder agregar productos al carrito', resultCantidad: -1  });
    }
    const result = await CarritoElementosController.subProductToCart(req, res);
    return result;
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).res.json({ error: 'Error al agregar producto al carrito' });
  }
});

// Actualizar la cantidad de un producto en el carrito
router.put('/update-quantity', async (req, res) => {
  const { cantidad } = req.body;
  const productId = req.params.productId;
  try {
    const cantidad = await CarritoElementosController.updateProductQuantity(productId, cantidad );
    if (cantidad >= 0) {
      res.json({ message: 'Cantidad de producto actualizada en el carrito' });
    } else {
      res.status(404).json({ error: 'Elemento del carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar la cantidad del producto en el carrito:', error);
    res.status(500).res.json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
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
    res.status(500).res.json({ error: 'Error al actualizar el precio del producto en el carrito' });
  }
});


// Recuperar los elementos en un carrito indicado por el id del carrito
router.get('/carrito-elementos/:carritoId', async (req, res) => {
  try {
    const result = chekSessionUser(req,res);
    if(result === false){
      return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
    }
    const { carritoId } = req.params;
    const elementos = await CarritoElementosController.getCartItems(carritoId);
    res.json(elementos);
  } catch (error) {
    console.error('Error al recuperar elementos del carrito:', error);
    res.status(500).res.json({ error: 'Error al recuperar elementos del carrito' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const result= await CarritoElementosController.deleteCartItem(req, res);
    if (result === 1){
      res.json({ message: 'Item eliminado satisfactoriamente!!!' });
    } else {
      res.json({ message: 'Ningun Item eliminado' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).res.json({ error: 'Error deleting product from the database' });
  }
});

export default router;
