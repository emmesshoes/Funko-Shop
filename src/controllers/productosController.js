// controllers/productosController.js
import Producto from '../models/productosModel.js';

const ProductosController = {
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

export default ProductosController;
