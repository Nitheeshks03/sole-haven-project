import { Button, Checkbox, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";
import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';
import {IconCheck} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
function UserEditScreen() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { id: userId } = useParams();
  const { data: user } = useQuery(["user"], () =>
    axiosInstance.get(`/users/${userId}`).then((res) => res.data)
  );
  console.log(user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const userData = {
    name,
    email,
    isAdmin,
  };
  const userEditMutation = useMutation({
    mutationKey: ["editUser"],
    mutationFn: () => {
      axiosInstance.put(`/users/${userId}`, userData).then((res) => res.data);
    },
    onSuccess :()=> {
        notifications.show({
            message:'User updated successfully',
            icon: <IconCheck/>,
            autoClose: 1000,
            onClose: ()=> navigate('/admin/userslist')
        });
        queryClient.invalidateQueries(['users']);
    },
    onError:(err)=>{
        notifications.show({
            message: err.response.data.message,
            color:'red'
        })
    }
  });

  const handleUserEditMutation = ()=>{
    userEditMutation.mutate();
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <form>
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          maw={400}
          mb="xl"
        />
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="E-mail"
          maw={400}
          mb="xl"
        />
        <Checkbox
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.currentTarget.checked)}
          label="Admin"
        />
        <Button mt="xl" onClick={handleUserEditMutation}>Submit</Button>
      </form>
    </div>
  );
}

export default UserEditScreen;
