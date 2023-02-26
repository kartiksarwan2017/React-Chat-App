// importing corressponding css
import "./Login.scss";

// importing methods from firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

// importing useState hook
import { useState } from "react";

// importing components from react-router-dom
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// importing react icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

// Login Functional Component for signing in user
function Login() {
  // initializing state variables
  const [err, setErr] = useState(false);

  // used to navigate to a particular page
  const navigate = useNavigate();

  // method to authenticate the user signing in
  const handleSubmit = async (e) => {
    e.preventDefault();

    // storing email and password value enterted by user as input
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      // Authenticating the user using email and password using auth from firebase
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(`logged in Successfully!`);
      navigate("/");
    } catch (err) {
      toast.error("Error while Logging User!");
      setErr(true);
      console.log(err);
    }
  };

  return (
    <>
      {/* Form Container to display the login form */}
      {/* Form Container Starts */}
      <div className="form-container">
        <div className="form-wrapper">
          <span className="logo">Chat App</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <MdEmail
              size={24}
              style={{
                position: "absolute",
                top: "134px",
                left: "65px",
                color: "brown",
              }}
            />
            <input type="email" placeholder="email" required />
            <RiLockPasswordFill
              size={24}
              style={{
                position: "absolute",
                top: "208px",
                left: "65px",
                color: "brown",
              }}
            />
            <input type="password" placeholder="password" required />
            <button>Sign In</button>
            {err && <span>Something went wrong</span>}
            <p className="form-text">
              You don't have an account?{" "}
              <Link to="/register" className="registration-link">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* Form Container Ends */}
    </>
  );
}

// exporting login component
export default Login;
