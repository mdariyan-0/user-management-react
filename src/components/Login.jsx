import React, { useState } from 'react'

function Login({state, dispatch}) {
    document.title = 'User Management - Login'
    const validEmail = "eve.holt@reqres.in"
    const validPassword = "cityslicka"
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const changeHandlerEmail = (e) => {
      setEmailValue(e.target.value)
    }
    const changeHandlerPassword = (e) => {
      setPasswordValue(e.target.value)
    }
    let data = {
      email: emailValue,
      password: passwordValue
    }
    const sendAuthenticationRequest = async() => {
      try {
        let fetchRequest = await fetch("https://reqres.in/api/login",{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        let response = await fetchRequest.json()
        sessionStorage.setItem("token", response.token)
        dispatch({type: "LOGIN", payload: true})
        alert("Successfully logged in")
      } catch (error) {
        alert("Somethig went wrong: " + error.message)
      }
    }
    const handleLogin = () => {
      if(emailValue === validEmail && passwordValue === validPassword) {
      sendAuthenticationRequest()
      } else {
        alert("Invalid email or password")
      }
    }
  return (
   <>
   <form action="">
    <div className="loginpage container">
      <h1 className="heading my-4">User Login</h1>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          suggested= "current-email"
          className="form-control"
          id="exampleInputEmail1"
          value={emailValue}
          onChange={changeHandlerEmail}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          suggested= "current-password"
          className="form-control"
          id="exampleInputPassword1"
          value={passwordValue}
          onChange={changeHandlerPassword}
        />
      </div>
      <button
        type="button"
        onClick={handleLogin}
        className="btn loginbtn btn-outline-light"
      >
        Login
      </button>
    </div>
    </form>
   </>
  )
}

export default Login