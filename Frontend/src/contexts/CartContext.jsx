import { notifications } from "@mantine/notifications";
import { createContext, useEffect, useState } from "react";

const initialCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product, size, qty) => {
    const newItem = {
      product,
      qty,
      size,
    };
    if (cart?.find((item) => item.product._id === product._id)) {
      notifications.show({
        title: "Item already in cart",
      });
    } else {
      setCart((items) => [...items, newItem]);
      notifications.show({
        title: "Item added to cart",
      });
    }
  };
  const subTotal = cart
    ?.reduce((acc, item) => {
      return acc + item.product.price * item.qty;
    }, 0)
    .toFixed(2);

  const cartQty = cart.length;

  return (
    <CartContext.Provider
      value={{ cart, setCart, handleAddToCart, subTotal, cartQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
