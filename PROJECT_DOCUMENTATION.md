# FreshMart — Project Documentation

---

**Project Title:** FreshMart — Full-Stack Grocery Web Application

**Author:** Dhanush Gopi Kavala

**Date:** February 2026

**Technology Stack:** React + Vite | Node.js + Express | MongoDB + Mongoose

---

## Abstract

FreshMart is a modern, full-stack grocery web application that provides a seamless online grocery shopping experience. Built using the MERN stack (MongoDB, Express.js, React, Node.js), the platform enables customers to browse, search, and order fresh groceries online while providing administrators with a comprehensive dashboard for managing products, orders, and users. This document covers the complete software development lifecycle of the project across seven structured phases.

---

## Table of Contents

1. [Ideation Phase](#1-ideation-phase)
2. [Requirement Analysis](#2-requirement-analysis)
3. [Project Design Phase](#3-project-design-phase)
4. [Project Planning Phase](#4-project-planning-phase)
5. [Project Development Phase](#5-project-development-phase)
6. [Project Documentation](#6-project-documentation)
7. [Project Demonstration](#7-project-demonstration)

---

## 1. Ideation Phase

### 1.1 Project Concept

FreshMart is a **full-stack grocery web application** designed to provide a seamless online grocery shopping experience. The idea was born from the need for a modern, user-friendly platform where customers can browse, search, and order fresh groceries from the comfort of their homes.

### 1.2 Target Audience

- **Customers** who prefer online grocery shopping with home delivery
- **Store Administrators** who need a digital platform to manage products, orders, and inventory

### 1.3 Core Value Proposition

| Aspect              | Description                                                                                         |
|----------------------|-----------------------------------------------------------------------------------------------------|
| **Convenience**      | Browse and order groceries online with multiple payment options (COD, Credit Card, Debit Card, UPI) |
| **Real-time Tracking** | Track orders through stages: Pending → Confirmed → Shipped → Delivered                           |
| **Admin Control**    | Full dashboard with analytics, product/category/order/user management                              |
| **Modern UX**        | Dark-themed UI with scroll-reveal animations, micro-interactions, and responsive design            |

### 1.4 Problem Statement

Traditional grocery shopping requires physical visits to stores, limited by store operating hours and geographic constraints. FreshMart addresses this by providing a 24/7 digital grocery platform with real-time inventory tracking, order management, and a feature-rich admin panel.

### 1.5 Proposed Solution

A full-stack web application with:
- A responsive React frontend for customers to browse and order products
- A RESTful Express.js backend for business logic and authentication
- A MongoDB database for persistent storage of users, products, orders, and cart data
- JWT-based authentication for secure user sessions
- An admin dashboard for store management

---

## 2. Requirement Analysis

### 2.1 Functional Requirements — User Module

| Req ID | Requirement                                                    | Priority |
|--------|----------------------------------------------------------------|----------|
| FR-U01 | User registration with firstname, lastname, username, email, password | High     |
| FR-U02 | User login with JWT authentication                             | High     |
| FR-U03 | Registration redirects to login (no auto-login after signup)   | Medium   |
| FR-U04 | Browse product catalog by category                             | High     |
| FR-U05 | Search & filter products (by name, category, price, rating)    | High     |
| FR-U06 | View product details with reviews                              | High     |
| FR-U07 | Add to cart / update cart quantities                            | High     |
| FR-U08 | Checkout with delivery address & payment method                | High     |
| FR-U09 | Online payment support (COD, Credit Card, Debit Card, UPI)     | High     |
| FR-U10 | Place & track orders (Pending → Confirmed → Shipped → Delivered) | High   |
| FR-U11 | Cancel pending orders                                          | Medium   |
| FR-U12 | View order history                                             | Medium   |
| FR-U13 | Add ratings & reviews to products                              | Medium   |
| FR-U14 | Manage user profile                                            | Medium   |

### 2.2 Functional Requirements — Admin Module

| Req ID | Requirement                                                    | Priority |
|--------|----------------------------------------------------------------|----------|
| FR-A01 | Admin dashboard with analytics (users, products, orders, revenue) | High   |
| FR-A02 | Add/edit/delete products                                       | High     |
| FR-A03 | Manage categories (CRUD)                                       | High     |
| FR-A04 | Manage inventory (countInStock)                                | High     |
| FR-A05 | View and manage all orders                                     | High     |
| FR-A06 | Update order status                                            | High     |
| FR-A07 | Manage users (view/delete)                                     | Medium   |
| FR-A08 | Order status bar chart visualization                           | Low      |

### 2.3 Non-Functional Requirements

| Req ID | Requirement                                                    | Category      |
|--------|----------------------------------------------------------------|---------------|
| NFR-01 | Modern scroll-reveal & page entrance animations                | Usability     |
| NFR-02 | Staggered card animations & micro-interactions                 | Usability     |
| NFR-03 | Respects `prefers-reduced-motion` accessibility preference     | Accessibility |
| NFR-04 | Responsive design across devices                               | Usability     |
| NFR-05 | Secure password hashing with bcryptjs                          | Security      |
| NFR-06 | JWT-based stateless authentication                             | Security      |
| NFR-07 | Centralized error handling                                     | Reliability   |
| NFR-08 | RESTful API design conventions                                 | Maintainability |

---

## 3. Project Design Phase

### 3.1 System Architecture

FreshMart follows a **3-tier architecture**:

```
┌─────────────────────┐     HTTP/REST     ┌─────────────────────┐     Mongoose     ┌─────────────────────┐
│                     │ ◄──────────────►  │                     │ ◄─────────────► │                     │
│   Frontend (React)  │                   │  Backend (Express)  │                  │  Database (MongoDB) │
│   Vite Dev Server   │                   │  REST API Server    │                  │  groceryapp DB      │
│   Port: 5173        │                   │  Port: 5000         │                  │  Port: 27017        │
│                     │                   │                     │                  │                     │
└─────────────────────┘                   └─────────────────────┘                  └─────────────────────┘
```

### 3.2 Technology Stack

| Layer         | Technology                           | Purpose                        |
|---------------|--------------------------------------|--------------------------------|
| Frontend      | React 19, Vite 7, React Router 7    | UI rendering & client routing  |
| Backend       | Node.js, Express.js 4               | REST API & business logic      |
| Database      | MongoDB, Mongoose 8                 | Data persistence & ODM         |
| Auth          | JSON Web Tokens (JWT), bcryptjs      | Authentication & password hash |
| HTTP Client   | Axios                               | API communication              |
| UI Framework  | Custom CSS (dark theme), React Icons | Styling & iconography          |
| Notifications | React Toastify                      | Toast notification system      |

### 3.3 Project Structure

```
FreshMart/
│
├── Backend/                            # 🔧 Backend (Express + MongoDB)
│   ├── config/
│   │   └── db.js                      # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js         # Admin analytics & user management
│   │   ├── authController.js          # Register, login, profile
│   │   ├── cartController.js          # Cart CRUD operations
│   │   ├── categoryController.js      # Category CRUD
│   │   ├── orderController.js         # Order placement & management
│   │   └── productController.js       # Product CRUD, search, reviews
│   ├── middleware/
│   │   ├── auth.js                    # JWT verification & admin guard
│   │   └── errorHandler.js            # Centralized error handling
│   ├── models/
│   │   ├── AddToCart.js                # Cart item schema
│   │   ├── Category.js                # Category schema
│   │   ├── Order.js                   # Order schema
│   │   ├── Product.js                 # Product schema with reviews
│   │   └── User.js                    # User schema with password hashing
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── .env                           # Environment variables
│   ├── package.json
│   ├── seeder.js                      # Database seed script
│   └── server.js                      # Express entry point
│
├── Frontend/                           # 🎨 Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx             # Navigation bar
│   │   │   ├── Footer.jsx             # Footer with scroll-reveal
│   │   │   ├── ProductCard.jsx        # Product card with stagger animation
│   │   │   └── ProtectedRoute.jsx     # Auth route guards
│   │   ├── hooks/
│   │   │   └── useScrollReveal.js     # Intersection Observer scroll-reveal hook
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Authentication state
│   │   │   └── CartContext.jsx        # Cart state management
│   │   ├── pages/
│   │   │   ├── Landing.jsx            # Home page
│   │   │   ├── Login.jsx              # Login page
│   │   │   ├── Register.jsx           # Registration page
│   │   │   ├── Products.jsx           # Product listing
│   │   │   ├── ProductDetail.jsx      # Single product view
│   │   │   ├── Cart.jsx               # Shopping cart
│   │   │   ├── Checkout.jsx           # Checkout flow
│   │   │   ├── Orders.jsx             # Order history
│   │   │   ├── OrderTrack.jsx         # Order tracking
│   │   │   ├── Profile.jsx            # User profile
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx      # Admin dashboard
│   │   │       ├── ManageProducts.jsx
│   │   │       ├── ManageCategories.jsx
│   │   │       ├── ManageOrders.jsx
│   │   │       └── ManageUsers.jsx
│   │   ├── api.js                     # Axios instance + JWT interceptor
│   │   ├── App.jsx                    # Router + providers
│   │   ├── main.jsx                   # Entry point
│   │   └── index.css                  # Full design system
│   ├── index.html
│   ├── vite.config.js                 # Vite + React plugin + proxy
│   └── package.json
│
├── API_DOCUMENTATION.md               # Detailed API reference
├── PROJECT_DOCUMENTATION.md           # This file
├── FreshMart_Project_Documentation.docx
└── README.md                          # Quick-start guide
```

### 3.4 Database Schema Design

#### 3.4.1 User Model

| Field     | Type    | Required | Unique | Description                   |
|-----------|---------|----------|--------|-------------------------------|
| firstname | String  | ✅       |        | User's first name             |
| lastname  | String  | ✅       |        | User's last name              |
| username  | String  | ✅       | ✅     | Unique username               |
| email     | String  | ✅       | ✅     | Unique email address          |
| password  | String  | ✅       |        | Hashed with bcryptjs          |
| isAdmin   | Boolean |          |        | Admin flag (default: false)   |

#### 3.4.2 Category Model

| Field       | Type   | Required | Unique | Description           |
|-------------|--------|----------|--------|-----------------------|
| category    | String | ✅       | ✅     | Category name         |
| description | String |          |        | Category description  |

#### 3.4.3 Product Model

| Field        | Type     | Required | Description                    |
|--------------|----------|----------|--------------------------------|
| name         | String   | ✅       | Product name                   |
| description  | String   | ✅       | Product description            |
| price        | Number   | ✅       | Product price in INR           |
| image        | String   |          | Product image URL              |
| category     | ObjectId | ✅       | Reference to Category model    |
| countInStock | Number   | ✅       | Available stock quantity       |
| rating       | Number   |          | Average rating (0-5)           |
| numReviews   | Number   |          | Total number of reviews        |
| reviews      | Array    |          | Array of review sub-documents  |

#### 3.4.4 Cart Model (AddToCart)

| Field     | Type     | Required | Description                  |
|-----------|----------|----------|------------------------------|
| userId    | ObjectId | ✅       | Reference to User model      |
| productId | ObjectId | ✅       | Reference to Product model   |
| quantity  | Number   | ✅       | Quantity in cart              |

#### 3.4.5 Order Model

| Field         | Type     | Required | Description                         |
|---------------|----------|----------|-------------------------------------|
| user          | ObjectId | ✅       | Reference to User model             |
| products      | Array    | ✅       | Array of ordered product details    |
| totalPrice    | Number   | ✅       | Total order amount                  |
| status        | String   |          | Pending / Confirmed / Shipped / Delivered / Cancelled |
| address       | Object   | ✅       | Delivery address (street, city, state, zip, phone) |
| paymentMethod | String   | ✅       | COD / Credit Card / Debit Card / UPI |
| isPaid        | Boolean  |          | Payment status flag                 |

### 3.5 ER Diagram (Relationships)

```
┌──────────┐       ┌──────────────┐       ┌──────────┐
│   User   │──1:N──│   AddToCart   │──N:1──│ Product  │
│          │       └──────────────┘       │          │
│          │──1:N──┌──────────────┐       │          │──N:1──┌──────────┐
│          │       │    Order     │       │          │       │ Category │
└──────────┘       └──────────────┘       └──────────┘       └──────────┘
                          │
                     (embeds product
                      details as array)
```

---

## 4. Project Planning Phase

### 4.1 Prerequisites

| Software            | Version | Download Link                                      |
|---------------------|---------|----------------------------------------------------|
| **Node.js**         | v18+    | https://nodejs.org/                                |
| **MongoDB**         | v6+     | https://www.mongodb.com/try/download/community     |
| **MongoDB Compass** | Latest  | https://www.mongodb.com/products/compass           |
| **VS Code**         | Latest  | https://code.visualstudio.com/                     |
| **Git** (optional)  | Latest  | https://git-scm.com/                               |

#### Verify Installation
```bash
node --version      # Should show v18.x.x or higher
npm --version       # Should show 9.x.x or higher
mongod --version    # Should show MongoDB version
```

### 4.2 Environment Configuration

File: `Backend/.env`

| Variable     | Default Value                          | Description               |
|--------------|----------------------------------------|---------------------------|
| `PORT`       | `5000`                                 | Backend server port       |
| `MONGO_URI`  | `mongodb://localhost:27017/groceryapp` | MongoDB connection string |
| `JWT_SECRET` | `grocery_app_super_secret_key_2024`    | JWT signing secret        |
| `NODE_ENV`   | `development`                          | Environment mode          |

### 4.3 MongoDB Setup

#### Option A: MongoDB Compass (Local)

1. **Make sure MongoDB is running** as a Windows service:
   - Press `Win+R` → type `services.msc` → Find **MongoDB Server** → Ensure it says **Running**
   - If not running, right-click → **Start**

2. **Open MongoDB Compass** → Connect to:
   ```
   mongodb://localhost:27017
   ```

3. After running `node seeder.js`, click **Refresh** in Compass

4. Database: **`groceryapp`** with collections:

   | Collection    | Description         | Initial Count |
   |---------------|---------------------|---------------|
   | `users`       | Registered users    | 2             |
   | `categories`  | Product categories  | 8             |
   | `products`    | Grocery products    | 20            |
   | `addtocarts`  | Cart items          | 0             |
   | `orders`      | Placed orders       | 0             |

5. You can browse, edit, and delete documents visually in Compass

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) → Create a free account
2. Create a **Free Cluster** (M0 Sandbox)
3. Go to **Database Access** → Add a database user with username/password
4. Go to **Network Access** → Add `0.0.0.0/0` (allow all IPs)
5. Click **Connect** → Choose **Connect your application** → Copy the connection string
6. Update `Backend/.env` with your Atlas connection string
7. Run seeder and start the server as usual

### 4.4 Module Breakdown

| Module     | Description                                | Key Files                                    |
|------------|--------------------------------------------|----------------------------------------------|
| **Auth**   | User registration, login, profile, JWT     | `authController.js`, `auth.js`, `User.js`   |
| **Product**| Product CRUD, search, filter, reviews      | `productController.js`, `Product.js`         |
| **Category** | Category management                     | `categoryController.js`, `Category.js`       |
| **Cart**   | Cart add/update/remove/clear               | `cartController.js`, `AddToCart.js`          |
| **Order**  | Order placement, tracking, cancellation    | `orderController.js`, `Order.js`             |
| **Admin**  | Dashboard analytics, user management       | `adminController.js`                         |

---

## 5. Project Development Phase

### 5.1 Installation

#### Step 1: Clone or open the project
```bash
cd "c:\Users\dhanush gopi\OneDrive\Desktop\FreshMart"
```

#### Step 2: Install backend dependencies
```bash
cd Backend
npm install
```

#### Step 3: Install frontend dependencies
```bash
cd ..\Frontend
npm install
```

#### Step 4: Seed the database (creates sample data)
```bash
cd ..\Backend
node seeder.js
```

Expected output:
```
MongoDB Connected for seeding
Admin user created: admin@grocery.com / admin123
Regular user created: john@example.com / password123
8 categories created
20 products created
Seed complete!
```

### 5.2 Running the Project

#### Option 1: VS Code (Recommended)

1. **Open the project** in VS Code:
   - File → Open Folder → Select `FreshMart`

2. **Open Terminal** → Press `` Ctrl+` ``

3. **Split Terminal** → Click the ⊞ icon (or press `Ctrl+Shift+5`)

4. **Terminal 1** — Start Backend:
   ```bash
   cd Backend
   node server.js
   ```
   ✅ Expected: `Server running on port 5000` and `MongoDB Connected: localhost`

5. **Terminal 2** — Start Frontend:
   ```bash
   cd Frontend
   npx vite
   ```
   ✅ Expected: `VITE ready` with `http://localhost:5173`

6. **Ctrl+Click** on `http://localhost:5173` to open in browser

#### Option 2: Command Prompt / PowerShell

Open **two separate** Command Prompt windows:

**Window 1 — Backend:**
```cmd
cd "c:\Users\dhanush gopi\OneDrive\Desktop\FreshMart\Backend"
node server.js
```

**Window 2 — Frontend:**
```cmd
cd "c:\Users\dhanush gopi\OneDrive\Desktop\FreshMart\Frontend"
npx vite
```

Open browser → `http://localhost:5173`

#### Option 3: Git Bash

**Terminal 1:**
```bash
cd "/c/Users/dhanush gopi/OneDrive/Desktop/FreshMart/Backend"
node server.js
```

**Terminal 2:**
```bash
cd "/c/Users/dhanush gopi/OneDrive/Desktop/FreshMart/Frontend"
npx vite
```

#### Option 4: Windows Terminal

1. Open **Windows Terminal**
2. Click **+** to open a new tab for each server
3. Run the same commands as Command Prompt (Option 2)

### 5.3 Available Scripts

#### Backend (`Backend/`)
| Command           | Description                    |
|-------------------|--------------------------------|
| `node server.js`  | Start the Express server       |
| `node seeder.js`  | Seed database with sample data |

#### Frontend (`Frontend/`)
| Command             | Description                    |
|---------------------|--------------------------------|
| `npx vite`          | Start dev server (port 5173)   |
| `npx vite build`    | Build for production           |
| `npx vite preview`  | Preview production build       |

---

## 6. Project Documentation

### 6.1 API Documentation

Base URL: `http://localhost:5000/api`

> For the complete API reference with request/response examples, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

#### 6.1.1 Authentication Endpoints

| Method | Endpoint         | Auth  | Description       |
|--------|------------------|-------|-------------------|
| POST   | `/auth/register` | —     | Register new user |
| POST   | `/auth/login`    | —     | Login, get JWT    |
| GET    | `/auth/profile`  | JWT   | Get user profile  |
| PUT    | `/auth/profile`  | JWT   | Update profile    |

#### 6.1.2 Product Endpoints

| Method | Endpoint                | Auth  | Description                                                              |
|--------|-------------------------|-------|--------------------------------------------------------------------------|
| GET    | `/products`             | —     | List all (supports `?search=`, `?category=`, `?sort=`, `?page=`, `?limit=`) |
| GET    | `/products/:id`         | —     | Get product by ID                                                        |
| POST   | `/products`             | Admin | Create product                                                           |
| PUT    | `/products/:id`         | Admin | Update product                                                           |
| DELETE | `/products/:id`         | Admin | Delete product                                                           |
| POST   | `/products/:id/reviews` | JWT   | Add review to product                                                    |

#### 6.1.3 Category Endpoints

| Method | Endpoint          | Auth  | Description |
|--------|-------------------|-------|-------------|
| GET    | `/categories`     | —     | List all    |
| GET    | `/categories/:id` | —     | Get by ID   |
| POST   | `/categories`     | Admin | Create      |
| PUT    | `/categories/:id` | Admin | Update      |
| DELETE | `/categories/:id` | Admin | Delete      |

#### 6.1.4 Cart Endpoints

| Method | Endpoint      | Auth | Description      |
|--------|---------------|------|------------------|
| GET    | `/cart`       | JWT  | Get user's cart  |
| POST   | `/cart`       | JWT  | Add item to cart |
| PUT    | `/cart/:id`   | JWT  | Update quantity  |
| DELETE | `/cart/:id`   | JWT  | Remove item      |
| DELETE | `/cart/clear` | JWT  | Clear entire cart|

#### 6.1.5 Order Endpoints

| Method | Endpoint             | Auth  | Description         |
|--------|----------------------|-------|---------------------|
| POST   | `/orders`            | JWT   | Place new order     |
| GET    | `/orders/my`         | JWT   | Get user's orders   |
| GET    | `/orders/:id`        | JWT   | Get order details   |
| PUT    | `/orders/:id/cancel` | JWT   | Cancel order        |
| GET    | `/orders`            | Admin | Get all orders      |
| PUT    | `/orders/:id/status` | Admin | Update order status |

#### 6.1.6 Admin Endpoints

| Method | Endpoint           | Auth  | Description     |
|--------|--------------------|-------|-----------------|
| GET    | `/admin/users`     | Admin | List all users  |
| DELETE | `/admin/users/:id` | Admin | Delete user     |
| GET    | `/admin/analytics` | Admin | Dashboard stats |

#### 6.1.7 Using JWT Authentication

All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

Tokens are obtained from the `/auth/login` endpoint.

### 6.2 Error Handling

All errors follow a standard format:
```json
{
  "message": "Error description"
}
```

| Status Code | Meaning              |
|-------------|----------------------|
| 400         | Bad request          |
| 401         | Not authorized       |
| 403         | Forbidden (not admin)|
| 404         | Resource not found   |
| 500         | Server error         |

### 6.3 Troubleshooting Guide

| Problem                       | Solution                                                        |
|-------------------------------|-----------------------------------------------------------------|
| `npm` command not found       | Install Node.js from https://nodejs.org                         |
| `mongod` not running          | Start MongoDB service: `Win+R` → `services.msc` → Start MongoDB|
| Port 5000 already in use      | Change `PORT` in `Backend/.env` to 5001                         |
| Port 5173 already in use      | Run `npx vite --port 3000` instead                              |
| PowerShell script error       | Use `cmd /c "node server.js"` or run via Command Prompt         |
| CORS errors in browser        | Make sure backend is running on port 5000                       |
| Empty products page           | Run `node seeder.js` to populate the database                   |
| Login not working             | Run `node seeder.js` to create demo users                       |
| MongoDB connection failed     | Check MongoDB is running: `mongod --version`                    |
| "Module not found" errors     | Run `npm install` in both `Backend/` and `Frontend/` folders    |

---

## 7. Project Demonstration

### 7.1 Demo Credentials

These accounts are created by the seeder script (`node seeder.js`). They are **not** shown on the login page.

| Role      | Email             | Password    |
|-----------|-------------------|-------------|
| **Admin** | admin@grocery.com | admin123    |
| **User**  | john@example.com  | password123 |

> **Note:** After registering a new account, you will be redirected to the login page to sign in with your credentials (no auto-login).

### 7.2 Role-Based Access

**Admin** → Full access: Dashboard, manage products/categories/orders/users

**User** → Browse, add to cart, checkout, track orders, write reviews, manage profile

### 7.3 Demo Walkthrough

#### Step 1 — Start the Application
Follow the instructions in [Section 5.2](#52-running-the-project) to start both backend and frontend servers.

#### Step 2 — Admin Demo
1. Login with `admin@grocery.com` / `admin123`
2. View the **Dashboard** with analytics (total users, products, orders, revenue)
3. Navigate to **Manage Products** → Add/edit/delete products
4. Navigate to **Manage Categories** → Create and organize categories
5. Navigate to **Manage Orders** → View and update order statuses
6. Navigate to **Manage Users** → View registered users

#### Step 3 — User Demo
1. **Register** a new account or **Login** with `john@example.com` / `password123`
2. **Browse products** on the home page
3. Use **Search & Filter** to find specific items
4. **Add items to cart** and adjust quantities
5. Proceed to **Checkout** → Enter delivery address and payment method
6. **Track order** through Pending → Confirmed → Shipped → Delivered
7. **Leave reviews** and ratings on purchased products
8. **View order history** for past purchases

### 7.4 Deployment Guide

#### Deploy Backend (Render / Railway)

1. Push `Backend/` to a GitHub repository
2. Go to [Render](https://render.com) or [Railway](https://railway.app)
3. Create a **Web Service** → Connect your repo
4. Set environment variables:
   ```
   MONGO_URI=<your_atlas_connection_string>
   JWT_SECRET=<your_secret_key>
   NODE_ENV=production
   PORT=5000
   ```
5. Build command: `npm install`
6. Start command: `node server.js`

#### Deploy Frontend (Vercel / Netlify)

1. Update `Frontend/src/api.js` — change `baseURL` to your deployed backend URL:
   ```js
   const API = axios.create({ baseURL: 'https://your-backend-url.com/api' });
   ```
2. Push `Frontend/` to GitHub
3. Go to [Vercel](https://vercel.com) → Import project
4. Build command: `npm run build`
5. Output directory: `dist`

---

## Conclusion

FreshMart is a comprehensive full-stack grocery web application that demonstrates proficiency in modern web development technologies including React, Node.js, Express.js, and MongoDB. The project covers the complete software development lifecycle from ideation through demonstration, implementing industry-standard practices such as JWT authentication, RESTful API design, role-based access control, and responsive UI design.

---

**Project by:** Dhanush Gopi Kavala

**Built with ❤️ using React, Express & MongoDB**
