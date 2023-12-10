//const db = require('./src/config/db'); // Importa la configuración de la base de datos
import app from './src/config/server.js'
//const server = require('./src/config/server'); // Importa la configuración del servidor


// Iniciar el servidor
const port = app.get('port');
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

