import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoginRequest', (state) => {
      return { ...state, loading: true};
    })
    .addCase('LoginSuccess', (state, action) => {
      return { ...state, loading: false, user: action.payload , isAuthenticated: true };
    })
    .addCase('LoginFailure', (state, action) => {
      return { ...state, loading: false, error: action.payload, isAuthenticated: false };
    })

    .addCase('RegisterRequest', (state) => {
      return { ...state, loading: true};
    })
    .addCase('RegisterSuccess', (state, action) => {
      return { ...state, loading: false, user: action.payload, isAuthenticated: true };
    })
    .addCase('RegisterFailure', (state, action) => {
      return { ...state, loading: false, error: action.payload, isAuthenticated: false  };
    })

    .addCase('updateProfileRequest',(state)=>{
      return {...state, loading:true, error:null}
    })
    .addCase('updateProfileSuccess',(state,action)=>{
        return {...state, loading:false, message:action.payload}
    })
    .addCase('updateProfileFailure',(state,action)=>{
        return {...state, loading:false, error:action.payload}
    })

    .addCase('updatePasswordRequest',(state)=>{
      return {...state, loading:true, error:null}
    })
    .addCase('updatePasswordSuccess',(state,action)=>{
        return {...state, loading:false, message:action.payload}
    })
    .addCase('updatePasswordFailure',(state,action)=>{
        return {...state, loading:false, error:action.payload}
    })
    
    .addCase('deleteProfileRequest',(state)=>{
      return {...state, loading:true, error:null}
    })
    .addCase('deleteProfileSuccess',(state,action)=>{
        return {...state, loading:false, message:action.payload}
    })
    .addCase('deleteProfileFailure',(state,action)=>{
        return {...state, loading:false, error:action.payload}
    })
    
    .addCase('LoadUserRequest', (state) => {
      return { ...state, loading: true};
    })
    .addCase('LoadUserSuccess', (state, action) => {
      return { ...state, loading: false, user: action.payload, isAuthenticated: true };
    })
    .addCase('LoadUserFailure', (state, action) => {
      return { ...state, loading: false, error: action.payload, isAuthenticated: false };
    })
    
    .addCase('LogoutUserRequest', (state) => {
      return { ...state, loading: true};
    })
    .addCase('LogoutUserSuccess', (state) => {
      return { ...state, loading: false, user: null, isAuthenticated: false };
    })
    .addCase('LogoutUserFailure', (state, action) => {
      return { ...state, loading: false, error: action.payload, isAuthenticated: true };
    })

    .addCase('forgotPasswordRequest',(state)=>{
      return {...state, loading:true, error:null}
    })
    .addCase('forgotPasswordSuccess',(state,action)=>{
        return {...state, loading:false, message:action.payload}
    })
    .addCase('forgotPasswordFailure',(state,action)=>{
        return {...state, loading:false, error:action.payload}
    })
    
    .addCase('resetPasswordRequest',(state)=>{
      return {...state, loading:true, error:null}
    })
    .addCase('resetPasswordSuccess',(state,action)=>{
        return {...state, loading:false, message:action.payload}
    })
    .addCase('resetPasswordFailure',(state,action)=>{
        return {...state, loading:false, error:action.payload}
    })
    
    .addCase('followUserRequest',(state)=>{
      return {...state, loading:true, error:null}
    })
    .addCase('followUserSuccess',(state,action)=>{
        return {...state, loading:false, message:action.payload}
    })
    .addCase('followUserFailure',(state,action)=>{
        return {...state, loading:false, error:action.payload}
    })

    .addCase('clearErrors', (state)=>{
      return {...state, error: null};
    })
    .addCase('clearMessage',(state)=>{
      return {...state, message:null}
    });
});

export const getPostOfFollowingReducer = createReducer(initialState,(builder)=>{
  builder
    .addCase('PostOfFollowingRequest', (state)=>{
      return {...state, loading: true};
    })
    .addCase('PostOfFollowingSuccess', (state,action)=>{
      return {...state, loading: false, posts: action.payload};
    })
    .addCase('PostOfFollowingFailure', (state,action)=>{
      return {...state, loading: false, error:action.payload};
    })
    .addCase('ClearErrors', (state)=>{
      return {...state, error: null};
    });
});

export const allUsersReducer = createReducer(initialState,(builder)=>{
  builder
    .addCase('allUsersRequest', (state)=>{
      return {...state, loading: true};
    })
    .addCase('allUsersSuccess', (state,action)=>{
      return {...state, loading: false, users: action.payload};
    })
    .addCase('allUsersFailure', (state,action)=>{
      return {...state, loading: false, error:action.payload};
    })
    .addCase('ClearErrors', (state)=>{
      return {...state, error: null};
    });
});

export const userProfileReducer = createReducer(initialState,(builder)=>{
  builder
    .addCase('userProfileRequest', (state)=>{
      return {...state, loading: true};
    })
    .addCase('userProfileSuccess', (state,action)=>{
      return {...state, loading: false, user: action.payload};
    })
    .addCase('userProfileFailure', (state,action)=>{
      return {...state, loading: false, error:action.payload};
    })
    .addCase('ClearErrors', (state)=>{
      return {...state, error: null};
    });
});