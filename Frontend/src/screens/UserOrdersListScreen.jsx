import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ScrollArea,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from ".././axiosInstance";

export function UserOrdersListScreen() {
  const screenWidth = window.innerWidth;
  const { data : orders} = useQuery({
    queryKey: ["userOrders"],
    queryFn: () => axiosInstance.get("/orders/myorders").then((res) => res.data),
  });
  
  const rows = orders?.map((item) => (
    <tr key={item._id}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.orderItems[0].image} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.orderItems[0].name}
            </Text>
            <Text fz="xs" c="dimmed">
              {screenWidth > 800 ? item.orderItems[0].size : item.orderItems[0]._id}
            </Text>
          </div>
        </Group>
      </td>

    {screenWidth>800 && <> <td>{item.orderItems[0].qty}</td>
      <td>{item.orderItems[0]._id}</td>
      <td>{item.paymentMethod}</td></> }
      <td>
        {item.isDelivered ? (
          <Badge color="gray">
            Delivered
          </Badge>
        ) : (
          <Badge>Not delivered</Badge>
        )}
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table  verticalSpacing="sm">
        <thead>
          <tr>
            <th>Product</th>
           { screenWidth> 800 && <th>Quantity</th>}
            {screenWidth> 800 &&<th>Order Id</th>}
            {screenWidth> 800 &&<th>Payment method</th>}
            <th>Order status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default UserOrdersListScreen;
