import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ScrollArea,
  Button,
  Loader,
} from "@mantine/core";
import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../.././axiosInstance";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export function OrdersListScreen() {
  const screenWidth = window.innerWidth;
  let TABLE_STYLES ;
  screenWidth < 1100 && (TABLE_STYLES = {display:"flex",flexDirection:"column",})
  const queryClient = useQueryClient();
  const {
    data: orders,
    isLoading,
  } = useQuery({
    queryKey: ["Orders"],
    queryFn: () => axiosInstance.get("/orders").then((res) => res.data),
  });

  const markAsDeliveredMutation = useMutation({
    mutationKey: ["markAsDelivered"],
    mutationFn: (id) => axiosInstance.put(`/orders/${id}/deliver`),
    onSuccess: () => {
      notifications.show({
        title: " Marked as delivered",
        color: "green",
        autoClose: 2000,
        icon: <IconCheck />,
      }),
      queryClient.invalidateQueries(["Orders"]);
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.response.data.message,
        color: "red",
        autoClose: 2000,
        icon: <IconX />,
      });
    },
  });

  const handleMarkAsDelivered = (id) => {
    markAsDeliveredMutation.mutate(id);
   
  };

  const rows = orders?.map((item) => (
    <tr key={item._id} style={TABLE_STYLES} >
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.avatar} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.orderItems[0].name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.orderItems[0].size}
            </Text>
          </div>
        </Group>
      </td>

      <td>{item.orderItems[0].qty}</td>
      <td>{item.orderItems[0]._id}</td>
      <td>{item.user}</td>
      <td>{item.paymentMethod}</td>
      <td>
        {item.isDelivered ? (
          <Badge color="gray">Delivered</Badge>
        ) : (
          <Badge>Not delivered</Badge>
        )}
      </td>
      <td>
        {" "}
        <Button onClick={() => handleMarkAsDelivered(item._id)}>
          Mark as delivered
        </Button>{" "}
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      {isLoading && <Loader variant="bars" />}
      <Table  verticalSpacing="sm">
        {screenWidth > 1100 && <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order Id</th>
            <th>User Id</th>
            <th>Payment method</th>
            <th>Order status</th>
            <th>Edit order</th>
          </tr>
        </thead>}
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default OrdersListScreen;
