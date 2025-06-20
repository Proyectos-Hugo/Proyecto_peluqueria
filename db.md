
-- 1. BORRAR BASE DE DATOS ANTIGUA (si existe)
DROP DATABASE IF EXISTS db_peluqueria;

-- 2. CREAR BASE DE DATOS Y USARLA
CREATE DATABASE db_peluqueria;
USE db_peluqueria;

-- 2.1. CREAR USUARIOS
DROP USER 'nestuser'@'localhost';
CREATE USER 'nestuser'@'localhost' IDENTIFIED BY 'nestpass';
GRANT ALL PRIVILEGES ON db_peluqueria.* TO 'nestuser'@'localhost';
FLUSH PRIVILEGES;

-- 3. BORRAR TABLAS SI EXISTEN (orden correcto por claves foráneas)
DROP TABLE IF EXISTS PEDIDOS_PRODUCTOS;
DROP TABLE IF EXISTS PEDIDOS;
DROP TABLE IF EXISTS PRODUCTOS;
DROP TABLE IF EXISTS CATEGORIAS;
DROP TABLE IF EXISTS CITAS;
DROP TABLE IF EXISTS MASCOTAS;
DROP TABLE IF EXISTS EMPLEADOS;
DROP TABLE IF EXISTS CLIENTES;
DROP TABLE IF EXISTS USERS;
-- 4. CREAR TABLAS
CREATE TABLE USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
);
CREATE TABLE CLIENTES (
    email VARCHAR(100) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50),
    password VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE EMPLEADOS (
    dni VARCHAR(20) PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    especialidad VARCHAR(50),
    telefono VARCHAR(20)
);




CREATE TABLE MASCOTAS (
    id_mascota INT AUTO_INCREMENT PRIMARY KEY,
    email_cliente VARCHAR(100) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    raza VARCHAR(50),
    edad INT,
    FOREIGN KEY (email_cliente) REFERENCES CLIENTES(email) ON DELETE CASCADE
);

CREATE TABLE CITAS (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    email_cliente VARCHAR(100) NOT NULL,
    dni_empleado VARCHAR(20) NOT NULL,
    id_mascota INT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    FOREIGN KEY (email_cliente) REFERENCES CLIENTES(email) ON DELETE CASCADE,
    FOREIGN KEY (dni_empleado) REFERENCES EMPLEADOS(dni) ON DELETE CASCADE,
    FOREIGN KEY (id_mascota) REFERENCES MASCOTAS(id_mascota) ON DELETE CASCADE
);

