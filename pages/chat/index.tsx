import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export async function getStaticProps() {
  const res = await axios.get("http://localhost:3000/messages");
  const messages = res.data;
  return {
    props: {
      messages,
    },
  };
}

const ChatPage = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(props.messages);
  const [socket, setSocket] = useState(null);
  const name = "user";
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    console.log(props);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", (message: string) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: name, message: message, timestamp: Date.now() },
        ]);
      });
    }
  }, [socket]);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, idx) => (
          <li
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              margin: "16px",
            }}
          >
            <span>{`${msg.sender}   :   `}</span>
            <span>{msg.message}</span>
            <p>{new Date(msg.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
