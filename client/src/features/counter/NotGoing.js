import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotGoing, selectNotGoing, selectEmpty } from './notGoingSlice';
// import { FaCheck, FaUserSlash } from "react-icons/fa";

export function NotGoing() {
  const dispatch = useDispatch()
  const usersNotGoing = useSelector(selectNotGoing)
  const empty = useSelector(selectEmpty)

  console.log(usersNotGoing)

  useEffect(() => {
    dispatch(getNotGoing())

  }, [])

  function itsEmpty() {
    return(
      <h1>There are no users who have declined yet</h1>
    )
  }

  function notGoingFunc(notGoing) {
    return(
      <>
        <h2>They are not going</h2>
        <div className="allNotGoingDiv">
          {notGoing.map((user) => {
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
    empty ? itsEmpty() : notGoingFunc(usersNotGoing)
  )
}
