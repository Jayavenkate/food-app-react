import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { API } from "./global";
import { useState } from "react";

export function Cart({ cartItem, removeFromCart, handlecartClear }) {
  const [txt, setTxt] = useState("");
  const [isTokenGenerated, setIsTokenGenerated] = useState(false);
  const generateToken = () => {
    if (isTokenGenerated) {
      return; // If the token has already been generated, do nothing.
    }

    const randomToken = Math.random().toString(36).substring(7);
    setTxt(randomToken);
    setIsTokenGenerated(true);
  };

  const navigate = useNavigate();
  const totalPrice = cartItem.reduce((price, item) => price + item.prices, 0);

  const makepayment = (token) => {
    const body = {
      token,
      totalPrice,
      cartItem,
    };
    console.log(body);
    // const headers = {
    //   "Content-Type": "application/json",
    // };
    // return fetch(`${API}/payments`, {
    //   method: "POST",
    //   headers,
    //   body: JSON.stringify(body),
    // })
    //   .then((res) => {
    //     console.log(res);
    navigate("/payment", { state: { token: token.email } });
    // navigate("/payment");
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  return (
    <div className="cart">
      <div>
        <h1>cart Items</h1>
      </div>
      {cartItem.length === 0 && <div>No items Are added</div>}
      <div className="clear-button">
        {cartItem.length >= 1 && (
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

      <div style={{ margin: "40px 0px " }}>
        {/* /generate-token */}

        {cartItem.length === 0 ? (
          "please select food items after you get token"
        ) : (
          <Button
            onClick={generateToken}
            variant="contained"
            sx={{ textTransform: "none", background: "red", fontSize: "25px" }}
          >
            Generate food token
          </Button>
        )}

        {cartItem.length === 0 ? (
          ""
        ) : (
          <p>
            <span
              style={{
                fontSize: "30px",
                color: "black ",
                fontStyle: "bold",
                fontWeight: "600px",
              }}
            >
              Your Food Token :
            </span>
            <span
              style={{
                fontSize: "30px",
                color: "black ",
                fontStyle: "bold",
                fontWeight: "600px",
              }}
            >
              {txt}
            </span>
          </p>
        )}
        {txt ? (
          <StripeCheckout
            name="Order Pizza"
            amount={totalPrice * 100}
            currency="INR"
            stripeKey="pk_test_51N2wUgSGE96adayZTJAYBtxqHEcQM4kPomEAkKz2LWMlLA1Q6KBAaSW2DiEwWp9L6aWTPgxOIWWlpP4humY7uKwh004mHkBAiI"
            token={makepayment}
            shippingAddress
          >
            {cartItem.length === 0 ? (
              " "
            ) : (
              <Button variant="contained" color="error">
                Order Now
              </Button>
            )}
          </StripeCheckout>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
