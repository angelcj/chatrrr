import React, { useContext, useState, useEffect } from "react";
import StateContext from "../StateContext";

export default function NewMessageTextarea() {
  const { globalValues, handleMessage } = useContext(StateContext);
  const [characterCount, setCharacterCount] = useState(0);
  const [textBody, setTextBody] = useState("");

  useEffect(() => {
    setTextBody("");
    setCharacterCount(0);
  }, [globalValues]);

  return (
    <section id="new-message">
      <div className="window">
        <h1 className="window__title">New message</h1>
        <form id="message-form" onSubmit={e => handleMessage(e, textBody)}>
          <textarea
            maxLength="250"
            rows="4"
            placeholder="Type your new message here"
            value={textBody}
            onChange={e => {
              setCharacterCount(e.target.value.length);
              setTextBody(e.target.value);
            }}
          ></textarea>
          <button>Post message</button>
        </form>
        <footer className="window__footer">
          <div id="charcounter">{characterCount}/250</div>
        </footer>
      </div>
    </section>
  );
}
