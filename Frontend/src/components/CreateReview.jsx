import { Rating, Button, Textarea, Divider } from "@mantine/core";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { notifications } from "@mantine/notifications";
import ReviewsCard from "./ReviewsCard";
import { IconCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

function CreateReview({ product }) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const productId = product?._id;
  const review = {
    rating,
    comment,
  };

  const reviewMutation = useMutation({
    mutationKey: ["review"],
    mutationFn: () =>
      axiosInstance
        .post(`/products/${productId}/reviews`, review)
        .then((res) => res.data),
    onsucces: () => {
      queryClient.invalidateQueries(["product"]);
      notifications.show({
        message: "Review Added Successfully",
        color: "green",
        icon: <IconCheck />,
      });
    },
    onError: (error) => {
      const errorMessage = error.response.data.message;
      notifications.show({
        message: errorMessage,
        color: "red",
      });
    },
  });

  const handleReviewMutation = () => {
    reviewMutation.mutate();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          paddingTop:'50px',
          position:'relative'
        }}
      >
        <h2 style={{position:'absolute',left:'50%',translate:'-50%',fontFamily:'Open Sans',fontSize:'28px',margin:'0'}} >Reviews</h2>
        {product?.reviews?.map((item) => (
          <ReviewsCard
            key={item._id}
            user={item.name}
            time={item.createdAt}
            rating={item.rating}
            comments={item.comment}
          />
        ))}
      </div>

      <div
        style={{
        margin:'0 auto',
        width:'400px'
        }}
      >
        <h2
          style={{
            fontFamily: "Open Sans",
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          Add a review
        </h2>
        <Divider />
        <Rating mt={50} value={rating} onChange={setRating} />
        <Textarea
          mt="md"
          label="Description"
          placeholder="Product Description"
          required
          maxRows={10}
          minRows={5}
          autosize
          variant="filled"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          variant="outline"
          mt="xl"
          maw="50%"
          color="light"
          onClick={handleReviewMutation}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default CreateReview;
