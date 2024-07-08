import React, { useEffect, useState } from 'react'
import "./UpdateProfile.css"
import { Avatar ,Typography, Button} from '@mui/material'
import {Loader} from '../Loader/Loader.jsx'
import {useDispatch, useSelector} from "react-redux"
import {loadUser, updateProfile} from "../../Actions/User.js"
import toast from 'react-hot-toast'

export const UpdateProfile = () => {

    const{loading, error, user} = useSelector((state) => state.user);
    const {loading: updateLoading, error: updateError, message} = useSelector((state)=>state.user);

    const[name, setName] = useState(user.name);
    const[email, setEmail] = useState(user.email);
    const[avatar, setAvatar] = useState("");
    const[avatarPrev, setAvatarPrev] = useState(user.avatar.url);

    const dispatch = useDispatch();

    const handleImageChange = (e) =>{
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if(Reader.readyState === 2){
                setAvatar(Reader.result);
                setAvatarPrev(Reader.result);
            }
        }
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(updateProfile(name,email,avatar));
        dispatch(loadUser());
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearErrors"});
        } 
        if(updateError){
            toast.error(updateError);
            dispatch({type:"clearErrors"});
        }
        if(message){
            toast.success(message);
            dispatch({type:"clearMessage"});
        }
    },[dispatch, error, updateError, message]);

  return (
    loading ? <Loader /> :
    (<div className='updateProfile'>
        <form action="" className="updateProfileForm" onSubmit={submitHandler}>
            <Typography variant='h3' style={{padding:"2vmax"}}>Update Profile</Typography>

            <Avatar 
                src={avatarPrev} 
                alt='User' 
                sx={{height:"10vmax", width:"10vmax"}}
            />

            <input 
                type="file" 
                accept='image/*' 
                onChange={handleImageChange}
            />

            <input 
                type="text" 
                placeholder='Name'
                value={name} 
                className='updateProfileInputs'
                required
                onChange={(e)=>setName(e.target.value)}     
            />

            <input 
                type="email" 
                placeholder="Email" 
                required 
                value={email} 
                className='updateProfileInputs'
                onChange={(e)=>{setEmail(e.target.value)}}
            />

            <Button disabled={updateLoading} type="submit">Update</Button>
        </form>
    </div>)
  )
}

