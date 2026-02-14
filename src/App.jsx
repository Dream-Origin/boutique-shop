import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AppHeader from './components/AppHeader';
import Notification from './components/Notification';
import ConfirmModal from './components/ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredProducts } from './redux/selectors/selectFilteredProducts';
import { fetchProducts } from './redux/slices/productsSlice';
// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderSuccess from './pages/OrderSuccess';
import CustomerSupportPage from './pages/CustomerSupportPage';
import MyOrders from './pages/MyOrders';

// Components
import GoogleReviews from './components/GoogleReviews';
import FeaturesSection from './components/FeaturesSection';

// Protected Route Component
function ProtectedRoute({ children, isAuthenticated }) {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '' });

  const filteredProducts = useSelector(selectFilteredProducts);
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthenticated = !!user;

  // Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Notifications
  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    showNotification(`Welcome back, ${userData.name}!`);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    showNotification(`Welcome to Flone, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    showNotification('Logged out successfully');
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.productId === product.productId);
    if (existingItem) {
      showNotification(`${product.title} already in cart!`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      showNotification(`${product.title} added to cart!`);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
    showNotification("Item removed from cart");
  };

  const updateQuantity = (productId, change) => {
    const item = cart.find(item => item.productId === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) removeFromCart(productId);
      else setCart(cart.map(item => item.productId === productId ? { ...item, quantity: newQuantity } : item));
    }
  };

  const clearCart = () => setShowConfirm(true);

  const handleConfirmClear = () => {
    setCart([]);
    setShowConfirm(false);
    showNotification("Cart cleared!");
  };

  const cleaCartItem = () => {
    setCart([]);
  }

  const handleCancelClear = () => setShowConfirm(false);

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
  };

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <AppHeader cart={cart} />}

      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route
          path="/products"
          element={<Shop onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetails onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart} onClearCart={clearCart} />}
        />
        <Route
          path="/wishlist"
          element={<Wishlist wishlist={wishlist} onAddToCart={addToCart} onRemoveFromWishlist={toggleWishlist} />}
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} cleaCartItem={cleaCartItem} />}
        />
        <Route path="/order-success" element={<OrderSuccess cleaCartItem={cleaCartItem} />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/customer-support" element={<CustomerSupportPage />} />
      </Routes>

      <GoogleReviews />
      
      <FeaturesSection />
      <Notification show={notification.show} message={notification.message} />
      {!isAdminRoute && <Footer />}
      <ConfirmModal
        open={showConfirm}
        message="Do you really want to clear your entire cart?"
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
      />
    </>
  );
}

export default App;
