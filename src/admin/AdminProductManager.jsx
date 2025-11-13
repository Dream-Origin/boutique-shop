import React, { useState, useEffect } from "react";
import "./AdminProductManager.css";
import { updated_products } from "../data/updated_products";

const initialFormState = {
    id: "",
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
    returnPolicy: "",
    shippingDetails: { weight: "", deliveryTime: "" },
    images: [],
    description: "",
};

export default function AdminProductManager() {

    const [products, setProducts] = useState(updated_products);
    const [form, setForm] = useState(initialFormState);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        // Ideally fetch products from API or backend on load
        // For demo, empty or preset example can be used
    }, []);

    const handleInputChange = e => {
        const { name, value, type, checked } = e.target;

        if (name === "sizes" || name === "colors" || name === "images") {
            setForm(prev => ({
                ...prev,
                [name]: value.split(",").map(s => s.trim()),
            }));
        } else if (name.includes("shippingDetails.")) {
            const key = name.split(".")[1];
            setForm(prev => ({
                ...prev,
                shippingDetails: { ...prev.shippingDetails, [key]: value },
            }));
        } else if (type === "checkbox") {
            setForm(prev => ({ ...prev, [name]: checked }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleEdit = (product) => {
        setForm(product);
        setEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleCancel = () => {
        setForm(initialFormState);
        setEditing(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (editing) {
            setProducts(products.map(p => (p.id === form.id ? form : p)));
            setEditing(false);
        } else {
            if (!form.id) {
                alert("Please provide a unique id");
                return;
            }
            if (products.some(p => p.id === form.id)) {
                alert("Product with this id already exists.");
                return;
            }
            setProducts([...products, form]);
        }
        setForm(initialFormState);
    };


    const [expandedProductId, setExpandedProductId] = useState(null);

    const toggleExpand = id => {
        setExpandedProductId(prev => (prev === id ? null : id));
    };

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate pagination variables
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Slice products for current page
    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
        }
    };
    return (
        <div className="admin-product-manager">
            <h1>Product Manager</h1>
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Product ID*</label>
                    <input name="id" value={form.id} onChange={handleInputChange} disabled={editing} required />
                </div>
                <div className="form-row">
                    <label>Title*</label>
                    <input name="title" value={form.title} onChange={handleInputChange} required />
                </div>
                <div className="form-row">
                    <label>Category</label>
                    <input name="category" value={form.category} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                    <label>Sub Category</label>
                    <input name="subCategory" value={form.subCategory} onChange={handleInputChange} />
                </div>
                <div className="checkbox-group">
                    <label><input type="checkbox" name="budget" checked={form.budget} onChange={handleInputChange} /> Budget</label>
                    <label><input type="checkbox" name="premium" checked={form.premium} onChange={handleInputChange} /> Premium</label>
                    <label><input type="checkbox" name="exclusive" checked={form.exclusive} onChange={handleInputChange} /> Exclusive</label>
                    <label><input type="checkbox" name="handpicked" checked={form.handpicked} onChange={handleInputChange} /> Handpicked</label>
                    <label><input type="checkbox" name="bestSeller" checked={form.bestSeller} onChange={handleInputChange} /> Best Seller</label>
                    <label><input type="checkbox" name="unique" checked={form.unique} onChange={handleInputChange} /> Unique</label>
                    <label><input type="checkbox" name="newArrival" checked={form.newArrival} onChange={handleInputChange} /> New Arrival</label>
                </div>
                <div className="form-row">
                    <label>Price</label>
                    <input type="number" name="price" value={form.price} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                    <label>Discount %</label>
                    <input type="number" name="discountPercentage" value={form.discountPercentage} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                    <label>Rating</label>
                    <input type="number" step="0.1" max="5" min="0" name="rating" value={form.rating} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                    <label>Stock Quantity</label>
                    <input type="number" name="stock" value={form.stock} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                    <label>Original Price</label>
                    <input type="number" name="originalPrice" value={form.originalPrice} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                    <label>Sizes (comma separated)</label>
                    <input name="sizes" value={form.sizes.join(", ")} onChange={handleInputChange} placeholder="S, M, L" />
                </div>
                <div className="form-row">
                    <label>Colors (comma separated)</label>
                    <input name="colors" value={form.colors.join(", ")} onChange={handleInputChange} placeholder="Black, Red" />
                </div>
                <div className="form-row">
                    <label>Material</label>
                    <input name="material" value={form.material} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                    <label>Return Policy</label>
                    <input name="returnPolicy" value={form.returnPolicy} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                    <label>Shipping Weight</label>
                    <input name="shippingDetails.weight" value={form.shippingDetails.weight} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                    <label>Shipping Delivery Time</label>
                    <input name="shippingDetails.deliveryTime" value={form.shippingDetails.deliveryTime} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                    <label>Images (comma separated URLs)</label>
                    <input name="images" value={form.images.join(", ")} onChange={handleInputChange} placeholder="IMG_6393,..." />
                </div>
                <div className="form-row">
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={handleInputChange} rows={4} />
                </div>

                <div className="form-actions">
                    <button type="submit">{editing ? "Update Product" : "Add Product"}</button>
                    {editing && <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>}
                </div>
            </form>

            <hr />

            <h2>Product List</h2>
            <div className="product-list">
                {products.length === 0 && <p>No products added yet.</p>}
                {paginatedProducts.map(product => {
                    const isExpanded = product.id === expandedProductId;
                    return (
                        <div className="product-card" key={product.id}>
                            <div className="product-summary">
                                <strong>{product.title}</strong> <span>({product.category})</span>
                                <button onClick={() => toggleExpand(product.id)} className="expand-btn">
                                    {isExpanded ? "Hide Info" : "More Info"}
                                </button>
                            </div>

                            {isExpanded && (
                                <div className="product-details">
                                    <p><strong>Subcategory:</strong> {product.subCategory}</p>
                                    <p><strong>Budget:</strong> {product.budget ? "Yes" : "No"}</p>
                                    <p><strong>Premium:</strong> {product.premium ? "Yes" : "No"}</p>
                                    <p><strong>Exclusive:</strong> {product.exclusive ? "Yes" : "No"}</p>
                                    <p><strong>Handpicked:</strong> {product.handpicked ? "Yes" : "No"}</p>
                                    <p><strong>Best Seller:</strong> {product.bestSeller ? "Yes" : "No"}</p>
                                    <p><strong>Unique:</strong> {product.unique ? "Yes" : "No"}</p>
                                    <p><strong>New Arrival:</strong> {product.newArrival ? "Yes" : "No"}</p>
                                    <p><strong>Price:</strong> ₹{product.price}</p>
                                    <p><strong>Discount %:</strong> {product.discountPercentage}%</p>
                                    <p><strong>Rating:</strong> {product.rating} / 5</p>
                                    <p><strong>Stock:</strong> {product.stock} units</p>
                                    <p><strong>Original Price:</strong> ₹{product.originalPrice}</p>
                                    <p><strong>Sizes:</strong> {product.sizes.join(", ")}</p>
                                    <p><strong>Colors:</strong> {product.colors.join(", ")}</p>
                                    <p><strong>Material:</strong> {product.material}</p>
                                    <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                                    <p><strong>Shipping Weight:</strong> {product.shippingDetails.weight}</p>
                                    <p><strong>Delivery Time:</strong> {product.shippingDetails.deliveryTime}</p>
                                    <p><strong>Description:</strong> {product.description}</p>
                                    <p><strong>Images:</strong> {product.images.join(", ")}</p>
                                </div>
                            )}

                            <div className="product-actions">
                                <button onClick={() => handleEdit(product)}>Edit</button>
                                <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
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
                            className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
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
        </div>
    );
}
