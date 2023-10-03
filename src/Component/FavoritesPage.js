import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../Favorites";

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchFavoriteProducts = async () => {
      const productRequests = favorites.map((productId) =>
        fetch(`https://fakestoreapi.com/products/${productId}`).then(
          (response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          }
        )
      );

      try {
        const productDetails = await Promise.all(productRequests);
        setFavoriteProducts(productDetails);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favorites]);

  return (
    <div className="favorites-page">
      <h2>Favorite Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : favoriteProducts.length === 0 ? (
        <p>You haven't favorited any products yet.</p>
      ) : (
        <ul className="favorites-list">
          {favoriteProducts.map((product) => (
            <li key={product.id} className="favorite-item">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
              </Link>
              <span className="price">€{product.price}</span>
              <button
                className="favorite-button"
                onClick={() => toggleFavorite(product.id)}
              >
                ❤️
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">
        <button className="back-button">Back to Products</button>
      </Link>
    </div>
  );
}

export default FavoritesPage;
