import React from "react";

export default function Post({ avatar, username, uid, body, timestamp }) {
  return (
    <article data-uid={uid} className="public-message">
      <header className="public-message__header">
        <figure className="public-message__avatar">
          <img src={avatar} alt="Profile picture" />
        </figure>
        <h2 className="public-message__username">{username}</h2>
        <time className="public-message__time">{timestamp}</time>
      </header>
      <p>{body}</p>
    </article>
  );
}
