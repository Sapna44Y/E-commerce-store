// import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "./Header.css";

// const Header = () => {
//   const categories = ["beauty", "fragrances", "furniture", "groceries"];
//   const cart = useSelector((state) => state.cart);
//   const location = useLocation();

//   return (
//     <div>
//       <nav className="navbar">
//         <Link
//           to="/"
//           className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
//         >
//           Home
//         </Link>

//         <ul className="categories-list">
//           {categories.map((category) => (
//             <li key={category}>
//               <Link
//                 to={`/category/${category.toLowerCase()}`}
//                 className={`category-link ${
//                   location.pathname.includes(
//                     `/category/${category.toLowerCase()}`
//                   )
//                     ? "active"
//                     : ""
//                 }`}
//               >
//                 {category}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <Link
//           to="/cart"
//           className={`nav-item ${
//             location.pathname === "/cart" ? "active" : ""
//           }`}
//         >
//           Cart ({cart.length})
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Header;



import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
  const categories = ["beauty", "fragrances", "furniture", "groceries"];
  const cartItems = useSelector((state) => state.cart.items);
  const location = useLocation();

  // Calculate total quantity
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <nav className="navbar">
        <Link
          to="/"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>

        <ul className="categories-list">
          {categories.map((category) => (
            <li key={category}>
              <Link
                to={`/category/${category.toLowerCase()}`}
                className={`category-link ${
                  location.pathname.includes(`/category/${category.toLowerCase()}`)
                    ? "active"
                    : ""
                }`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/cart"
          className={`nav-item ${location.pathname === "/cart" ? "active" : ""}`}
        >
          Cart ({totalQuantity})
        </Link>
      </nav>
    </div>
  );
};

export default Header;
