DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS banners;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS transactions;
DROP TYPE IF EXISTS TRANSACTION_TYPE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL DEFAULT '',
    last_name VARCHAR(100) NOT NULL DEFAULT '',
    password TEXT,
    access_token TEXT,
    profile_image TEXT,
    balance DOUBLE PRECISION NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE banners (
    id SERIAL PRIMARY KEY,
    banner_name VARCHAR(255) NOT NULL DEFAULT '',
    banner_image TEXT DEFAULT '',
    description TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    service_code VARCHAR(100) NOT NULL DEFAULT '',
    service_name VARCHAR(255) NOT NULL DEFAULT '',
    service_icon TEXT DEFAULT '',
    service_tariff DOUBLE PRECISION NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE TRANSACTION_TYPE AS ENUM ('TOPUP', 'PAYMENT');

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    invoice_number TEXT UNIQUE NOT NULL DEFAULT '',
    transaction_type TRANSACTION_TYPE NOT NULL DEFAULT 'PAYMENT',
    description TEXT NOT NULL DEFAULT '',
    total_amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_banners_updated_at
BEFORE UPDATE ON banners
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_transactions_updated_at
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

INSERT INTO banners (banner_name, banner_image, description) VALUES
('Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet');

-- Insert data into services table
INSERT INTO services (service_code, service_name, service_icon, service_tariff) VALUES
('PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000),
('PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000),
('VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000),
('QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000),
('ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000);


