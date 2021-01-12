import React, { useState, useEffect, useContext } from "react";
import db from "../firebase.js";
import StateContext from "../StateContext";

export default function MainUserProfile() {
  const { globalValues } = useContext(StateContext);
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (globalValues.mainUserId) {
      db.collection("users")
        .doc(globalValues.mainUserId)
        .get()
        .then(user => {
          if (user.exists) {
            setAvatar(user.data().avatar);
            setUsername(user.data().username);
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
          </div>
          <p className="user-profile__quote">{quote}</p>
        </div>
      </div>
    </section>
  );
}
