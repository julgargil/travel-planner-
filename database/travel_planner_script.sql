CREATE DATABASE IF NOT EXISTS travel_planner
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE travel_planner;

DROP TABLE IF EXISTS documento;
DROP TABLE IF EXISTS gasto;
DROP TABLE IF EXISTS tarea;
DROP TABLE IF EXISTS actividad;
DROP TABLE IF EXISTS viaje;

CREATE TABLE viaje (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  origen        VARCHAR(100) NOT NULL,
  destino       VARCHAR(100) NOT NULL,
  pais          VARCHAR(100) NOT NULL,
  fecha_ida     DATE NOT NULL,
  fecha_vuelta  DATE NOT NULL,
  viajeros      INT UNSIGNED NOT NULL DEFAULT 1,
  estado        ENUM('Próximo', 'En curso', 'Finalizado') NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT chk_viaje_fechas   CHECK (fecha_vuelta >= fecha_ida),
  CONSTRAINT chk_viaje_viajeros CHECK (viajeros >= 1)
) ENGINE=InnoDB;

CREATE TABLE actividad (
  id                    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  viaje_id              INT UNSIGNED NOT NULL,
  titulo                VARCHAR(150) NOT NULL,
  fecha_hora            DATETIME NOT NULL,
  categoria_actividad   ENUM('Cultura', 'Gastronomía', 'Transporte', 'Ocio', 'Alojamiento') NOT NULL,
  ubicacion             VARCHAR(255) NOT NULL,
  nota                  VARCHAR(500) NULL,
  latitud               DECIMAL(9,6) NOT NULL,
  longitud              DECIMAL(9,6) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_actividad_viaje
    FOREIGN KEY (viaje_id) REFERENCES viaje (id) ON DELETE CASCADE,
  CONSTRAINT chk_actividad_latitud  CHECK (latitud  BETWEEN -90  AND 90),
  CONSTRAINT chk_actividad_longitud CHECK (longitud BETWEEN -180 AND 180)
) ENGINE=InnoDB;

CREATE TABLE tarea (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  viaje_id     INT UNSIGNED NOT NULL,
  descripcion  VARCHAR(255) NOT NULL,
  completada   BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id),
  CONSTRAINT fk_tarea_viaje
    FOREIGN KEY (viaje_id) REFERENCES viaje (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE gasto (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  viaje_id   INT UNSIGNED NOT NULL,
  concepto   VARCHAR(150) NOT NULL,
  importe    DECIMAL(10,2) NOT NULL,
  categoria  ENUM('Transporte', 'Alojamiento', 'Comida', 'Actividades', 'Otros') NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_gasto_viaje
    FOREIGN KEY (viaje_id) REFERENCES viaje (id) ON DELETE CASCADE,
  CONSTRAINT chk_gasto_importe CHECK (importe >= 0)
) ENGINE=InnoDB;

CREATE TABLE documento (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  viaje_id      INT UNSIGNED NOT NULL,
  nombre        VARCHAR(255) NOT NULL,
  ruta          VARCHAR(500) NOT NULL,
  tipo          VARCHAR(100) NOT NULL,
  tamano        INT UNSIGNED NOT NULL,
  fecha_subida  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_documento_viaje
    FOREIGN KEY (viaje_id) REFERENCES viaje (id) ON DELETE CASCADE
) ENGINE=INNODB;
