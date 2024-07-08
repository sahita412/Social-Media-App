import React, {useEffect, useState} from 'react'
import "./Account.css"
import { useDispatch, useSelector } from 'react-redux'
import { deleteMyProfile, getMyPosts, logoutUser } from '../../Actions/User';
import { Loader } from '../Loader/Loader';
import { Post } from '../Post/Post'
import { Avatar, Button, Typography, Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../User/User';
import toast from 'react-hot-toast';

export const Account = () => {
    const dispatch = useDispatch();

    const {user, loading:userLoading} = useSelector((state)=> state.user);
    const {loading, error, posts} = useSelector((state) => state.myPosts);
    const{error:likeError,message} = useSelector((state)=>state.like);
    const {error:userError, loading:deleteLoading, message: userMessage} = useSelector((state)=>state.user);

    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);

    const logoutHandler = () => {
        dispatch(logoutUser());
    }

    const deleteProfileHandler = async() => {
        await dispatch(deleteMyProfile());
        dispatch(logoutUser());
    }

    useEffect(() => {
      dispatch(getMyPosts())
    }, [dispatch])
    
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearErrors"});
        }
        if(likeError){
            toast.error(likeError);
            dispatch({type:"clearErrors"});
        }
        if(userError){
            toast.error(userError);
            dispatch({type:"clearErrors"});
        }
        if (message) {
            toast.success(message);
            dispatch({type:"clearMessage"});
        }
        if (userMessage) {
            toast.success(userMessage);
            dispatch({type:"clearMessage"});
        }
    },[error, message, likeError, userError , userMessage ,  dispatch]);

  return loading===true || userLoading===true  ? (<Loader/>):(
    <div className='account'>
        <div className="accountleft">
            {
                posts && posts.length > 0 ? 
                    posts.map((post) => (
                        <Post
                            key={post._id}
                            postId={post._id}
                            caption = {post.caption}
                            postImage = {post.image.url}
                            likes={post.likes}
                            comments={post.comments}
                            ownerImage={post.owner.avatar?post.owner.avatar.url:null}
                            ownerName={post.owner.name}
                            ownerId={post.owner._id}
                            isAccount={true}
                            isDelete={true}
                        />
                    ))
                :
                    <Typography variant='h4'>No posts to show</Typography>
            }
        </div>
        <div className="accountright">

            <Avatar 
                src={user.avatar.url} 
                sx={{height:"10vmax", width:"10vmax"}}
            />
            <Typography variant='h5'>{user.name}</Typography>

            <div>
                <button onClick={()=>setFollowersToggle(!followersToggle)}><Typography>{user.followers.length} followers</Typography></button>
                <button onClick={()=>setFollowingToggle(!followingToggle)}><Typography>{user.following.length} following</Typography></button>
                <button><Typography>{user.posts.length} posts</Typography></button>
            </div>
            
            <Button variant='contained' onClick={logoutHandler}>Logout</Button>

            <Link to="/update/profile">Edit Profile</Link>
            <Link to="/update/password">Change Password</Link>

            <Button 
                variant='text' 
                style={{color:"red", margin:"2vmax"}} 
                onClick={deleteProfileHandler}
                disabled={deleteLoading}
            >
                Delete Account
            </Button>

            <Dialog open={followersToggle} onClose={()=>setFollowersToggle(!followersToggle)}>
                <div className='DialogBox'>
                    <Typography variant='h4'>Followers</Typography>
                    {
                        user && user.followers.length>0?
                            user.followers.map((follower)=>(
                                <User
                                    key={follower._id}
                                    userId={follower._id}
                                    name={follower.name}
                                    avatar={follower.avatar.url}
                                />
                            ))
                        :
                            <Typography style={{margin:"2vmax"}} >You have no followers</Typography>
                    }
                </div>
            </Dialog>
            <Dialog open={followingToggle} onClose={()=>setFollowingToggle(!followingToggle)}>
                <div className='DialogBox'>
                    <Typography variant='h4'>Following</Typography>
                    {
                        user && user.following.length>0?
                            user.following.map((follow)=>(
                                <User
                                    key={follow._id}
                                    userId={follow._id}
                                    name={follow.name}
                                    avatar={follow.avatar.url}
                                />
                            ))
                        :
                            <Typography style={{margin:"2vmax"}}>You don't follow anyone</Typography>
                    }
                </div>
            </Dialog>
        </div>
    </div>
  )
}
