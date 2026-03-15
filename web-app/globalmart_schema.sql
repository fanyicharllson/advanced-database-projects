-- ============================================================
-- GLOBALMART DATABASE SCHEMA
-- Course: Advanced Database Systems
-- Team Leader: Fanyi Charllson
-- ============================================================

-- ============================================================
-- TABLES
-- ============================================================

-- Customer Tiers
CREATE TABLE Customer_Tiers (
    tier_id              SERIAL PRIMARY KEY,
    tier_name            VARCHAR(100) NOT NULL,
    discount_percentage  DECIMAL(5,2) DEFAULT 0,
    min_lifetime_value   DECIMAL(10,2) DEFAULT 0
);

-- Customers
CREATE TABLE Customers (
    customer_id      SERIAL PRIMARY KEY,
    tier_id          INT REFERENCES Customer_Tiers(tier_id) ON DELETE SET NULL,
    name             VARCHAR(255) NOT NULL,
    email            VARCHAR(255) UNIQUE NOT NULL,
    lifetime_value   DECIMAL(10,2) DEFAULT 0,
    registered_date  DATE DEFAULT NOW()
);

-- Currencies
CREATE TABLE Currencies (
    currency_code  CHAR(3) PRIMARY KEY,
    currency_name  VARCHAR(100) NOT NULL,
    symbol         VARCHAR(10) NOT NULL
);

-- Exchange Rates
CREATE TABLE Exchange_Rates (
    from_currency  CHAR(3) REFERENCES Currencies(currency_code),
    to_currency    CHAR(3) REFERENCES Currencies(currency_code),
    effective      DATE NOT NULL,
    rate           DECIMAL(20,8) NOT NULL,
    PRIMARY KEY (from_currency, to_currency, effective)
);

-- Products
CREATE TABLE Products (
    product_id     SERIAL PRIMARY KEY,
    product_name   VARCHAR(200) NOT NULL,
    base_price     DECIMAL(10,2) NOT NULL,
    currency_code  CHAR(3) REFERENCES Currencies(currency_code),
    category       VARCHAR(50)
);

-- Attributes (EAV)
CREATE TABLE Attributes (
    attribute_id    SERIAL PRIMARY KEY,
    attribute_name  VARCHAR(50) NOT NULL
);

-- Product Attributes (EAV junction)
CREATE TABLE Product_Attributes (
    product_id    INT REFERENCES Products(product_id) ON DELETE CASCADE,
    attribute_id  INT REFERENCES Attributes(attribute_id) ON DELETE CASCADE,
    value         VARCHAR(100) NOT NULL,
    PRIMARY KEY (product_id, attribute_id)
);

-- Warehouses
CREATE TABLE WareHouses (
    warehouse_id  SERIAL PRIMARY KEY,
    location      VARCHAR(100) NOT NULL,
    capacity      INT NOT NULL
);

-- Inventory
CREATE TABLE Inventory (
    inventory_id       SERIAL PRIMARY KEY,
    product_id         INT REFERENCES Products(product_id) ON DELETE CASCADE,
    warehouse_id       INT REFERENCES WareHouses(warehouse_id) ON DELETE CASCADE,
    quantity_on_hand   INT DEFAULT 0,
    reorder_threshold  INT DEFAULT 50,
    UNIQUE (product_id, warehouse_id)
);

-- Orders
CREATE TABLE Orders (
    order_id      SERIAL PRIMARY KEY,
    customer_id   INT REFERENCES Customers(customer_id) ON DELETE SET NULL,
    order_date    TIMESTAMP DEFAULT NOW(),
    total_amount  DECIMAL(10,2),
    status        VARCHAR(20) DEFAULT 'PENDING'
);

-- Order Items
CREATE TABLE Order_Items (
    order_id      INT REFERENCES Orders(order_id) ON DELETE CASCADE,
    product_id    INT REFERENCES Products(product_id),
    line_number   INT NOT NULL,
    quantity      INT NOT NULL,
    unit_price    DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_id, product_id)
);

-- Cart
CREATE TABLE Cart (
    cart_id      SERIAL PRIMARY KEY,
    customer_id  INT REFERENCES Customers(customer_id) ON DELETE CASCADE,
    created_at   TIMESTAMP DEFAULT NOW()
);

