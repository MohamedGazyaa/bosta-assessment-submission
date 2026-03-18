import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../features/products/productsSlice'
import ProductsGrid from '../components/ProductsList/ProductsGrid'
import Sorting from '../components/ProductsList/Sorting'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'

function ProductsList() {
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.products)

  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const categories = useMemo(
    () => [...new Set(items.map((p) => p.category))],
    [items]
  )

  const processed = useMemo(() => {
    let result = category ? items.filter((p) => p.category === category) : items
    if (sort === 'asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'desc') result = [...result].sort((a, b) => b.price - a.price)
    return result
  }, [items, category, sort])

  if (status === 'loading') return <LoadingSpinner />

  if (status === 'failed') return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
      <ErrorMessage message="Failed to fetch products" />
    </div>
  )

  return (
    <main>
      <Sorting
        categories={categories}
        category={category}
        sort={sort}
        onCategoryChange={(val) => { setCategory(val) }}
        onSortChange={(val) => { setSort(val) }}
      />
      <ProductsGrid products={processed} />
    </main>
  )
}

export default ProductsList