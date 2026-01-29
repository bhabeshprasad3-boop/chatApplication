import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Message"; // Path check kar lena

const socket = io.connect("https://chat-server-78oo.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      // Username bhi bhej rahe hain taaki 'User joined' msg aa sake
      socket.emit("join_room", { room, username });
      setShowChat(true);
    }
  };

  const leaveRoom = () => {
    setShowChat(false);
    setRoom("");
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <p style={{ color: "#888", marginBottom: "20px", fontSize: "0.9rem" }}>
            Enter your details to start chatting
          </p>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username}
          room={room}
          backToJoin={leaveRoom} // Back button function pass kiya
        />
      )}
    </div>
  );
}

export default App;