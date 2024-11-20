import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageForProduct, setMessageForProduct] = useState(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setMessageForProduct(product.id);
    setTimeout(() => setMessageForProduct(null), 3000);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div>
      <h1>{category} Products</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search product..."
        onChange={(e) => setSearch(e.target.value)} // Update search state on input change
        value={search} // Bind the input to the search state
        className="search-box"
      />

      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products available matching your search.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="products">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <h3>{product.title}</h3>
              <p>${product.price}</p>

              <div className="button-container">
                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
                <Link to={`/product/${product.id}`} className="view-details">
                  View Details
                </Link>
              </div>

              {messageForProduct === product.id && (
                <p className="success-message">Item added successfully!</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
