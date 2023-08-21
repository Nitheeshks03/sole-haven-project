import {
  Card,
  Text,
  Group,
  Badge,
  Button,
  createStyles,
  rem,
  CloseButton,
  Tooltip,
} from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishListContext } from "../contexts/WishListContext";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: "350px",
    marginTop: "20px",
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

function WishListCard({ product }) {
 const { _id, image, name, description, price, rating } = product;
  const { wishList, setWishList } = useContext(WishListContext);
  const navigate = useNavigate();
  const { classes } = useStyles();
  const id = _id;

  const handleRedirect = () => {
    navigate(`/products/${id}`);
  };

  const handleRemoveItem = () => {
    const newWishList = wishList.filter((item) => item._id !== id);
    setWishList(newWishList);
  };
  const actualPrice = price + 500;
  const discount = Math.floor(((actualPrice - price) / actualPrice) * 100);

  return (
    <Card
      withBorder
      radius="sm"
      p="md"
      className={classes.card}
      sx={{
        "&:hover": {
          boxShadow: "0 0 6px 0 rgba(0,0,0,0.2)",
          scale: "1.02",
          transition: "all 0.1s ease-in",
        },
      }}
    >
      <Card.Section sx={{ position: "relative", "&:hover": {
              scale: "1.05",
              transition: "all 0.3s ease-in-out" }}}>
        <img
          src={image[0]}
          style={{ width: "100%", objectFit: "cover" }}
          alt={name}
          height={220}
        />
        <Tooltip label="Remove from wishlist" position="left">
          <CloseButton
            size={"lg"}
            sx={{ position: "absolute", top: "0", right: "0", zIndex: "10" }}
            onClick={handleRemoveItem}
          />
        </Tooltip>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {name}
          </Text>
          <Badge size="sm">{rating}⭐</Badge>
        </Group>
        <Text
          fz="sm"
          mt="xs"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Text fz="18px" fw={500}>
        ₹{price} /<span style={{ fontSize: "14px",textDecoration:'line-through',opacity:'0.7' }}>{actualPrice}</span>
            <span style={{ fontSize: "14px",opacity:'0.7' }}>{discount}% off</span>
        </Text>
      </Card.Section>
      <Group mt="xs">
        <Button
          radius="md"
          variant="gradient"
          style={{ flex: 1 }}
          onClick={handleRedirect}
        >
          View Product
        </Button>
      </Group>
    </Card>
  );
}

export default WishListCard;
