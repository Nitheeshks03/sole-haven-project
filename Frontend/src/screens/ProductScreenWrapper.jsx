import { WishListProvider } from '../contexts/WishListContext'
import './ProductScreen'
import ProductScreen from './ProductScreen'

function ProductScreenWrapper() {
    return (
        <WishListProvider>
            <ProductScreen />
        </WishListProvider>
    )
}

export default ProductScreenWrapper
