-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-12-2019 a las 17:08:11
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nps360`
--
CREATE DATABASE IF NOT EXISTS `nps360` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `nps360`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `nombre` varchar(1000) NOT NULL,
  `pregunta_pasivos` varchar(1000) NOT NULL,
  `respuesta_pasivos` varchar(1000) NOT NULL,
  `pregunta_promotores` varchar(1000) NOT NULL,
  `respuesta_promotores` varchar(1000) NOT NULL,
  `pregunta_detractores` varchar(1000) NOT NULL,
  `respuesta_detractores` varchar(1000) NOT NULL,
  `fecha` date NOT NULL,
  `respuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `arguments`
--

CREATE TABLE `arguments` (
  `id` int(11) NOT NULL,
  `pregunta` varchar(1000) NOT NULL,
  `idformulario` int(11) NOT NULL,
  `emails` text NOT NULL,
  `clasificacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `arguments`
--

INSERT INTO `arguments` (`id`, `pregunta`, `idformulario`, `emails`, `clasificacion`) VALUES
(1, 'Deficiente claridad o estética de la tienda virtual.', 1, 'Cristian Morales, Laura Carranza, Mónica Caicedo', 1),
(2, 'Dificultad para ubicar el producto que buscaba.', 1, 'Laura Carranza, Mónica Caicedo', 1),
(3, 'Poca disponibilidad de especificaciones técnicas necesarias para conocer mejor los productos.', 1, 'Laura Carranza, Dayana Rodríguez, Mónica Caicedo', 1),
(4, 'Dificultades técnicas de la página impidieron ver adecuadamente las imágenes de los productos o conocer sus características.', 1, 'Laura Carranza, Mónica Caicedo', 1),
(5, 'Dificultades para realizar el pago online.', 1, 'Laura Carranza, Mónica Caicedo', 1),
(6, 'Dificultades para comunicarse con un asesor de Tugó.', 1, 'Laura Carranza, Mónica Caicedo, Viviana Guaneme', 1),
(7, 'Demora para ser atendido en el chat o ineficiencia para solucionar sus requerimientos.', 1, 'Viviana Guaneme, Mónica Caicedo', 1),
(8, 'Baja relación calidad/precio.', 1, 'Dayana Rodriguez, Laura Carranza, Mónica Caicedo, Viviana Guaneme', 1),
(9, 'Otros motivos, por favor colóquelos en el espacio para comentarios.', 1, 'Mónica Caicedo, Viviana Guaneme', 1),
(10, 'Mejorar la claridad o estética de la tienda virtual.', 1, 'Cristian Morales, Laura Carranza, Mónica Caicedo', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `pregunta` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`id`, `nombre`, `pregunta`) VALUES
(1, 'Web', 'De acuerdo con tu experiencia de compra\r\nen nuestra tienda virtual, en una escala de 0\r\na 10, ¿qué tanto nos recomendarías a un\r\nfamiliar o un amigo?');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `rol`, `fecha`) VALUES
(1, 'complemento360@complemento360.com', '$2b$10$nKCaOBThLoVD3SI7tdBes.5uK.FkV.B8qdrwvb8UiP5kbSyhzQrSi', '', '2019-12-24');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `arguments`
--
ALTER TABLE `arguments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idformulario` (`idformulario`);

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `arguments`
--
ALTER TABLE `arguments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `arguments`
--
ALTER TABLE `arguments`
  ADD CONSTRAINT `idformulario` FOREIGN KEY (`idformulario`) REFERENCES `encuestas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
