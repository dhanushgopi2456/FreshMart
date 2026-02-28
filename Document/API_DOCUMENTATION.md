# FreshMart API Documentation

Base URL: `http://localhost:5000/api`

---

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

Tokens are obtained from the `/auth/login` endpoint. The `/auth/register` endpoint creates the account but does not return a login token — users must log in separately after registration.

---

## Auth Endpoints

### POST `/auth/register`
Create a new user account. After registration, the user must log in via `/auth/login` to obtain a JWT token.

**Request Body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "_id": "64f...",
  "firstname": "John",
  "lastname": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "isAdmin": false
}
```

> **Note:** Unlike login, registration does not return a JWT token. The user must log in after registering.

---

### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):** Same format as register.

---

### GET `/auth/profile`
Get current user profile. **Auth: JWT required.**

### PUT `/auth/profile`
Update profile. **Auth: JWT required.**

**Request Body (partial update):**
```json
{
  "firstname": "Jane",
  "password": "newpassword"
}
```

---

## Product Endpoints

### GET `/products`
List products with optional filters.

**Query Parameters:**
| Param      | Type   | Description                          |
|------------|--------|--------------------------------------|
| `search`   | string | Search by product name               |
| `category` | string | Filter by category ID                |
| `sort`     | string | `newest`, `price_asc`, `price_desc`, `rating` |
| `page`     | number | Page number (default: 1)             |
| `limit`    | number | Items per page (default: 12)         |

**Example:** `GET /products?search=banana&sort=price_asc&page=1`

**Response (200):**
```json
{
  "products": [...],
  "page": 1,
  "pages": 2,
  "total": 20
}
```

---

### GET `/products/:id`
Get single product with full details and reviews.

### POST `/products` — Admin Only
Create a new product.

**Request Body:**
```json
{
  "name": "Fresh Mangoes",
  "description": "Sweet alphonso mangoes",
  "price": 5.99,
  "image": "https://example.com/mango.jpg",
  "category": "64f...",
  "countInStock": 50
}
```

### PUT `/products/:id` — Admin Only
Update product (partial update supported).

### DELETE `/products/:id` — Admin Only
Delete a product.

### POST `/products/:id/reviews` — JWT Required
Add a review to a product.

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent quality!"
}
```

---

## Category Endpoints

### GET `/categories`
List all categories sorted alphabetically.

### GET `/categories/:id`
Get single category.

### POST `/categories` — Admin Only
```json
{ "category": "Organic", "description": "Organic products" }
```

### PUT `/categories/:id` — Admin Only
### DELETE `/categories/:id` — Admin Only

---

## Cart Endpoints (All JWT Required)

### GET `/cart`
Get current user's cart items with product details.

### POST `/cart`
Add item to cart (auto-increments if already exists).
```json
{ "productId": "64f...", "quantity": 2 }
```

### PUT `/cart/:id`
Update cart item quantity.
```json
{ "quantity": 3 }
```

### DELETE `/cart/:id`
Remove single item from cart.

### DELETE `/cart/clear`
Clear entire cart.

---

## Order Endpoints

### POST `/orders` — JWT Required
Place a new order (auto-clears cart).

**Request Body:**
```json
{
  "products": [
    {
      "product": "64f...",
      "name": "Fresh Bananas",
      "quantity": 2,
      "price": 2.49,
      "image": "https://..."
    }
  ],
  "totalPrice": 9.97,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "phone": "+1234567890"
  },
  "paymentMethod": "COD"
}
```

### GET `/orders/my` — JWT Required
Get current user's order history.

### GET `/orders/:id` — JWT Required
Get single order details.

### PUT `/orders/:id/cancel` — JWT Required
Cancel a pending/confirmed/shipped order.

### GET `/orders` — Admin Only
Get all orders from all users.

### PUT `/orders/:id/status` — Admin Only
Update order status.
```json
{ "status": "Shipped" }
```
Valid statuses: `Pending`, `Confirmed`, `Shipped`, `Delivered`, `Cancelled`

---

## Admin Endpoints (Admin Only)

### GET `/admin/users`
List all registered users.

### DELETE `/admin/users/:id`
Delete a user account.

### GET `/admin/analytics`
Get dashboard analytics.

**Response:**
```json
{
  "totalUsers": 5,
  "totalProducts": 20,
  "totalOrders": 12,
  "totalRevenue": 234.50,
  "ordersByStatus": {
    "pendingOrders": 3,
    "confirmedOrders": 2,
    "shippedOrders": 4,
    "deliveredOrders": 2,
    "cancelledOrders": 1
  }
}
```

---

## Error Responses

All errors follow this format:
```json
{
  "message": "Error description"
}
```

| Status Code | Meaning                |
|-------------|------------------------|
| 400         | Bad request            |
| 401         | Not authorized         |
| 403         | Forbidden (not admin)  |
| 404         | Resource not found     |
| 500         | Server error           |

---

## Database Models

### User
| Field     | Type    | Required | Unique |
|-----------|---------|----------|--------|
| firstname | String  | ✅       |        |
| lastname  | String  | ✅       |        |
| username  | String  | ✅       | ✅     |
| email     | String  | ✅       | ✅     |
| password  | String  | ✅       |        |
| isAdmin   | Boolean |          |        |

### Category
| Field       | Type   | Required | Unique |
|-------------|--------|----------|--------|
| category    | String | ✅       | ✅     |
| description | String |          |        |

### Product
| Field        | Type     | Required |
|--------------|----------|----------|
| name         | String   | ✅       |
| description  | String   | ✅       |
| price        | Number   | ✅       |
| image        | String   |          |
| category     | ObjectId | ✅       |
| countInStock | Number   | ✅       |
| rating       | Number   |          |
| numReviews   | Number   |          |
| reviews      | Array    |          |

### AddToCart
| Field     | Type     | Required |
|-----------|----------|----------|
| userId    | ObjectId | ✅       |
| productId | ObjectId | ✅       |
| quantity  | Number   | ✅       |

### Order
| Field         | Type     | Required |
|---------------|----------|----------|
| user          | ObjectId | ✅       |
| products      | Array    | ✅       |
| totalPrice    | Number   | ✅       |
| status        | String   |          |
| address       | Object   | ✅       |
| paymentMethod | String   | ✅       |
| isPaid        | Boolean  |          |
