import React, { useState, useEffect, useContext } from "react";
import db from "../firebase.js";
import Post from "./Post";
import StateContext from "../StateContext";

export default function UserWall() {
  const { globalValues } = useContext(StateContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const currentURL = window.location.href;
    const URLUserString = currentURL.indexOf("/user/");
    const URLtoStrip = URLUserString !== -1 && currentURL.substr(URLUserString);
    const userURL = URLtoStrip.replace("/user/", "");

    db.collection("posts")
      .where("user_id", "==", userURL)
      .orderBy("timestamp", "desc")
      .get()
      .then(posts => setPosts(posts.docs.map(post => post.data())));
  }, [globalValues]);

  return (
    <section id="wall">
      <div className="window">
        <h1 className="window__title">Latest messages</h1>
        <div className="window__content">
          {posts.map((post, index) => (
            <Post avatar={post.user_avatar} username={post.username} uid={post.user_id} body={post.body} timestamp={post.timestamp.toDate().toDateString()} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
