import { createStyles, SegmentedControl, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  indicator: {
    backgroundImage: theme.fn.gradient({ from: "blue", to: "skyblue" }),
  },

  control: {
    border: "0 !important",
  },

  label: {
    "&, &:hover": {
      "&[data-active]": {
        color: theme.white,
      },
    },
  },
}));

function SizeSelector({size, setSize}) {
 
 
  const handleSizeChange = (value) => {
    setSize(value);
  };
  const { classes } = useStyles();

  return (
    <SegmentedControl
      radius="sm"
      size="md"
      data={["6", "7", "8", "9", "10", "11", "12"]}
      classNames={classes}
      value={size}
      onChange={handleSizeChange}
    />
  );
}

export default SizeSelector;
