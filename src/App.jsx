import "./App.css";
import { PizzaList } from "./PizzaList";
import AppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { SignUp } from "./SignUp";
import { Cart } from "./Cart";
import { useEffect, useState } from "react";
import { Payment } from "./Payment";
import { Login } from "./Login";
import { Home } from "./Home";
import { ForgetPass } from "./ForgetPass";
import { VerifyOtp } from "./VerifyOtp";
import { SetPassword } from "./SetPassword";

function checkAuth(data) {
  if (data.status === 401) {
    throw Error("unauthorized");
  } else {
    return data.json();
  }
}

export default function App() {
  const [pizzalist, setPizzaList] = useState([]);

  const getPizza = () => {
    fetch("http://localhost:7000/pizzalist", {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((data) => checkAuth(data))
      .then((pz) => setPizzaList(pz));
    // .catch(err => logout());
  };
  useEffect(() => getPizza(), []);

  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();
  const addToCart = (item) => {
    setCartItem([...cartItem, item]);
  };
  const removeFromCart = (item) => {
    setCartItem(cartItem.filter((i) => i != item));
  };
  const handlecartClear = () => {
    setCartItem([]);
  };

  return (
    <div>
      <AppBar position="static" color="error">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PIZZA APP
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>

          <Button color="inherit" onClick={() => navigate("/pizzalist")}>
            menu
          </Button>

          <Button color="inherit" onClick={() => navigate("/cart")}>
            <ShoppingCartIcon />
            {cartItem.length === 0 ? "" : cartItem.length}
          </Button>
        </Toolbar>
      </AppBar>
      <div className="App">
        <Routes>
          <Route
            path="/pizzalist"
            element={
              <PizzaList
                pizzalist={pizzalist}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setpassword" element={<SetPassword />} />

          <Route path="/verifyotp" element={<VerifyOtp />} />

          <Route path="/login/forgetpassword" element={<ForgetPass />} />

          <Route path="/" element={<Home />} />

          <Route
            path="/cart"
            element={
              <Cart
                cartItem={cartItem}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                handlecartClear={handlecartClear}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