-- Cart Items
CREATE TABLE Cart_Items (
    cart_id     INT REFERENCES Cart(cart_id) ON DELETE CASCADE,
    product_id  INT REFERENCES Products(product_id) ON DELETE CASCADE,
    quantity    INT NOT NULL DEFAULT 1,
    added_at    TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (cart_id, product_id)
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_customers_tier       ON Customers(tier_id);
CREATE INDEX idx_orders_customer      ON Orders(customer_id);
CREATE INDEX idx_inventory_product    ON Inventory(product_id);
CREATE INDEX idx_inventory_warehouse  ON Inventory(warehouse_id);
CREATE INDEX idx_exchange_rates_date  ON Exchange_Rates(effective DESC);
CREATE INDEX idx_cart_customer        ON Cart(customer_id);
CREATE INDEX idx_cart_items_product   ON Cart_Items(product_id);

-- ============================================================
-- TRIGGER 1: Low stock reorder alert
-- ============================================================
CREATE OR REPLACE FUNCTION check_reorder()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quantity_on_hand < NEW.reorder_threshold THEN
        RAISE NOTICE 'LOW STOCK ALERT: Product % in Warehouse % — only % units left.',
            NEW.product_id, NEW.warehouse_id, NEW.quantity_on_hand;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_reorder_check
AFTER UPDATE OF quantity_on_hand ON Inventory
FOR EACH ROW EXECUTE FUNCTION check_reorder();

-- ============================================================
-- TRIGGER 2: Update customer lifetime_value after each order
-- ============================================================
CREATE OR REPLACE FUNCTION update_lifetime_value()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Customers
    SET lifetime_value = lifetime_value + NEW.total_amount
    WHERE customer_id = NEW.customer_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lifetime_value
AFTER INSERT ON Orders
FOR EACH ROW EXECUTE FUNCTION update_lifetime_value();

-- ============================================================
-- TRIGGER 3: Auto-upgrade customer tier based on lifetime value
-- ============================================================
CREATE OR REPLACE FUNCTION upgrade_customer_tier()
RETURNS TRIGGER AS $$
DECLARE
    new_tier INT;
BEGIN
    SELECT tier_id INTO new_tier
    FROM Customer_Tiers
    WHERE min_lifetime_value <= NEW.lifetime_value
    ORDER BY min_lifetime_value DESC
    LIMIT 1;

    IF new_tier IS NOT NULL AND new_tier != NEW.tier_id THEN
        UPDATE Customers SET tier_id = new_tier
        WHERE customer_id = NEW.customer_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tier_upgrade
AFTER UPDATE OF lifetime_value ON Customers
FOR EACH ROW EXECUTE FUNCTION upgrade_customer_tier();

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO Customer_Tiers (tier_name, discount_percentage, min_lifetime_value) VALUES
    ('Standard',  0.00,  0.00),
    ('Premium',  10.00,  500.00),
    ('VIP',      20.00,  2000.00);

INSERT INTO Currencies (currency_code, currency_name, symbol) VALUES
    ('USD', 'US Dollar',     '$'),
    ('EUR', 'Euro',          '€'),
    ('GBP', 'British Pound', '£'),
    ('XAF', 'CFA Franc',     'Fr');

INSERT INTO Exchange_Rates (from_currency, to_currency, effective, rate) VALUES
    ('USD', 'EUR', CURRENT_DATE, 0.92000000),
    ('USD', 'GBP', CURRENT_DATE, 0.79000000),
    ('USD', 'XAF', CURRENT_DATE, 620.00000000),
    ('EUR', 'USD', CURRENT_DATE, 1.09000000),
    ('GBP', 'USD', CURRENT_DATE, 1.27000000);

INSERT INTO WareHouses (location, capacity) VALUES
    ('New York, USA',    10000),
    ('London, UK',        8000),
    ('Paris, France',     6000),
    ('Douala, Cameroon',  3000);

INSERT INTO Products (product_name, base_price, currency_code, category) VALUES
    ('MacBook Pro M3',        1999.99, 'USD', 'Electronics'),
    ('Wireless Earbuds Pro',   199.99, 'USD', 'Electronics'),
    ('Running Shoes X1',       129.99, 'USD', 'Sports'),
    ('Leather Handbag',         89.99, 'USD', 'Fashion'),
    ('Smart Watch Ultra',      299.99, 'USD', 'Electronics'),
    ('Office Chair Pro',       449.99, 'USD', 'Furniture'),
    ('Kids Winter Jacket',      59.99, 'USD', 'Fashion'),
    ('Yoga Mat Premium',        45.99, 'USD', 'Sports'),
    ('Bluetooth Speaker',       79.99, 'USD', 'Electronics'),
    ('Leather Briefcase',       99.99, 'USD', 'Fashion');

INSERT INTO Attributes (attribute_name) VALUES
    ('RAM'),
    ('Storage'),
    ('Color'),
    ('Size'),
    ('Material'),
    ('Battery Life'),
    ('Screen Size'),
    ('Weight');

INSERT INTO Inventory (product_id, warehouse_id, quantity_on_hand, reorder_threshold) VALUES
    (1, 1, 150, 20),
    (1, 2,  80, 10),
    (2, 1, 300, 50),
    (2, 3, 120, 30),
    (3, 1, 200, 40),
    (3, 4,  90, 20),
    (4, 2, 175, 25),
    (5, 1, 220, 30),
    (6, 1,  60, 10),
    (7, 4, 400, 60),
    (8, 1, 350, 50),
    (9, 2, 180, 40),
    (10,3, 130, 25);