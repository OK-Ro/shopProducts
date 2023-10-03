import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CategoryList from "./Component/CategoryList";
import ProductList from "./Component/ProductList";
import ProductDetail from "./Component/ProductDetail";
import { FavoritesProvider } from "./Favorites";
import FavoritesPage from "./Component/FavoritesPage";
import Cart from "./Component/Cart";

import "./Component/CategoryList.css";
import "./Component/FavoritesPage.css";
import "./Component/ProductDetail.css";
import "./Component/ProductList.css";
import "./Component/Cart.css";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  return (
    <FavoritesProvider>
      <Router>
        <div className="app">
          <h1>
            <Link to="/" className="products-link">
              Products
            </Link>
            <Link to="/cart" className="cart-link">
              Cart ({cart.length})
            </Link>
            <Link to="/favorites" className="favorites-link">
              Favorites
            </Link>
          </h1>

          <CategoryList onCategoryClick={handleCategoryClick} />
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  selectedCategory={selectedCategory}
                  cart={cart}
                  setCart={setCart}
                />
              }
            />
            <Route
              path="/product/:id"
              element={<ProductDetail cart={cart} setCart={setCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} removeFromCart={removeFromCart} />}
            />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
