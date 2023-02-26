// importing corressponding css
import "./App.css";

// Importing various components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register.js";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

// react-toastify to display notifications/ alerts
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// importing components from react-router-dom
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// App Funtional Component
function App() {
  // accessing currentUser state variable from AuthContext
  const { currentUser } = useContext(AuthContext);

  // used to check whether user is logged in or not
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <>
      <div>
        {/* Toast Container for displaying notifications */}
        <ToastContainer position="top-right" />

        {/* header */}
        <Header />

        {/* Routes */}
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

// exporting App component
export default App;
