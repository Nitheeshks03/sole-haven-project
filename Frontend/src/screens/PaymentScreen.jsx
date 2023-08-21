import Cart from "../components/Cart";
import { Divider, Select } from "@mantine/core";
import { Text, Paper, Button } from "@mantine/core";
import "./PaymentScreen.css";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { AddressContext } from "../contexts/AddressContext";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from ".././axiosInstance";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';

function PaymentScreen() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const { subTotal, cart } = useContext(CartContext);
  const {
    name,
    phone,
    city,
    zipcode: postalCode,
    address,
  } = useContext(AddressContext);
  const shipping =
    (0.1 * subTotal).toFixed(2) < 500 ? (0.1 * subTotal).toFixed(2) : 500;
  const tax = (0.18 * subTotal).toFixed(2);
  const total = (Number(subTotal) + Number(shipping) + Number(tax)).toFixed(2);
  const orderItems = cart.map((item) => {
    return {
      name: item.product.name,
      qty: item.qty,
      size: item.size,
      price: item.product.price,
      image: item.product.image[0],
      product: item.product._id,
    };
  });
  const shippingAddress = {
    address,
    city,
    postalCode,
    country: "India",
  };

  const itemsPrice = Number(subTotal);
  const shippingPrice = Number(shipping);
  const taxPrice = Number(tax);
  const totalPrice = Number(total);

  const order = {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  const createOrderMutation = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: () =>
      axiosInstance
        .post("/orders", order)
        .then((data) => localStorage.setItem("order", JSON.stringify(data))),
    onSuccess: () => {
      notifications.show({
        title: "Order placed successfully",
        autoClose: 2000,
        icon: <IconCheck />,
        onClose: () => navigate('/orders/new'),
      });
     

    },
    onError: (error) => {
      notifications.show({
        title: "Order failed",
        message: error.response.data.message,
        color: "red",
        icon: <IconX />,
      });
    },
  });

  const handlePlaceOrder = () => {
    createOrderMutation.mutate();
  };

  return (
    <div className="payment-container">
      <div className="order">
        <div className="shipping">
          <h2>Shipping</h2>
          <Paper className="shipping-details" shadow="xs" p="md" radius="xs">
            <Text className="address-details">
              <p>Name: {name}</p>
              <Divider />
              <p>Phone: {phone}</p>
              <Divider />
              <p>City: {city}</p>
              <Divider />
              <p>Zipcode: {postalCode}</p>
              <Divider />
              <p>Address: {address}</p>
            </Text>
          </Paper>
        </div>
        <div className="payment">
          <h2>Payment</h2>
          <Select
            label="Select payment method"
            placeholder="Select payment method"
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
            data={[
              { value: "paypal", label: "Paypal" },
              { value: "stripe", label: "Stripe" },
              { value: "cash", label: "Cash" },
            ]}
          />
        </div>
        <div className="cart-items">
          <h2>Cart Items</h2>
          <Cart />
        </div>
      </div>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <hr />
        <p>Subtotal - ₹{subTotal}</p>
        <Divider />
        <p>Shipping - ₹{shipping}</p>
        <Divider />
        <p>Tax - ₹{tax}</p>
        <Divider />
        <h4>Total - ₹{total}</h4>
        <Button className="order-btn" onClick={handlePlaceOrder}>
          Place order
        </Button>
      </div>
    </div>
  );
}

export default PaymentScreen;
