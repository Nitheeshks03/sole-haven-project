import { WishListProvider } from '../contexts/WishListContext'
import AllProductsScreen from './AllProductsScreen'



function AllProductScreenWrapper() {
    return (
        <WishListProvider> 
            <AllProductsScreen  /> 
        </WishListProvider>
    )
}

export default AllProductScreenWrapper