CREATE TABLE CATEGORIAS (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE PRODUCTOS (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    id_categoria INT NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIAS(id_categoria)
);

CREATE TABLE PEDIDOS (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    email_cliente VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (email_cliente) REFERENCES CLIENTES(email)
);

CREATE TABLE PEDIDOS_PRODUCTOS (
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (id_pedido, id_producto),
    FOREIGN KEY (id_pedido) REFERENCES PEDIDOS(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES PRODUCTOS(id_producto) ON DELETE CASCADE
);

-- 5. INSERCIONES INICIALES



-- CATEGORIAS
INSERT INTO CATEGORIAS (nombre) VALUES
('Higiene'),
('Accesorios'),
('Juguetes'),
('Salud'),
('Alimentación');

-- CLIENTES
INSERT INTO CLIENTES (email, nombre, apellido, password, telefono) VALUES
('ana@gmail.com', 'Ana', 'García', 'passAna123', '600111222'),
('luis@gmail.com', 'Luis', 'Martínez', 'passLuis456', '600333444'),
('marta@gmail.com', 'Marta', 'López', 'passMarta789', '600555666'),
('carlos@gmail.com', 'Carlos', 'Sánchez', 'passCarlos321', '600777888'),
('elena@gmail.com', 'Elena', 'Ruiz', 'passElena654', '600999000');

-- EMPLEADOS
INSERT INTO EMPLEADOS (dni, email, password, nombre, apellido, especialidad, telefono) VALUES
('12345678A', 'pedro@peluqueria.com', 'passPedro123', 'Pedro', 'Fernández', 'Corte', '611111111'),
('23456789B', 'lucia@peluqueria.com', 'passLucia456', 'Lucía', 'Moreno', 'Baño', '622222222'),
('34567890C', 'javier@peluqueria.com', 'passJavier789', 'Javier', 'Pérez', 'Peluquería', '633333333'),
('45678901D', 'sara@peluqueria.com', 'passSara321', 'Sara', 'Gómez', 'Uñas', '644444444'),
('56789012E', 'david@peluqueria.com', 'passDavid654', 'David', 'Díaz', 'Adiestramiento', '655555555');
-- MASCOTAS
INSERT INTO MASCOTAS (email_cliente, nombre, raza, edad) VALUES
('ana@gmail.com', 'Toby', 'Labrador', 3),
('luis@gmail.com', 'Luna', 'Caniche', 2),
('marta@gmail.com', 'Max', 'Bulldog', 5),
('carlos@gmail.com', 'Nala', 'Beagle', 4),
('elena@gmail.com', 'Rocky', 'Pastor Alemán', 1);

-- CITAS
INSERT INTO CITAS (email_cliente, dni_empleado, id_mascota, fecha, hora) VALUES
('ana@gmail.com', '12345678A', 1, '2025-06-10', '10:00'),
('luis@gmail.com', '23456789B', 2, '2025-06-11', '11:00'),
('marta@gmail.com', '34567890C', 3, '2025-06-12', '12:00'),
('carlos@gmail.com', '45678901D', 4, '2025-06-13', '13:00'),
('elena@gmail.com', '56789012E', 5, '2025-06-14', '14:00');

-- PRODUCTOS (con id_categoria)
INSERT INTO PRODUCTOS (nombre, descripcion, precio, id_categoria, stock) VALUES
('Champú Canino', 'Champú especial para perros', 9.99, 1, 50),           -- Higiene
('Cepillo', 'Cepillo para pelo largo', 7.50, 1, 30),                     -- Higiene
('Juguete Mordedor', 'Juguete de goma resistente', 5.00, 3, 100),        -- Juguetes
('Collar Antipulgas', 'Collar para prevenir pulgas', 12.00, 4, 20),      -- Salud
('Snacks', 'Premios para perros', 3.50, 5, 200);                         -- Alimentación

-- PEDIDOS
INSERT INTO PEDIDOS (email_cliente, fecha) VALUES
('ana@gmail.com', '2025-06-01'),
('luis@gmail.com', '2025-06-02'),
('marta@gmail.com', '2025-06-03'),
('carlos@gmail.com', '2025-06-04'),
('elena@gmail.com', '2025-06-05');

-- PEDIDOS_PRODUCTOS (con cantidad)
INSERT INTO PEDIDOS_PRODUCTOS (id_pedido, id_producto, cantidad) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 2, 1),
(3, 4, 1),
(4, 5, 3);

-- USERS (clientes)
INSERT INTO USERS (email, password, role) VALUES
('ana@gmail.com', 'passAna123', 'cliente'),
('luis@gmail.com', 'passLuis456', 'cliente'),
('marta@gmail.com', 'passMarta789', 'cliente'),
('carlos@gmail.com', 'passCarlos321', 'cliente'),
('elena@gmail.com', 'passElena654', 'cliente');
-- USERS (empleados)
INSERT INTO USERS (email, password, role) VALUES
('pedro@peluqueria.com', 'passPedro123', 'empleado'),
('lucia@peluqueria.com', 'passLucia456', 'empleado'),
('javier@peluqueria.com', 'passJavier789', 'empleado'),
('sara@peluqueria.com', 'passSara321', 'empleado'),
('david@peluqueria.com', 'passDavid654', 'empleado');

-- MASCOTAS (al menos 3 por cliente)
INSERT INTO MASCOTAS (email_cliente, nombre, raza, edad) VALUES
('ana@gmail.com', 'Toby', 'Labrador', 3),
('ana@gmail.com', 'Kira', 'Golden Retriever', 2),
('ana@gmail.com', 'Simba', 'Bulldog Francés', 1),
('luis@gmail.com', 'Luna', 'Caniche', 2),
('luis@gmail.com', 'Thor', 'Dálmata', 4),
('luis@gmail.com', 'Milo', 'Yorkshire', 5),
('marta@gmail.com', 'Max', 'Bulldog', 5),
('marta@gmail.com', 'Coco', 'Chihuahua', 2),
('marta@gmail.com', 'Nina', 'Boxer', 3),
('carlos@gmail.com', 'Nala', 'Beagle', 4),
('carlos@gmail.com', 'Rocky', 'Pastor Alemán', 1),
('carlos@gmail.com', 'Sasha', 'Shih Tzu', 6),
('elena@gmail.com', 'Rocky', 'Pastor Alemán', 1),
('elena@gmail.com', 'Lola', 'Pug', 2),
('elena@gmail.com', 'Duke', 'Schnauzer', 4);

-- CITAS (mínimo 4 por usuario/cliente)
-- Para Ana (id_mascota: 1, 2, 3)
INSERT INTO CITAS (email_cliente, dni_empleado, id_mascota, fecha, hora) VALUES
('ana@gmail.com', '12345678A', 1, '2025-06-10', '10:00'),
('ana@gmail.com', '12345678A', 2, '2025-06-15', '11:00'),
('ana@gmail.com', '23456789B', 3, '2025-06-20', '12:00'),
('ana@gmail.com', '34567890C', 1, '2025-06-25', '13:00');

-- Para Luis (id_mascota: 4, 5, 6)
INSERT INTO CITAS (email_cliente, dni_empleado, id_mascota, fecha, hora) VALUES
('luis@gmail.com', '23456789B', 4, '2025-06-11', '11:00'),
('luis@gmail.com', '34567890C', 5, '2025-06-16', '12:00'),
('luis@gmail.com', '45678901D', 6, '2025-06-21', '13:00'),
('luis@gmail.com', '56789012E', 4, '2025-06-26', '14:00');

-- Para Marta (id_mascota: 7, 8, 9)
INSERT INTO CITAS (email_cliente, dni_empleado, id_mascota, fecha, hora) VALUES
('marta@gmail.com', '34567890C', 7, '2025-06-12', '12:00'),
('marta@gmail.com', '45678901D', 8, '2025-06-17', '13:00'),
('marta@gmail.com', '56789012E', 9, '2025-06-22', '14:00'),
('marta@gmail.com', '12345678A', 7, '2025-06-27', '10:00');

-- Para Carlos (id_mascota: 10, 11, 12)
INSERT INTO CITAS (email_cliente, dni_empleado, id_mascota, fecha, hora) VALUES
('carlos@gmail.com', '45678901D', 10, '2025-06-13', '13:00'),
('carlos@gmail.com', '56789012E', 11, '2025-06-18', '14:00'),
('carlos@gmail.com', '12345678A', 12, '2025-06-23', '10:00'),
('carlos@gmail.com', '23456789B', 10, '2025-06-28', '11:00');

-- Para Elena (id_mascota: 13, 14, 15)
INSERT INTO CITAS (email_cliente, dni_empleado, id_mascota, fecha, hora) VALUES
('elena@gmail.com', '56789012E', 13, '2025-06-14', '14:00'),
('elena@gmail.com', '12345678A', 14, '2025-06-19', '10:00'),
('elena@gmail.com', '23456789B', 15, '2025-06-24', '11:00'),
('elena@gmail.com', '34567890C', 13, '2025-06-29', '12:00');
