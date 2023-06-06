import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersGoing, selectGoing, selectEmpty } from './goingSlice';
// import { FaCheck, FaUserSlash } from "react-icons/fa";

export function Going() {
  const dispatch = useDispatch()
  const usersGoing = useSelector(selectGoing)
  const empty = useSelector(selectEmpty)

  console.log(usersGoing)

  useEffect(() => {
    dispatch(getUsersGoing())
  
  }, [])

  function itsEmpty() {
    return(
      <h1>There are no users going at this moment</h1>
    )
  }

  function goingUsers(going) {
    console.log('goingUsers function called')
    console.log(going)
    return(
      <>
        <h2>They are going</h2>
        <div className="allGoingDiv">
          {going.map((user) => {
            return (
            <div className="eachUserDiv" key={user.user_id}>
              <div className="userImgDiv">
                <img className="userThumbnail" src={user.picture.large}/>
              </div>
              <div className="eachUserInfo">
                <div className="name">
                  <span className="bold">Name:</span>
                  <span>{user.name.first} {user.name.last}</span>
                </div>
                <div className="phone">
                  <span className="bold">Phone:</span>
                  <span>{user.phone}</span>
                </div>
                <div className="email">
                  <span className="bold">Email:</span>
                  <span className="usersEmail">{user.email}</span>
                </div>
              </div>
            </div>
            )
           })}
        </div>
      </>
    )
  }

  return(
    empty ? itsEmpty() : goingUsers(usersGoing)
  )
}
