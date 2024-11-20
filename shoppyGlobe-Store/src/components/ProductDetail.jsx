import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import "./ProductDetail.css";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  //All details for any specife item with help of id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchProduct();
  }, [id]);

  // Function to handle adding item to cart
  const handleAddToCart = () => {
    dispatch(addToCart(product));

    // Show success message for 3 seconds
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  if (error) return <div>Error fetching product: {error.message}</div>;
  if (!product) return <div>Loading...</div>;
  //return all detains afet view details
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} />

      <div className="detais">
        <h1>{product.title}</h1>
        <p className="price">
          <strong>Price:</strong> {product.price}$
        </p>
        <p>{product.description}</p>
        <p>Minimum Order: {product.minimumOrderQuantity}</p>
        <p>{product.returnPolicy}</p>
        <p>Rating: {product.rating}</p>

        <div className="button-container">
          <button onClick={handleAddToCart}>Add To Cart</button>
        </div>

        {showMessage && (
          <p className="success-message">Item added successfully!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
