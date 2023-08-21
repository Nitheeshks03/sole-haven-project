import { createStyles, Paper, Text, Title, rem, MediaQuery } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useHover } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(300),
    width: rem(250),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  smallerCard: {
    height: rem(300),
    width: rem(250),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  title: {
    fontFamily: `Open Sans ${theme.fontFamily}`,
    fontWeight: 600,
    color: "#fff",
    lineHeight: 1.2,
    fontSize: rem(28),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: "#41B3A3",
    opacity: 0.7,
    fontWeight: 600,
    textTransform: "uppercase",
  },
}));

export function TrendingProductCard({ image, title, category, id }) {
  const navigate = useNavigate();
  const { hovered, ref } = useHover();
  const screenWidth = window.innerWidth;
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{
        backgroundImage: `url(${image})`,
        "&:hover": {
          cursor: "pointer",
          transform: "scale(1.1)",
          transition: "all 0.3s ease-in-out",
        },
      }}
      ref={ref}
      onClick={() => navigate(`/products/${id}`)}
      className={screenWidth > 1102 ? classes.card : classes.smallerCard }
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        {hovered && (
          <>
            <p
              style={{
                color: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50%",
                fontFamily: "Open Sans",
              }}
            >
              View Product
            </p>
            <p style={{position:'absolute', top: "60%", left: "50%", translate: "-50%",color:'white' }}>
              <IconArrowRight size={40} stroke={1} />
            </p>
          </>
        )}
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
    </Paper>
  );
}

export default TrendingProductCard;
