import { useState } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductItem from "./ProductItem";
import "./ProductList.css";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const { products = [], error } = useFetchProducts();
  //serch items
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search Product..."
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />
      {error ? (
        <div>Error Fetching Products: {error.message}</div>
      ) : (
        <div className="product-list-container">
          {filteredProducts.map((product) => (
            <div className="product-item" key={product.id}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
