import type { ApiResponse,} from '../../types/types';
import TrendingCategory from './TrendingCategory';
import TrendingSkeleton from './TrendingSkeleton';


export default function ProductShowCase ({productList,loading,error}:{productList:ApiResponse,loading:boolean,error:string|null}) {
/*** wrong type in product list create new type for data in productlist */
    
   
    if (loading) {
        return <div>
            {
                Array.from({ length: 4 }, (_, index) =>
                (
                    <TrendingSkeleton key={index} />
                ))
            }
        </div>
    }

    if (error) {
        return <div>{error}</div>
    }
     const {data:productData} = productList

  
    return (
        <div>
            <div>
                {productData && Array.isArray(productData) && productData.map((product: any, i: number) => <TrendingCategory key={`${product.category}-${product.id}-${i}`} TrendList={product} />)}
                
            </div>
        </div>
    )
}
