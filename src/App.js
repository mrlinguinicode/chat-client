import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState();
  const [localSocket, setLocalSocket] = useState();
  const [text, setText] = useState("");

  useEffect(() => {
    if (localSocket) {
      localSocket.onmessage = function (event) {
        let data = JSON.parse(event.data);
        console.log(data);
        setMessage(data);
        //console.log(message);
      };
    } else {
      let socket = new WebSocket("ws://127.0.0.1:9889/ws");
      setLocalSocket(socket);
      socket.addEventListener("open", (event) => {
        socket.send(
          JSON.stringify({ user: "Justin", message: "Hello Server!" })
        );
      });
    }
  }, [message, localSocket]);

  if (!message) {
    return <p>Hello</p>;
  } else {
    return (
      <div>
        {message.map((item, index) => {
          return (
            <div>
              <p key={index}>
                {item.message} from: {item.user ? item.user : item.id}
              </p>
            </div>
          );
        })}
        <div>
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setText(e.target.value);
            }}
          ></input>
          <button
            onClick={() =>
              localSocket.send(
                JSON.stringify({ user: "justin", message: text })
              )
            }
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default App;
