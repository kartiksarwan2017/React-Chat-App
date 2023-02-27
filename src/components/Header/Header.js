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
          <img src="https://img.freepik.com/free-vector/isometric-smartphone-user_1262-16549.jpg?w=740&t=st=1677478669~exp=1677479269~hmac=af191792cff788b7a7ec795ee3856183b1f0f6ebbd8c9b6c55439ecdce8992ef" className="chat-icon" alt="chatIcon" />
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
