import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const addToCart = (product, cart, setCart) => {
  if (!cart.find((item) => item.id === product.id)) {
    setCart([...cart, product]);
    console.log("Added to cart:", product);
  } else {
    console.log("Product is already in the cart.");
  }
};

function ProductList({ selectedCategory, cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products";

    setTimeout(() => {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, 1000);
  }, [selectedCategory]);

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
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
            </Link>
            <span className="price">€{product.price}</span>
            <button onClick={() => addToCart(product, cart, setCart)}>
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;
