import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import bostaLogo from '../assets/bosta-logo.png'

const navLinkClass = ({ isActive }) =>
  `text-base font-medium transition-colors ${
    isActive ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
  }`

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  return (
    <>
      <nav className="relative bg-white shadow-md z-40" aria-label="Main navigation">
        <div className="flex items-center px-8 py-4">

          <button
            className="lg:hidden text-gray-700 text-xl"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div className="flex-1 flex lg:flex-none justify-center lg:justify-start">
            <Link to="/products" aria-label="Go to products">
              <img src={bostaLogo} alt="Bosta Logo" className="h-10 w-auto object-contain" />
            </Link>
          </div>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-6">
            <NavLink to="/products" className={navLinkClass}>Products List</NavLink>
            <NavLink to="/create-product" className={navLinkClass}>Create Product</NavLink>
          </div>

          <NavLink to="/cart" aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`} className="hidden lg:flex ml-auto relative text-gray-700 hover:text-primary transition-colors text-xl">
            <FontAwesomeIcon icon={faCartShopping} />
            {cartCount > 0 && (
              <span aria-hidden="true" className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <Link to="/products" aria-label="Go to products" onClick={() => setMenuOpen(false)}>
            <img src={bostaLogo} alt="Bosta Logo" className="h-8 w-auto object-contain" />
          </Link>
          <button
            className="text-gray-700 text-xl"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-6 py-6">
          <NavLink to="/products" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Products List
          </NavLink>
          <NavLink to="/create-product" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Create Product
          </NavLink>
          <NavLink to="/cart" aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`} className={navLinkClass} onClick={() => setMenuOpen(false)}>
            <span className="flex items-center gap-2">
              <span className="relative">
                <FontAwesomeIcon icon={faCartShopping} />
                {cartCount > 0 && (
                  <span aria-hidden="true" className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </span>
              Cart
            </span>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Navbar