import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="join-container">
      <div className="join-inner-container">
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          ></input>
        </div>
        <Link
          onClick={(event) => (!room || !name ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button" type="Submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
