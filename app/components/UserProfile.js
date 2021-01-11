import React, { useState, useEffect, useContext } from "react";
import db from "../firebase.js";
import StateContext from "../StateContext";

export default function UserProfile() {
  const { globalValues, handleUnfollow } = useContext(StateContext);
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [userid, setUserId] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const currentURL = window.location.href;
    const URLUserString = currentURL.indexOf("/user/");
    const URLtoStrip = URLUserString !== -1 && currentURL.substr(URLUserString);
    const userURL = URLtoStrip.replace("/user/", "");

    if (globalValues.mainUserId) {
      db.collection("users")
        .doc(userURL)
        .get()
        .then(user => {
          if (user.exists) {
            setAvatar(user.data().avatar);
            setUsername(user.data().username);
            setUserId(user.data().uid);
            setQuote(user.data().quote);
          } else {
            console.log("No such user!");
          }
        });
    }
  }, [globalValues]);

  return (
    <section id="user-profile">
      <div className="window">
        <h1 className="window__title">User profile</h1>
        <div className="user-profile__user">
          <div className="user-profile__header">
            <figure className="user-profile__avatar">
              <img src={avatar} alt="Profile picture" />
            </figure>
            <h2 className="user-profile__username">{username}</h2>
            <button disabled={!globalValues.followingUsers.includes(userid)} data-uid={globalValues.currentViewUserId} onClick={e => handleUnfollow(e.target)}>
              Unfollow
            </button>
          </div>
          <p className="user-profile__quote">{quote}</p>
        </div>
      </div>
    </section>
  );
}
