import { useRef, useEffect } from "react";
import { ChatMesage } from "./ChatMessage";
function ChatMessages({ chatMessages }) {
  const chatref = useRef(null);
  useEffect(() => {
    const currenT = chatref.current;
    if (currenT) {
      currenT.scrollTop = currenT.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="scrollable-chat" ref={chatref}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMesage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}
export default ChatMessages;
