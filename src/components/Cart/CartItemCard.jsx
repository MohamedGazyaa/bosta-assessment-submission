import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { addToCart, removeFromCart, deleteFromCart } from '../../features/Cart/cartSlice'

function CartItemCard({ product, quantity }) {
  const dispatch = useDispatch()
  const { id, image, title, price } = product

  return (
    <div className="flex items-center gap-4 border rounded-lg p-4 shadow-sm">
      <img src={image} alt={title} className="w-20 h-20 object-contain shrink-0" />

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 line-clamp-2">{title}</p>
        <p className="text-sm font-bold text-gray-900">${(price * quantity).toFixed(2)}</p>
        <p className="text-xs text-gray-500">${price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => dispatch(removeFromCart(id))}
          aria-label={`Decrease quantity of ${title}`}
          className="w-7 h-7 flex items-center justify-center border rounded transition-colors text-gray-700 hover:text-primary hover:border-primary"
        >
          <FontAwesomeIcon icon={faMinus} className="text-xs" />
        </button>

        <span className="text-sm font-medium w-6 text-center" aria-label={`Quantity: ${quantity}`}>{quantity}</span>

        <button
          onClick={() => dispatch(addToCart(product))}
          aria-label={`Increase quantity of ${title}`}
          className="w-7 h-7 flex items-center justify-center border rounded transition-colors text-gray-700 hover:text-green-600 hover:border-green-600"
        >
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
        </button>

        <button
          onClick={() => dispatch(deleteFromCart(id))}
          aria-label={`Remove ${title} from cart`}
          className="w-7 h-7 flex items-center justify-center border rounded transition-colors text-gray-700 hover:text-primary hover:border-primary ml-1"
        >
          <FontAwesomeIcon icon={faTrashCan} className="text-xs" />
        </button>
      </div>
    </div>
  )
}

export default CartItemCard