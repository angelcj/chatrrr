import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import db from "../firebase.js";
import StateContext from "../StateContext";

export default function SearchUsers() {
  const { globalValues, handleFollow } = useContext(StateContext);
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (globalValues.mainUserId) {
      db.collection("users")
        .where("uid", "not-in", globalValues.followingUsers.concat(globalValues.mainUserId))
        .get()
        .then(users => {
          setUsers(users.docs.map(user => user.data()));
          setOptions(users.docs.map(user => ({ value: user.data().uid, label: user.data().username })));
        });
    }
  }, [globalValues]);

  return (
    <section id="search">
      <div className="window">
        <h1 className="window__title">Search new users</h1>
        <div className="window__content">
          {users.length > 0 ? (
            <Select placeholder="Search someone cool" classNamePrefix="search-user" onChange={({ value }) => handleFollow(value)} options={options} />
          ) : (
            <div className="no-follows">
              You won the internet!
              <br /> You're following everyone!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
