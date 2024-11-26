INSERT INTO
  customer (id, name)
VALUES
  ('41b37ad0-9225-4b8e-8ed4-dba666c67cdc', 'Alice');

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

-- query /ride/confirm
INSERT INTO
  ride (
    id,
    customer_id,
    driver_id,
    origin_location,
    destination_location,
    estimated_duration_seconds,
    amount,
    distance_meters
  )
VALUES
  (
    'a6b2124d-fed3-4b3c-9fc7-07b4043ae291',
    '41b37ad0-9225-4b8e-8ed4-dba666c67cdc',
    1,
    '742 Evergreen Terrace, Springfield',
    'Moe''s Tavern, Springfield',
    900,
    25.00,
    3000
  );

-- query /ride/{customer_id}?driver_id={id do motorista}
SELECT
  amount,
  created_at,
  origin_location,
  destination_location,
  distance_meters,
  estimated_duration_seconds,
  driver.name AS driver_name
FROM
  ride
  JOIN driver ON driver_id = driver.id
WHERE
  customer_id = '41b37ad0-9225-4b8e-8ed4-dba666c67cdc'
  AND driver_id = 1;

INSERT INTO
  review (customer_id, driver_id, rating, comment)
VALUES
  (
    '41b37ad0-9225-4b8e-8ed4-dba666c67cdc',
    1,
    5.0,
    'Muito bom!'
  );

-- query /ride/estimate
SELECT
  driver.id,
  driver.name,
  driver.description,
  driver.vehicle,
  reviews.rating,
  (driver.tax_rate * 5500) AS amount
FROM
  driver
  JOIN (
    SELECT
      driver_id,
      rating
    FROM
      review
  ) AS reviews ON driver.id = reviews.driver_id
WHERE
  driver.min_acceptable_meters <= 5500
GROUP BY
  driver.id,
  reviews.rating
ORDER BY
  amount;