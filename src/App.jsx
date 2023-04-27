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

export default function App() {
  const [pizzalist, setPizzaList] = useState([]);
  const getPizza = () => {
    fetch("http://localhost:7000/pizzalist", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((pz) => setPizzaList(pz));
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
    <div className="App">
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              PIZZA APP
            </Typography>
            <Button color="inherit" onClick={() => navigate("/pizzalist")}>
              Home
            </Button>

            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
            <Button color="inherit" onClick={() => navigate("/cart")}>
              <ShoppingCartIcon />
              {cartItem.length === 0 ? "" : cartItem.length}
            </Button>
          </Toolbar>
        </AppBar>
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
