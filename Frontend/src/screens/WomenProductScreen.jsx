import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance.js";
import ProductCard from "../components/ProductCard.jsx";
import Carousels from "../components/Carousels";
const images =[
  "/images/carousel-women-1.jpg",
  "/images/carousel-women-2.jpg",
]

function WomenProductScreen() {
  const {
    isLoading,
    isError,
    data: products,
  } = useQuery(["products-men"], () =>
    axiosInstance.get("/products").then((res) => res.data)
  );

  return (
    <>
      <Carousels images ={images}/>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {products?.map((product, index) =>
          product.category == "Women" ? (
            <ProductCard
              key={index}
              product={product}
              price={product.price}
              image={product.image[0]}
              title={product.title}
              description={product.description}
              id={product._id}
            />
          ) : null
        )}
      </div>
    </>
  );
}
export default WomenProductScreen;
