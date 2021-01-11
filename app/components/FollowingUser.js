import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import StateContext from "../StateContext";

export default function FollowingUser({ avatar, username, uid }) {
  const { handleUserView } = useContext(StateContext);

  return (
    <NavLink activeClassName="is-active" data-uid={uid} className="sidebar-profile__user" to={`/user/${uid}`} onClick={e => handleUserView(e.target)}>
      <figure className="sidebar-profile__avatar">
        <img src={avatar} alt="Profile picture" />
      </figure>
      <h2 className="sidebar-profile__username">{username}</h2>
    </NavLink>
  );
}
