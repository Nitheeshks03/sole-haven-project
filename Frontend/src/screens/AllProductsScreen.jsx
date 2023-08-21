import Carousels from "../components/Carousels";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import { axiosInstance } from "../axiosInstance";
import { useParams } from "react-router-dom";

const images = [
  "/images/carousel-2.jpg",
  "/images/carousel-women-2.jpg",
];

function AllProductsScreen() {
  const { keyword } = useParams();

  const { isLoading, isError, data } = useQuery(["products"], () =>
    axiosInstance.get("/products").then((res) => res.data)
  );

  let products = [];

  keyword
    ? (products = data.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      ))
    : (products = data);

  return (
    <>
      <Carousels images={images} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {isError && <div>Something went wrong ...</div>}
        {isLoading && (
          <Loader
            size="xl"
            sx={{ position: "absolute", top: "70%", left: "50%" }}
          />
        )}
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            title={product.name}
            description={product.description}
            price={product.price}
            image={product.image[0]}
            rating={product.rating}
            id={product._id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}

export default AllProductsScreen;
