import { WishListProvider } from "../contexts/WishListContext";
import MenProductScreen from "./MenProductScreen";

function MenProductScreenWrapper() {
  return (
    <WishListProvider>
      <MenProductScreen />
    </WishListProvider>
  );
}

export default MenProductScreenWrapper;
