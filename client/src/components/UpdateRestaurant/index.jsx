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
  // const [foods, setFoods] = useState({meals:0,break:0,snacks:0})
  const [foods, setFoods] = useState(null)

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
      setFoods((prev)=>({...prev,meals:parseInt(restaurantInfo.Meals.Lunch),snacks:restaurantInfo.Meals.Snacks,break:restaurantInfo.Meals.Break}))
      
      })
    }
    getRestaurant()
  },[id])


  function handleFoodChange(e){
    let foodName=e.target.name;
    let foodValue=e.target.value;
    
   setFoods(prev=>({...prev,[foodName]:foodValue}))
  }
  function handleImageChange(e){
     const image= e.target.files[0]
     const reader = new FileReader()
     reader.readAsDataURL(image)
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
    await axios.patch(`http://localhost:4000/restaurants/${id}`,{
      Name:name,
      Location:location,
      ImageStr:imgStr,
      AvgPrice:cost,
      Meals:{Lunch:foods.meals,Break:foods.break,Snacks:foods.snacks},
      CreatedBy:decoded?.id,
      Cuisine:cuisine
    }).then(res=>{
      setCost(10)
      setName("")
      setCuisine("")
      setLocation("")
      setImgStr("")
      setFoods({meals:0,break:0,snacks:0})
      navigate("/")
    })
  }
  useEffect(()=>{
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
          <img src={imgStr} alt="restaurant-preview" />
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
      <div className='meals-container'>
        <h6>Meals Available</h6>
        <div className='meals-categories'>
            <div>
              <label htmlFor="break">Break</label>
              <input type="number" placeholder='0' id="break" name='break' onChange={e=>handleFoodChange(e)}/>
            </div>
            <div>
              <label htmlFor="meals">Meals</label>
              <input type="number" placeholder='0' id="meals" name="meals" onChange={e=>handleFoodChange(e)}/>
            </div>
            <div>
              <label htmlFor="snacks">Snacks</label>
              <input type="number" placeholder='0' id="snacks" name="snacks" onChange={e=>handleFoodChange(e)}/>
            </div>
        </div>
      </div>

      <button>Update</button>
    </form>
    </section>
  )
}

export default Index