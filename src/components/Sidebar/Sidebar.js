// importing corressponding scss for styling
import "./Sidebar.scss";

// importing Functional components Navbar, Search , Chats
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Chats from "../Chats/Chats";

// Creating a Sidebar Functional Component
function Sidebar() {
  return (
    <>
      {/* Sidebar Container Starts */}
      <div className="sidebar">
        {/* Rendering Navbar Component */}
        <Navbar />

        {/* Rendering Search Component */}
        <Search />

        {/* Rendering Chats Component */}
        <Chats />
      </div>
      {/* Sidebar Container Starts */}
    </>
  );
}

// exporting Sidebar Component
export default Sidebar;
