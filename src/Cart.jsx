import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export function Cart({ cartItem, addToCart, removeFromCart, handlecartClear }) {
 const navigate = useNavigate();
  const totalPrice = cartItem.reduce((price, item) => price + item.prices, 0);
  return (
    <div className="cart">
      <div>
        <h1>cart Items</h1>
      </div>
      {cartItem.length === 0 && <div>No items Are added</div>}
      <div className="clear-button">
        {cartItem.length >= 1 && (
          // <Button onClick={handlecartClear} >Clear All</Button>
          <Button variant="contained" onClick={handlecartClear} color="error">
            Clear All
          </Button>
        )}
      </div>
      <div className="cart-items">
        {cartItem.map((item, id) => (
          <div key={item.id} className="item">
            <img src={item.image} alt={item.name} className="image-cart" />
            <p className="name">{item.name}</p>

            <div>
              {/* <button onClick={() => addToCart(item)}>+</button> */}
              <button className="btn" onClick={() => removeFromCart(item)}>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </button>
            </div>

            <h4>{item.prices} Rs/-</h4>
          </div>
        ))}
      </div>
      <div className="total-price">
        <div> TotalPrice -{totalPrice} Rs/-</div>
      </div>
      <div>
      <Button variant="contained" color="error" onClick={()=>navigate("/payment")}>Order Now</Button>
        
      </div>
    </div>
  );
}
