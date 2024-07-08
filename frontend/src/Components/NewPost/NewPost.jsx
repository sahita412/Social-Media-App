import {Typography , Button} from "@mui/material"
import React, { useEffect, useState } from 'react'
import "./NewPost.css"
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from "../../Actions/Post";
import { loadUser } from "../../Actions/User";
import toast from "react-hot-toast";

export const NewPost = () => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");

    const {loading, error, message} = useSelector(state => state.newPost);
    const dispatch = useDispatch();

    const handleImageChange = (e) =>{
        const file = e.target.files[0];

        const Reader = new FileReader();
        if(file){
            Reader.readAsDataURL(file);
            
            Reader.onload = () => {
                if(Reader.readyState === 2){
                    setImage(Reader.result);
                }
            }
        }
        else{
            toast.error("no file selected")
        }
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(createNewPost(caption, image));
        dispatch(loadUser());
    };

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type: "clearErrors"});
        }
        if(message){
            toast.success(message);
            dispatch({type: "clearMessage"});
        }
    }, [dispatch, message, error]);

  return (
    <div className='newPost'>
        <form className='newPostForm' onSubmit={submitHandler}>
            <Typography variant="h3" >New Post</Typography>

            {image && <img src={image} alt="post" />}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input 
                type="text" 
                placeholder="caption" 
                value={caption} onChange={(e)=>setCaption(e.target.value)}

            />
            <Button disabled={loading} type="submit">Post</Button>
        </form>
    </div>
  )
}
