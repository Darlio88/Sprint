import React, {useState, useEffect} from 'react'
import jwtDecode from "jwt-decode"

import "./style.css"

//icons
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai"

//test image
import restaurant from "../../assets/restaurant.jpg"
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from "axios"

function Index() {
  const [restaurantInfo, setRestaurantInfo] = useState(null)
  const {id} = useParams()
  const navigate= useNavigate()
  const token = localStorage.getItem("token")
  const decoded=jwtDecode(token)

  useEffect(()=>{
    async function getRestaurant(){
      await axios.get(`http://localhost:4000/restaurants/${id}`).then(res=>{ 
      setRestaurantInfo(res.data);
      })
    }
    getRestaurant()
  },[id])
 async function handleDelete(){
   await axios.delete(`http://localhost:4000/restaurants/${id}`).then(res=>{
    navigate("/")
   }) 
  }
  useEffect(()=>{
    console.log(decoded.id,restaurantInfo?.CreatedBy) 
  })
  return (
    <section className="card">
            <div className="card-container">
                <div className='card-image'>
                    <img src={"data:image/png;base64,"+restaurantInfo?.ImageStr} alt="" />
                </div>
                <div className="card-info">
                    <h4>{restaurantInfo?.Name}</h4>
{
  decoded.id===restaurantInfo?.CreatedBy?(  
                     
  <div className="action-button">
  <Link to={`/update-restaurant/${id}`}><AiOutlineEdit  fontSize={"1.2rem"}/></Link> 
  <AiOutlineDelete color='#B70404' fontSize={"1.2rem"} onClick={handleDelete} />
  </div>):null
}
                </div>
                <div className="card-bottom">
                    <button>Book Now</button>
                    <div>
                  <p style={{fontSize:"14px"}}>{restaurantInfo?.Cuisine}{" "}</p>
                </div>
                </div>
            </div>
    </section>
  )
}

export default Index