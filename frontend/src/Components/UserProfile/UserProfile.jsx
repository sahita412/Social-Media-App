import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followAndUnfollowUser, getUserPosts, getUserProfile } from '../../Actions/User';
import { Loader } from '../Loader/Loader';
import { Post } from '../Post/Post'
import { Avatar, Button, Typography, Dialog } from '@mui/material';
import { useParams } from 'react-router-dom';
import { User } from '../User/User';
import toast from 'react-hot-toast';

export const UserProfile = () => {
    const dispatch = useDispatch();

    const { user, loading:userLoading, error:userError } = useSelector((state)=> state.userProfile);
    const { user: me, loading:followUnfollowLoading, error:followUnfollowError, message } = useSelector((state)=>state.user);
    const { loading, error, posts } = useSelector((state) => state.userPosts);

    const params = useParams();
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [following, setFollowing] = useState(false);
    const [myProfile, setMyProfile] = useState(false);

    const followUnfollowHandler = async() => {
        setFollowing(!following);
        await dispatch(followAndUnfollowUser(user._id));
        dispatch(getUserProfile(params.id));
    }

    useEffect(() => {
      dispatch(getUserPosts(params.id));
      dispatch(getUserProfile(params.id));
      
    }, [dispatch, params.id]);

    useEffect(()=>{
        if(me._id === params.id){
            setMyProfile(true);
          }
        if(user){user.followers.forEach(i => 
            {if(i._id === me._id){
                setFollowing(true);
            }else{
                setFollowing(false);
            }}
        );}
    },[user, me._id, params.id]);
    
    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch({type:"clearErrors"});
        }
        if(followUnfollowError){
            toast.error(followUnfollowError)
            dispatch({type:"clearErrors"});
        }
        if(userError){
            toast.error(userError)
            dispatch({type:"clearErrors"});
        }
        if (message) {
            toast.success(message)
            dispatch({type:"clearMessage"});
        }
    },[error, message, followUnfollowError , userError, dispatch]);

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
                        />
                    ))
                :
                    <Typography variant='h4'>No posts to show</Typography>
            }
        </div>
        <div className="accountright">

            {user && (
                <>
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
                    
                    {
                        myProfile ? null : (
                            <Button 
                                variant='contained' 
                                onClick={followUnfollowHandler}
                                style={{
                                    background: following ? "red" : "blue",
                                    transition: 'ease-in-out 0.3s'
                                }}
                                disabled={followUnfollowLoading}
                            >
                                {following ? "unfollow" : "follow"}
                            </Button>)
                    }
                </>
            )}

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

