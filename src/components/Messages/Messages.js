// importing corressponding scss for styling
import "./Messages.scss";

// importing methods from react
import { useContext, useState, useEffect } from "react";

// importing components
import { ChatContext } from "../../context/ChatContext";
import Message from "../Message/Message";

// importing methods from firestore
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

// Creating Messages Functional Component
function Messages() {
  // initializing state variables
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <>
      {/* Messages Component is the mapping between the conversations of two users one is owner and other is his friend */}
      {/* Messages Component Starts */}
      <div className="messages">
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
      {/* Messages Component Ends */}
    </>
  );
}

// exporting Messages Component
export default Messages;
