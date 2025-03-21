import { useEffect, useState } from "react";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) throw new Error("Faild to fetch products");
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err);
      }
    };
    fetchProducts();
  }, []);
  return { products, error };
};

export default useFetchProducts;
