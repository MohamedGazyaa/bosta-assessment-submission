import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { fetchProductById } from '../features/products/productsSlice'
import { addToCart } from '../features/Cart/cartSlice'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'

function Product() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === Number(id)) ?? state.products.selectedProduct
  )
  const { selectedStatus } = useSelector((state) => state.products)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(id))
    }
  }, [id, product, dispatch])

  if (!product && (selectedStatus === 'idle' || selectedStatus === 'loading')) return <LoadingSpinner />

  if (!product && selectedStatus === 'failed') return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] gap-3">
      <ErrorMessage message="Product not found." />
      <Link
        to="/products"
        aria-label="Back to products list"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Back to Products
      </Link>
    </div>
  )

  if (!product) return null

  const { image, title, description, category, price } = product

  return (
    <main
      className="relative flex items-center justify-center min-h-[calc(100vh-72px)] px-8 py-12"
      aria-label={`Product details for ${title}`}
    >
      <Link
        to="/products"
        aria-label="Back to products list"
        className="absolute top-6 left-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Back to Products
      </Link>

      <article className="flex flex-col md:flex-row gap-14 max-w-5xl w-full">
        <figure className="flex items-center justify-center md:w-1/2 shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full max-w-sm h-96 object-contain"
          />
        </figure>

        <div className="flex flex-col gap-5 md:w-1/2 justify-center">
          <span
            className="text-xs text-gray-500 uppercase tracking-widest"
            aria-label={`Category: ${category}`}
          >
            {category}
          </span>
          <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
          <p className="text-gray-600 leading-relaxed text-base">{description}</p>
          <p
            className="text-3xl font-bold text-gray-900"
            aria-label={`Price: $${price.toFixed(2)}`}
          >
            ${price.toFixed(2)}
          </p>

          <div className="flex items-center gap-3 self-center">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center border rounded transition-colors text-gray-700 hover:text-primary hover:border-primary"
            >
              <FontAwesomeIcon icon={faMinus} className="text-xs" />
            </button>
            <span className="text-base font-medium w-6 text-center" aria-label={`Quantity: ${quantity}`}>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center border rounded transition-colors text-gray-700 hover:text-green-600 hover:border-green-600"
            >
              <FontAwesomeIcon icon={faPlus} className="text-xs" />
            </button>
          </div>

          <button
            onClick={() => {
              for (let i = 0; i < quantity; i++) dispatch(addToCart(product))
            }}
            aria-label={`Add ${quantity} ${title} to cart`}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-primary transition-colors self-center"
          >
            <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
          </button>
        </div>
      </article>
    </main>
  )
}

export default Product