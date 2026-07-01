"use client"
import React, { useEffect, useMemo, useState, useRef } from "react";



function Profile_Card({user, username}){
  
  return(<div>
    <div id="name_profile">
      <img id="image_profile" src={`${user.avatar_url}`}/>
      <h2 id="username_header">{username}</h2>
      <a href={`${user.html_url}`} target="_blank" id="html_url">{user.html_url}</a>
    </div>
    {user && Object.entries(user).map(([key,value],i)=><div key={key} style={{position:"absolute",top:`${40+Math.floor(i/4)*25}%`,left:`${42.5+(i%4)*22.5}%`,padding:"20px",backgroundColor:"white",width:"20%",height:"20%" , overflow: "auto", overflowWrap: "anywhere"}}><h3>{key}</h3><p>{value?.toString() || "Not available"}</p></div>)}

  </div>)

}

export default function Home() {
  const usernameRef = useRef(null)
  const spinnerRef = useRef(null)
  const backgroundRef = useRef(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  

  function find_user(){
    event.preventDefault()
   
    

   
    if(usernameRef.current.value){
      spinnerRef.current.style.display = "block"
      backgroundRef.current.style.filter = "blur(4000px)"
      
      fetch(`https://api.github.com/users/${usernameRef.current.value}`)
      .then(response => response.json())
      .then(function(data){
        backgroundRef.current.style.filter = "blur(0px)"
        spinnerRef.current.style.display = "none"
        
        
       
        if(data.status){
          alert(data.message)

        }

        else{
          setUser(data)
          setUsername(usernameRef.current.value)
        }
        
      })
    }
  }
  return(<div id="body">
    <div id="background" ref={backgroundRef}></div>
    <div id="spinner" style={{display: "none"}} ref={spinnerRef}></div>
    
    <div id="form">
      <label for="username">Username :   </label>
      <input name="username"  className="w-80 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" id="username" placeholder="Username" ref={usernameRef}/>
      <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200" id="Submit_button" type="submit" onClick={find_user}>Submit</button>     
    </div>
    {user ? <Profile_Card user={user} username={username}/> : ""}
  </div>)
}