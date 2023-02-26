// importing properties/methods from react
import { useContext, useEffect, useState } from "react";

// importing db from firebase
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

// importing AuthContext and ChatContext
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

// Chats functional Component
function Chats() {
  // initializing state variable chats
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      {/* Chats container to display the various users conversation. Chats Container renders list of all the conversations of user along with displayName and some text of last message in the chat */}
      {/* chats container starts */}
      <div className="chats">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="user-chat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo.photoURL} alt="UserImg" />

              <div className="user-chat-info">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          ))}
      </div>
      {/* chats container ends */}
    </>
  );
}

// exporting Chats Component
export default Chats;
