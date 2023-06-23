import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  empty: true,
  error: false,
  usersGoing: [],
}

export const goingSlice = createSlice({
  name: 'going',
  initialState,
  reducers: {
    display: (state, action) => {
      state.empty = false
      state.usersGoing = action.payload
      console.log(action.payload)
    },
    // empty: (state, action) => {
    //   state.empty = true;
    //   console.log('No users going right now')
    // }
  },
});

export const { display } = goingSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const getUsersGoing = async => (dispatch) => {
  axios.get('http://localhost:3001/api/going').then(resp => {
    if(resp.data) {dispatch(display(resp.data))}
  })
};

export const selectGoing = (state) => state.going.usersGoing
export const selectEmpty = (state) => state.going.empty

export default goingSlice.reducer;
