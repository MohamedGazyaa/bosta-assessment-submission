import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

const PAGE_SIZE = 8

function ProductsGrid({ products }) {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [products])

  const totalPages = Math.ceil(products.length / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const paginated = products.slice(start, start + PAGE_SIZE)

  return (
    <div className="flex flex-col gap-6 p-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {paginated.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2" role="navigation" aria-label="Pagination">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`px-3 py-1 border rounded transition-colors ${
                p === page ? 'bg-gray-800 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductsGrid