import CartItemCard from './CartItemCard'

function CartItems({ items }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <CartItemCard key={item.id} product={item} quantity={item.quantity} />
      ))}
    </div>
  )
}

export default CartItems
