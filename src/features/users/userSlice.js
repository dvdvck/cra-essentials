import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import {client} from '../../api/client'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=>{
  const response = await client.get('fakeApi/users')
  return response.users
})

const userAdapter = createEntityAdapter()

const userSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState(),

  reducers:{
    userAdd(state, payload){

    }
  },
  extraReducers:{
    [fetchUsers.fulfilled]: userAdapter.setAll
      // returns el state actualizado
      //state.users = action.payload
      //return action.payload
    
  }

})
/* 
export const selectUserById = userId=> state=> state.users.find(user=> user.id === userId)
export const selectAllUsers = state=> state.users;
 */

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = userAdapter.getSelectors(state=> state.users)
export const {userAdd} = userSlice.actions
export default userSlice.reducer