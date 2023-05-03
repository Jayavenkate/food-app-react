import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { API } from "./global";

export function Cart({ cartItem, removeFromCart, handlecartClear }) {
  const navigate = useNavigate();
  const totalPrice = cartItem.reduce((price, item) => price + item.prices, 0);
  const makepayment = (token) => {
    const body = {
      token,
      totalPrice,
    };

    fetch(`${API}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        {cartItem.map((item, _id) => (
          <div className="item" key={item._id}>
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
        <StripeCheckout
          name="Order Pizza"
          amount={totalPrice * 100}
          currency="INR"
          stripeKey="pk_test_51N2wUgSGE96adayZTJAYBtxqHEcQM4kPomEAkKz2LWMlLA1Q6KBAaSW2DiEwWp9L6aWTPgxOIWWlpP4humY7uKwh004mHkBAiI"
          token={makepayment}
        >
          <Button variant="contained" color="error">
            Order Now
          </Button>
        </StripeCheckout>
      </div>
    </div>
  );
}
