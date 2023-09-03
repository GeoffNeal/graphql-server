-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again
DROP DATABASE IF EXISTS rockar;

-- Create the db
CREATE DATABASE rockar;

-- Move into the db
\c rockar

-- Create our tables if they don't already exist
CREATE TABLE IF NOT EXISTS products
(
    id serial PRIMARY KEY,
    vin VARCHAR(100) NOT NULL,
    colour VARCHAR(50) NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS customers
(
    id serial PRIMARY KEY,
    email VARCHAR(150) NOT NULL,
    forename VARCHAR(150) NOT NULL,
    surname VARCHAR(150) NOT NULL,
    contact_number VARCHAR(100) NOT NULL,
    postcode VARCHAR(10) NOT NULL
);

-- Changes the owner of the table to postgres which is the default when installing postgres
ALTER TABLE products
    OWNER to postgres;

ALTER TABLE customers
    OWNER to postgres;