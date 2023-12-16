// controllers/productosController.js
import Producto from '../models/productosModel.js';

const ProductoService = {
  getAllProducts: async () => {
    console.log('getAllProducts');
    try {
      return await Producto.findAll();
    } catch (error) {
      throw error;
    }
  },

  addProduct: async (newProduct) => {
    //console.log(JSON.parse(newProduct));
    try {
      const createdProduct = await Producto.create(newProduct);
      return createdProduct.id_producto;
    } catch (error) {
      throw error;
    }
  },

  editProduct: async (editedProduct) => {
    try {
      // Verificar si 'cuotas' es un número válido antes de la actualización
      if (editedProduct.cuotas !== null && !isNaN(editedProduct.cuotas)) {
        editedProduct.cuotas = parseInt(editedProduct.cuotas);
      } else {
        // Si 'cuotas' no es un número válido, puedes asignar un valor predeterminado o manejarlo de otra manera
        editedProduct.cuotas = 0; // O el valor predeterminado que desees
      }
  
      await Producto.update(editedProduct, {
        where: {
          id_producto: editedProduct.id_producto,
        },
      });
    } catch (error) {
      throw error;
    }
  },


  getProduct: async (productId) => {
    try {
      return await Producto.findByPk(productId);
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const result = await Producto.destroy({
        where: {
          id_producto: productId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default ProductoService;
