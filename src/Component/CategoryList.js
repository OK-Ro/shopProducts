import React, { useState, useEffect } from "react";

function CategoryList({ onCategoryClick }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    // Fetch categories from the API
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        if (data.length > 0) {
          setActiveCategory(data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Function to handle category click and update activeCategory
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryClick(category);
  };

  return (
    <div className="category-list">
      <div className="category-buttons">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-button ${
              cat === activeCategory ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="category-name">
        <h2>Active: {activeCategory || "None"}</h2>
      </div>
    </div>
  );
}

export default CategoryList;
