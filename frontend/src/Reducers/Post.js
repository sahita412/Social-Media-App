import {createReducer} from "@reduxjs/toolkit"

const initialState={};

export const likeReducer = createReducer(initialState,(builder)=>{
    builder
        .addCase('likeRequest',(state)=>{
            return {...state, loading:true, error:null}
        })
        .addCase('likeSuccess',(state,action)=>{
            return {...state, loading:false, message:action.payload}
        })
        .addCase('likeFailure',(state,action)=>{
            return {...state, loading:false, error:action.payload}
        })
        
        .addCase('clearErrors',(state)=>{
            return {...state, error:null}
        })
        .addCase('clearMessage',(state)=>{
            return {...state, message:null}
        })
});

export const commentReducer = createReducer(initialState,(builder)=>{
    builder
        .addCase('addCommentRequest',(state)=>{
            return {...state, loading:true, error:null}
        })
        .addCase('addCommentSuccess',(state,action)=>{
            return {...state, loading:false, message:action.payload}
        })
        .addCase('addCommentFailure',(state,action)=>{
            return {...state, loading:false, error:action.payload}
        })
        .addCase('deleteCommentRequest',(state)=>{
            return {...state, loading:true, error:null}
        })
        .addCase('deleteCommentSuccess',(state,action)=>{
            return {...state, loading:false, message:action.payload}
        })
        .addCase('deleteCommentFailure',(state,action)=>{
            return {...state, loading:false, error:action.payload}
        })
        .addCase('clearErrors',(state)=>{
            return {...state, error:null}
        })
        .addCase('clearMessage',(state)=>{
            return {...state, message:null}
        })
});

export const myPostsReducer = createReducer(initialState, (builder) =>{
    builder
        .addCase('myPostsRequest', (state)=>{
            return {...state, loading:true}
        })
        .addCase('myPostsSuccess',(state,action)=>{
            return {...state, loading:false, posts:action.payload}
        })
        .addCase('myPostsFailure',(state,action)=>{
            return {...state, loading:false, error:action.payload}
        })
        .addCase('clearErrors',(state)=>{
            return {...state, error:null}
        })
});

export const userPostsReducer = createReducer(initialState, (builder) =>{
    builder
        .addCase('userPostsRequest', (state)=>{
            return {...state, loading:true}
        })
        .addCase('userPostsSuccess',(state,action)=>{
            return {...state, loading:false, posts:action.payload}
        })
        .addCase('userPostsFailure',(state,action)=>{
            return {...state, loading:false, error:action.payload}
        })
        .addCase('clearErrors',(state)=>{
            return {...state, error:null}
        })
});

export const PostReducer = createReducer(initialState, (builder) =>{
    builder
        .addCase('newPostRequest',(state)=>{
            return {...state, loading:true, error:null}
        })
        .addCase('newPostSuccess',(state,action)=>{
            return {...state, loading:false, message:action.payload}
        })
        .addCase('newPostFailure',(state,action)=>{
            return {...state, loading:false, error:action.payload}
        })

        .addCase('updateCaptionRequest',(state)=>{
            return {...state, loading:true, error:null}
        })
        .addCase('updateCaptionSuccess',(state,action)=>{
            return {...state, loading:false, message:action.payload}
        })
        .addCase('updateCaptionFailure',(state,action)=>{
            return {...state, loading:false, error:action.payload}
        })

        .addCase('deletePostRequest',(state)=>{
            return {...state, loading:true, error:null}
        })
        .addCase('deletePostSuccess',(state,action)=>{
            return {...state, loading:false, message:action.payload}
        })
        .addCase('deletePostFailure',(state,action)=>{
            return {...state, loading:false, error:action.payload}
        })
        
        .addCase('clearErrors',(state)=>{
            return {...state, error:null}
        })
        .addCase('clearMessage',(state)=>{
            return {...state, message:null}
        })
});