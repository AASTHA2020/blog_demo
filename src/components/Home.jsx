import React from "react";
import blog1 from "../assets/blog1.jpg";
import DownloadIcon from "@mui/icons-material/Download";
import products from "../data/products";
function Home() {
  return (
    <div className=" relative w-full h-full mb-11 ">
      <div className="h-96">
        <img src={blog1} alt="" className="w-full h-full object-cover z-auto" />
      </div>

      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-100 py-0 sm:py-8">
        <div class="mx-auto max-w-screen-xl py-4 px-4 w-full">
          <h2 class=" flex align-center justify-center mb-4 font-bold text-2xl text-gray-600">
            Our Products Lists
          </h2>
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-items-center gap-6  m-auto">
            {products.map((product) => (
              <div key={product.id} class="">
                <div class="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm">
                  <div class="h-auto overflow-hidden">
                    <div class="h-44 overflow-hidden relative">
                      <img src={product.image} alt="" />
                    </div>
                  </div>
                  <div class="bg-white py-4 px-3">
                    <h3 class="text-xs mb-2 font-medium">{product.name}</h3>
                    <div class="flex justify-between items-center">
                      <p class="text-xs text-gray-400">{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
