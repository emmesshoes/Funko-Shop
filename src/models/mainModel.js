import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';

const MainModel = {
  getHome: async () => {
    const results = 'Esta es la ruta para Home';
    return results;
  },

  getContact: async () => {
    const result = 'Esta es la ruta para Contact';
    return result;
  },

  getAbout: async () => {
    const result = 'Esta es la ruta para About';
    return result;
  },

  getFaqs: async () => {
    const result = 'Esta es la ruta para Faqs';
    return result;
  },
};

export default MainModel;
