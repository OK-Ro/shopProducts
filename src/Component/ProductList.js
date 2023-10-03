import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../Favorites";
import useFetch from "../useFetch";

export const addToCart = (product, cart, setCart) => {
  if (!cart.find((item) => item.id === product.id)) {
    setCart([...cart, product]);
    console.log("Added to cart:", product);
  } else {
    console.log("Product is already in the cart.");
  }
};

function ProductList({ selectedCategory, cart, setCart }) {
  const { favorites, toggleFavorite } = useFavorites();
  const apiUrl = selectedCategory
    ? `https://fakestoreapi.com/products/category/${selectedCategory}`
    : "https://fakestoreapi.com/products";
  const { data: products, loading, error } = useFetch(apiUrl);

  // Function to check if a product is in favorites
  const isProductInFavorites = (productId) => {
    return favorites.includes(productId);
  };

  return (
    <div className="product-list">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        products.map((product, index) => (
          <div key={product.id} className="product">
            <Link to={`/product/${product.id}`}>
              <div className="product-info">
                <h3>{product.title}</h3>
              </div>
              <div className="product-image-container">
                <img src={product.image} alt={product.title} />
                {isProductInFavorites(product.id) ? (
                  <button
                    className="favorite-buttons"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                  >
                    ❤️
                  </button>
                ) : (
                  <button
                    className="favorite-buttons"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                  >
                    🖤
                  </button>
                )}
              </div>
            </Link>
            <span className="price">€{product.price}</span>
            <button
              className="cart-buttons"
              onClick={() => addToCart(product, cart, setCart)}
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
}
export default ProductList;
