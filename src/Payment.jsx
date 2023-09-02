import { useLocation } from "react-router-dom";
export function Payment() {
  const location = useLocation();
  const { token } = location.state;

  return (
    <div className="payment">
      <p>Your order have been placed successfully 😍🍕</p>
      <p className="token">Token Number: #{token}</p>
    </div>
  );
}
