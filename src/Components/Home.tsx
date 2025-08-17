
import { lazy, useCallback, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { type ApiResponse, } from '../types/types';


const ProductShowCase = lazy(() => import('./ui/ProductShowCase'))
const Categories = lazy(() => import('./Shop/Categories/page'))
const ShowCase = lazy(() => import("./Header/ShowCase"))

const Home = () => {


  const [CategoriesList, setCategories] = useState<{
    data: ApiResponse | null,
    loading: boolean,
    error: null | string
  }>({
    data: null,
    loading: true,
    error: null,
  })

  /***get categories */
  const GetCategories = useCallback(async () => {
    const cachedCategories = localStorage.getItem('categories');
    if (cachedCategories) {
      setCategories({
        data: JSON.parse(cachedCategories),
        loading: false,
        error: null,
      });
      return;
    }
    try {
      const result = await axios.get("api/categories");
      localStorage.setItem('categories', JSON.stringify(result.data))
      setCategories({
        data: result.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setCategories({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }, []);


  /*** get products */
  const [TrendProducts, setTrendProducts] = useState<{
    data: ApiResponse | [],

    loading: boolean,
    error: string | null
    success: boolean
  }>({
    data: [],
    loading: true,
    error: null,
    success: false
  })

  const GetTrendProduct = useCallback(async () => {
    try {
      setTrendProducts(prev => ({ ...prev, loading: true, error: null }))
      const { data: ResponseData } = await axios.get("/api/trending-products")

      setTrendProducts({
        data: ResponseData,
        loading: false,
        error: null,
        success: ResponseData.success
      })
    } catch (error) {
      setTrendProducts({
        data: [],
        loading: false,
        success: false,
        error: error instanceof Error ? error.message : " An error occurred"
      })
    }

  }, [])




  useEffect(() => {
    GetCategories()
    GetTrendProduct()
  }, [GetCategories, GetTrendProduct]);


  /***** */



  const { data: list, loading, error } = CategoriesList
  const { data: ProductList, loading: ProductLoading, error: ProductError } = TrendProducts


  console.log(ProductList, " ProductList")

  return (
    <div className="home-page">
      <ShowCase />
      {/* Show components immediately with loading states */}
      <Categories categories={list} loading={loading} error={error} />
      <ProductShowCase productList={ProductList} loading={ProductLoading} error={ProductError} />


    </div>
  );
};

export default Home;