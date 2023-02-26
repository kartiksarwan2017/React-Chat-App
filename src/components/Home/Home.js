// importing components
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";

// importing corressponding css
import "./Home.scss";

// Home Page Functional Component
function Home() {
  return (
    <>
      {/* Home Container Starts */}
      <div className="home">
        <div className="container">
          {/* Rendering Sidebar Component */}
          <Sidebar />

          {/* Render Chat Component */}
          <Chat />
        </div>
      </div>
      {/* Home Container Ends */}
    </>
  );
}

// exporting Home Component
export default Home;
