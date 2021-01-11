import React, { useState, useEffect, useContext } from "react";
import db from "../firebase.js";
import StateContext from "../StateContext";
import FollowingUser from "./FollowingUser";

export default function FollowingSidebar() {
  const { globalValues } = useContext(StateContext);
  const [users, setUsers] = useState(globalValues.followingUsers);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const readyToRender = Object.values(globalValues.followingUsers).length > 0;
    if (readyToRender) {
      db.collection("users")
        .where("uid", "in", globalValues.followingUsers)
        .get()
        .then(users => {
          setUsers(users.docs.map(user => user.data()));
        });
      setUserCount(Object.values(globalValues.followingUsers).length);
    } else {
      setUserCount(0);
    }
  }, [globalValues]);

  return (
    <section id="following">
      <div className="window">
        <h1 className="window__title">People you follow</h1>
        <div className="window__content">
          <div className="sidebar-profile">{userCount > 0 ? users.map((user, index) => <FollowingUser avatar={user.avatar} username={user.username} uid={user.uid} key={index} />) : <div className="no-follows">You should start following some people...</div>}</div>
        </div>
        <footer className="window__footer">
          <div id="usercounter">You're following {userCount} people</div>
        </footer>
      </div>
    </section>
  );
}
