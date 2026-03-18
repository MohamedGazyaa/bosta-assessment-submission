# Bosta Front-End Assessment

A fully-featured e-commerce web application built with React, Redux Toolkit, and Tailwind CSS. Browse products, filter by category, manage a persistent shopping cart, and create new products.

---

## Live Demo

> Deploy and add your URL here.

---

## Features

- **Product Listing** — Fetches products from [FakeStoreAPI](https://fakestoreapi.com/products) with category filtering and price sorting
- **Product Detail** — Full product view with quantity selector and add-to-cart
- **Create Product** — Form with validation to add new products
- **Shopping Cart** — Add, remove, and update quantities; cart persists via `localStorage`
- **Pagination** — Products grid paginates at 8 items per page
- **Responsive Design** — Mobile-first layout with a collapsible hamburger menu
- **Accessibility** — Semantic HTML, ARIA labels, and keyboard-navigable controls

---

## Tech Stack

- React
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- FontAwesome 7
- ESLint 9
- Vite

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/your-username/bosta-submission.git
cd bosta-submission
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── app/
│   └── store.js                 # Redux store
├── features/
│   ├── products/
│   │   └── productsSlice.js     # Products state & async thunks
│   └── Cart/
│       └── cartSlice.js         # Cart state with localStorage persistence
├── pages/
│   ├── ProductsList.jsx         # Browse & filter products
│   ├── Product.jsx              # Product detail
│   ├── CreateProduct.jsx        # Create product form
│   └── Cart.jsx                 # Shopping cart
└── components/
    ├── Navbar.jsx
    ├── ErrorMessage.jsx
    ├── LoadingSpinner.jsx
    ├── ProductsList/
    │   ├── ProductsGrid.jsx
    │   ├── ProductCard.jsx
    │   └── Sorting.jsx
    └── Cart/
        ├── CartItems.jsx
        └── CartItemCard.jsx
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Redirects to `/products` |
| `/products` | Product listing with filters |
| `/product/:id` | Product detail |
| `/create-product` | Create a new product |
| `/cart` | Shopping cart |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## API

Products are fetched from [FakeStoreAPI](https://fakestoreapi.com). Product creation uses the API's mock POST endpoint and does not persist server-side.
