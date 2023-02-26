// importing corresponding scss for styling
import "./Search.scss";

// importing methods from react
import { useContext, useState } from "react";

// importing methods from firestore
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

// importing AuthContext
import { AuthContext } from "../../context/AuthContext";

// importing react-toastify for displaying notifications
import { toast } from "react-toastify";

// importing react icons
import { RxMagnifyingGlass } from "react-icons/rx";

// Creating a Functional Search Component
function Search() {
  // initializing state variables
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // accessing the currenUser from AuthContext
  const { currentUser } = useContext(AuthContext);

  // method to check whether searched user exists or not
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      toast.error("Internal Server Error!");
      console.log(err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // method to render the conversations
  const handleSelect = async () => {
    // check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      toast.error("Internal Server Error!");
    }

    setUser(null);
    setUsername("");
  };

  return (
    <>
      {/* Search Container to search whether user exists in conversation or not */}
      {/* Search Container Starts */}
      <div className="search">
        <div className="search-form">
          <RxMagnifyingGlass size={28} style={{ color: "lightgray" }} />
          <input
            type="text"
            placeholder="Find a user"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        {err && <span>User not Found!</span>}
        {user && (
          <div className="user-chat" onClick={handleSelect}>
            <img src={user.photoURL} alt="UserImg" />
            <div className="user-chat-info">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
      {/* Search Container Ends */}
    </>
  );
}

// exporting Search Component
export default Search;
