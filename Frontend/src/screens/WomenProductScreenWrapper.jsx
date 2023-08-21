import { WishListProvider } from '../contexts/WishListContext'
import WomenProductScreen from './WomenProductScreen'
function WomenProductScreenWrapper() {
    return (
        <WishListProvider>
            <WomenProductScreen />
        </WishListProvider>
    )
}



export default WomenProductScreenWrapper
