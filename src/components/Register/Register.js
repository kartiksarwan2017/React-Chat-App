// importing corressponding scss for stylin
import "./Register.scss";

// importing various methods from firebase and firestore
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";

// importing components/methods from react and react-router-dom
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// importing react icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";

// importing images
import Add from "../../images/addAvatar.png";

// importing react-toastify for displaying notifications
import { toast } from "react-toastify";

// Creating Register Functional Component
function Register() {
  // initializing state variables
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // performs operation to store the details of the user in firestore if the user doesn't registered earlier
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // accessing the input values from the register form
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create User
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      // uploading the user avatar into the firestore
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});

            toast.success(`User Registered Successfully!`);
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      toast.error("Error While Creating User!");
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Registration form Container Starts */}
      <div className="form-container">
        <div className="form-wrapper">
          <span className="logo">Chat App</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <BsPersonCircle
              size={24}
              style={{
                position: "absolute",
                top: "132px",
                left: "65px",
                color: "brown",
              }}
            />
            <input type="text" placeholder="display name" required />
            <MdEmail
              size={24}
              style={{
                position: "absolute",
                top: "210px",
                left: "65px",
                color: "brown",
              }}
            />
            <input type="email" placeholder="email" required />
            <RiLockPasswordFill
              size={24}
              style={{
                position: "absolute",
                top: "285px",
                left: "65px",
                color: "brown",
              }}
            />
            <input type="password" placeholder="password" required />
            <input style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <img src={Add} alt="addImg" />
              <span>Add an Avatar</span>
            </label>
            <button disabled={loading}>Sign Up</button>
            {loading && "Uploading and compressing the image please wait..."}
            {err && <span>Something went wrong</span>}
          </form>
          <p className="form-text">
            You do have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* Registration form Container Ends */}
    </>
  );
}

// exporting the Register Component
export default Register;
