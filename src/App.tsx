
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Categories from './pages/categories'
import Product from './pages/product'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/profile' element={<Profile></Profile>} ></Route>
          <Route path='/categories' element={<Categories></Categories>} ></Route>
          <Route path='/product' element = {<Product></Product>}></Route>

        </Routes>
      
      </BrowserRouter>

        
    </>
)
 
}

export default App
