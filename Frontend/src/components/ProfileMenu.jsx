import { Menu, Text, Badge, Avatar, Divider } from "@mantine/core";
import { IconArrowsLeftRight, IconCheck } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { notifications } from "@mantine/notifications";
import { useNavigate } from 'react-router-dom';

const avatar = (
  <Avatar alt="Avatar for badge" size={24} mr={5} src="./images/avatar.png" />
);

function ProfileMenu({ setUserInfo, userInfo }) {
  const screenWidth = window.innerWidth;
  const navigate = useNavigate();
  const userName = userInfo.data.name;
  const logoutMutation = useMutation({
    mutationKey: "logout",
    mutationFn: () => axiosInstance.post("/users/logout"),
    onSuccess: () => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cart");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("wishList");
      setUserInfo("");

      notifications.show({
        title: "Logout Successful",
        color: "green",
        autoClose: 2000,
        icon: <IconCheck />,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate('/');
  };

  return (
    <Menu>
      <Menu.Target>
        <Badge
          pl={0}
          size="xl"
          color="skyblue"
          radius="md"
          leftSection={avatar}
          sx={{ cursor: "pointer" }}
        >
          <Text size="sm" sx={{ textTransform: "capitalize" }}>
            {userName}
          </Text>
        </Badge>
      </Menu.Target>
      <Menu.Dropdown>
      <Menu.Label>Profile</Menu.Label>
            <Divider />
      <Menu.Item onClick={()=> navigate('/user/profile')}>Account</Menu.Item>
        {userInfo.data.isAdmin ? (
          <>
         
            <Menu.Item onClick={()=> navigate('/admin/productslist')}>Products</Menu.Item>
          
            <Menu.Item onClick={()=> navigate('/admin/userslist')}>Userlist</Menu.Item>
       
            <Menu.Item onClick={()=>navigate('/admin/orderslist')}>Orderslist</Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item onClick={()=> navigate('/orders/myorders')} >My orders</Menu.Item>
            {screenWidth < 870 && <>
              <Menu.Item onClick={()=> navigate('/wishlist')} >Wishlist</Menu.Item>
              <Menu.Item onClick={()=> navigate('/cart')} >My Cart</Menu.Item>
            </>}
          </>
        )}

        <Menu.Item
          color="red"
          onClick={handleLogout}
          icon={<IconArrowsLeftRight size={14} />}
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;
