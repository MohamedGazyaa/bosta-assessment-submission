import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductsList from './pages/ProductsList'
import Product from './pages/Product'
import CreateProduct from './pages/CreateProduct'
import Cart from './pages/Cart'

function App() {
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App