import React, { useState } from "react";
import products from "../data/products";
import useCartStore from "../store/cartStore";
function Products() {
  const [quantities, setQuantities] = useState({});
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity); // This will trigger the console log inside the store
  };
  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + value),
    }));
  };

 

  return (
    <div className="mt-36 lg:mt-28 mb-6 px-4">
      <h1 className="text-2xl font-bold tracking-wide text-center">
        PRODUCTS
      </h1>

      <div className="bg-gradient-to-bl from-blue-50 to-violet-50 flex items-center justify-center mt-4">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative shadow-md rounded-xl overflow-hidden">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border p-4 shadow-md">
                <img
                  src={product.image}
                  alt=""
                  className="h-36 sm:h-44 w-full object-cover rounded-md"
                />
                <div className="font-bold text-lg mt-2 text-center">{product.name}</div>
                <p className="text-gray-700 text-xs text-center mt-1">{product.description}</p>
                <p className="text-gray-900 text-sm text-center font-semibold mt-1">${product.price}</p>

                <div className="flex items-center justify-center mt-3">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b">{quantities[product.id] || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="text-center mt-3 px-1 py-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
