import jwt from 'jsonwebtoken';

const secretKey = 'grupo 8 codo a codo';

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Token no válido' });
    }
    // Agrega la información del usuario y su rol al objeto de solicitud (req)
    req.user = decodedToken.user;
    req.rol = decodedToken.rol;
    next();
  });
}

export default verifyToken;

