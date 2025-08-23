import { Routes, Route } from 'react-router'
import Header from './Components/Header/Header'


import { lazy } from 'react'
import NotFound404 from './Components/ui/NotFound'

const Footer = lazy(() => import('./Components/Footer/Footer'))
const ShopPage = lazy(() => import('./Components/Shop/page'))
const HomePage = lazy(() => import('./Components/Home'))
const ProductPage = lazy(() => import('./Components/Shop/ProductPage/ProductPage'))
const SignUp = lazy(() => import("./Components/Auth/SignUP/SignUp"))
const SignIn= lazy(() => import("./Components/Auth/SignIn/SignIn"))
function App() {  

  return (
    <>

      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop/' element={<ShopPage />} />
        <Route path='/shop/:category' element={<ShopPage />} />
        <Route path="/shop/:category/:productname/:productId" element={<ProductPage />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      <Footer />


    </>
  )
}

export default App
