import React from 'react'
import { NavLink } from 'react-router'

const FrontPge = () => {
  return (
    <>
    <div className='container indexpage loginpage text-center'>
        <h1 className="header">Welcome to User Management System </h1>
        <NavLink className={"loginlink"} to={"/login"}> Login Here </NavLink>
    </div>
    </>
  )
}

export default FrontPge