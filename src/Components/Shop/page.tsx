import "./shop.css"
import Filters from './Filters/Filters'
import { type ApiResponse } from "../../types/types";
import Products from './Products/products';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../ui/Pagination";
import { useParams } from 'react-router';

const Shop = () => {
  const {category} = useParams()
  const [categoryName, setCategoryName] = useState<string | null>(category || null)

  const handleCategoryChange = (value: string) => {
    setCategoryName(value)
  }

  const [ProductsList, setProductList] = useState<{ data: ApiResponse | null, loading: boolean, error: null | string }>({
    data: null,
    loading: true, // Set initial loading to true
    error: null
  })
  const [currentPage, setCurrentPage] = useState<{ currentPage: number, pageloading: boolean }>({
    currentPage: 1,
    pageloading: false,
  })

  const GetProductList = useCallback(async (category?:string | null) => { 


    try {
      // Set loading to true when starting to fetch
      setProductList(prev => ({
        ...prev,
        loading: true,
        error: null
      }))
      
      const { data: List } = category? 
      await axios.get(`/api/products/category/${category}`)
      :
      await axios.get(`/api/products/?skip=${(currentPage.currentPage - 1) * 10}&limit=10`)

      
      setProductList({
        data: List,
        loading: false,
        error: null
      })

      // Reset page loading state
      setCurrentPage(prev => ({
        ...prev,
        pageloading: false
      }))

    } catch (err) {
      setProductList({
        data: null,
        loading: false,
        error: 'Failed to fetch products'
      })

      // Reset page loading state even on error
      setCurrentPage(prev => ({
        ...prev,
        pageloading: false
      }))
    }
  }, [currentPage.currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage({
      currentPage: page,
      pageloading: true,
    });
  }

  useEffect(() => {
    GetProductList(categoryName)
  }, [GetProductList,categoryName])


  const { data: products, loading, error } = ProductsList
  const total = products?.data?.total;
  const skip = products?.data?.skip;
  const limit = products?.data?.limit;
 // const categoryName = products?.category;

  return (
    <div className='shop-container'>
      <Filters category={categoryName} onCategoryChange={handleCategoryChange} />

      <Products Products={products} loading={loading} error={error} />
      {products && (
        <Pagination
          total={total}
          skip={skip}
          limit={limit}
          loading={loading } // Pass both loading states
          onPageChange={(page) => handlePageChange(page)}
        />)}
    </div>
  )
}

export default Shop