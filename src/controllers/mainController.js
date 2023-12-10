import MainModel from '../models/mainModel.js';

const MainController = {
  getHome: async () => {
    try {
      return await MainModel.getHome();
    } catch (error) {
      throw error;
    }
  },

  getContact: async () => {
    try {
      return await MainModel.getContact();
    } catch (error) {
      throw error;
    }
  },

  getAbout: async () => {
    try {
      return await MainModel.getAbout();
    } catch (error) {
      throw error;
    }
  },

  getFaqs: async () => {
    try {
      return await MainModel.getFaqs();
    } catch (error) {
      throw error;
    }
  },
};

export default MainController;
