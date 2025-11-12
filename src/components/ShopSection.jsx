import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { productsData } from '../data/products'

function ShopSection({ onAddToCart, onToggleWishlist }) {
  const [filteredProducts, setFilteredProducts] = useState(productsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('default')

  const filterProducts = (search, cat, sort) => {
    let filtered = productsData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.category.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !cat || product.category === cat
      return matchesSearch && matchesCategory
    })

    // Sort products
    switch(sort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        filtered.sort((a, b) => a.id - b.id)
    }

    setFilteredProducts(filtered)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    filterProducts(value, category, sortBy)
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value
    setCategory(value)
    filterProducts(searchTerm, value, sortBy)
  }

  const handleSortChange = (e) => {
    const value = e.target.value
    setSortBy(value)
    filterProducts(searchTerm, category, value)
  }

  const handleQuickView = (productId) => {
    const product = productsData.find(p => p.id === productId)
    alert(`Quick view: ${product.name}`)
  }

  return (
    <section className="shop-container" id="shop">
      <div className="shop-header">
        <div className="filters">
          <div className="filter-group">
            <label>Search</label>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="filter-group">
            <label>Category</label>
            <select 
              className="filter-select"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="accessories">Accessories</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Sort By</label>
            <select 
              className="filter-select"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
        <div className="view-controls">
          <button className="view-btn active">⊞</button>
          <button className="view-btn">☰</button>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onQuickView={handleQuickView}
          />
        ))}
      </div>
    </section>
  )
}

export default ShopSection
