// importing corressponding scss file for styling navbar
import "./Navbar.scss";

// importing various methods from firebase
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

// importing methods from react
import { useContext } from "react";

// importing AuthContext
import { AuthContext } from "../../context/AuthContext";

// importing react-toastify for displaying notifications
import { toast } from "react-toastify";

// Creating a Navbar Component of Chat App
function Navbar() {
  // using currentUser from the AuthContext
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {/* Navbar Component for displaying the logged in user's name, profile pic, and logout btn */}
      {/* Navbar Component Starts */}
      <div className="navbar">
        <div className="user">
          <img src={currentUser.photoURL} alt="userImg" />
          <span className="display-name">{currentUser.displayName}</span>
          <button
            onClick={() => {
              signOut(auth);
              toast.success(`logged out Successfully!`);
            }}
          >
            logout
          </button>
        </div>
      </div>
      {/* Navbar Component Ends */}
    </>
  );
}

// exporting Navbar Component
export default Navbar;
