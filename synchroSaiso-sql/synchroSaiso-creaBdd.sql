-- MySQL Script generated by MySQL Workbench
-- Mon Jan 24 16:30:56 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `nameRole` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`idRoles`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `firstName` VARCHAR(45) NULL,
  `statutUsers` VARCHAR(45) NULL,
  `email` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(20) NULL,
  `password` VARCHAR(100) NOT NULL,
  `Roles_idRoles` INT NOT NULL,
  PRIMARY KEY (`idUsers`, `Roles_idRoles`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_Users_Roles1_idx` (`Roles_idRoles` ASC) VISIBLE,
  CONSTRAINT `fk_Users_Roles1`
    FOREIGN KEY (`Roles_idRoles`)
    REFERENCES `mydb`.`Roles` (`idRoles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`NavBar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`NavBar` (
  `idNavBar` INT NOT NULL AUTO_INCREMENT,
  `routerlink` VARCHAR(45) NOT NULL,
  `idRoles` INT NOT NULL,
  PRIMARY KEY (`idNavBar`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Actifs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Actifs` (
  `idActifs` INT NOT NULL AUTO_INCREMENT,
  `nameActifs` VARCHAR(45) NOT NULL,
  `adressActifs` VARCHAR(45) NULL,
  `cpActifs` INT(5) NULL,
  `villeActifs` VARCHAR(45) NULL,
  `longitudeActifs` VARCHAR(45) NULL,
  `latitudeActifs` VARCHAR(45) NULL,
  `numeroFiscalActifs` VARCHAR(45) NULL,
  `statutFiscalActifs` VARCHAR(45) NULL,
  `urlAirBnb` VARCHAR(100) NULL,
  `urlBooking` VARCHAR(100) NULL,
  `urlTripAdvisor` VARCHAR(100) NULL,
  `urlHomeAway` VARCHAR(100) NULL,
  PRIMARY KEY (`idActifs`),
  UNIQUE INDEX `cpActifs_UNIQUE` (`cpActifs` ASC) VISIBLE,
  UNIQUE INDEX `villeActifs_UNIQUE` (`villeActifs` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`UsersActifs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`UsersActifs` (
  `Users_idUsers` INT NOT NULL,
  `Actifs_idActifs` INT NOT NULL,
  `emailFemmeMenage` VARCHAR(45) NULL,
  `phoneFemmeMenage` VARCHAR(45) NULL,
  PRIMARY KEY (`Users_idUsers`, `Actifs_idActifs`),
  INDEX `fk_UsersActifs_Users_idx` (`Users_idUsers` ASC) VISIBLE,
  INDEX `fk_UsersActifs_Actifs1_idx` (`Actifs_idActifs` ASC) VISIBLE,
  CONSTRAINT `fk_UsersActifs_Users`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `mydb`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UsersActifs_Actifs1`
    FOREIGN KEY (`Actifs_idActifs`)
    REFERENCES `mydb`.`Actifs` (`idActifs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`rentCalendar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`rentCalendar` (
  `idrentCalendar` INT NOT NULL,
  `rentCalendarcol` VARCHAR(45) NULL,
  PRIMARY KEY (`idrentCalendar`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`actifsRentCalendar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`actifsRentCalendar` (
  `Actifs_idActifs` INT NOT NULL,
  `rentCalendar_idrentCalendar` INT NOT NULL,
  `urlOrigin` VARCHAR(45) NULL,
  PRIMARY KEY (`Actifs_idActifs`, `rentCalendar_idrentCalendar`),
  INDEX `fk_actifsRentCalendar_rentCalendar1_idx` (`rentCalendar_idrentCalendar` ASC) VISIBLE,
  CONSTRAINT `fk_actifsRentCalendar_Actifs1`
    FOREIGN KEY (`Actifs_idActifs`)
    REFERENCES `mydb`.`Actifs` (`idActifs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_actifsRentCalendar_rentCalendar1`
    FOREIGN KEY (`rentCalendar_idrentCalendar`)
    REFERENCES `mydb`.`rentCalendar` (`idrentCalendar`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
