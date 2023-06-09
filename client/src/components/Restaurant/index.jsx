import React from 'react'
import {useNavigate} from "react-router-dom";

//icons
import {AiTwotoneStar} from "react-icons/ai"
import {IoFastFoodOutline, IoLocateOutline,IoLocationOutline} from "react-icons/io5"
import {MdOutlineFreeBreakfast} from "react-icons/md"
import {BsCupHot, BsHeart} from "react-icons/bs"
import {GrLocation} from "react-icons/gr"
//styles
import "./style.css"

//images
import restaurantImage from "../../assets/restaurant.jpg"

function Index({restaurant}) {
  const navigate= useNavigate()
  function handleNavigation(){
    navigate(`/restaurant-info/${restaurant._id}`)
  }
  return (
    <div onClick={handleNavigation} className="restaurant-card">
        <div className='restaurant-image'>
            <div className='location-info'>
              <div className='restaurant-location'>
               <IoLocationOutline  />
               <h5>{restaurant.Location}</h5>
              </div>
              <BsHeart />
            </div>
            <img src={restaurant.ImageStr} alt="" />
        </div>
        <div className='restaurant-info'>
            <div className="restaurant-name">
              <h4>{restaurant.Name}</h4>
              <div className="rating">
              <AiTwotoneStar color='#F79327'/>
              <span>4.8</span>
              </div>
            </div>
            <span>${restaurant.AvgPrice}</span>
            <div className='icon-area'>
              <div className="meal">
                <BsCupHot />
                <span>{restaurant.Meals?.Break} break</span>
              </div>
              <div className="meal">
                <MdOutlineFreeBreakfast />
                <span>{restaurant.Meals?.Snacks} snacks</span>
              </div>
              <div className="meal">
                <IoFastFoodOutline />
                <span>{restaurant.Meals?.Lunch} Lunch</span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Index