import { Routes, Route } from 'react-router'
import Header from './Components/Header/Header'


import { lazy} from 'react'
const Footer = lazy(() => import('./Components/Footer/Footer'))
const ShopPage = lazy(() => import('./Components/Shop/page'))
const HomePage = lazy(()=> import('./Components/Home'))
const ProductPage = lazy(() => import('./Components/Shop/ProductPage/ProductPage'))
function App() {

  return (
    <>
      
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path="/shop/:category/:productname/:productId" element={<ProductPage/>} />
        </Routes>
        <Footer/>
      
      
    </>
  )
}

export default App
