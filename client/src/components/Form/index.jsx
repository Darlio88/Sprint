import React,{useEffect, useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
//styles
import "./style.css"
import { Link } from 'react-router-dom'



function Index({type}) {
  const [userName, setUserName]= useState("")
  const [userEmail, setUserEmail]= useState("")
  const [userPassword, setUserPassword]= useState("")
  const navigate = useNavigate()
  async function handleSubmit(e){
    e.preventDefault()
    await axios.post(`http://localhost:4000/users/${type}`,{FullName:userName,Email:userEmail,Password:userPassword}).then(res=>{
      const token = res.data?.token;
      localStorage.setItem("token",token)
      setUserName("")
      setUserEmail("")
      setUserPassword("")
      navigate("/")
    })
  }

  return (
    <section className='form-container'>
       <form onSubmit={handleSubmit}>
       <h3 style={{justifySelf:"center"}} >{type=="signin"?"Log Into Your Account":"Create An account"}</h3>

{  type!=="signin"  ?  <div>
        <label htmlFor="name">Full Name</label>
        <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder='Omoding Daniel' id="name" />
      </div>:null}
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} placeholder='danielomoding173@gmail.com' id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} placeholder='Password' id="password"/>
      </div>
      <div>
        <button>{type=="signin"?"Login":"Signup"}</button>
        <p>{type=="signin"?"Do not yet":"Already"} have an account? <Link to={type=="signin"?"/signup":"/signin"}>click here</Link></p>
      </div>
    </form>
    </section>
  )
}

export default Index