// importing corressponding scss for styling
import "./Chat.scss";

// importing images
import Cam from "../../images/cam.png";
import Add from "../../images/add.png";
import More from "../../images/more.png";
import Messages from "../Messages/Messages";

// importing useContext from react
import { useContext } from "react";

// importing Input Component
import Input from "../Input/Input";

// importing ChatContext
import { ChatContext } from "../../context/ChatContext";

// Chat Functional Component
function Chat() {
  // using data from Chat Context
  const { data } = useContext(ChatContext);

  return (
    <>
      {/* Chat Container renders the conversations between two users. It renders all the existing conversations between two users or start a new conversation if no conversation was previoudly started. */}
      {/* Chat Container Starts */}
      <div className="chat">
        <div className="chat-info">
          <span className="chat-info-name">{data.user?.displayName}</span>
          <img
            src={data.user?.photoURL}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "30px",
              position: "relative",
              right: "240px",
            }}
            alt=""
          />
          <div className="chat-icons">
            <img src={Cam} alt="cam-img" />
            <img src={Add} alt="add-img" />
            <img src={More} alt="more-img" />
          </div>
        </div>

        {/* rendering Messages and Input Functional Component */}
        <Messages />
        <Input />
      </div>
      {/* Chat Container Ends */}
    </>
  );
}

// exporting Chat Component
export default Chat;
