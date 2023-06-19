import React, {useState, useEffect} from 'react'
import axios from "axios"
import jwtDecode from "jwt-decode"
import { useParams, useNavigate } from 'react-router-dom'
//styles

import { Link } from 'react-router-dom'

//test image
import RestaurantImage from "../../assets/restaurant.jpg"

function Index({type}) {
  const {id} = useParams()
  const navigate= useNavigate()
  const [name, setName]=useState("")
  const [location, setLocation]= useState("")
  const [imgStr, setImgStr]=useState("")
  const [cost, setCost]=useState(0)
  const [cuisine, setCuisine]=useState("")
  const [image, setImage]= useState(null)
  useEffect(()=>{
    async function getRestaurant(){
      await axios.get(`http://localhost:4000/restaurants/${id}`).then(res=>{
      console.log(res.data)  
      const restaurantInfo=res.data
      setCost(restaurantInfo.AvgPrice)
      setName(restaurantInfo.Name)
      setCuisine(restaurantInfo.Cuisine)
      setLocation(restaurantInfo.Location)
      setImgStr(restaurantInfo.ImageStr)
      })
    }
    getRestaurant()
  },[id])


  function handleImageChange(e){
     const img= e.target.files[0]
     setImage(img)
     const reader = new FileReader()
     reader.readAsDataURL(img)
     reader.onloadend=()=>{
      const base64Str=reader.result;
      setImgStr(base64Str)
    }   
  }
  async function handleSubmit(e){
    e.preventDefault()
    const token = localStorage.getItem("token")
    if(!token){
      alert("Please login to create a restaurant")
      return;
    }
    const decoded=jwtDecode(token)
    if(!decoded.id){
      alert("Please login to create a restaurant")
      return;
    }
    if([name,location,imgStr,cost,cuisine].some(item=>item.length==0)){
      alert("All fields are required")
      return
    }
    let form = new FormData()
    form.append("Name",name);
    form.append("Location",location);
    form.append("AvgPrice",cost);
    form.append("CreatedBy",decoded?.id);
    form.append("Cuisine",cuisine);
    form.append("image",image)
    await axios.patch(`http://localhost:4000/restaurants/${id}`,form).then(res=>{
      setCost(10)
      setName("")
      setCuisine("")
      setLocation("")
      setImage(null)
      setImgStr("")
      navigate("/")
    })
  }
  useEffect(()=>{
    console.log(imgStr)
  },[imgStr])
  return (
    <section className='form-container'>
      
       <form onSubmit={handleSubmit}>
       <h3 style={{justifySelf:"center"}} >Update Restaurant</h3>
      <div>
        <label htmlFor="name">Restaurant Name</label>
        <input type="text" placeholder='Food hub' id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="image">Restaurant Photo</label>
        { imgStr.length>0?(<div >
          <img src={"data:image/png;base64,"+imgStr} alt="restaurant-preview" />
        </div>):null
        }
        <input type="file"  id="image" onChange={e=>handleImageChange(e)} accept='.png'/>
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input type="location" placeholder='Wandegeya, Bombo Road' id="location" value={location} onChange={(e)=>setLocation(e.target.value)} />
      </div>
      <div>
        <label htmlFor="cost">Avg. Price</label>
        <input type="currency" placeholder='$300' id="cost" value={cost} onChange={(e)=>setCost(e.target.value)}/>
      </div> 
      <div>
        <label htmlFor="cuisine">Cuisine</label>
        <input type="text" placeholder='chinese' id="cuisine" value={cuisine} onChange={(e)=>setCuisine(e.target.value)}/>
      </div> 
        <button>Update</button>
    </form>
    </section>
  )
}

export default Index