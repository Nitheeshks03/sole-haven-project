import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  ScrollArea,
  Button,
  Loader,
} from "@mantine/core";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { axiosInstance } from "../../axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router-dom";


export function ProductListScreen() {
  const screenWidth = window.innerWidth;
  const queryClient = useQueryClient();
  const { data: products, isLoading: productsLoading } = useQuery(
    ["products"],
    () => axiosInstance.get("/products").then((res) => res.data)
  );


  const createProductMutation = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: () => axiosInstance.post("/products").then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      notifications.show({
        title: "Product Created",
        color: "green",
        autoClose: 1500,
        icon: <IconCheck />,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const deleteProductMutation = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: (id) =>
      axiosInstance.delete(`/products/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      notifications.show({
        title: "Product Deleted",
        color: "green",
        autoClose: 1500,
        icon: <IconCheck />,
      });
    },
    onError: () => {
      notifications.show({
        title: "Product Deletion Failed",
        color: "red",
        autoClose: 1500,
        icon: <IconX />,
      });
    },
  });

  const handleCreateProduct = () => {
    createProductMutation.mutate();
  };

  const handleDeleteProduct = (id) => {
    deleteProductMutation.mutate(id);
  };



  const rows = products?.map((item) => (
    <tr key={item._id}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.image[0]} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text c="dimmed" fz="xs">
              {item._id}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text fz="sm">{item.brand}</Text>
        <Text fz="xs" c="dimmed">
          {item.countInStock} in stock
        </Text>
      </td>
 { screenWidth >500 &&    <td>
        <Text fz="sm">₹{item.price.toFixed(2)}</Text>
      </td> }
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <Link to={`/admin/products/${item._id}/edit`}>
              <IconPencil size="1rem" stroke={1.5} />
            </Link>
          </ActionIcon>
          <Menu
            transitionProps={{ transition: "pop" }}
            withArrow
            position="bottom-end"
            withinPortal
          >
            <Menu.Target>
              <ActionIcon>
                <IconTrash
                  size="1rem"
                  stroke={1.5}
                  color="red"
                  onClick={() => handleDeleteProduct(item._id)}
                />
              </ActionIcon>
            </Menu.Target>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      {productsLoading && (
        <Loader
          variant="bars"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            translate: "-50%",
          }}
        />
      )}
      <Button
        variant="outline"
        color="blue"
        onClick={() => handleCreateProduct()}
      >
        Create Product
      </Button>
      <ScrollArea>
        <Table verticalSpacing="md">
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}

export default ProductListScreen;
