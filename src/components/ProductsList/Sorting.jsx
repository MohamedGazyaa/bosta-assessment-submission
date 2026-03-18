function Sorting({ categories, category, sort, onCategoryChange, onSortChange }) {
  return (
    <div className="flex flex-wrap gap-4 px-6 pt-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="category-filter" className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Category
        </label>
        <select
          id="category-filter"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border rounded px-3 py-1.5 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sort-order" className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Sort by Price
        </label>
        <select
          id="sort-order"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border rounded px-3 py-1.5 text-sm"
        >
          <option value="">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}

export default Sorting