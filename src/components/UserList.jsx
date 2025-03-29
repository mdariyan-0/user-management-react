import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from "react-router"

const UserList = ({state, dispatch}) => {
  document.title = "User Management - Users"
  const [deleteUser, setDeleteUser] = useState(0)
  const fetchData = async(param)=>{
    try {
      let data = await fetch(`https://reqres.in/api/users?page=${param}`)
      let response = await data.json()
      dispatch({type: "SET_USER_LIST", payload: response.data})
      dispatch({type: "SET_TOTAL_DATA", payload: response.total})
      dispatch({type: "SET_DATA_PER_PAGE", payload: response.per_page})
      dispatch({type: "SET_TOTAL_PAGE", payload: response.total_pages})
    } catch (error) {
      alert("Error fetching data : " + error.message)
    }
  }
    const handleNext = () => {
      fetchData(state.page + 1)
      dispatch({type: "ADD_PAGE", payload: state.page + 1})
    }
    const handlePrev = () => {
      fetchData(state.page - 1)
      dispatch({type: "DELETE_PAGE", payload: state.page - 1})
    }
    useEffect(()=>{
      if(!state.userList){
        fetchData(state.page)
      }else{
        //do nothing
      }
    }, [])
    let navigate = useNavigate()
  return (
    <>
      
        <div className="fixed-top-nav d-flex align-items-center justify-content-center">LIST OF USERS <button
        type="button"
        onClick={() => {
          let confirmation = confirm("Are you sure you want to logout?")
          if(confirmation){
          sessionStorage.removeItem("token")
          dispatch({type: "LOGIN", payload: false})
          dispatch({type: "SET_USER_LIST", payload: ""})
          dispatch({type: "SET_PAGE", payload: 1})
          navigate("/login")
          }else{
            //do nothing
          }
        }}
        className="btn logout btn-outline-light"
      >
        LOGOUT
      </button></div>
        <div className='container user-list d-flex justify-content-center text-center'>
            <div className="row row-gap-5">
                {state.userList? state.userList.map((elem)=>{
                  return <div className='col' key={elem.id}>
                    <div className="card cardintro" style={{width: "18rem"}}>
                      <img src={elem.avatar} className="card-img-top" alt="Avatar"/>
                      <div className="card-body">
                        <h5 className="card-title">{`${elem.first_name} ${elem.last_name}`}</h5>
                        <p className="card-text">{elem.email}</p>
                        <div className="d-flex gap-1 justify-content-between">
                        <NavLink to={`/editUser/${elem.id}`} className="btn btn-primary">Edit User</NavLink>
                        <button onClick={async()=>{
                          let confirmation = confirm("Are you sure you want to delete this user?")
                          if(confirmation){

                            try{
                            let fetchData = await fetch("https://reqres.in/api/users/" + elem.id,{
                              method: 'DELETE',
                              headers: {
                                'Content-Type': 'application/json',
                              }
                            })
                            setDeleteUser(prev => prev + 1)
                            dispatch({
                              type: "SET_USER_LIST",
                              payload: state.userList.filter(user => user.id !== elem.id),
                            });
                            console.log(fetchData);
                            }catch(e){
                              alert("Error deleting user: "+ e.message)
                            }
                          }else{
                            // do nothing
                          }
                        }} type='button' className="btn btn-primary">Delete User</button>
                        </div>
                      </div>
                    </div>
                  </div>
                }): null}
            </div>
        </div>
            <div className="d-flex my-5 container justify-content-between">
                <button type="button"  disabled={state.page <= 1} onClick={handlePrev} className="btn btn-outline-light">&#8636; Previous</button>
                <button type="button"  disabled={state.totalPages == state.page} onClick={handleNext} className="btn btn-outline-light">Next &#8640;</button>
            </div>
    </>
  )
}

export default UserList