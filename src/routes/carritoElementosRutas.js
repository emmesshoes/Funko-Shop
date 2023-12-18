import express from 'express';
import CarritosController from '../controllers/carritosController.js';
import CarritoElementosController from '../controllers/carritoElementosController.js'
import {decodeTokenUser} from '../functions/jwtFunctions.js';
import ProductoService from '../services/productosService.js';
const router = express.Router();

// Agregar un producto al carrito
router.post('/add', async (req, res) => {
  const { productoId, cantidad } = req.body;
  let insertProductToCartResult = false;

  try {
    if(!req.session.user.email){
      return res.json({ message: 'Debe estar logueado para poder agregar productos al carrito', insertProductToCartResult, productoId, cantidad,  });  
    }

    insertProductToCartResult = true;
    //const tokenDecode= decodeTokenUser(req.session.user.token);
    //const carrito = await CarritosController.createCart(tokenDecode.userId);
    const carritoId = req.session.carrito.carrito[0].id_carrito;
    //Obtengo el producto para obtener el precio
    const producto = await ProductoService.getProduct(productoId);
    const precioUnitario = producto.precio;
    //inserto en la tabla de elementos del carrito el producto con su precio y cantidad
    console.log('Datos para addProductToCart', carritoId, productoId, cantidad, precioUnitario);
    const elementoId = await CarritoElementosController.addProductToCart(carritoId, productoId, cantidad, precioUnitario);
    res.json({ message: 'Producto agregado al carrito con exito', insertProductToCartResult, productoId, cantidad });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

// Actualizar la cantidad de un producto en el carrito
router.put('/update-quantity', async (req, res) => {
  const { elementoId, action } = req.body;
  try {
    const cantidad = await CarritoElementosController.updateProductQuantity(elementoId, cantidad);
    if (cantidad >= 0) {
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

// En tu controlador o función para la página elementos-del-carrito

router.get('/', async (req, res) => {
  try {
    if(!req.session.user.email){
      return res.status(500).json({ mensaje: 'Debe loguearse para ver el carrito' });
    }
    
    const carritoId = req.session.carrito.carrito[0].id_carrito;
    
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

  console.log('----------- TOTAL A PAGAR:', totalPagar );

    // Renderizar la página elementos-del-carrito y pasar la información
    res.render('carrito-de-compras', { productosInfo, cantidadTotal: cantidadTotal, subTotal: subTotal, costoEnvio: costoEnvio, totalPagar: totalPagar, loggedIn: req.session.loggedIn, email: req.session.user.email });
  } catch (error) {
    console.error('Error al obtener elementos del carrito:', error);
    res.status(500).json({ error: 'Error al obtener elementos del carrito' });
  }
});


// Recuperar los elementos en un carrito indicado por el id del carrito
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
