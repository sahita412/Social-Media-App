import {configureStore} from "@reduxjs/toolkit"
import { allUsersReducer, getPostOfFollowingReducer, userProfileReducer, userReducer } from "./Reducers/User.js";
import { PostReducer, commentReducer, likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post.js";

const store = configureStore({
    reducer:{
        user: userReducer,
        postOfFollowing: getPostOfFollowingReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        comment: commentReducer,
        myPosts: myPostsReducer, 
        userPosts: userPostsReducer,
        newPost: PostReducer,
        userProfile: userProfileReducer
    }
});

const base_url = "https://social-media-app-zeta-teal.vercel.app";

export default store;