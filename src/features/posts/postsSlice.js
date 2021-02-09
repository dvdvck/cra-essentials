import {createSlice, nanoid} from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState:[
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
  ],

  reducers:{
    postAdded: {
      reducer(state, action){
        state.push(action.payload);
      },
      prepare(title, content, userId){
        return {
          payload: {id: nanoid(), title, content, user: userId}
        }
      }
    },
    postUpdated: (state, action) =>{
      const updatedPost = action.payload
      const index = state.findIndex(post=> post.id === updatedPost.id)
      if(index !== -1){
        state.splice(index, 1, updatedPost)
      }
    }
  }
});

export const {postAdded, postUpdated} = postsSlice.actions;
export default postsSlice.reducer