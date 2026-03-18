import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { addToCart } from '../../features/Cart/cartSlice'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const { id, image, title, price, category } = product

  return (
    <article className="group border rounded-lg p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-full">

      <div className="hidden md:flex absolute inset-0 z-10 flex-col items-center justify-center gap-4 bg-black/65 -translate-x-full group-hover:translate-x-0 transition-transform duration-300">
        <Link
          to={`/product/${id}`}
          aria-label={`View details for ${title}`}
          className="border-2 border-white text-white rounded-2xl px-5 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
        >
          View Details <FontAwesomeIcon icon={faChevronRight} />
        </Link>
        <button
          onClick={() => dispatch(addToCart(product))}
          aria-label={`Add ${title} to cart`}
          className="border-2 border-white text-white rounded-2xl px-5 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
        >
          Add to Cart
        </button>
      </div>

      <img src={image} alt={title} className="w-full h-48 object-contain" />
      <span className="text-xs text-gray-500 uppercase tracking-wide">{category}</span>
      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{title}</h3>

      <div className="flex items-center justify-between mt-auto">
        <p className="text-lg font-bold text-gray-900">${price.toFixed(2)}</p>
        <Link
          to={`/product/${id}`}
          aria-label={`View details for ${title}`}
          className="md:hidden text-sm px-3 py-1.5 border border-gray-800 rounded-2xl hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
        >
          View Details <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>

      <button
        onClick={() => dispatch(addToCart(product))}
        aria-label={`Add ${title} to cart`}
        className="md:hidden w-full text-sm px-3 py-1.5 border border-gray-800 rounded-2xl hover:border-primary hover:text-primary transition-colors"
      >
        Add to Cart
      </button>
    </article>
  )
}

export default ProductCard