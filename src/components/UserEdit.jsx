import React, { useState, useEffect } from 'react';
import { useNavigate,useParams} from "react-router"

const UserEdit = ({state, dispatch}) => {
    let navigate = useNavigate()
    const { id } = useParams();
    document.title = "User Management - Edit User"
    const [user, setUser] = useState({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        avatar: "",
      });
      const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
    useEffect(() => {
        const selectedUser = state.userList.find((u) => u.id === parseInt(id));
        if (selectedUser) {
            setUser(selectedUser);
        } else {
          alert("User not found!");
        }
      }, [id, state.userList,  navigate]);
    
    const uploadUpdateValue = async() => {
        try{
        let updateUserValue = await fetch(`https://reqres.in/api/users/${"id"}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
            
        })
        alert("User updated successfully")
        dispatch({type: "UPDATE_USER", payload: user})
        navigate("/userData")
    }catch(err) {
        alert("Error updating user: " + err.message)
    }
    }
    const updateHandler = () => {
        let confirmation = confirm('Are you sure you want to update details?')
        if(confirmation){
            uploadUpdateValue()
        }else{
            // do nothing
        }
    }
  return (
    <>
    <div className="fixed-top-nav d-flex align-items-center justify-content-center">EDIT USER INFORMATION <button
        type="button"
        onClick={() => {
          navigate("/userData")
        }}
        className="btn logout btn-outline-light"
      >
        HOME
      </button></div>
    <form className='container update-form'> 
        <div className="mb-3">
            <label for="firstname" className="form-label">Update First Name: </label>
            <input type="text" name='first_name' value={user.first_name} onChange={handleChange} className="form-control" id="firstname"/>
        </div>
        <div className="mb-3">
            <label for="secondname" className="form-label">Update Last Name: </label>
            <input type="text" name='last_name' value={user.last_name} onChange={handleChange} className="form-control" id="secondname"/>
        </div>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Update Email address: </label>
            <input type="email" name='email' value={user.email} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <button type="button" onClick={updateHandler} className="btn btn-primary">Update</button>
    </form>
    </>
  )
}

export default UserEdit