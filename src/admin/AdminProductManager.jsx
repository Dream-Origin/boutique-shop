import React, { useState, useEffect } from "react";
import "./AdminProductManager.css";
import {
  fetchProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";
import { csvToArray } from "../utils/helpers";

const initialFormState = {
  productId: "",
  title: "",
  category: "",
  subCategory: "",
  budget: false,
  premium: false,
  exclusive: false,
  handpicked: false,
  bestSeller: false,
  unique: false,
  newArrival: false,
  price: "",
  discountPercentage: "",
  rating: "",
  stock: "",
  originalPrice: "",
  sizes: [],
  colors: [],
  material: "",
  fabric: "",
  returnPolicy: "",
  shippingDetails: { weight: "", deliveryTime: "" },
  images: [],
  tags: [],
  description: "",
  details: "",
};

export default function AdminProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Error loading products");
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (["sizes", "colors", "images", "tags"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        [name]: csvToArray(value),
      }));
    } else if (name.includes("shippingDetails.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        shippingDetails: { ...prev.shippingDetails, [key]: value },
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditing(true);
  };

  const handleCancel = () => {
    setForm(initialFormState);
    setEditing(false);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setLoading(true);
        await deleteProduct(productId);
        await loadProducts();
        alert("Product deleted successfully");
      } catch (error) {
        alert("Error deleting product: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productId) {
      alert("Please provide a unique product ID");
      return;
    }

    setLoading(true);

    try {
      if (editing) {
        await updateProduct(form);
        alert("Product updated successfully");
      } else {
        if (products.some((p) => p.productId === form.productId)) {
          alert("Product with this ID already exists.");
          setLoading(false);
          return;
        }
        await saveProduct(form);
        alert("Product saved successfully");
      }
      await loadProducts();
      setForm(initialFormState);
      setEditing(false);
    } catch (error) {
      alert("Error saving product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (productId) => {
    setExpandedProductId((prev) => (prev === productId ? null : productId));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) setCurrentPage(pageNum);
  };

  return (
    <div className="admin-product-manager">
      <h1>Product Manager</h1>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <form className="product-form" onSubmit={handleSubmit}>
            {/* Product ID */}
            <div className="form-row">
              <label>Product ID*</label>
              <input
                name="productId"
                value={form.productId}
                onChange={handleInputChange}
                disabled={editing}
                required
              />
            </div>

            {/* Title */}
            <div className="form-row">
              <label>Title*</label>
              <input
                name="title"
                value={form.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Category */}
            <div className="form-row">
              <label>Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleInputChange}
              />
            </div>

            {/* Sub Category */}
            <div className="form-row">
              <label>Sub Category</label>
              <input
                name="subCategory"
                value={form.subCategory}
                onChange={handleInputChange}
              />
            </div>

            {/* Attribute Checkboxes */}
            <div className="checkbox-group">
              {[
                "budget",
                "premium",
                "exclusive",
                "handpicked",
                "bestSeller",
                "unique",
                "newArrival",
              ].map((attr) => (
                <label key={attr}>
                  <input
                    type="checkbox"
                    name={attr}
                    checked={form[attr]}
                    onChange={handleInputChange}
                  />{" "}
                  {attr[0].toUpperCase() + attr.slice(1)}
                </label>
              ))}
            </div>

            {/* Fabric */}
            <div className="form-row">
              <label>Fabric</label>
              <input
                name="fabric"
                value={form.fabric}
                onChange={handleInputChange}
              />
            </div>

            {/* Tags */}
            <div className="form-row">
              <label>Tags (comma separated)</label>
              <input
                name="tags"
                value={form.tags?.join(", ")}
                onChange={handleInputChange}
                placeholder="cotton, summer, casual"
              />
            </div>

            {/* Price */}
            <div className="form-row">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleInputChange}
              />
            </div>

            {/* Discount Percentage */}
            <div className="form-row">
              <label>Discount %</label>
              <input
                type="number"
                name="discountPercentage"
                value={form.discountPercentage}
                onChange={handleInputChange}
              />
            </div>

            {/* Rating */}
            <div className="form-row">
              <label>Rating</label>
              <input
                type="number"
                step="0.1"
                max="5"
                min="0"
                name="rating"
                value={form.rating}
                onChange={handleInputChange}
              />
            </div>

            {/* Stock */}
            <div className="form-row">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleInputChange}
              />
            </div>

            {/* Original Price */}
            <div className="form-row">
              <label>Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={form.originalPrice}
                onChange={handleInputChange}
              />
            </div>

            {/* Sizes */}
            <div className="form-row">
              <label>Sizes (comma separated)</label>
              <input
                name="sizes"
                value={form.sizes.join(", ")}
                onChange={handleInputChange}
                placeholder="S, M, L"
              />
            </div>

            {/* Colors */}
            <div className="form-row">
              <label>Colors (comma separated)</label>
              <input
                name="colors"
                value={form.colors.join(", ")}
                onChange={handleInputChange}
                placeholder="Black, Red"
              />
            </div>

            {/* Material */}
            <div className="form-row">
              <label>Material</label>
              <input
                name="material"
                value={form.material}
                onChange={handleInputChange}
              />
            </div>

            {/* Return Policy */}
            <div className="form-row">
              <label>Return Policy</label>
              <input
                name="returnPolicy"
                value={form.returnPolicy}
                onChange={handleInputChange}
              />
            </div>

            {/* Shipping Details */}
            <div className="form-row">
              <label>Shipping Weight</label>
              <input
                name="shippingDetails.weight"
                value={form.shippingDetails.weight}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label>Shipping Delivery Time</label>
              <input
                name="shippingDetails.deliveryTime"
                value={form.shippingDetails.deliveryTime}
                onChange={handleInputChange}
              />
            </div>

            {/* Images */}
            <div className="form-row">
              <label>Images (comma separated URLs)</label>
              <input
                name="images"
                value={form.images.join(", ")}
                onChange={handleInputChange}
                placeholder="IMG_6393,..."
              />
            </div>

            {/* Description */}
            <div className="form-row">
              <label>Additional Details</label>
              <textarea
                name="details"
                value={form.details}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            {/* Description */}
            <div className="form-row">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="submit">
                {editing ? "Update Product" : "Add Product"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <hr />

          <h2>Product List</h2>
          <div className="product-list">
            {products.length === 0 && <p>No products added yet.</p>}

            {paginatedProducts.map((product) => {
              const isExpanded = product.productId === expandedProductId;
              return (
                <div className="product-card" key={product.productId}>
                  <div className="product-summary">
                    <strong>{product.title}</strong>{" "}
                    <span>({product.category})</span>
                    <button
                      onClick={() => toggleExpand(product.productId)}
                      className="expand-btn"
                    >
                      {isExpanded ? "Hide Info" : "More Info"}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="product-details">
                      <p>
                        <strong>Subcategory:</strong> {product.subCategory}
                      </p>
                      <p>
                        <strong>Budget:</strong> {product.budget ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Premium:</strong> {product.premium ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Exclusive:</strong>{" "}
                        {product.exclusive ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Handpicked:</strong>{" "}
                        {product.handpicked ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Best Seller:</strong>{" "}
                        {product.bestSeller ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Unique:</strong> {product.unique ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>New Arrival:</strong>{" "}
                        {product.newArrival ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Fabric:</strong> {product.fabric}
                      </p>
                      <p>
                        <strong>Tags:</strong> {product.tags?.join(", ")}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{product.price}
                      </p>
                      <p>
                        <strong>Discount %:</strong> {product.discountPercentage}%
                      </p>
                      <p>
                        <strong>Rating:</strong> {product.rating} / 5
                      </p>
                      <p>
                        <strong>Stock:</strong> {product.stock} units
                      </p>
                      <p>
                        <strong>Original Price:</strong> ₹{product.originalPrice}
                      </p>
                      <p>
                        <strong>Sizes:</strong> {product.sizes.join(", ")}
                      </p>
                      <p>
                        <strong>Colors:</strong> {product.colors.join(", ")}
                      </p>
                      <p>
                        <strong>Material:</strong> {product.material}
                      </p>
                      <p>
                        <strong>Return Policy:</strong> {product.returnPolicy}
                      </p>
                      <p>
                        <strong>Shipping Weight:</strong>{" "}
                        {product.shippingDetails.weight}
                      </p>
                      <p>
                        <strong>Delivery Time:</strong>{" "}
                        {product.shippingDetails.deliveryTime}
                      </p>
                      <p>
                        <strong>Details:</strong> {product.details}
                      </p>
                      <p>
                        <strong>Description:</strong> {product.description}
                      </p>
                      <p>
                        <strong>Images:</strong> {product.images.join(", ")}
                      </p>
                    </div>
                  )}

                  <div className="product-actions">
                    <button onClick={() => handleEdit(product)}>Edit</button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`pagination-btn ${currentPage === i + 1 ? "active" : ""
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
