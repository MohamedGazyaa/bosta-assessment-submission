import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, resetCreateStatus, fetchProducts } from '../features/products/productsSlice'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'

const initialForm = { title: '', description: '', price: '', category: '', image: '' }

function CreateProduct() {
  const dispatch = useDispatch()
  const { createStatus, items, status } = useSelector((state) => state.products)
  const categories = [...new Set(items.map((p) => p.category))]

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProducts())
  }, [items.length, dispatch])

  useEffect(() => {
    return () => { dispatch(resetCreateStatus()) }
  }, [dispatch])

  if (status === 'loading' || status === 'idle') return <LoadingSpinner />

  if (status === 'failed') return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
      <ErrorMessage message="Please try again!" />
    </div>
  )

  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = 'Title is required.'
    if (!form.description.trim()) next.description = 'Description is required.'
    if (!form.image.trim()) next.image = 'Image URL is required.'
    if (!form.category) next.category = 'Category is required.'
    if (!form.price) {
      next.price = 'Price is required.'
    } else if (Number(form.price) <= 0) {
      next.price = 'Price must be a positive number.'
    }
    return next
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length) { setErrors(next); return }
    dispatch(createProduct({ ...form, price: Number(form.price) })).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        setForm(initialForm)
        setErrors({})
      }
    })
  }

  const isLoading = createStatus === 'loading'

  return (
    <main className="max-w-xl mx-auto px-6 py-12" aria-label="Create product form">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Create Product</h1>

      {createStatus === 'succeeded' && (
        <div role="alert" className="mb-6 p-4 rounded bg-green-50 border border-green-300 text-green-800 text-sm">
          Product created successfully!
        </div>
      )}

      {createStatus === 'failed' && (
        <div role="alert" className="mb-6 p-4 rounded bg-red-50 border border-red-300 text-red-800 text-sm">
          Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            aria-describedby={errors.title ? 'title-error' : undefined}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {errors.title && <p id="title-error" role="alert" className="text-xs text-red-600">{errors.title}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            aria-describedby={errors.description ? 'description-error' : undefined}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
          />
          {errors.description && <p id="description-error" role="alert" className="text-xs text-red-600">{errors.description}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            aria-describedby={errors.price ? 'price-error' : undefined}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {errors.price && <p id="price-error" role="alert" className="text-xs text-red-600">{errors.price}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            aria-describedby={errors.category ? 'category-error' : undefined}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p id="category-error" role="alert" className="text-xs text-red-600">{errors.category}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="image" className="text-sm font-medium text-gray-700">Image URL</label>
          <input
            id="image"
            name="image"
            type="text"
            value={form.image}
            onChange={handleChange}
            aria-describedby={errors.image ? 'image-error' : undefined}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {errors.image && <p id="image-error" role="alert" className="text-xs text-red-600">{errors.image}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="mt-2 px-6 py-2.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Create Product'}
        </button>
      </form>
    </main>
  )
}

export default CreateProduct