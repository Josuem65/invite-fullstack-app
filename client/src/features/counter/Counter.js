import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, tally, going, notGoing, selectError, selectLoading, selectUserInfo, selectGoing, selectNotGoing } from './counterSlice';
// import { selectGoing } from './goingSlice';
// import {  selectNotGoing } from './notGoingSlice';
import { FaCheck, FaUserSlash } from "react-icons/fa"

export function Counter() { 
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const goingAmount = useSelector(selectGoing)
  const notGoingAmount = useSelector(selectNotGoing)
  
  useEffect(() => {
    if(loading) {
      dispatch(getUser(dispatch))
      dispatch(tally(dispatch))
      console.log('dispatch')
    } else {
      console.log('did not dispatch')
    }
  }, [])

  const user = userInfo

  function handleGoing(user, dispatch) {
    dispatch(going(user, dispatch))
  }

  function handleNotGoing(user, dispatch) {
    dispatch(notGoing(user, dispatch))
  }


  function renderUser(user) {
    if (loading) return <strong>Loading please wait...</strong>;
    
    if (error) return <strong>Items not available at this time</strong>;
    
    return (
      <>
      <div className="tallyCount">
        <span>Going: {goingAmount}</span>  
        <span>Not Going: {notGoingAmount}</span>
      </div>
      <div className="userCard">
        <div className="imgDiv">
          <img className="userImg" src={user.picture.large}/>
        </div>
        <div className="userInfoDiv">
          <div className="name">
            <span className="bold">Name: </span>
            <span>{user.name.first} {user.name.last}</span>
          </div>
          <div className="phone">
            <span className="bold">Phone: </span>
            <span>{user.phone}</span>
          </div>
          <div className="email">
            <span className="bold">Email: </span>
            <span>{user.email}</span>
          </div>
        </div>
      <div className="BtnDiv">
        <button className="notGoingBtn"onClick={() => handleNotGoing(user, dispatch)}><FaUserSlash/></button>
        <button className="goingBtn" onClick={() => handleGoing(user, dispatch)}><FaCheck/></button>
      </div>
      </div>
      </>
    )
  }

  return (
    <div className="mainUser">
      <h1>User goes here:</h1>
      <br></br>
      {renderUser(user.results[0])}
    </div>
  );
}
