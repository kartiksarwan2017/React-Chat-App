// importing corressponding scss for styling input
import "./Input.scss";

// importing images
import Img from "../../images/img.png";
import Attach from "../../images/attach.png";

// importing AuthContext, ChatContext
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

// importing methods from react
import { useState, useContext } from "react";

// importing methods from firestore
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

// importing db. storage from firebase
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";

// importing react-toastify for displaying notifications
import { toast } from "react-toastify";

// import the react-input-emoji component to display your input with emoji.
import InputEmoji from "react-input-emoji";

// Input Funtional Component to take input from the user
function Input() {
  // initializing state variables
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [err, setErr] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  // handleSend method to store the text in firestore or upload img in firestore database
  const handleSend = async () => {
    try {
      if (img) {
        const storageRef = ref(storage, uuid());

        // storing the img in firestore database
        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });

              toast.success(`Image Uploaded Successfully`);
            } catch (err) {
              toast.error("Error while Uploading Img!");
              console.log(err);
              setErr(true);
            }
          });
        });
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
      setImg(null);
    } catch (err) {
      toast.error("Internal Server Error!");
      console.log(err);
      console.log(err);
      setErr(true);
    }
  };

  return (
    <>
      {/* Input Container Starts */}
      <div className="input">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type Something..."
        />
        <div className="send">
          <img src={Attach} alt="attach-icon" />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          {err && <span>Something went wrong</span>}
          <label htmlFor="file">
            <img src={Img} alt="img-icon" />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
      {/* Input Container Ends */}
    </>
  );
}

// exporting component Input
export default Input;
