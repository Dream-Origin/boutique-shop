import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import './Checkout.css'
import { useImages } from '../hooks/useImages';
import boutiqueLogo from '../data/images/logo.png';

import { createOrder, updateOrderStatus } from "../api/ordersApi"; // import your API functions

function Checkout({ cart, user }) {
  const imagesKey = useImages();

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: user?.name || '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart', path: '/cart' },
    { label: 'Checkout' }
  ]

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Redirect if cart is empty
  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate('/products')
    }
  }, [cart, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0
  const tax = subtotal * 0.1 // 10% tax
  // const total = subtotal + shipping + tax
  const total = subtotal + shipping

  // Convert to INR (assuming USD to INR = 83)
  const totalInINR = Math.round(total * 100) // Convert to paise

  const totalOriginalPrice = cart.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );


  const youSave = totalOriginalPrice - subtotal;


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.firstName || !formData.email || !formData.phone || !formData.address) {
    alert("Please fill in all required fields");
    return;
  }

  setIsProcessing(true);

  try {
    // 1️⃣ Create order in backend
    const createdOrder = await createOrder({
      user: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: "India",
      },
      items: cart.map((item) => ({
        productId: item.productId,
        title: item.title,
        category: item.category,
        subCategory: item.subCategory,
        price: item.price,
        originalPrice: item.originalPrice,
        discountPercentage: item.discountPercentage,
        size: item.size,
        sizes: item.sizes,
        colors: item.colors,
        material: item.material,
        images: item.images,
        quantity: item.quantity,
      })),
      payment: {
        method: "Razorpay",
        status: "Pending",
      },
      totalAmount: totalInINR / 100,
    });

    const mongoOrderId = createdOrder?.order?._id;

    if (!mongoOrderId) {
      alert("Order ID not found!");
      setIsProcessing(false);
      return;
    }

    // 2️⃣ Setup Razorpay payment
    const options = {
      key: "rzp_live_S09MaJmlfXxM2S",
      amount: totalInINR,
      currency: "INR",
      name: "THARAGAI BOUTIQUE",
      description: "Purchase from THARAGAI BOUTIQUE",
      image: boutiqueLogo,
      order_id: '', // optional
      handler: async function (response) {
        const paymentId = response.razorpay_payment_id;

        // 3️⃣ Update backend order: status + paymentId
        await updateOrderStatus(mongoOrderId, "Confirmed", paymentId);

        // Clear cart
        localStorage.removeItem("cart");

        // Redirect to success page
        navigate("/order-success", {
          state: { paymentId, orderId: createdOrder.orderId },
        });
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
      },
      theme: { color: "#21808D" },
      modal: {
        ondismiss: async function () {
          // Update order as cancelled
          await updateOrderStatus(mongoOrderId, "Cancelled");

          setIsProcessing(false);
          alert("Payment cancelled");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setIsProcessing(false);

  } catch (error) {
    console.error("Payment Error:", error);
    alert("Payment failed. Please try again.");
    setIsProcessing(false);
  }
};



  if (!cart || cart.length === 0) {
    return null
  }

  return (
    <div className="shop-container">
      <div className='shop-breadcrumb-div'>
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="page-title">Checkout </h1>
      </div>


      <div className="checkout-page">
        {/* Checkout Form */}
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            {/* Billing Details */}
            <div className="form-section">
              <h2>Billing Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="form-control"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full-width btn-large"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${(totalInINR / 100).toFixed(2)}`}
            </button>
          </form>

          <div className="payment-info">
            <div className="payment-methods">
              <img src="https://cdn.razorpay.com/static/assets/pay_methods_branding.png" alt="Payment Methods" />
            </div>
            <p className="secure-payment">
              🔒 Secure payment powered by Razorpay
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-items">
            {cart.map(item => (
              <div key={item.productId} className="checkout-item">
                <img src={item.images[0]} alt={item.title} />
                <div className="checkout-item-info">
                  <div className="checkout-item-name">{item.title}</div>
                  <div className="checkout-item-qty">Qty: {item.quantity}</div>
                </div>
                <div className="checkout-item-price custom_price_css">
                  {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span className='custom_price_css'>{subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>You Save:</span>
              <span className='custom_price_css' style={{ color: 'green', fontWeight: '600' }}>
                {youSave.toFixed(2)}
              </span>
            </div>

            {/* <div className="summary-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
            </div> */}

            {/* <div className="summary-row">
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div> */}

            <div className="summary-row total">
              <span>Total (INR):</span>
              <span className='custom_price_css'>{(totalInINR / 100).toFixed(2)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout
