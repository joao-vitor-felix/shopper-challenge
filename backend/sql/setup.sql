CREATE DATABASE ride_app;

CREATE TABLE
  customer (
    id VARCHAR(50) NOT NULL DEFAULT gen_random_uuid (),
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
  );

CREATE TABLE
  driver (
    id SERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    vehicle TEXT NOT NULL,
    tax_rate DECIMAL(10, 2) NOT NULL,
    min_acceptable_meters INT NOT NULL,
    PRIMARY KEY (id)
  );

CREATE TABLE
  review (
    id VARCHAR(50) NOT NULL DEFAULT gen_random_uuid (),
    customer_id VARCHAR(50) NOT NULL,
    driver_id INT NOT NULL,
    rating DECIMAL(2, 1) NOT NULL CHECK (
      rating >= 0
      AND rating <= 5
    ),
    comment TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (driver_id) REFERENCES driver (id),
    FOREIGN KEY (customer_id) REFERENCES customer (id)
  );

CREATE TABLE
  ride (
    id VARCHAR(50) NOT NULL DEFAULT gen_random_uuid (),
    customer_id VARCHAR(50) NOT NULL,
    driver_id INT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    origin_location VARCHAR(100) NOT NULL,
    destination_location VARCHAR(100) NOT NULL,
    estimated_duration_seconds INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    distance_meters INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (driver_id) REFERENCES driver (id),
    FOREIGN KEY (customer_id) REFERENCES customer (id)
  );

CREATE INDEX idx_customer_id ON ride (customer_id);

CREATE INDEX idx_driver_id ON ride (driver_id);