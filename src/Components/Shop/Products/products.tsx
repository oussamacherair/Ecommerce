
import ProductCardSkeleton from '../../ui/Product_Loading'
import "./products.css"
import Product from './product'
import type { ApiResponse } from '../../../types/types'
import { Link } from 'react-router'
const Products = ({ Products, loading, error }: { Products: ApiResponse, loading: boolean, error: string | null }) => {

    if (loading) {
        return (
            <div className='container'>
                <div className='products-container'>
                    {[...Array(6)].map((_, index) => (
                        <ProductCardSkeleton key={`skeleton-${index}`} />
                    ))}
                </div>
            </div>
        )
    }
   
    if (error) {
        return (
            <div className='container'>
                <div className='products-container'>
                    <div className='error'>{error}</div>
                </div>
            </div>
        )
    }

    if (!Products || !Products.data) {
        return (
            <div className='container'>
                <div className='products-container'>
                    <div className='error'>No products found</div>
                </div>
            </div>
        )
    }



    const { products, success } = Products?.data



    return (
        <div className='container'>
            <div className='products-container'>
                <>

                    {
                        products.map((product) => (
                            <Link to={`/shop/${product.category}/${product.title}/${product.id}`} key={product.id}>   
                                <Product key={product.id} product={product} />
                            </Link>
                        ))}
                </>


            </div>


        </div>

    )
}

export default Products