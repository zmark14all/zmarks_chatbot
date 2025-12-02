import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  return (
    <div className="appp">
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatMessages chatMessages={chatMessages} />
    </div>
  );
}

export default App;
