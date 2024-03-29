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
    try {
      const createdProduct = await Producto.create(newProduct);
      return createdProduct.id_producto;
    } catch (error) {
      throw error;
    }
  },

  editProduct: async (editedProduct) => {
    try {
      const result= await Producto.update(editedProduct, {
        where: {
          id_producto: editedProduct.id_producto,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  getProduct: async (productId) => {
    try {
      const result = await Producto.findByPk(productId);
      return result;
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


stockProduct: async (productId) => {
  try {
    const product = await Producto.findByPk(productId);

    const stock = product.stock;
    return stock;
  } catch (error) {
    throw error;
  }
}

};

export default ProductoService;
