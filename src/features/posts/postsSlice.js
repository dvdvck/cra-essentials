import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit'
import {client} from '../../api/client'

const initialState = {
  posts:[],
  status: 'idle',
  error: null,
}

//thunk para consultar los posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

//thunk para enviar al servidor los nuevos posts
export const addNewPost = createAsyncThunk('posts/addNewPost',async (initialPost)=>{
  const response = await client.post('/fakeApi/posts', {post: initialPost});
  return response.post
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,

  reducers:{
    postAdded: {
      reducer(state, action){
        state.posts.push(action.payload);
      },
      prepare(title, content, userId){
        return {
          payload: {id: nanoid(), title, content, user: userId}
        }
      }
    },
    postUpdated: (state, action) =>{
      const updatedPost = action.payload
      const index = state.posts.findIndex(post=> post.id === updatedPost.id)
      if(index !== -1){
        state.posts.splice(index, 1, updatedPost)
      }
    }
  },
  // redux no genera las acciones por defecto de estos reducers
  extraReducers: {
    //loading posts
    [fetchPosts.pending]: (state)=>{
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action)=>{
      state.status = 'succeded'
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action)=>{
      state.status = 'failed'
      state.error = action.error.message
    },

    [addNewPost.fulfilled]: (state, action)=>{
      state.posts.push(action.payload)
    }
  }
});

export const {postAdded, postUpdated} = postsSlice.actions;
export default postsSlice.reducer

export const selectAllPosts = state=> state.posts.posts
export const selectPostById = postId=> state =>
  state.posts.posts.find(post=> post.id === postId)

