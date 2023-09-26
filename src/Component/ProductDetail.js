import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addToCart } from "./ProductList"; 

function ProductDetail({ cart, setCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, cart, setCart);
    }
  };

  return (
    <div className="product-detail">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occurred: {error.message}</p>
      ) : product ? (
        <>
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} />
          <span className="price">€{product.price}</span>
          <p>Description: {product.description}</p>
          <p>Rating: {product.rating.rate}</p>
          <p>Reviews: {product.rating.count}</p>
          <p>Category: {product.category}</p>
          <div>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <Link to="/">Back to All Products</Link>
          </div>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default ProductDetail;
