import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from "./Pages/Signup";
import { CartProvider } from "./Components/CartContext";
import MyOrder from "./Pages/MyOrder";
// import Cart from "./Pages/Cart";
function App() {
  return (
    <CartProvider>
      <Router>

        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createUser" element={<Signup />} />
            {/* <Route exact path="/cart" element={<Cart />} /> */}
            <Route exact path="/MyOrder" element={<MyOrder />} />
          </Routes>

        </div>

      </Router>
    </CartProvider>
  );
}

export default App;
