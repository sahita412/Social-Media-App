import {React, useState, useEffect} from 'react'
import "./Login.css"
import {Typography,Button} from "@mui/material"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Actions/User'
import toast from 'react-hot-toast'

export const Login = () => {
    const [email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const dispatch = useDispatch();

    const {error, message} = useSelector((state)=>state.user);
    const loginHandler = (e)=>{
        e.preventDefault();
        dispatch(loginUser(email,password));
    }
    
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearErrors"});
        }
        if(message){
            toast.success(message);
            dispatch({type:"clearMessage"});
        }
    },[error, message, dispatch]);

  return (
    <div className='login'>
        <form className='loginForm' onSubmit={loginHandler}>
            <Typography variant='h3' style={{padding:"2vmax"}}>Login</Typography>
            <input 
                type="email" 
                placeholder="Email" 
                required 
                value={email} 
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input 
                type="password" 
                placeholder="Password" 
                required
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
            />
            <Link to="/forgot/password">
                <Typography>Forgot password?</Typography>
            </Link>
            <Button type="submit">Login</Button>
            <Link to="/register">
                <Typography>New User?</Typography>
            </Link>
        </form>
    </div>
  )
}