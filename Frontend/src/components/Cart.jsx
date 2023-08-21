import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ScrollArea,
  NumberInput,
  Button,
} from "@mantine/core";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  const handleQuantity = (itemIndex, newQty) => {
    const updatedCart = [...cart];
    updatedCart[itemIndex].qty = newQty;
    setCart(updatedCart);
  };

  const handleDeleteItem = (deleteItem) => {
    const updatedCart = cart.filter(
      (cartItem) => cartItem.product._id !== deleteItem.product._id
    );
    setCart(updatedCart);
  };

  if (cart.length === 0)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontFamily: "Montserrat", fontWeight: "400" }}>
          Cart is empty
        </h2>
        <Button variant="outline" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </div>
    );

  const rows = cart?.map((item, index) => (
    <tr key={item.product.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.product.image[0]} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.product.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.product.subCategory} | size - {item.size}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <NumberInput
          value={item.qty}
          onChange={(newQty) => handleQuantity(index, newQty)}
          maw={"100px"}
        />
      </td>
      <td>₹{item.product.price}</td>
      <td style={{overflow:'hidden'}}>
        <Badge
          color="red"
          variant="light"
          sx={{ cursor: "pointer" }}
          onClick={()=>handleDeleteItem(item)}
        >
          delete
        </Badge>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table  verticalSpacing="sm" highlightOnHover >
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default Cart;
