import { useState } from "react";
// import { Pizza } from "./Pizza";

export function PizzaList({ pizzalist, addToCart }) {
  return (
    <div className="pizza-list">
      {pizzalist.map((item) => (
        <div className="pizza">
          <h2>{item.name}</h2>
          <img src={item.image} alt={item.name} className="image" />
          <h3>Price : {item.prices} Rs/-</h3>
          <button onClick={() => addToCart(item)}>Add To Cart</button>
        </div>
      ))}
    </div>
  );
}
