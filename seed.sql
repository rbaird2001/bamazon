-- DROP SCHEMA IF EXISTS bamazon
CREATE DATABASE IF NOT EXISTS bamazon;
USE bamazon;

-- DROP TABLE IF EXISTS bamazon.products

CREATE TABLE IF NOT EXISTS bamazon.products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(128) NOT NULL,
    department_name VARCHAR(128) NULL,
    price DECIMAL(7,2) NULL DEFAULT 0,
    stock_quantity INT NULL DEFAULT 0,
	PRIMARY KEY (item_id)
);