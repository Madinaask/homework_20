# homework_20

Индивидуальный проект — REST API интернет-магазина (Node.js + Express + MongoDB).

## Запуск

```bash
npm install
cp .env.example .env
node index.js
```

## .env

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@example.com
```

`ADMIN_EMAIL` — после регистрации этот пользователь получает роль admin при следующем запуске.

## Маршруты

- `/api/auth` — register, login, me
- `/api/users` — профиль, wishlist, админ CRUD
- `/api/categories` — CRUD
- `/api/products` — CRUD, поиск `?search=`, фильтр `?category=`
- `/api/orders` — оформление, мои заказы, админ CRUD
- `/api/docs` — Swagger UI

## Модели

User, Category, Product, Order. Связи: one-to-many и many-to-many.
