// importing corressponding scss for styling header
import "./Header.scss";

// Header Functional Component
function Header() {
  return (
    <>
      {/* Header Container Starts */}
      <div className="header-component">
        {/* Navbar */}
        <a href="/">
          <img src="./chatIcon.jpg" className="chat-icon" alt="chatIcon" />
        </a>
        <a href="/">
          <h1 className="navbar-title">Chat App</h1>
        </a>
      </div>
      {/* Header Container Ends */}
    </>
  );
}

// exporting Header Component
export default Header;
