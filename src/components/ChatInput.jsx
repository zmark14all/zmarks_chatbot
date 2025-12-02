import { useState } from "react";
//import "../assets/chatbot";
import { chatbot } from "supersimpledev";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputtext, setInputText] = useState("");
  function saveInputText(event) {
    setInputText(event.target.value);
  }
  function sendMessage() {
    const newchatmessages = [
      ...chatMessages,
      {
        message: inputtext,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newchatmessages);
    setChatMessages([
      ...newchatmessages,
      {
        message: "thinking...",
        sender: "typing",
        id: "typing-indicator",
      },
    ]);
    const response = chatbot.getResponse(inputtext);
    setTimeout(() => {
      setChatMessages([
        ...newchatmessages,
        {
          message: response,
          sender: "Bot",
          id: crypto.randomUUID(),
        },
      ]);
    }, 900); // bot types for 0.9 seconds

    setInputText("");
  }
  return (
    <div className="FIRST">
      <input
        className="inputt"
        placeholder="send a message to chatbot"
        size="25"
        onChange={saveInputText}
        value={inputtext}
      ></input>
      <button className="butt" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
