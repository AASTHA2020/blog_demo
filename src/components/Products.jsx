import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa"; // Importing heart icon from react-icons
import useCartStore from "../store/cartStore";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [favorites, setFavorites] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 5; // Number of items per page
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || product.category === selectedCategory)
    );

    if (sortOrder === "lowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [priceRange, products, sortOrder, searchTerm, selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + value),
    }));
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePriceRangeChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = products
        .filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    setSuggestions([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="mt-36 lg:mt-28 mb-6 px-4">
      <h1 className="text-2xl font-bold tracking-wide text-center">PRODUCTS</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-4 gap-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="border rounded px-4 py-2 w-64"
          />
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border rounded shadow-md mt-1 w-64 max-h-40 overflow-y-auto z-10">
               {suggestions.map((suggestion) => (
    <li
      key={suggestion.id}
      onClick={() => {
        handleSuggestionClick(suggestion.title); // Existing functionality
        setSuggestions([]); // Close the suggestion box
      }}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {suggestion.title}
    </li>
  ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Sort By</label>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="border rounded px-2 py-1"
          >
            <option value="">None</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="jewelery">Jewelry</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>

      {/* Full Detailed View */}
      {selectedProduct ? (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <button
            className="mb-4 text-blue-500 underline hover:text-blue-700"
            onClick={handleBackToList}
          >
            ← Back to Products
          </button>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="h-60 w-60 object-contain mx-auto"
            />
            <div>
              <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{selectedProduct.description}</p>
              <p className="text-lg font-semibold mb-2 text-green-600">${selectedProduct.price}</p>
              <p className="text-sm mb-2"><strong>Category:</strong> {selectedProduct.category}</p>
              <p className="text-sm mb-4">
                <strong>Rating:</strong> {selectedProduct.rating?.rate} ⭐ ({selectedProduct.rating?.count} reviews)
              </p>

              <div className="flex items-center mb-4">
                <button
                  onClick={() => handleQuantityChange(selectedProduct.id, -1)}
                  className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b">
                  {quantities[selectedProduct.id] || 1}
                </span>
                <button
                  onClick={() => handleQuantityChange(selectedProduct.id, 1)}
                  className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(selectedProduct)}
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Product List View
        <div className="bg-gradient-to-bl from-blue-50 to-violet-50 flex items-center justify-center mt-4">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border p-4 shadow-md relative"
                >
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 text-xl"
                  >
                    <FaHeart
                      className={`${
                        favorites[product.id] ? "text-red-500" : "text-gray-300"
                      }`}
                    />
                  </button>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-36 sm:h-44 w-full object-contain rounded-md"
                  />
                  <div className="font-bold text-md mt-2 text-center line-clamp-2">
                    {product.title}
                  </div>
                  <p className="text-gray-700 text-xs text-center mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-gray-900 text-sm text-center font-semibold mt-1">
                    ${product.price}
                  </p>

                  <div className="flex items-center justify-center mt-3">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">
                      {quantities[product.id] || 1}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-center mt-3 flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="text-blue-500 border border-blue-500 hover:bg-blue-50 px-4 py-2 rounded"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
