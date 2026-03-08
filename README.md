# 🛒 GlobalMart — Advanced E-Commerce Database System

> **Course:** Advanced Database Systems  
> **Team Leader:** Fanyi Charllson  
> **Submission Type:** Semester Project  

---

## 📌 Project Overview

**GlobalMart** is a full-stack e-commerce platform backed by a rigorously designed relational database. This project demonstrates advanced database concepts including multi-currency support, customer loyalty tiers, dynamic inventory management across multiple warehouses, flexible product attribute modeling, and automated stock replenishment via database triggers.

The goal is to design, implement, and deploy a production-grade database system that handles the complexity of a real-world global marketplace — ensuring data integrity, scalability, and performance under high-volume transactional loads.

---

## 🗂️ Repository Structure

```
📦 globalmart-advanced-db/
├── 📁 web-app/                  # Frontend web application
│   ├── index.html               # Landing page entry point
│   ├── assets/                  # Static assets (CSS, JS, images)
│   └── components/              # UI components
│
├── 📁 docs/                     # Project documentation
│   ├── README.md             
│   ├── documentation.md         # Full system & database documentation
│   └── design-decisions.md     # Notes on architectural choices
│
├── 📁 er-diagram/               # Entity-Relationship Diagram files
│   ├── er-diagram.png           # Exported ERD image
│   └── er-diagram.drawio        # Editable ERD source (draw.io)
│
└── 📁 sql/                      # Database scripts (coming soon)
    ├── schema.sql               # Table definitions & constraints
    ├── seed.sql                 # Sample data
    └── triggers.sql             # Automation triggers
```

---

## ✨ Core Features & Advanced Database Concepts

### 1. 🌍 Multi-Currency Support
- Stores prices in both the original currency and a base currency (USD) for consistent reporting
- Live exchange rate tracking via the `Exchange_Rates` table with `effective_date` versioning
- Composite primary key design: `(from_currency, to_currency, effective_date)`

### 2. 🏆 Customer Tier System (Loyalty Program)
- Three tiers: **Standard**, **Premium**, and **VIP**
- Each tier carries a `discount_percentage` applied dynamically at checkout
- `lifetime_value` tracked per customer to support automated tier upgrades

### 3. 🏭 Multi-Warehouse Inventory Management
- Inventory tracked per product per warehouse
- Automated low-stock detection and reorder triggers
- Supports distributed fulfillment across locations

### 4. 🏷️ Flexible Product Attributes (EAV Model)
- Handles heterogeneous product categories (e.g., laptops vs. clothing)
- Uses the **Entity-Attribute-Value (EAV)** pattern to avoid sparse tables
- Supports JSON column alternatives explored for modern database compatibility

### 5. 🔒 High-Volume Transaction Integrity
- Designed with ACID compliance in mind
- Proper use of foreign keys, constraints, and isolation levels
- Prevents overselling via transactional inventory locks

### 6. ⚡ Automated Triggers
- Auto-reorder trigger fires when stock falls below threshold
- Tier upgrade trigger recalculates customer tier after each order

---

## 🗃️ Core Database Entities

| Entity | Description |
|---|---|
| `Customers` | Registered users with tier assignment and lifetime value |
| `Customer_Tiers` | Loyalty tiers with discount rules |
| `Products` | Product catalog with base pricing and category |
| `Attributes` | Dynamic attribute definitions (e.g., RAM, Color) |
| `Product_Attributes` | EAV mapping of products to their attribute values |
| `Currencies` | Supported currency codes and symbols |
| `Exchange_Rates` | Time-versioned currency conversion rates |
| `Warehouses` | Physical storage locations |
| `Inventory` | Stock levels per product per warehouse |
| `Orders` | Customer purchase records with currency info |
| `Order_Items` | Line items within each order |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Database | PostgreSQL / MySQL *(TBD)* |
| Frontend + Backend | Next.js (App Router — API Routes + SSR) |
| Hosting | Vercel (frontend/backend) + Supabase or Neon (PostgreSQL)|
| ERD Tool | draw.io / Lucidchart |
| Docs | Markdown |

---

## 🚀 Getting Started

> ⚠️ *Full setup instructions will be added as development progresses.*

```bash
# Clone the repository
git clone https://github.com/<your-org>/globalmart-advanced-db.git
cd globalmart-advanced-db

# Open the landing page
open web-app/index.html

# View the ERD
open er-diagram/er-diagram.png
```

---

## 📋 Project Deliverables Checklist

- [x] Team name & member list  
- [x] One-paragraph app description  
- [x] Initial ERD sketch  
- [ ] Refined ERD (draw.io / Lucidchart export)  
- [ ] Full Markdown documentation  
- [ ] Web application landing page  
- [ ] SQL schema scripts  
- [ ] Trigger implementations  
- [ ] Deployed application URL  

---

<!-- ## 👥 Team

| Role | Name |
|---|---|
| **Team Leader** | Fanyi Charllson |
| Member | *(Add name)* |
| Member | *(Add name)* |
| Member | *(Add name)* | -->

---

## 📄 License

This project is submitted for academic purposes as part of the **Advanced Database Systems** course. All rights reserved by the team.