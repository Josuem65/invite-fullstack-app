import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

export const  initialState = {
  loading: true,
  error: false,
  users: {results: [{}]},
  going: 0,
  notGoing: 0,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// export const getUser = createAsyncThunk('counter/getUser',
//   async (dispatch) => {
//     try {
//       const response = await axios.get('localhost:3001')
//       dispatch(display(response.data))
//       console.log(response.data)
//   } catch(err) {
//       dispatch(setError())
//     }
//     // The value we return becomes the `fulfilled` action payload
//     // return response.data;
//   }
// );

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    display: (state, action) => {
      state.users = action.payload
      state.error = false;
      state.loading = false;
    },
    setError: (state) => {
      state.error = true;
    },
    goingTally: (state, action) => {
      state.going = action.payload
    },
    notGoingTally: (state, action) => {
      state.notGoing = action.payload
    }

  },
});

export const { display, setError, goingTally, notGoingTally } = counterSlice.actions;

// const unique_id = uuid();
// const small_id = unique_id.slice(0,16)
// const user_id = small_id

export const going = (user) => dispatch => {
  axios.post('http://localhost:3001/api/going', user)
  .then(() => {
    dispatch(getUser(dispatch))
    })
}

export const notGoing = (user) => dispatch => {
  axios.post('http://localhost:3001/api/notgoing', user)
  .then(() => {
    dispatch(getUser(dispatch))
    })
}

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const getUser = () => (dispatch) => {
  console.log('getting user')
  axios.get('http://localhost:3001/api')
  .then((resp) => { 
    console.log('receiving from backend')
    dispatch(display(resp.data))
    console.log('display dispatch sent')
  })
  .catch((err) => {
    dispatch(setError())
  })
  dispatch(tally())
};

export const tally = () => (dispatch) => {
  axios.get('http://localhost:3001/api/going')
  .then((resp) => { 
    dispatch(goingTally(resp.data.length))
  })

  axios.get('http://localhost:3001/api/notgoing')
  .then((resp) => { 
    dispatch(notGoingTally(resp.data.length))
  })
}

// export const response = await axios.get('https://randomuser.me/api/').then((res) => {
//   dispatch(display(res.data))
// })
// console.log(response.data);

export const selectUserInfo = (state) => state.counter.users
export const selectLoading = (state) => state.counter.loading
export const selectError = (state) => state.counter.error
export const selectGoing = (state) => state.counter.going
export const selectNotGoing = (state) => state.counter.notGoing


export default counterSlice.reducer;
