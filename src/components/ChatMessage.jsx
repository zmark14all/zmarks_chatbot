import robotimage from "../assets/h.png";
import userimage from "../assets/b.png";
export function ChatMesage({ message, sender }) {
  return (
    <div
      className={
        sender === "user"
          ? "user-div"
          : sender === "Bot"
          ? "robot-div"
          : "typing"
      }
    >
      {sender === "typing" ? (
        <div className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <>
          {sender === "Bot" && (
           <img src={process.env.PUBLIC_URL + "/assets/h.png"} width="60" className="pic-bot" />
          )}
          {message}
          {sender === "user" && (
            <img src={userimage} width="60" className="pic-user" />
          )}
        </>
      )}
    </div>
  );
}
