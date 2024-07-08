import {React, useEffect} from 'react'
import "./CommentCard.css"
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentOnPost } from '../../Actions/Post'
import { getFollowingPosts, getMyPosts } from '../../Actions/User'
import toast from 'react-hot-toast';

export const CommentCard = (
    {userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount,
  }) => {

    const {user} = useSelector((state)=>state.user);
    const{error:commentError,message:commentMessage} = useSelector((state)=> state.comment);
    const dispatch = useDispatch();

    const deleteCommentHandle = async() =>{
      await dispatch(deleteCommentOnPost(postId, commentId));

      if (isAccount) {
        dispatch(getMyPosts());
      }else{
        dispatch(getFollowingPosts());
      }
    }
    useEffect(()=>{
        if(commentError){
            toast.error(commentError);
            dispatch({type:"clearErrors"});
        }
        if (commentMessage) {
            toast.success(commentMessage);
            dispatch({type:"clearMessage"});
        }
    },[commentError, commentMessage, dispatch]);

    return (
      <div className='commentUser'>
          <Link to={`/user/${userId}`} >
              <img src={avatar} alt={name}/>
              <Typography style={{minWidth:"6vmax"}}>{name}</Typography>
          </Link>
          <Typography>{comment}</Typography>

        {
          isAccount?
            (<Button onClick={deleteCommentHandle}>
                <Delete/>
            </Button>)
          : userId === user._id ?
            (<Button onClick={deleteCommentHandle}>
                  <Delete/>
              </Button>)
            :null
        }
      </div>
    )
}
