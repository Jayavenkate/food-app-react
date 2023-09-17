import { useLocation } from "react-router-dom";
export function Payment() {
  const location = useLocation();
  const { token } = location.state;

  return (
    <div className="payment">
      <p>
        <span style={{ color: "red" }}>{token}</span> Your order have been
        placed successfully 😍🍕
      </p>
    </div>
  );
}
