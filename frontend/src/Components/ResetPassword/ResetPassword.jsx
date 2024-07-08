import React, {useEffect, useState} from 'react'
import "./ResetPassword.css"
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { resetPassword } from '../../Actions/User';
import toast from 'react-hot-toast';

export const ResetPassword = () => {

    const[newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();
    const params = useParams();
    const{loading, error, message} = useSelector((state) => state.user);

    const submitHandler = (e)=>{
      e.preventDefault();
      dispatch(resetPassword(params.token, newPassword));
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
     <div className='resetPassword'>
        <form className='resetPasswordForm' onSubmit={submitHandler}>
            <Typography variant='h3' style={{padding:"2vmax"}}>Reset Password</Typography>

            <input 
                type="password" 
                placeholder="New Password" 
                required
                value={newPassword}
                className='resetPasswordInputs'
                onChange={(e)=>{setNewPassword(e.target.value)}}
            />

            <Link to="/"><Typography>Login</Typography></Link>

            <Typography>Or</Typography>

            <Link to="/forgot/password">
                <Typography>Request another token</Typography>
            </Link>

            <Button disabled={loading} type="submit">Reset Password</Button>
        </form>
    </div>
  )
}
