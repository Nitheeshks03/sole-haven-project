import { Avatar, Text, Group } from "@mantine/core";
import './OrderDetailsScreen.css'

function OrderDetailsScreen() {
  const order = JSON.parse(localStorage.getItem("order")).data;

  return (
    <div className="container">
      <div className="order-items">
        <h2>Order Items</h2>
        {order?.orderItems?.map((item) => (
          <OrderItems key={item._id} item={item} />
        ))}
      </div>
      <div className="shipping-address">
        <h2>Shipping Address</h2>
        <p>Address: {order.shippingAddress.address}</p>
        <p>City: {order.shippingAddress.city}</p>
        <p>Postalcode: {order.shippingAddress.postalcode}</p>
        <p>country: {order.shippingAddress.country}</p>
      </div>
      <div className="order-details">
        <h2>Order Details</h2>
        <p>Order-ID: {order._id}</p>
        <p>Payment Method: {order.paymentMethod}</p>
        <p>Items Price: {order.itemsPrice}</p>
        <p>Shipping Price: {order.shippingPrice}</p>
        <p>Tax Price: {order.taxPrice}</p>
        <p>Total Price: {order.totalPrice}</p>
        <p>Order placed at: {order.createdAt}</p>
      </div>
    </div>
  );
}

export default OrderDetailsScreen;

function OrderItems({ item }) {
  return (
    <div>
      <Group>
        <Avatar src={item.image} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            Product-ID - {item._id}
          </Text>

          <Text fz="lg" fw={500}>
            {item.name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <Text fz="xs" c="dimmed">
             size - {item.size}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <Text fz="xs" c="dimmed">
             Quantity - {item.qty}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
