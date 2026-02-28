# 🛒 FreshMart — Full-Stack Grocery Web App

A modern grocery shopping platform built with **React + Vite**, **Node.js + Express**, and **MongoDB + Mongoose**.

---

## 📋 Table of Contents

- [Project Lifecycle](#-project-lifecycle)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
  - [VS Code](#option-1-vs-code-recommended)
  - [Command Prompt / PowerShell](#option-2-command-prompt--powershell)
  - [Git Bash](#option-3-git-bash)
  - [Windows Terminal](#option-4-windows-terminal)
- [MongoDB Setup](#-mongodb-setup)
  - [MongoDB Compass (Local)](#option-a-mongodb-compass-local)
  - [MongoDB Atlas (Cloud)](#option-b-mongodb-atlas-cloud)
- [Demo Credentials](#-demo-credentials)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 📌 Project Lifecycle

The FreshMart project was developed following a structured **7-phase software development lifecycle**:

| Phase | Name | Description |
|-------|------|-------------|
| 1 | **Ideation Phase** | Brainstorming the concept of a full-stack grocery web app, identifying the target audience, and defining the core value proposition. |
| 2 | **Requirement Analysis** | Gathering functional and non-functional requirements — user authentication, product catalog, cart & checkout, order management, and admin dashboard capabilities. |
| 3 | **Project Design Phase** | Designing the system architecture (React + Express + MongoDB), UI/UX wireframes, database schema design, and API endpoint planning. |
| 4 | **Project Planning Phase** | Creating the project timeline, task breakdown, technology stack finalization, and resource allocation for frontend, backend, and database modules. |
| 5 | **Project Development Phase** | Full-stack implementation — building the React frontend with Vite, Express.js REST API backend, MongoDB data layer, JWT authentication, and admin panel. |
| 6 | **Project Documentation** | Preparing comprehensive documentation including README, API documentation, database schema references, setup guides, and deployment instructions. |
| 7 | **Project Demonstration** | Final project showcase demonstrating all features — user registration/login, product browsing, cart management, checkout, order tracking, and admin operations. |

---

## ✨ Features

### User Features
- ✅ User registration & login (JWT authentication)
- ✅ Registration redirects to login (no auto-login after signup)
- ✅ Browse product catalog by category
- ✅ Search & filter products (by name, category, price, rating)
- ✅ View product details with reviews
- ✅ Add to cart / update cart quantities
- ✅ Checkout with delivery address & payment method
- ✅ Online payment support (COD, Credit Card, Debit Card, UPI)
- ✅ Place & track orders (Pending → Confirmed → Shipped → Delivered)
- ✅ Cancel pending orders
- ✅ View order history
- ✅ Add ratings & reviews
- ✅ Manage profile
- ✅ Modern scroll-reveal & page entrance animations
- ✅ Staggered card animations & micro-interactions
- ✅ Respects `prefers-reduced-motion` accessibility preference

### Admin Features
- ✅ Admin dashboard with analytics (users, products, orders, revenue)
- ✅ Add/edit/delete products
- ✅ Manage categories (CRUD)
- ✅ Manage inventory (countInStock)
- ✅ View and manage all orders
- ✅ Update order status
- ✅ Manage users (view/delete)
- ✅ Order status bar chart

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, Vite 7, React Router 7   |
| Backend    | Node.js, Express.js 4              |
| Database   | MongoDB, Mongoose 8                |
| Auth       | JSON Web Tokens (JWT), bcryptjs     |
| HTTP       | Axios                              |
| UI         | Custom CSS (dark theme), React Icons|
| Notifications | React Toastify                   |

---

## 📁 Project Structure

```
Grocery app/
│
├── server/                         # 🔧 Backend (Express + MongoDB)
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js      # Admin analytics & user management
│   │   ├── authController.js       # Register, login, profile
│   │   ├── cartController.js       # Cart CRUD operations
│   │   ├── categoryController.js   # Category CRUD
│   │   ├── orderController.js      # Order placement & management
│   │   └── productController.js    # Product CRUD, search, reviews
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification & admin guard
│   │   └── errorHandler.js         # Centralized error handling
│   ├── models/
│   │   ├── AddToCart.js             # Cart item schema
│   │   ├── Category.js             # Category schema
│   │   ├── Order.js                # Order schema
│   │   ├── Product.js              # Product schema with reviews
│   │   └── User.js                 # User schema with password hashing
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── .env                        # Environment variables
│   ├── package.json
│   ├── seeder.js                   # Database seed script
│   └── server.js                   # Express entry point
│
├── client/                         # 🎨 Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Navigation bar
│   │   │   ├── Footer.jsx          # Footer with scroll-reveal
│   │   │   ├── ProductCard.jsx     # Product card with stagger animation
│   │   │   └── ProtectedRoute.jsx  # Auth route guards
│   │   ├── hooks/
│   │   │   └── useScrollReveal.js  # Intersection Observer scroll-reveal hook
│   │   ├── context/
│   │   │   ├── AuthContext.jsx     # Authentication state
│   │   │   └── CartContext.jsx     # Cart state management
│   │   ├── pages/
│   │   │   ├── Landing.jsx         # Home page
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Register.jsx        # Registration page
│   │   │   ├── Products.jsx        # Product listing
│   │   │   ├── ProductDetail.jsx   # Single product view
│   │   │   ├── Cart.jsx            # Shopping cart
│   │   │   ├── Checkout.jsx        # Checkout flow
│   │   │   ├── Orders.jsx          # Order history
│   │   │   ├── OrderTrack.jsx      # Order tracking
│   │   │   ├── Profile.jsx         # User profile
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx   # Admin dashboard
│   │   │       ├── ManageProducts.jsx
│   │   │       ├── ManageCategories.jsx
│   │   │       ├── ManageOrders.jsx
│   │   │       └── ManageUsers.jsx
│   │   ├── api.js                  # Axios instance + JWT interceptor
│   │   ├── App.jsx                 # Router + providers
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Full design system
│   ├── index.html
│   ├── vite.config.js              # Vite + React plugin + proxy
│   └── package.json
│
└── README.md                       # This file
```

---

## 📦 Prerequisites

Install these before running the project:

| Software        | Version  | Download Link                                       |
|-----------------|----------|-----------------------------------------------------|
| **Node.js**     | v18+     | https://nodejs.org/                                 |
| **MongoDB**     | v6+      | https://www.mongodb.com/try/download/community      |
| **MongoDB Compass** | Latest | https://www.mongodb.com/products/compass           |
| **VS Code**     | Latest   | https://code.visualstudio.com/                      |
| **Git** (optional) | Latest | https://git-scm.com/                               |

### ✅ Verify Installation
Open a terminal and run:
```bash
node --version      # Should show v18.x.x or higher
npm --version       # Should show 9.x.x or higher
mongod --version    # Should show MongoDB version
```

---

## 🚀 Installation

### Step 1: Open the project folder
```bash
cd "c:\Users\dhanush gopi\OneDrive\Desktop\Grocery app"
```

### Step 2: Install backend dependencies
```bash
cd Frontend
npm install
```

### Step 3: Install frontend dependencies
```bash
cd ..\Backend
npm install
```

### Step 4: Seed the database (creates sample data)
```bash
cd ..\Backend
node seeder.js
```

You should see:
```
MongoDB Connected for seeding
Admin user created: admin@grocery.com / admin123
Regular user created: john@example.com / password123
8 categories created
20 products created
Seed complete!
```

---

## ▶️ Running the Project

### Option 1: VS Code (Recommended)

1. **Open the project** in VS Code:
   - File → Open Folder → Select `Grocery app`

2. **Open Terminal** → Press `` Ctrl+` ``

3. **Split Terminal** → Click the ⊞ icon (or press `Ctrl+Shift+5`)

4. **Terminal 1** — Start Backend:
   ```bash
   cd Backend
   node server.js
   ```
   ✅ You should see: `Server running on port 5000` and `MongoDB Connected: localhost`

5. **Terminal 2** — Start Frontend:
   ```bash
   cd Frontend
   npx vite
   ```
   ✅ You should see: `VITE ready` with `http://localhost:5173`

6. **Ctrl+Click** on `http://localhost:5173` to open in browser

---

### Option 2: Command Prompt / PowerShell

Open **two separate** Command Prompt windows:

**Window 1 — Backend:**
```cmd
cd "c:\Users\dhanush gopi\OneDrive\Desktop\Grocery app\Backend"
node Backend.js
```

**Window 2 — Frontend:**
```cmd
cd "c:\Users\dhanush gopi\OneDrive\Desktop\Grocery app\Frontend"
npx vite
```

Open browser → `http://localhost:5173`

---

### Option 3: Git Bash

**Terminal 1:**
```bash
cd "/c/Users/dhanush gopi/OneDrive/Desktop/Grocery app/server"
node Backend.js
```

**Terminal 2:**
```bash
cd "/c/Users/dhanush gopi/OneDrive/Desktop/Grocery app/Frontend"
npx vite
```

---

### Option 4: Windows Terminal

1. Open **Windows Terminal**
2. Click **+** to open a new tab for each server
3. Run the same commands as Command Prompt (Option 2)

---

## 🗄 MongoDB Setup

### Option A: MongoDB Compass (Local)

This is what you're using! Your app is already configured for this.

1. **Make sure MongoDB is running** as a Windows service:
   - Press `Win+R` → type `services.msc` → Find **MongoDB Server** → Ensure it says **Running**
   - If not running, right-click → **Start**

2. **Open MongoDB Compass** → Connect to:
   ```
   mongodb://localhost:27017
   ```

3. After running `node seeder.js`, click **Refresh** in Compass

4. You'll see database: **`groceryapp`** with collections:
   | Collection    | Description         | Initial Count |
   |---------------|---------------------|---------------|
   | `users`       | Registered users    | 2             |
   | `categories`  | Product categories  | 8             |
   | `products`    | Grocery products    | 20            |
   | `addtocarts`  | Cart items          | 0             |
   | `orders`      | Placed orders       | 0             |

5. You can browse, edit, and delete documents visually in Compass

---

### Option B: MongoDB Atlas (Cloud)

If you want to use cloud MongoDB instead of local:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) → Create a free account

2. Create a **Free Cluster** (M0 Sandbox)

3. Go to **Database Access** → Add a database user with username/password

4. Go to **Network Access** → Add `0.0.0.0/0` (allow all IPs)

5. Click **Connect** → Choose **Connect your application** → Copy the connection string

6. Update `server/.env`:
   ```env

   ```

7. Run seeder and start the server as usual

---

## 🔑 Demo Credentials

These accounts are created by the seeder script (`node seeder.js`). They are **not** shown on the login page.

| Role    | Email               | Password      |
|---------|---------------------|---------------|
| **Admin** | admin@grocery.com | admin123      |
| **User**  | john@example.com  | password123   |

> **Note:** After registering a new account, you will be redirected to the login page to sign in with your credentials (no auto-login).

### What each role can do:

**Admin** → Full access: Dashboard, manage products/categories/orders/users

**User** → Browse, add to cart, checkout, track orders, write reviews, manage profile

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication
| Method | Endpoint            | Auth   | Description         |
|--------|---------------------|--------|---------------------|
| POST   | `/auth/register`    | —      | Register new user   |
| POST   | `/auth/login`       | —      | Login, get JWT      |
| GET    | `/auth/profile`     | JWT    | Get user profile    |
| PUT    | `/auth/profile`     | JWT    | Update profile      |

### Products
| Method | Endpoint                | Auth   | Description                     |
|--------|-------------------------|--------|---------------------------------|
| GET    | `/products`             | —      | List all (supports `?search=`, `?category=`, `?sort=`, `?page=`, `?limit=`) |
| GET    | `/products/:id`         | —      | Get product by ID               |
| POST   | `/products`             | Admin  | Create product                  |
| PUT    | `/products/:id`         | Admin  | Update product                  |
| DELETE | `/products/:id`         | Admin  | Delete product                  |
| POST   | `/products/:id/reviews` | JWT    | Add review to product           |

### Categories
| Method | Endpoint             | Auth   | Description       |
|--------|----------------------|--------|-------------------|
| GET    | `/categories`        | —      | List all           |
| GET    | `/categories/:id`    | —      | Get by ID          |
| POST   | `/categories`        | Admin  | Create             |
| PUT    | `/categories/:id`    | Admin  | Update             |
| DELETE | `/categories/:id`    | Admin  | Delete             |

### Cart
| Method | Endpoint        | Auth | Description          |
|--------|-----------------|------|----------------------|
| GET    | `/cart`         | JWT  | Get user's cart      |
| POST   | `/cart`         | JWT  | Add item to cart     |
| PUT    | `/cart/:id`     | JWT  | Update quantity      |
| DELETE | `/cart/:id`     | JWT  | Remove item          |
| DELETE | `/cart/clear`   | JWT  | Clear entire cart    |

### Orders
| Method | Endpoint              | Auth   | Description          |
|--------|-----------------------|--------|----------------------|
| POST   | `/orders`             | JWT    | Place new order      |
| GET    | `/orders/my`          | JWT    | Get user's orders    |
| GET    | `/orders/:id`         | JWT    | Get order details    |
| PUT    | `/orders/:id/cancel`  | JWT    | Cancel order         |
| GET    | `/orders`             | Admin  | Get all orders       |
| PUT    | `/orders/:id/status`  | Admin  | Update order status  |

### Admin
| Method | Endpoint              | Auth   | Description          |
|--------|-----------------------|--------|----------------------|
| GET    | `/admin/users`        | Admin  | List all users       |
| DELETE | `/admin/users/:id`    | Admin  | Delete user          |
| GET    | `/admin/analytics`    | Admin  | Dashboard stats      |

### How to use JWT in API calls:
```
Authorization: Bearer <your_jwt_token>
```

---

## ☁️ Deployment

### Deploy Backend (Render / Railway)

1. Push `server/` to a GitHub repository
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

### Deploy Frontend (Vercel / Netlify)

1. Update `client/src/api.js` — change `baseURL` to your deployed backend URL:
   ```js
   const API = axios.create({ baseURL: 'https://your-backend-url.com/api' });
   ```
2. Push `client/` to GitHub
3. Go to [Vercel](https://vercel.com) → Import project
4. Build command: `npm run build`
5. Output directory: `dist`

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm` command not found | Install Node.js from https://nodejs.org |
| `mongod` not running | Start MongoDB service: `Win+R` → `services.msc` → Start MongoDB Server |
| Port 5000 already in use | Change `PORT` in `server/.env` to 5001 |
| Port 5173 already in use | Run `npx vite --port 3000` instead |
| PowerShell script error | Use `cmd /c "node server.js"` or run via Command Prompt |
| CORS errors in browser | Make sure backend is running on port 5000 |
| Empty products page | Run `node seeder.js` to populate the database |
| Login not working | Run `node seeder.js` to create demo users |
| MongoDB connection failed | Check MongoDB is running: `mongod --version` |
| "Module not found" errors | Run `npm install` in both `server/` and `client/` folders |

---

## 📄 Environment Variables

File: `server/.env`

| Variable     | Default Value                             | Description              |
|--------------|-------------------------------------------|--------------------------|
| `PORT`       | `5000`                                    | Backend server port      |
| `MONGO_URI`  | `mongodb://localhost:27017/groceryapp`    | MongoDB connection string|
| `JWT_SECRET` | `grocery_app_super_secret_key_2024`       | JWT signing secret       |
| `NODE_ENV`   | `development`                             | Environment mode         |

---

## 📜 Available Scripts

### Backend (`server/`)
| Command              | Description                    |
|----------------------|--------------------------------|
| `node server.js`     | Start the Express server       |
| `node seeder.js`     | Seed database with sample data |

### Frontend (`client/`)
| Command              | Description                    |
|----------------------|--------------------------------|
| `npx vite`           | Start dev server (port 5173)   |
| `npx vite build`     | Build for production           |
| `npx vite preview`   | Preview production build       |

---

**Built with ❤️ using React, Express & MongoDB**
