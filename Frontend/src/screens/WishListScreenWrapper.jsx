import { WishListProvider } from '../contexts/WishListContext'
import WishListScreen from './WishListScreen'
function WishListScreenWrapper() {
    return (
        <WishListProvider>
            <WishListScreen />
        </WishListProvider>
    )
}

export default WishListScreenWrapper
