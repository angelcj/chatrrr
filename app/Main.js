import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import db from "./firebase.js";
import firebase from "firebase/app";

// Components
import Header from "./components/Header";
import ColumnOne from "./components/ColumnOne";
import ColumnTwo from "./components/ColumnTwo";
import FollowingSidebar from "./components/FollowingSidebar";
import SearchUsers from "./components/SearchUsers";
import NewMessageTextarea from "./components/NewMessageTextarea";
import Wall from "./components/Wall";
import PersonalWall from "./components/PersonalWall";
import UserWall from "./components/UserWall";
import UserProfile from "./components/UserProfile";
import MainUserProfile from "./components/MainUserProfile";

// Context
import StateContext from "./StateContext";

function Main() {
  const [globalValues, setGlobalValues] = useState({
    mainUserId: "uid_MainProfile",
    mainUserAvatar: "",
    mainUserName: "",
    mainUserQuote: "",
    followingUsers: [],
    currentViewUserId: "",
    stateChange: false
  });

  const getInitialStateValues = async () => {
    const currentURL = window.location.href;
    const URLUserString = currentURL.indexOf("/user/");
    const URLtoStrip = URLUserString !== -1 && currentURL.substr(URLUserString);
    let user = "";
    if (URLtoStrip) {
      user = URLtoStrip.replace("/user/", "");
    }

    let tempAvatar = "";
    let tempUsername = "";
    let tempQuote = "";
    const tempFollows = [];
    await db
      .collection("users")
      .doc(globalValues.mainUserId)
      .get()
      .then(user => {
        tempAvatar = user.data().avatar;
        tempUsername = user.data().username;
        tempQuote = user.data().quote;
        user.data().following.forEach(follow => {
          tempFollows.push(follow);
        });
      });
    setGlobalValues({
      ...globalValues,
      followingUsers: tempFollows,
      mainUserName: tempUsername,
      mainUserAvatar: tempAvatar,
      mainUserQuote: tempQuote,
      currentViewUserId: `${user ? user : ""}`
    });
  };

  useEffect(() => {
    getInitialStateValues();
  }, []);

  const handleUnfollow = e => {
    const userToUnfollow = e.getAttribute("data-uid");

    db.collection("users")
      .doc(globalValues.mainUserId)
      .update({
        following: firebase.firestore.FieldValue.arrayRemove(userToUnfollow)
      })
      .then(() => {
        const updatedFollowingUsers = globalValues.followingUsers.filter(follow => follow !== userToUnfollow);
        setGlobalValues({
          ...globalValues,
          followingUsers: updatedFollowingUsers
        });
      });
  };

  const handleFollow = e => {
    const userToFollow = e;

    db.collection("users")
      .doc(globalValues.mainUserId)
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(userToFollow)
      })
      .then(() => {
        const updatedFollowingUsers = globalValues.followingUsers.concat(userToFollow);
        setGlobalValues({
          ...globalValues,
          followingUsers: updatedFollowingUsers
        });
      });
  };

  const handleMessage = async (e, textBody) => {
    e.preventDefault();
    await db.collection("posts").add({
      user_avatar: globalValues.mainUserAvatar,
      username: globalValues.mainUserName,
      user_id: globalValues.mainUserId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      body: textBody
    });
    setGlobalValues({
      ...globalValues,
      stateChange: true
    });
  };

  const handleUserView = e => {
    const userToView = e.getAttribute("data-uid");
    setGlobalValues({
      ...globalValues,
      currentViewUserId: userToView
    });
  };

  return (
    <StateContext.Provider value={{ globalValues, handleUnfollow, handleFollow, handleMessage, handleUserView }}>
      <BrowserRouter>
        <Header />
        <ColumnOne>
          <FollowingSidebar />
          <SearchUsers />
        </ColumnOne>
        <ColumnTwo>
          <Switch>
            <Route path="/" exact>
              <NewMessageTextarea />
              <Wall />
            </Route>
            <Route path="/my-wall">
              <MainUserProfile />
              <NewMessageTextarea />
              <PersonalWall />
            </Route>
            <Route path="/user/:id">
              <UserProfile />
              <UserWall />
            </Route>
          </Switch>
        </ColumnTwo>
      </BrowserRouter>
    </StateContext.Provider>
  );
}

ReactDOM.render(<Main />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
