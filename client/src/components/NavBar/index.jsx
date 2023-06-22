import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"

//icons
import {BsHouseAdd} from "react-icons/bs"

//styles
import "./style.css"

//profile pic
import profile from "../../assets/profile.jpg"

function Index() {
  const navigate=useNavigate()
  const token = localStorage.getItem("token")
  const [isLogin, setIsLogin]= useState(false)


  useEffect(()=>{
   if(token){
    setIsLogin(true)
   } else{
    setIsLogin(false)
   }
  },[token])
  function handleClick(){
    if(token){
      localStorage.clear("token")
      setIsLogin(false)
      return;
    }
    // setIsLogin(true)
    navigate("/signin")
  }
  function AddRestaurant(){
    navigate("/create-restaurant")
  }

  function navigateHome(){
    navigate("/")
  }
  return (
      <nav className="container" role="navigation">
       <div className="inner" role="list" >
        <h2 className="logo" onClick={navigateHome}>Spr<span>i</span>nt</h2>
        {/* <div className="profile-area">
            <img src={profile} alt="profile" />
        </div> */}
          <button onClick={AddRestaurant}><BsHouseAdd fontSize={"1.2rem"} /></button>
        <button onClick={handleClick}>{isLogin?"Logout":"Login"}</button>
      
       </div>
      </nav>
  )
}

export default Index