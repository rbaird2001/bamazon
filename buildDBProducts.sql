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

INSERT INTO bamazon.products(product_name,department_name,price,stock_quantity)
VALUES("Skywalker OG","Indica",15.00,25),
("Allen Wrench","Sativa",30.00,10),
("Alaskan Thunder","Sativa",19.00,3),
("Bananna OG","Hybrid",75.00,1),
("Afgoo","Indica",72.00,7),
("Blue Dream","Hybrid",18.00,30),
("Bubba Kush","Indica",34.00,70),
("Cannatonic","Hybrid",41.00,12),
("Cinex","Sativa",14.00,33),
("Dutch Treat","Hybrid",8.00,6),
("G13","Indica",37.50,22),
("Ghost Train Haze","Sativa",17.60,32),
("Party Vape Kit","Accessories",600.00,70),
("Custom Vape Pen","Accessories",63.00,20),
("Donation to Free Ross Ulbricht Legal Fund","Charity",15.00,0),
("Donation to Free Edward Snowden Legal Fund","Charity",15.00,0),
("Donation to Free Julian Assange Legal Fund","Charity",15.00,0);



