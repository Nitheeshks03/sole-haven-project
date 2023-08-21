import "./ProductScreen.css";
import SizeSelector from "../components/SizeSelector";
import { Button, Loader, Divider } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance.js";
import { useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { WishListContext } from "../contexts/WishListContext";
import { notifications } from "@mantine/notifications";

function ProductScreen() {
  const { handleAddToCart } = useContext(CartContext);
  const { handleWishList } = useContext(WishListContext);
  const [size, setSize] = useState("6");
  const { id: productId } = useParams();

  const {
    isLoading,
    isError,
    data: product,
  } = useQuery(["product"], () =>
    axiosInstance.get(`/products/${productId}`).then((res) => res.data)
  );
  const handleAddItem = () => {
    handleAddToCart(product, size, 1);
  };
  isError &&
    notifications.showNotification({
      title: "Error",
      message: "Something went wrong",
      color: "red",
    });
  const price = product?.price;
  const actualPrice = price + 500;
  const discount = Math.floor(((actualPrice - price) / actualPrice) * 100);
  return (
    <div className="product-container">
      <div className="image-container">
        {product?.image.map((img, index) => (
          <img
            src={img}
            alt="product"
            key={index}
            className={`img-${index + 1}`}
          />
        ))}
      </div>
      <div className="product-info">
        {isLoading && <Loader />}
        <h1>{product?.name}</h1>
        <p style={{ fontSize: "16px", opacity: "0.7" }}>
          {product?.subCategory}
        </p>
        <Divider />
        <p>{product?.description}</p>
        <Divider />
        <h2 className="price">
          {product?.price}/ <span className="actual-price">{actualPrice}</span>{" "}
          <span className="discount">{discount}% off</span>
        </h2>
        <br />
        <h3>SELECT SIZE</h3>
        <br />
        <SizeSelector setSize={setSize} size={size} />
        <div className="buttons">
          <Button
            variant="gradient"
            color="dark"
            size="md"
            onClick={handleAddItem}
          >
            Add To Cart
          </Button>
          <Button
            variant="outline"
            color="dark"
            size="md"
            onClick={()=>handleWishList(product)}
          >
            Add To Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
