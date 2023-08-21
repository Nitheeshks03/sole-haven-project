import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
} from "@mantine/core";
import { AddressContext } from "../contexts/AddressContext";
import { useContext } from "react";

export default function ShippingScreen({ handleStepChange, active }) {
  const screenWidth = window.innerWidth;
  const {
    name,
    setName,
    phone,
    setPhone,
    city,
    setCity,
    zipcode,
    setZipcode,
    address,
    setAddress,
  } = useContext(AddressContext);
  const handleStep = () => {
    handleStepChange(active + 1);
  };
const FORM_STYLE= screenWidth >1000 ? {
  margin: "50px 100px",
} : {
  margin: "50px 10px",
}
  return (
    <form style={FORM_STYLE}>
      <Title
        order={2}
        size="h1"
        sx={(theme) => ({
          fontFamily: `Open Sans, ${theme.fontFamily}`,
        })}
        weight={500}
        align="center"
      >
        Shipping Address
      </Title>

      <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <TextInput
          label="Name"
          placeholder="Your name"
          value={name}
          variant="filled"
          required
          onChange={(e) => setName( e.target.value)}
        />
        <TextInput
          label="Phone"
          placeholder="Your phone number"
          value={phone}
          variant="filled"
          required
          onChange={(e) => setPhone( e.target.value)}
        />
        <TextInput
          label="City"
          placeholder="City"
          value={city}
          variant="filled"
          required
          onChange={(e) => setCity( e.target.value)}
        />
        <TextInput
          label="Zip code"
          placeholder="zip code"
          value={zipcode}
          variant="filled"
          required
          onChange={(e) => setZipcode( e.target.value)}
        />
      </SimpleGrid>

      <Textarea
        mt="md"
        label="Address"
        placeholder="Your address"
        maxRows={10}
        minRows={5}
        autosize
        value={address}
        variant="filled"
        required
        onChange={(e) => setAddress( e.target.value)}
      />

      <Group position="center" mt="xl">
        <Button type="submit" size="md" onClick={handleStep}>
          Proceed to Payment
        </Button>
      </Group>
    </form>
  );
}
