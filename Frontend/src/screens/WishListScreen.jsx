import { useContext } from "react";
import { WishListContext } from "../contexts/WishListContext";
import WishListCard from "../components/WishListCard";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function WishListScreen() {
  const navigate = useNavigate();
  const { wishList } = useContext(WishListContext);
  const handleRedirect = () => {
    navigate("/");
  };
  if (wishList.length === 0)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginTop: "100px",
            fontFamily: "Montserrat",
            fontWeight: "400",
          }}
        >
          Your WishList is Empty
        </h1>
        <Button variant="outline" maw={"200px"} onClick={handleRedirect}>
          Return to Homepage
        </Button>
      </div>
    );
  return (
    <div
      style={{
       display: "flex",
       justifyContent:'space-evenly',
       flexWrap:'wrap',
       
      }}
    >
      {wishList.map((product) => (
        <WishListCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default WishListScreen;
