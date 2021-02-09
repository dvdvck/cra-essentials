import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import userSlice from '../features/users/userSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: userSlice
  },

  //reducer:postsReducer

})
