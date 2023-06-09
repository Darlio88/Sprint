import React, {useState, useEffect} from 'react'
import axios from "axios"
//styles
import "./style.css"

//components
import Restaurant from "../Restaurant/index"

function Index() {
  const [restaurants, setRestaurants]=useState([])
  useEffect(
    ()=>{
      const fetchRestaurants= async()=>{
        await axios.get("http://localhost:4000/restaurants").then(res=>{
           console.log(res.data)
           setRestaurants(res.data)
        })}
        fetchRestaurants()
    }
  ,[])
  var list=[]
  for(let i=0;i<20;i++){
    list.push(i)
  }

  return (
  <section className='restaurants-container'>
    <div>
    { restaurants.map((restaurant,idx)=>(<Restaurant key={idx} restaurant={restaurant}/>))}
    </div>
  </section>

  )
}

export default Index