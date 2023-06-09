import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'


import './App.css'


//import pages
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import CreateRestaurant from "./pages/CreateRestaurant"
import UpdateRestaurant from "./pages/UpdateRestaurant"
import RestaurantInfo from "./pages/RestaurantInfo"

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route exact path='/signin' element={<Signin/>} />
    <Route exact path='/signup' element={<Signup/>} />
    <Route exact path='/create-restaurant' element={<CreateRestaurant />} />
    <Route exact path="/restaurant-info/:id" element={<RestaurantInfo />} />
    <Route exact path='/update-restaurant/:id' element={<UpdateRestaurant />} />
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
