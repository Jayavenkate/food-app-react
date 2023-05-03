import { useState } from "react";
// import { Pizza } from "./Pizza";
import { Button, Card, CardContent } from "@mui/material";

export function PizzaList({ pizzalist, addToCart }) {
  return (
    <div className="pizza-list">
      {pizzalist.map((item,_id) => (
        <Card className="pizza" key={item._id}>
          {/* <CardContent > */}
          <h2>{item.name}</h2>
          <img src={item.image} alt={item.name} className="image" />
          <h3>Price : {item.prices} Rs/-</h3>
          <Button
            variant="contained"
            color="error"
            onClick={() => addToCart(item)}
          >
            Add To Cart
          </Button>
          {/* </CardContent> */}
        </Card>
      ))}
    </div>
  );
}
