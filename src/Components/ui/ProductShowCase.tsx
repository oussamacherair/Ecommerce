import { useEffect, useId, useState } from 'react'

import axios from 'axios'
import type { ApiResponse, ProductType } from '../../types/types';
import TrendingCategory from './TrendingCategory';
import TrendingSkeleton from './TrendingSkeleton';


export default function ProductShowCase ({productList,loading,error}:{productList:ApiResponse,loading:boolean,error:string|null}) {
/*** wrong type in product list create new type for data in productlist */
    const id = useId()
   
   
  



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
     const {data:productData,success} = productList

  
    return (
        <div>
            <div>
                {success && productData.map((product, i) => <TrendingCategory key={`${product.category}-${id}-${i}`} TrendList={product} loading={loading} />)}
                
            </div>
        </div>
    )
}
