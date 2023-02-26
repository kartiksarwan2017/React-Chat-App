// importing corressponding scss file used for styling
import "./Message.scss";

// importing methods from react
import { useContext, useEffect, useRef } from "react";

// importing AuthContext and ChatContext
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

// Message Functional Component
function Message({ message }) {
  // using current User from AuthContext
  const { currentUser } = useContext(AuthContext);

  // using data User from ChatContext
  const { data } = useContext(ChatContext);

  const ref = useRef();

  // useEffect hook
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      {/* Message Container displays the chat message of the user with message info and message content */}
      {/* Message Container Starts */}
      <div
        ref={ref}
        className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
        <div className="message-info">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt="userImg"
          />
          <span>just now</span>
        </div>
        <div className="message-content">
          <p>{message.text}</p>
          {message.img && <img src={message.img} alt="messageImg" />}
        </div>
      </div>
      {/* Message Container Ends */}
    </>
  );
}

// exporting Message Component
export default Message;
