import {React, useState, useEffect} from 'react'
import "./UpdatePassword.css"
import {Typography,Button} from "@mui/material"
import { useDispatch } from 'react-redux'
import { updatePassword } from '../../Actions/User'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

export const UpdatePassword = () => {

  const[oldPassword, setOldPassword] = useState("");
  const[newPassword, setNewPassword] = useState("");
  
  const{loading, error, message} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(updatePassword(oldPassword,newPassword));
  }
  
  useEffect(()=>{
    if(error){
      console.log(error);
      toast.error(error);
      dispatch({type:"clearErrors"})
    }
    if(message){
      toast.success(message);
      dispatch({type:"clearMessage"})
    }
  },[dispatch, error, message]); //alert 
  
  return (
    <div className='updatePassword'>
        <form className='updatePasswordForm' onSubmit={submitHandler}>
            <Typography variant='h3' style={{padding:"2vmax"}}>Update Password</Typography>

            <input 
                type="password" 
                placeholder="Old Password" 
                required
                value={oldPassword}
                className='updatePasswordInputs'
                onChange={(e)=>{setOldPassword(e.target.value)}}
            />
            <input 
                type="password" 
                placeholder="New Password" 
                required
                value={newPassword}
                className='updatePasswordInputs'
                onChange={(e)=>{setNewPassword(e.target.value)}}
            />

            <Button disabled={loading} type="submit">Change Password</Button>
        </form>
    </div>
  )
}