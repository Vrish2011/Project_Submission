"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {useEffect, useState, useRef} from "react"

function Layout({ setPage, page }) {
 

  if (page == "home") {
    
    return (
      <nav id="layout">
        <ul>
          <li>
            
          </li>
          <li>Good Morning</li>
          <li>
            
          </li>
        </ul>
      </nav>)
  
  }

  return (
    <nav id="layout">
      <ul style={{display: "flex", border: "none", gap: "40px", listStyle: "none"}}>
        <li style={{fontSize: "40px"}}>Good Morning</li>
        <li id="sun" style={{fontSize: "40px"}}>☀️</li>
        
      </ul>
    </nav>
  );
}



function Login({ setPage, page }) {

 
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const phone_numberref = useRef(null)

  function handle_login(e) {
    e.preventDefault();
    
    if (nameRef.current.value && emailRef.current.value && phone_numberref.current.value) {
      fetch("/api/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: nameRef.current.value,
          email: emailRef.current.value,
          phone_number: phone_numberref.current.value
        })
      })
        .then(response => response.json())
        .then(function (data) {
          alert(JSON.stringify(data))
        });
    }
  }

  return (
    <div>
      <Layout setPage={setPage} page={page} />
      <div id="sun">

      </div>
      <form id="auth_div" onSubmit={(e) => handle_login(e)}>
        <input
          id="username"
          placeholder="username"
          className="form-control"
          ref={emailRef}
        />
        <input
          id="password"
          placeholder="name"
          className="form-control"
          ref={nameRef}
        />

        <input id="Phone_Number" placeholder="Phone Number" type="tel" className="form-control" ref={phone_numberref}  autoComplete="tel"
  inputMode="numeric" pattern="[6-9][0-9]{9}"
  minLength={10}
  maxLength={10}/>
  <button
        id="register"
        type="submit"
        
        className="btn btn-primary"
      >
        Create
      </button>
      </form>
      
    </div>
  );
}

export default function Home() {

    const [page, setPage] = useState("login")
    if(page == "login")
        {
            return (<Login page={page} setPage={setPage}/>)

    }
    
    
}