import {
  IconPhone,
  IconMail,
  IconAddressBook,
  IconUser,
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import "./UserProfileScreen.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from ".././axiosInstance";
import { Button, Input, Loader, SimpleGrid, TextInput } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
function UserProfileScreen() {
  const [form, setForm] = useState(false);
  const { data: profile, isLoading } = useQuery(["userProfile"], () =>
    axiosInstance.get("/users/profile").then((res) => res.data)
  );
  const handleFormOpen = () => {
    setForm(true);
  };
  const handleFormClose = () => {
    setForm(false);
  };
  return (
    <>
      {isLoading && <Loader variant="bars" />}
      <div style={{ display: "flex", justifyContent:'space-between',flexWrap:'wrap' }}>
    
        <div className="profile-container">
          <div className="user-details-label">
            <h3>
              <span>
                <IconUser color="skyblue" />
              </span>
              Name
            </h3>
            <h3>
              <span>
                <IconMail color="skyblue" />
              </span>
              Email
            </h3>
            <h3>
              <span>
                <IconPhone color="skyblue" />
              </span>
              Phone
            </h3>
            <h3>
              <span>
                <IconAddressBook color="skyblue" />
              </span>
              Address
            </h3>
          </div>
          <div className="user-details">
            <p>{profile?.name}</p>
            <h3>{profile?.email}</h3>
            <Input placeholder="Enter your phone number" />
            <Input placeholder="Enter your address" />
          </div>
        </div>
        <div
          style={{
            maxWidth: "500px",
            minWidth: "280px",
          }}
        >
          {form && <EditProfile handleFormClose={handleFormClose} />}
        </div>
      </div>
      <Button className="btn edit-profile" onClick={handleFormOpen}>
        Edit profile
      </Button>
    </>
  );
}

export default UserProfileScreen;

function EditProfile({ handleFormClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatedProfile = {
    name,
    email,
    password,
  };
  const queryClient = useQueryClient();
  const editProfileMutation = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: () => axiosInstance.put("/users/profile", updatedProfile),
    onSuccess: () => {
      notifications.show({
        title: "Profile updated successfully",
        color: "green",
        autoClose: 2000,
        icon: <IconCheck />,
      }),
        queryClient.invalidateQueries(["userProfile"]);
    },
    onError: () => {
      notifications.show({
        title: "Something went wrong",
        color: "red",
        autoClose: 2000,
        icon: <IconX />,
      });
    },
  });

  const handleEditProfile = () => {
    editProfileMutation.mutate();
  };

  return (
    <SimpleGrid>
      <IconX cursor={"pointer"} onClick={handleFormClose} />
      <TextInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="enter your name"
      />
      <TextInput
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter your email"
      />
      <TextInput
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter password"
      />
      <TextInput
        label="Confrim password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="confrim password"
      />
      <Button onClick={handleEditProfile}>Confirm</Button>
    </SimpleGrid>
  );
}
