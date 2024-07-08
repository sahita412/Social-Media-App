import React, { useState } from 'react'
import './Search.css'
import { Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import { User } from '../User/User';

export const Search = () => {

    const [name, setName] = useState("");
    const {users, loading:usersLoading} = useSelector((state)=>state.allUsers);
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(getAllUsers(name));
    }


  return (
    <div className='search'>
        <form action="" className="searchForm" onSubmit={submitHandler}>
            <Typography variant='h3' style={{padding:"2vmax"}}>Search</Typography>

            <input 
                type="text" 
                placeholder='Name'
                value={name}
                required
                onChange={(e)=>setName(e.target.value)}     
            />

            <Button disabled={usersLoading} type="submit">Search</Button>
        
            <div className='searchResults'>
                {
                    users && users.length>0 ?
                    (
                        users.map((user)=>(
                            <User
                                key={user._id}
                                userId={user._id}
                                name={user.name}
                                avatar={user.avatar.url}
                            />
                        ))
                    ):(<Typography>No users found</Typography>)
                }
            </div>
        </form>
    </div>
  )
}
