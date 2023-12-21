# Tienda Virtual Funko – Shop

## Descripción

Bienvenido al proyecto JS-BACK END 2023 del Grupo 8, Comisión 23576. Este repositorio contiene la implementación de una Tienda Virtual llamada Funko – Shop, desarrollada como parte del Ejercicio Final Integrador. La tienda ofrece una plataforma para la venta de productos Funko, con características avanzadas para mejorar la experiencia del usuario.

## Características

### Catálogo de Productos
- Ofrece un extenso catálogo de productos Funko, clasificados por categorías y permitiendo a los usuarios filtrar por personaje, serie, o popularidad (en proceso).
- Proporciona descripciones detalladas, imágenes de alta calidad y precios de cada producto.

### Carrito de Compras y Proceso de Pago
- Permite a los usuarios agregar productos a su carrito de compras y realizar un proceso de pago seguro (en proceso).

### Panel de Administración (Admin)
- Incorpora un panel de administración para gestionar productos, categorías, usuarios y pedidos.
- Permite a los administradores realizar acciones como agregar nuevos productos, moderar reseñas y ver estadísticas del sitio.

## Capturas de Pantalla

Incluimos capturas de pantalla para ilustrar la interfaz y las funcionalidades esenciales de Funko – Shop. Estas imágenes ofrecen una vista rápida de la apariencia del proyecto.

(Adjunta aquí las capturas de pantalla con subtítulos descriptivos).

## Tecnologías Utilizadas

- Node.js
- Express.js
- Sequelize
- Bcrypt
- Multer
- MySQL
- HTML5/CSS3
- Bootstrap

## Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu entorno local:

1. Clona el repositorio: `git clone [URL del repositorio]`
2. Navega al directorio del proyecto: `cd Funko-Shop`
3. Instala las dependencias: `npm install`

### Configuración de la Base de Datos (MySQL)

- Accede a MySQL y ejecuta los siguientes comandos:
  CREATE DATABASE funko;

  CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL
  );

  -- [Resto de las tablas y datos de ejemplo]

4. Inicia la aplicación: `npm start`

## Contribución

Agradecemos contribuciones para mejorar Funko – Shop. Para contribuir, sigue estos pasos:

1. Forkea el repositorio.
2. Crea una rama para tu contribución: `git checkout -b nombre-de-la-rama`
3. Realiza tus cambios y haz commit: `git commit -m "Descripción de los cambios"`
4. Haz push a tu rama: `git push origin nombre-de-la-rama`
5. Envía una solicitud de extracción.

## Contacto

Para preguntas, problemas o colaboraciones, puedes ponerte en contacto con nosotros a través de:

- Correo Electrónico:
  - emmesshoes@gmail.com
  - actassi@gmail.com
