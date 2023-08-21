import Cart from "../components/Cart";
import "./CartScreen.css";
import { Button,Divider } from "@mantine/core";
import { CartContext } from '../contexts/CartContext';
import { useContext } from 'react';
function CartScreen({handleStepChange,active}) {
  const {subTotal} = useContext(CartContext);

  const handleStep=()=>{
    handleStepChange(active+1);
  }


  return (
    <div className="container">
      <div className="items-container">
        <Cart />
      </div>
      <div className="cart-container">
        <h2>Cart Total</h2>
        <Divider />
        <p>Subtotal : ₹{subTotal}</p>
        <Divider />
        <Button className="checkout-btn" onClick={handleStep}  >Proceed To Checkout</Button>
      </div>
    </div>
  );
}

export default CartScreen;
