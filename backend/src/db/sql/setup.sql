CREATE TABLE
  IF NOT EXISTS customer (
    id VARCHAR(50) NOT NULL DEFAULT gen_random_uuid (),
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
  );

CREATE TABLE
  IF NOT EXISTS driver (
    id SERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    vehicle TEXT NOT NULL,
    tax_rate DECIMAL(10, 2) NOT NULL,
    min_acceptable_meters INT NOT NULL,
    PRIMARY KEY (id)
  );

CREATE TABLE
  IF NOT EXISTS review (
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
    FOREIGN KEY (driver_id) REFERENCES driver (id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customer (id)
  );

CREATE TABLE
  IF NOT EXISTS ride (
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

CREATE INDEX IF NOT EXISTS idx_customer_id ON ride (customer_id);

CREATE INDEX IF NOT EXISTS idx_driver_id ON ride (driver_id);

INSERT INTO
  customer (id, name)
VALUES
  ('41b37ad0-9225-4b8e-8ed4-dba666c67cdc', 'Alice') ON CONFLICT (id) DO NOTHING;

INSERT INTO
  driver (
    name,
    description,
    vehicle,
    tax_rate,
    min_acceptable_meters
  )
VALUES
  (
    'Homer Simpson',
    'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
    'Plymouth Valiant 1973 rosa e enferrujado',
    2.50,
    1000
  );

INSERT INTO
  driver (
    name,
    description,
    vehicle,
    tax_rate,
    min_acceptable_meters
  )
VALUES
  (
    'Dominic Toretto',
    'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada',
    'Dodge Charger R/T 1970 modificado',
    5.00,
    5000
  );

INSERT INTO
  driver (
    name,
    description,
    vehicle,
    tax_rate,
    min_acceptable_meters
  )
VALUES
  (
    'James Bond',
    'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
    'Aston Martin DB5 clássico',
    10.00,
    10000
  );

INSERT INTO
  review (customer_id, driver_id, rating, comment)
VALUES
  (
    '41b37ad0-9225-4b8e-8ed4-dba666c67cdc',
    1,
    5.0,
    'Muito bom!!!!!!!!!!!!!!!!!!!'
  );

INSERT INTO
  review (customer_id, driver_id, rating, comment)
VALUES
  (
    '41b37ad0-9225-4b8e-8ed4-dba666c67cdc',
    2,
    4.5,
    'Motorista atencioso!'
  );

INSERT INTO
  review (customer_id, driver_id, rating, comment)
VALUES
  (
    '41b37ad0-9225-4b8e-8ed4-dba666c67cdc',
    3,
    1.0,
    'Motorista apressado!'
  );
