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

<image src="/public/img/img_readme/home.jpg" alt="HOME">
<image src="/public/img/img_readme/login.jpg" alt="LOGIN">
<image src="/public/img/img_readme/register.jpg" alt="REGISTER">
<image src="/public/img/img_readme/shop.jpg" alt="SHOP">
<image src="/public/img/img_readme/admin.jpg" alt="ADMIN">

## Principales Tecnologías Utilizadas

- Node.js
- Express.js
- Sequelize
- Bcrypt
- Multer
- JsonWebToken
- Dotenv
- Mysql2
- HTML5/CSS3
- Bootstrap

## Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu entorno local:

1. Clona el repositorio: `git clone [URL del repositorio]`
2. Navega al directorio del proyecto: `cd Funko-Shop`
3. Instala las dependencias: `npm i bcrypt body-parser cors dotenv ejs express express-flash express-session jsonwebtoken multer mysql2 sequelize nodemon`

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

CREATE TABLE productos (
   id_producto INT AUTO_INCREMENT PRIMARY KEY,
   sku VARCHAR(20) NOT NULL,
   nombre VARCHAR(255) NOT NULL,
   licencia VARCHAR(255),
   categoria VARCHAR(255) NOT NULL,
   descripcion VARCHAR(255),
   precio DECIMAL(10, 2) NOT NULL,
   cuotas INT NOT NULL,
   descuento DECIMAL(10, 2) NOT NULL,
   stock INT NOT NULL,
   imagen_front VARCHAR(255),
   imagen_back VARCHAR(255) 	
 );

CREATE TABLE ventas (
   id_venta INT AUTO_INCREMENT PRIMARY KEY,
   fecha_venta DATETIME,
   id_usuario INT,
   id_producto INT,
   cantidad_vendida INT,
   precio_unitario DECIMAL(10, 2),
   total_venta DECIMAL(10, 2),
   metodo_pago ENUM('efectivo', 'tarjeta de dédito', 'tarjeta de crédito', 'transferencia bancaria', 'otros'),
   descuento DECIMAL(10, 2),
   impuestos DECIMAL(10, 2),
   notas VARCHAR(255),
   FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
   FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE carritos (
    id_carrito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    fecha_creacion DATETIME,
    estado_carrito VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE carrito_elementos (
    id_elemento INT AUTO_INCREMENT PRIMARY KEY,
    id_carrito INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    FOREIGN KEY (id_carrito) REFERENCES carritos(id_carrito),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

- Inserta productos de prueba:

INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (1,'STW001001','Baby Yoda Blueball', 'Star Wars','Figura coleccionable','Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga',1799.99,3,10,10,'public/uploads/baby-yoda-1.webp','public/uploads/baby-yoda-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (2,'STW001002','Boba Fett Fighter', 'Star Wars','Figura coleccionable','Figura coleccionable de Boba Fett Fighter - The Mandalorian Saga.',1799.99,3,10,10,'public/uploads/bobbafeth-1.webp','public/uploads/bobbafeth-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (3,'STW001003','Luke Skylwalker & Grogu', 'Star Wars','Figura coleccionable','Figura coleccionable de Luke Skylwalker & Grogu - The Mandalorian Saga.',1799.99,3,10,10,'public/uploads/luke-1.webp','public/uploads/luke-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (4,'STW001004','Stormtrooper Lightsaber', 'Star Wars','Figura coleccionable','Figura coleccionable de Stormtrooper Lightsaber - Star Wars Saga.',1799.99,3,10,10,'public/uploads/trooper-1.webp','public/uploads/trooper-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (5,'PKM001001','Charmander Smiley', 'Pokemon','Figura coleccionable','Figura coleccionable de Charmander - Pokemon Saga.',1799.99,3,10,10,'public/uploads/charmander-1.webp','public/uploads/charmander-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (6,'PKM001002','Dragonite Hi!', 'Pokemon','Figura coleccionable','Figura coleccionable de Dragonite - Pokemon Saga.',1799.99,3,10,10,'public/uploads/dragonite-1.webp','public/uploads/dragonite-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (7,'PKM00103','Pidgeotto Flying', 'Pokemon','Figura coleccionable','Figura coleccionable de Pidgeotto - Pokemon Saga.',1799.99,3,10,10,'public/uploads/pidgeotto-1.webp','public/uploads/pidgeotto-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (8,'PKM001004','Pikachu Smiley', 'Pokemon','Figura coleccionable','Figura coleccionable de Pikachu - Pokemon Saga.',1799.99,3,10,10,'public/uploads/pikachu-1.webp','public/uploads/pikachu-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (9,'PKM001005','Vulpix Fancy', 'Pokemon','Figura coleccionable','Figura coleccionable de Vulpix - Pokemon Saga.',1799.99,3,10,10,'public/uploads/vulpix-1.webp','public/uploads/vulpix-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (10,'HPT001001','Harry Potter & Hegwid', 'Harry Potter','Figura coleccionable','Figura coleccionable de Harry Potter & Hegwid - Harry Potter Saga.',1799.99,3,10,10,'public/uploads/harry-1.webp','public/uploads/harry-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (11,'HPT001002','Herminione Ball Dress', 'Harry Potter','Figura coleccionable','Figura coleccionable de Herminione - Harry Potter Saga.',1799.99,3,10,10,'public/uploads/hermione-1.webp','public/uploads/hermione-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (12,'HPT001003','Luna Lovegood Lion Mask', 'Harry Potter','Figura coleccionable','Figura coleccionable de Luna Lovegood - Harry Potter Saga.',1799.99,3,10,10,'public/uploads/luna-1.webp','public/uploads/luna-box.webp');
INSERT INTO `funko`.`productos`(`id_producto`,`sku`,`nombre`,`licencia`,`categoria`,`descripcion`,`precio`,`cuotas`,`descuento`,`stock`,`imagen_front`,`imagen_back`) VALUES (13,'HPT001004','Snape Patronus', 'Harry Potter','Figura coleccionable','Figura coleccionable de Snape Patronus - Harry Potter Saga.',1799.99,3,10,10,'public/uploads/snape-patronus-1.webp','public/uploads/snape-patronus-box.webp');


4. Inicia la aplicación: `npm run dev`

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
