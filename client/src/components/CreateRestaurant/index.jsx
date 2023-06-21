import React, {useState, useEffect} from 'react'
import axios from "axios"
import jwtDecode from "jwt-decode"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import 
//styles
import "./style.css"
import { Link } from 'react-router-dom'

//test image
import RestaurantImage from "../../assets/restaurant.jpg"

function Index({type}) {
  const [name, setName]=useState("")
  const [location, setLocation]= useState("")
  const [image, setImage]= useState(null)
  const [cost, setCost]=useState(10)
  const [cuisine, setCuisine]=useState("")
  const [imgStr, setImgStr] = useState("")
  


  function handleImageChange(e){
     
     setImage( e.target.files[0])
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
      toast.error("Please login to create a restaurant")
      return;
    }

    if([name,location,cost,cuisine].some(item=>item.length==0)){
      toast.error("All fields are required")
      return
    }
    let form = new FormData()
    form.append("Name",name);
    form.append("Location",location);
    form.append("AvgPrice",cost);
    form.append("CreatedBy",decoded?.id);
    form.append("Cuisine",cuisine);
    form.append("image",image)
    await axios.post("http://localhost:4000/restaurants/create",form).then(res=>{
      console.log(res.data)
      setCost(10)
      setName("")
      setCuisine("")
      setLocation("")
      setImage(null)
      toast.success("Restaurant Successfully added")
    }).catch(err=>{
      console.error(err)
      toast.error("Failed to create restaurant")
    })
  }

  return (
    <section className='form-container'>
      <ToastContainer />
       <form onSubmit={handleSubmit} encType='multipart/form-data'>
       <h3 style={{justifySelf:"center"}} >Create Restaurant</h3>
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
      <button>Add</button>
    </form>
    </section>
  )
}

export default Index