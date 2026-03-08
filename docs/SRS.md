# 📋 GlobalMart — Software Requirements Specification (SRS)

> **Course:** Advanced Database Systems
> **Team Leader:** Fanyi Charllson
> **Document Type:** Semester Project — SRS
> **Version:** 1.0
> **Status:** Draft

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [Database Requirements](#5-database-requirements)
6. [External Interface Requirements](#6-external-interface-requirements)
7. [Constraints & Assumptions](#7-constraints--assumptions)
8. [Project Deliverables](#8-project-deliverables)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) describes the functional and non-functional requirements for **GlobalMart**, a full-stack e-commerce platform backed by a production-grade relational database. This document is intended for the project development team, course instructors, and any stakeholders evaluating the system design.

### 1.2 Scope

GlobalMart is a globally accessible online marketplace supporting multi-currency transactions, a tiered customer loyalty program, multi-warehouse inventory management, and flexible product attribute modeling. The system must handle high-volume transactional loads while ensuring data integrity, consistency, and performance.

**This document covers:**
- The database schema and relational model
- The web application (frontend and backend via Next.js)
- Automated database triggers and business logic
- Deployment infrastructure and hosting

### 1.3 Definitions & Acronyms

| Term / Acronym | Definition |
|---|---|
| SRS | Software Requirements Specification |
| EAV | Entity-Attribute-Value — a data model pattern for flexible product attributes |
| ACID | Atomicity, Consistency, Isolation, Durability — database transaction properties |
| ERD | Entity-Relationship Diagram |
| SSR | Server-Side Rendering (Next.js feature) |
| USD | US Dollar — the base currency used for internal reporting |
| VIP | Very Important Person — highest customer loyalty tier |
| SKU | Stock Keeping Unit — unique identifier per product/variant |
| ORM | Object-Relational Mapper |
| DML | Data Manipulation Language (SQL INSERT, UPDATE, DELETE) |

### 1.4 Overview

| Section | Contents |
|---|---|
| Section 2 | Overall Description — system context, user classes, assumptions |
| Section 3 | Functional Requirements — detailed feature specifications |
| Section 4 | Non-Functional Requirements — performance, security, scalability |
| Section 5 | Database Requirements — schema, constraints, triggers |
| Section 6 | External Interface Requirements |
| Section 7 | Constraints & Assumptions |
| Section 8 | Project Deliverables |

---

## 2. Overall Description

### 2.1 Product Perspective

GlobalMart is a standalone web application operating as an end-to-end e-commerce system. It integrates a relational database backend (PostgreSQL) with a Next.js web application deployed on Vercel. The system interacts with external currency data sources and is designed to be extensible for future integrations (e.g., payment gateways, shipping APIs).

### 2.2 User Classes

| User Class | Description | Privileges |
|---|---|---|
| Guest | Unauthenticated visitor browsing the platform | Browse products, view prices |
| Standard Customer | Registered user with no special tier | Purchase, view orders, manage profile |
| Premium Customer | Customer with elevated loyalty tier | Discounted pricing, priority support |
| VIP Customer | Top-tier loyalty customer | Maximum discounts, exclusive benefits |
| Warehouse Staff | Inventory management personnel | View/update stock levels per warehouse |
| System Administrator | Database and platform administrator | Full access including triggers and schema |

### 2.3 Assumptions & Dependencies

- The system assumes a reliable internet connection for real-time currency exchange rate updates.
- PostgreSQL (or MySQL) is the target RDBMS; all SQL scripts are written for PostgreSQL unless noted.
- Next.js App Router is used for both API routes and server-side rendering.
- Supabase or Neon is used as the managed PostgreSQL hosting provider.
- Vercel is the deployment platform for the frontend and backend API.
- Exchange rate data may be sourced from a third-party API or manually updated.

---

## 3. Functional Requirements

### 3.1 User Authentication & Account Management

| ID | Requirement | Priority |
|---|---|---|
| FR-1.1 | The system shall allow users to register with a unique email address and password. | High |
| FR-1.2 | The system shall authenticate users via email and password on login. | High |
| FR-1.3 | The system shall maintain a user profile including name, email, shipping addresses, and tier. | High |
| FR-1.4 | The system shall allow users to update their account details. | Medium |
| FR-1.5 | The system shall support password reset via email verification. | Medium |
| FR-1.6 | The system shall enforce role-based access control for admin vs. customer functions. | High |

### 3.2 Product Catalog & Search

| ID | Requirement | Priority |
|---|---|---|
| FR-2.1 | The system shall display a catalog of products with name, description, price, and category. | High |
| FR-2.2 | The system shall support full-text search across product names and descriptions. | High |
| FR-2.3 | The system shall allow filtering products by category, price range, and attributes. | High |
| FR-2.4 | The system shall display product attributes dynamically based on category (EAV model). | High |
| FR-2.5 | The system shall show product availability (in-stock / out-of-stock) in real time. | High |
| FR-2.6 | The system shall support product pagination and sorting (price, popularity, newest). | Medium |
| FR-2.7 | The system shall display prices in the customer's selected currency. | Medium |

### 3.3 Multi-Currency Support

| ID | Requirement | Priority |
|---|---|---|
| FR-3.1 | The system shall store all base prices in USD in the database. | High |
| FR-3.2 | The system shall maintain an `Exchange_Rates` table with time-versioned rates (`effective_date`). | High |
| FR-3.3 | The system shall convert and display product prices in any supported currency at checkout. | High |
| FR-3.4 | The system shall record the currency and exchange rate used at the time of each order. | High |
| FR-3.5 | The system shall support adding new currencies by inserting records into the `Currencies` table. | Low |

### 3.4 Customer Loyalty Tier System

| ID | Requirement | Priority |
|---|---|---|
| FR-4.1 | The system shall assign each customer to a tier: Standard, Premium, or VIP. | High |
| FR-4.2 | The system shall apply the tier's `discount_percentage` to the customer's checkout total. | High |
| FR-4.3 | The system shall track each customer's `lifetime_value` (cumulative spend). | High |
| FR-4.4 | A database trigger shall automatically upgrade a customer's tier when `lifetime_value` crosses defined thresholds. | High |
| FR-4.5 | The system shall display the customer's current tier and discount on their account page. | Medium |
| FR-4.6 | Tier thresholds shall be configurable in the `Customer_Tiers` table without code changes. | Medium |

### 3.5 Order Processing

| ID | Requirement | Priority |
|---|---|---|
| FR-5.1 | The system shall allow customers to add products to a shopping cart. | High |
| FR-5.2 | The system shall create an `Order` record with status, timestamp, and currency upon checkout. | High |
| FR-5.3 | The system shall create `Order_Items` records for each product line in an order. | High |
| FR-5.4 | The system shall validate that sufficient inventory exists before confirming an order. | High |
| FR-5.5 | The system shall decrement inventory levels upon order confirmation. | High |
| FR-5.6 | The system shall update the customer's `lifetime_value` upon order completion. | High |
| FR-5.7 | The system shall display order history and status to customers. | Medium |
| FR-5.8 | The system shall prevent overselling through transactional inventory locks. | High |

### 3.6 Inventory & Warehouse Management

| ID | Requirement | Priority |
|---|---|---|
| FR-6.1 | The system shall track inventory per product per warehouse in an `Inventory` table. | High |
| FR-6.2 | The system shall support multiple warehouse locations. | High |
| FR-6.3 | A database trigger shall fire an auto-reorder event when stock falls below a configured threshold. | High |
| FR-6.4 | The system shall allow warehouse staff to manually update stock levels. | Medium |
| FR-6.5 | The system shall support distributed fulfillment (selecting the nearest/best warehouse per order). | Low |
| FR-6.6 | The system shall log all stock changes for audit purposes. | Medium |

### 3.7 Flexible Product Attributes (EAV Model)

| ID | Requirement | Priority |
|---|---|---|
| FR-7.1 | The system shall support heterogeneous product categories with different sets of attributes. | High |
| FR-7.2 | Attribute definitions shall be stored in an `Attributes` table (e.g., RAM, Color, Size). | High |
| FR-7.3 | Attribute values per product shall be stored in a `Product_Attributes` EAV table. | High |
| FR-7.4 | New attribute types shall be addable without schema changes. | High |
| FR-7.5 | The system shall validate attribute values against expected data types where applicable. | Medium |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| ID | Requirement | Target |
|---|---|---|
| NFR-1.1 | Product search queries shall return results within an acceptable response time under normal load. | < 500ms (p95) |
| NFR-1.2 | Checkout transactions (including inventory update and order creation) shall complete quickly. | < 2 seconds |
| NFR-1.3 | The database shall support high concurrent user sessions without degradation. | 500+ concurrent users |
| NFR-1.4 | Database queries shall use appropriate indexes to avoid full table scans on large tables. | Query plan verified |
| NFR-1.5 | Trigger execution overhead shall not noticeably impact transaction throughput. | < 50ms per trigger |

### 4.2 Scalability

- The database schema shall be designed to handle millions of product records without structural changes.
- The `Inventory` and `Orders` tables shall support horizontal partitioning (sharding) if required in future.
- The EAV model shall accommodate new product categories without DDL migrations.
- The application tier (Next.js on Vercel) shall scale automatically via serverless functions.

### 4.3 Reliability & Availability

| ID | Requirement | Target |
|---|---|---|
| NFR-3.1 | The system shall achieve high availability during operational hours. | 99.5% uptime |
| NFR-3.2 | All order transactions shall be ACID-compliant to prevent data corruption. | Zero data loss on failure |
| NFR-3.3 | The database shall support automated backups. | Daily backups, retained 30 days |
| NFR-3.4 | The system shall recover from failure and resume normal operation quickly. | RTO < 1 hour |

### 4.4 Security

- All user passwords shall be hashed using a strong algorithm (e.g., bcrypt) before storage.
- Database credentials shall never be exposed in client-side code or public repositories.
- All API endpoints shall validate and sanitize inputs to prevent SQL injection attacks.
- Role-based access control shall prevent unauthorized users from accessing admin functions.
- HTTPS shall be enforced for all communications between client and server.
- Sensitive customer data (e.g., addresses, payment references) shall be protected at rest.

### 4.5 Maintainability

- SQL schema scripts shall be version-controlled and organized into `schema.sql`, `seed.sql`, and `triggers.sql`.
- Database changes shall be managed via migration scripts with clear versioning.
- Code shall follow consistent naming conventions for tables, columns, and API routes.
- The system shall include documentation sufficient for a new developer to set up the environment.

### 4.6 Usability

- The web application shall be responsive and accessible on desktop and mobile browsers.
- Error messages shall be clear, descriptive, and actionable for end users.
- The checkout flow shall complete in no more than three user steps.
- Currency selection shall be persistent across the user session.

---

## 5. Database Requirements

### 5.1 Core Entities

| Entity | Key Attributes | Notes |
|---|---|---|
| `Customers` | `customer_id`, `name`, `email`, `tier_id`, `lifetime_value` | FK to `Customer_Tiers` |
| `Customer_Tiers` | `tier_id`, `tier_name`, `discount_percentage`, `min_lifetime_value` | Standard / Premium / VIP |
| `Products` | `product_id`, `name`, `description`, `base_price_usd`, `category_id` | Base price stored in USD |
| `Attributes` | `attribute_id`, `attribute_name`, `data_type` | EAV attribute definitions |
| `Product_Attributes` | `product_id`, `attribute_id`, `value` | EAV value table; composite PK |
| `Currencies` | `currency_code`, `symbol`, `name` | ISO 4217 codes (USD, EUR, etc.) |
| `Exchange_Rates` | `from_currency`, `to_currency`, `effective_date`, `rate` | Composite PK; time-versioned |
| `Warehouses` | `warehouse_id`, `name`, `location`, `contact_info` | Physical storage locations |
| `Inventory` | `inventory_id`, `product_id`, `warehouse_id`, `quantity`, `reorder_threshold` | Per-product per-warehouse |
| `Orders` | `order_id`, `customer_id`, `order_date`, `status`, `currency_code`, `total_amount` | FK to `Customers`, `Currencies` |
| `Order_Items` | `item_id`, `order_id`, `product_id`, `quantity`, `unit_price`, `applied_discount` | Line items per order |

### 5.2 Constraints & Integrity Rules

- All primary keys shall use auto-incrementing integers or UUIDs.
- All foreign key relationships shall be enforced at the database level with `ON DELETE` rules.
- `Exchange_Rates` shall use a composite primary key: `(from_currency, to_currency, effective_date)`.
- `Product_Attributes` shall use a composite primary key: `(product_id, attribute_id)`.
- `Inventory.quantity` shall enforce a `CHECK` constraint: `quantity >= 0`.
- Order totals shall be recalculated server-side and validated against line item sums before commit.
- Customer tier assignments shall only reference valid tiers in the `Customer_Tiers` table.

### 5.3 Triggers

| Trigger Name | Event | Action |
|---|---|---|
| `trg_auto_reorder` | `AFTER UPDATE` on `Inventory (quantity)` | Fires when `quantity` drops below `reorder_threshold`; inserts a reorder request record |
| `trg_tier_upgrade` | `AFTER UPDATE` on `Customers (lifetime_value)` | Recalculates and updates customer tier based on new `lifetime_value` thresholds |
| `trg_inventory_lock` | `BEFORE INSERT` on `Order_Items` | Validates stock availability; raises exception if quantity is insufficient |
| `trg_update_lifetime_value` | `AFTER INSERT` on `Orders` | Increments customer `lifetime_value` by the order total upon order completion |

### 5.4 Indexes

| Index | Table | Purpose |
|---|---|---|
| `idx_customers_email` | `Customers(email)` | Fast login lookups |
| `idx_products_category` | `Products(category_id)` | Category-filtered browsing |
| `idx_inventory_product_warehouse` | `Inventory(product_id, warehouse_id)` | Stock queries |
| `idx_orders_customer` | `Orders(customer_id)` | Order history lookups |
| `idx_exchange_rates_lookup` | `Exchange_Rates(from_currency, to_currency, effective_date DESC)` | Rate lookups |

---

## 6. External Interface Requirements

### 6.1 User Interface

- The frontend shall be built with Next.js (App Router) and rendered server-side for SEO and performance.
- The UI shall support currency selection via a dropdown component persisted in session/cookies.
- Product attribute displays shall render dynamically based on the EAV data returned from the API.

### 6.2 API Interface

- The backend shall expose RESTful API routes via Next.js API routes.
- All API responses shall use JSON format with consistent error codes and messages.
- The API shall require authentication tokens (JWT or session-based) for protected endpoints.

### 6.3 Database Interface

- The application shall connect to PostgreSQL via an ORM (e.g., Prisma) or direct SQL queries using a connection pool.
- Database connection strings shall be stored as environment variables and never hardcoded.
- Supabase or Neon shall serve as the managed PostgreSQL provider.

---

## 7. Constraints & Assumptions

### 7.1 Constraints

- The project must be submittable as a semester project, with all deliverables documented.
- The chosen RDBMS is PostgreSQL (with MySQL as an alternative); NoSQL solutions are out of scope.
- The application must be deployable on the free tiers of Vercel and Supabase/Neon for academic purposes.
- Payment processing is out of scope for this iteration; orders are recorded without real payment integration.

### 7.2 Outstanding Decisions

| Decision Area | Options | Status |
|---|---|---|
| RDBMS | PostgreSQL vs. MySQL | TBD — leaning PostgreSQL |
| ORM vs Raw SQL | Prisma ORM vs. direct `pg` queries | TBD |
| EAV vs JSON columns | EAV model vs. JSONB column for attributes | EAV chosen; JSONB explored |
| Hosting | Supabase vs. Neon for PostgreSQL | TBD |
| Auth | NextAuth.js vs. Supabase Auth vs. custom JWT | TBD |

---

## 8. Project Deliverables

| Deliverable | Description | Status |
|---|---|---|
| Team Setup | Team name, member list, leader identified | ✅ Complete |
| App Description | One-paragraph project overview | ✅ Complete |
| Initial ERD Sketch | First-draft entity-relationship diagram | ✅ Complete |
| Refined ERD | draw.io / Lucidchart export with all entities and relationships | 🔄 In Progress |
| Full Documentation | This SRS and supporting markdown docs | 🔄 In Progress |
| Web App Landing Page | Next.js landing page with project overview | ⏳ Pending |
| SQL Schema Scripts | `schema.sql` with all table definitions and constraints | ⏳ Pending |
| Trigger Implementations | `triggers.sql` with all automated triggers | ⏳ Pending |
| Seed Data | `seed.sql` with representative sample data | ⏳ Pending |
| Deployed Application URL | Live URL on Vercel with connected database | ⏳ Pending |
