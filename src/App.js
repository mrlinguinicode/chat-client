import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState();
  const [localSocket, setLocalSocket] = useState();

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
          return <p key={index}>{item.message}</p>;
        })}
      </div>
    );
  }
}

export default App;
