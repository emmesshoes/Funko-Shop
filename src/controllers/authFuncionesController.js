// controllers/authFuncionesController.js
import authModel from '../models/authFuncionesModel.js';

async function checkAdminExists(req, res) {
  try {
    const exists = await authModel.checkAdminExists();
    res.json({ adminExists: exists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createDefaultAdmin(req, res) {
  try {
    const adminId = await authModel.createDefaultAdmin();
    res.json({ adminId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await authModel.login(email, password);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}


export default { checkAdminExists, createDefaultAdmin, login };
