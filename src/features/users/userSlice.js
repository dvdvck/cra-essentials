import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState:[
    {id:'1', name: "frutita" },
    {id:'2', name: "florecita" }
  ],

  reducers:{
    userAdd(state, payload){

    }
  }


})

export const {userAdd} = userSlice.actions
export default userSlice.reducer