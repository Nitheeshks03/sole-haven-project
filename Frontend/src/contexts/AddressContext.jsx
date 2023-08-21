import { createContext, useState } from "react";

const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");

  return (
    <AddressContext.Provider
      value={{
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
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export { AddressProvider, AddressContext };
