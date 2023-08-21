import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  ScrollArea,
} from "@mantine/core";
import { IconPencil, IconTrash, IconCheck } from "@tabler/icons-react";
import { axiosInstance } from "../../axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";


  

export function UsersListScreen() {
  const screenWidth = window.innerWidth;
  let TABLE_STYLES ;

screenWidth >500 ? TABLE_STYLES = {marginLeft:'100px', marginRight:'100px',} : TABLE_STYLES = {display:'flex',flexDirection:'column'};
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery(["users"], () =>
    axiosInstance
      .get("/users")
      .then((res) => res.data)
  );

  const deleteUserMutation = useMutation({
    mutationKey: "deleteUser",
    mutationFn: (id) => axiosInstance.delete(`/users/${id}`),
    onSuccess: () => {
      notifications.show({
        title: "User Deleted",
        color: "green",
        autoClose: 1500,
        icon: <IconCheck />,
      }),
        queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDeleteUser = (id) => {
    deleteUserMutation.mutate(id);
  };

  const rows = users?.map((item) => (
    <tr key={item.name} style={TABLE_STYLES}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.image} radius={40} />
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
        <Text fz="sm">{item.email}</Text>
      </td>
      <td>
        <Text fz="sm">{item.isAdmin ? <strong>Admin</strong> : "User"}</Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5} />
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
                  onClick={() => handleDeleteUser(item._id)}
                />
              </ActionIcon>
            </Menu.Target>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default UsersListScreen;
