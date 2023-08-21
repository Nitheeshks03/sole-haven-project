import { notifications } from '@mantine/notifications';
import { createContext,useState,useEffect} from 'react';

const WishListContext = createContext();

function WishListProvider({children}) {
    const initialList = JSON.parse(localStorage.getItem("wishList")) || [];
    const [wishList, setWishList] = useState(initialList);
    useEffect(() => {
        localStorage.setItem("wishList", JSON.stringify(wishList));
    }, [wishList]);
    const handleWishList = (product) => {
        const exist = wishList.find((item) => item._id === product._id);
        exist
            ? notifications.show({
                title: "Item already in wishlist",
            })
            : setWishList([...wishList, product]);
    };
    return (
        <WishListContext.Provider value={{wishList,setWishList,handleWishList}}>
        {children}
        </WishListContext.Provider>
    )
    }

export {WishListProvider, WishListContext};