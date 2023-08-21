import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Badge,
  Tooltip,
} from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import {
  IconHeart,
  IconShoppingCart,
  IconSearch,
  IconShoppingBag,
} from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import ProfileMenu from "./ProfileMenu";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SearchBox from "./SearchBox";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function MainHeader() {
  const screenWidth = window.innerWidth;
  const [searchBox, setSearchBox] = useState(false);
  const ref = useClickOutside(() => setSearchBox(false));
  const [userInfo, setUserInfo] = useState("");
  const { handleLoginOpen, handleRegisterOpen, isLoginOpen, isRegisterOpen } =
    useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(user);
  }, [isLoginOpen]);

  const { cartQty } = useContext(CartContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes } = useStyles();
  const handleSearchBoxOpen = () => {
    setSearchBox(true);
  };
  const handleLoginOpenMobile = () => {
    handleLoginOpen();
    closeDrawer();
  };
  const handleRegisterOpenMobile = () => {
    handleRegisterOpen();
    closeDrawer();
  };

  return (
    <>
      {isLoginOpen && <LoginScreen />}
      {isRegisterOpen && <RegisterScreen />}
      {screenWidth > 871 && (
        <>
          <Box ref={ref} pb={80}>
            <Header height={60} px="md">
              <Group position="apart" sx={{ height: "100%" }}>
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h1
                    style={{
                      margin: "0",
                      fontFamily: "Montserrat",
                      fontSize: "24px",
                      fontWeight: "normal",
                    }}
                  >
                    Sole Haven
                  </h1>
                </Link>

                <Group sx={{ height: "100%" }} spacing={0}>
                  <Link to={"/"} className={classes.link}>
                    Home
                  </Link>
                  <Link to={"/products/men"} className={classes.link}>
                    Men
                  </Link>
                  <Link to={"/products/women"} className={classes.link}>
                    Women
                  </Link>
                </Group>

                <Group className={classes.hiddenMobile}>
                  {searchBox ? (
                    <SearchBox />
                  ) : (
                    <IconSearch
                      size="1.7rem"
                      style={{ cursor: "pointer" }}
                      onClick={handleSearchBoxOpen}
                      color="grey"
                    />
                  )}
                  <Link to={"/wishlist"}>
                    <Tooltip label="Wishlist" position="left">
                      <IconHeart
                        size="1.8rem"
                        color="grey"
                        className={classes.like}
                        stroke={1.2}
                      />
                    </Tooltip>
                  </Link>
                  <Link to={"/cart"}>
                    <Tooltip label="Cart" position="bottom">
                      <IconShoppingBag
                        size="1.8rem"
                        color="grey"
                        stroke={1.2}
                      />
                    </Tooltip>
                    <Badge>{cartQty}</Badge>
                  </Link>

                  {userInfo ? (
                    <ProfileMenu
                      setUserInfo={setUserInfo}
                      userInfo={userInfo}
                    />
                  ) : (
                    <>
                      <Button variant="default" onClick={handleLoginOpen}>
                        Log in
                      </Button>
                      <Button onClick={handleRegisterOpen} variant="gradient">
                        Sign up
                      </Button>
                    </>
                  )}
                </Group>
              </Group>
            </Header>
          </Box>
        </>
      )}
      {/* Header Mobile */}
      {screenWidth < 870 && (
        <>
          <div
            ref={ref}
            className="mobile-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "50px",
              paddingTop: "10px",
            }}
          >
            {userInfo ? (
              <ProfileMenu setUserInfo={setUserInfo} userInfo={userInfo} />
            ) : (
              <div className="mobile-header-left">
                <Burger opened={drawerOpened} onClick={toggleDrawer} />
                <Drawer
                  opened={drawerOpened}
                  onClose={closeDrawer}
                  padding="md"
                  size={300}
                  position="left"
                >
                  <ScrollArea>
                    <Group
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="gradient"
                        sx={{ width: "100%" }}
                        to={"/"}
                      >
                        Home
                      </Button>
                      <Button
                        variant="gradient"
                        sx={{ width: "100%" }}
                        onClick={handleLoginOpenMobile}
                      >
                        Login
                      </Button>
                      <Button variant="gradient" onClick={handleRegisterOpenMobile} sx={{ width: "100%" }}>
                        Register
                      </Button>
                    </Group>
                  </ScrollArea>
                </Drawer>
              </div>
            )}
            <div
              className="mobile-header-center"
              style={{ textAlign: "center" }}
            >
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <h1
                  style={{
                    fontSize: "20px",
                    fontFamily: "Open Sans",
                    fontWeight: "400",
                    marginTop: "0",
                    color: "black",
                  }}
                >
                  Sole Haven
                </h1>
              </Link>
            </div>
            <div className="mobile-header-right">
              {searchBox ? (
                <SearchBox />
              ) : (
                <IconSearch
                  style={{ cursor: "pointer", marginRight: "20px" }}
                  onClick={handleSearchBoxOpen}
                  color="grey"
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
