import axios from "axios";
import base_url from "../store.js";
export const loginUser = (email, password)=> async(dispatch)=> {
    try {

        dispatch({
            type:"LoginRequest"
        });

        const { data } = await axios.post(`${base_url}/api/v1/login`,
            {email,password},
            {headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
        }
        );

        dispatch({
            type:"LoginSuccess",
            payload:data.user,
        });
        
    } catch (error) {
        dispatch({
            type:"LoginFailure",
            payload: error.response.data.message,
        });
    }
}

export const registerUser = (name, email, password, avatar)=> async(dispatch)=> {
    try {

        dispatch({
            type:"RegisterRequest"
        });

        const { data } = await axios.post(`${base_url}/api/v1/register`,
            {name, email, password, avatar},
            {headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
        }
        );

        dispatch({
            type:"RegisterSuccess",
            payload:data.user,
        });
        
    } catch (error) {
        dispatch({
            type:"RegisterFailure",
            payload: error.response.data.message,
        });
    }
}

export const updateProfile = (name, email, avatar)=> async(dispatch)=> {
    try {

        dispatch({
            type:"updateProfileRequest"
        });

        const { data } = await axios.put(`${base_url}/api/v1/update/profile`,
            {name, email, avatar},
            {headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
        });

        dispatch({
            type:"updateProfileSuccess",
            payload:data.message,
        });
        
    } catch (error) {
        dispatch({
            type:"updateProfileFailure",
            payload: error.response.data.message,
        });
    }
}

export const loadUser = ()=> async(dispatch)=> {
    try {
        const config = {
            withCredentials: true,
        };
        
        dispatch({
            type:"LoadUserRequest"
        });
        
        const { data } = await axios.get(`${base_url}/api/v1/me`,config);
        
        dispatch({
            type:"LoadUserSuccess",
            payload:data.user,
        });
        
    } catch (error) {
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data.message,
        });
    }
}


export const getFollowingPosts = () => async (dispatch) =>{
    try {
        const config = {
            withCredentials: true,
        };
        dispatch({
            type: "PostOfFollowingRequest",
        });
        
        const { data } = await axios.get(`${base_url}/api/v1/posts`,config);
        
        dispatch({
            type: "PostOfFollowingSuccess",
            payload: data.posts,
        });
        
    } catch (error) {
        dispatch({
            type: "PostOfFollowingFailure",
            payload: error.response.data.message,
        });
    }
}

export const getMyPosts = () => async (dispatch) =>{
    try {
        const config = {
            withCredentials: true,
        };
        dispatch({
            type: "myPostsRequest",
        });
        
        const { data } = await axios.get(`${base_url}/api/v1/my/posts`,config);
        
        dispatch({
            type: "myPostsSuccess",
            payload: data.posts,
        });
        
    } catch (error) {
        dispatch({
            type: "myPostsFailure",
            payload: error.response.data.message,
        });
    }
}


export const getAllUsers = (name = "") => async (dispatch) =>{
    try {
        const config = {
            withCredentials: true,
        };

        dispatch({
            type: "allUsersRequest",
        });
        
        const { data } = await axios.get(`${base_url}/api/v1/users?name=${name}`,config);
        
        dispatch({
            type: "allUsersSuccess",
            payload: data.users,
        });
        
    } catch (error) {
        dispatch({
            type: "allUsersFailure",
            payload: error.response.data.message,
        });
    }
}

export const logoutUser = ()=> async(dispatch)=> {
    try {
        const config = {
            withCredentials: true,
        };

        dispatch({
            type:"LogoutUserRequest"
        });

        await axios.get(`${base_url}/api/v1/logout`,config);

        dispatch({
            type:"LogoutUserSuccess",
        });
        
    } catch (error) {
        dispatch({
            type:"LogoutUserFailure",
            payload: error.response.data.message,
        });
    }
}

export const updatePassword = (oldPassword, newPassword)=> async(dispatch)=> {
    try {

        dispatch({
            type:"updatePasswordRequest"
        });

        const { data } = await axios.put(`${base_url}/api/v1/update/password`,
            {oldPassword, newPassword},
            {headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
        });

        dispatch({
            type:"updatePasswordSuccess",
            payload:data.message,
        });
        
    } catch (error) {
        dispatch({
            type:"updatePasswordFailure",
            payload: error.response.data.message,
        });
    }
}

export const deleteMyProfile = ()=> async(dispatch)=> {
    try {
        const config = {
            withCredentials: true,
        };

        dispatch({
            type:"deleteProfileRequest"
        });

        const { data } = await axios.delete(`${base_url}/api/v1/delete/me`,config);

        dispatch({
            type:"deleteProfileSuccess",
            payload:data.message,
        });
        
    } catch (error) {
        dispatch({
            type:"deleteProfileFailure",
            payload: error.response.data.message,
        });
    }
}

export const forgotPassword = (email)=> async(dispatch)=> {
    try {

        dispatch({
            type:"forgotPasswordRequest"
        });

        const { data } = await axios.post(`${base_url}/api/v1/forgot/password`, {
            email
        },{
            headers:{"Content-Type":"application/json"},
            withCredentials:true,
        });

        dispatch({
            type:"forgotPasswordSuccess",
            payload:data.message,
        });
        
    } catch (error) {
        dispatch({
            type:"forgotPasswordFailure",
            payload: error.response.data.message,
        });
    }
}

export const resetPassword = (token, password)=> async(dispatch)=> {
    try {

        dispatch({
            type:"resetPasswordRequest"
        });

        const { data } = await axios.put(`${base_url}/api/v1/password/reset/${token}`, {
            password
        },{
            headers:{"Content-Type":"application/json"},
            withCredentials:true,
        });

        dispatch({
            type:"resetPasswordSuccess",
            payload:data.message,
        });
        
    } catch (error) {
        dispatch({
            type:"resetPasswordFailure",
            payload: error.response.data.message,
        });
    }
}

export const getUserPosts = (id) => async (dispatch) =>{
    try {

        const config = {
            withCredentials: true,
          };

        dispatch({
            type: "userPostsRequest",
        });
        
        const { data } = await axios.get(`${base_url}/api/v1/userposts/${id}`,config);
        
        dispatch({
            type: "userPostsSuccess",
            payload: data.posts,
        });
        
    } catch (error) {
        dispatch({
            type: "userPostsFailure",
            payload: error.response.data.message,
        });
    }
}
export const getUserProfile = (id) => async (dispatch) =>{
    try {

        const config = {
            withCredentials: true,
        };

        dispatch({
            type: "userProfileRequest",
        });
        
        const { data } = await axios.get(`${base_url}/api/v1/user/${id}`,config);
        
        dispatch({
            type: "userProfileSuccess",
            payload: data.user,
        });
        
    } catch (error) {
        dispatch({
            type: "userProfileFailure",
            payload: error.response.data.message,
        });
    }
}

export const followAndUnfollowUser = (id) => async (dispatch) =>{
    try {

        const config = {
            withCredentials: true,
        };

        dispatch({
            type: "followUserRequest",
        });
        
        const { data } = await axios.get(`${base_url}/api/v1/follow/${id}`, config);
        
        dispatch({
            type: "followUserSuccess",
            payload: data.message,
        });
        
    } catch (error) {
        dispatch({
            type: "followUserFailure",
            payload: error.response.data.message,
        });
    }
}