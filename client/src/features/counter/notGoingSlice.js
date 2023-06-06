import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  empty: true,
  error: false,
  notGoing: [],
}

export const notGoingSlice = createSlice({
  name: 'notGoing',
  initialState,
  reducers: {
    display: (state, action) => {
      state.empty = false
      state.notGoing = action.payload
      console.log(action.payload)
    },
    // empty: (state, action) => {
    //   state.empty = true;
    //   console.log('No users notGoing right now')
    // }
  },
});

export const { display } = notGoingSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const getNotGoing = async => (dispatch) => {
  axios.get('/api/notGoing').then(resp => {
    if(resp.data) {dispatch(display(resp.data))}
  })
};

export const selectNotGoing = (state) => state.notGoing.notGoing
export const selectEmpty = (state) => state.notGoing.empty

export default notGoingSlice.reducer;
