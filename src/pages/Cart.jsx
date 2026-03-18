import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { clearCart } from '../features/Cart/cartSlice'
import CartItems from '../components/Cart/CartItems'

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] gap-4" aria-label="Shopping cart">
      <FontAwesomeIcon icon={faCartShopping} className="text-5xl text-gray-300" aria-hidden="true" />
      <p className="text-gray-500 text-sm font-medium">Your cart is empty</p>
      <Link
        to="/products"
        className="px-5 py-2 border border-gray-800 rounded-lg text-sm hover:bg-primary hover:text-white transition-colors"
      >
        Continue Shopping
      </Link>
    </main>
  )

  return (
    <main className="max-w-3xl mx-auto px-6 py-12" aria-label="Shopping cart">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Your Cart</h1>

      <CartItems items={items} />

      <div className="mt-8 flex flex-col gap-4 border-t pt-6">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-gray-700">Total</span>
          <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => dispatch(clearCart())}
            className="px-5 py-2 border border-primary text-primary text-sm rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            Clear Cart
          </button>
          <button
            className="px-5 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  )
}

export default Cart
