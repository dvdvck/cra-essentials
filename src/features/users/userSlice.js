import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {client} from '../../api/client'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=>{
  const response = await client.get('fakeApi/users')
  return response.users
})

const userSlice = createSlice({
  name: 'users',
  initialState: [],

  reducers:{
    userAdd(state, payload){

    }
  },
  extraReducers:{
    [fetchUsers.fulfilled]: (state, action)=> {
      // returns el state actualizado
      //state.users = action.payload
      return action.payload
    },
  }

})

export const selectUserById = userId=> state=> state.users.find(user=> user.id === userId)
export const selectAllUsers = state=> state.users;
export const {userAdd} = userSlice.actions
export default userSlice.reducer