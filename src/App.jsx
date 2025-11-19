import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Notification from './components/Notification'
import { productsData } from './data/products'
import OrderSuccess from './pages/OrderSuccess'
import AppHeader from './components/AppHeader'
import { useSelector } from 'react-redux'
import { selectFilteredProducts } from './redux/selectors/selectFilteredProducts'

// Protected Route Component
function ProtectedRoute({ children, isAuthenticated }) {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function App() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ show: false, message: '' })
  const filteredProducts = useSelector(selectFilteredProducts)
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isAuthenticated = !!user

  const showNotification = (message) => {
    console.log(message)
    setNotification({ show: true, message })
    setTimeout(() => {
      setNotification({ show: false, message: '' })
    }, 3000)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    showNotification(`Welcome back, ${userData.name}!`)
  }

  const handleRegister = (userData) => {
    setUser(userData)
    showNotification(`Welcome to Flone, ${userData.name}!`)
  }

  const handleLogout = () => {
    setUser(null)
    setCart([])
    setWishlist([])
    showNotification('Logged out successfully')
  }
  const addToCart = (id) => {

    const product = filteredProducts.find(p => p.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showNotification(`${product.title} added to cart!`);
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    showNotification('Item removed from cart');
  }

  const updateQuantity = (id, change) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        removeFromCart(id);
      } else {
        setCart(cart.map(item =>
          item.id === id
            ? { ...item, quantity: newQuantity }
            : item
        ));
      }
    }
  }

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      setCart([]);
      showNotification('Cart cleared!');
    }
  }

  const toggleWishlist = (id) => {
    const product = filteredProducts.find(p => p.id === id);
    const index = wishlist.findIndex(item => item.id === id);

    if (index > -1) {
      setWishlist(wishlist.filter(item => item.id !== id));
      showNotification(`${product.name} removed from wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      showNotification(`${product.name} added to wishlist!`);
    }
  }

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  }


  return (
    <>
      <ScrollToTop />
      {isAdminRoute ? <br /> : <AppHeader cart={cart} />}
      {/* <AppHeader cart={cart} /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route
          path="/products"
          element={
            <Shop
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              isInWishlist={isInWishlist}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              isInWishlist={isInWishlist}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              onAddToCart={addToCart}
              onRemoveFromWishlist={toggleWishlist}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Checkout cart={cart} user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="/order-success" element={<OrderSuccess />} />
        
      </Routes>

      <Notification
        show={notification.show}
        message={notification.message}
      />
      {isAdminRoute ? <br /> : <Footer />}
      {/* <Footer /> */}
    </>
  )
}

export default App
