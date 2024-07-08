import React, { useState , useEffect} from 'react'
import "./ForgotPassword.css"
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../Actions/User';
import toast from 'react-hot-toast';

export const ForgotPassword = () => {

    const dispatch = useDispatch();
    const {error, loading, message} = useSelector((state)=>state.user);

    const [email, setEmail] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearErrors"});
        }
        if(message){
            toast.success(message);
            dispatch({type:"clearErrors"});
        }
    },[error, message, dispatch]);

  return (
    <div className='forgotPassword'>
        <form className='forgotPasswordForm' onSubmit={submitHandler}>
            <Typography variant='h3' style={{padding:"2vmax"}}>Enter your email</Typography>
            <input 
                type="email" 
                placeholder="Email" 
                required 
                className='forgotPasswordInputs'
                value={email} 
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <Button type="submit" disabled={loading} >Send email</Button>
        </form>
    </div>
  )
}
