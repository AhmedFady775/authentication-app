import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginWithCredentials";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Home from "./pages/Home";
import LoginWith2fa from "./pages/LoginWith2fa";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/2fa" element={<LoginWith2fa />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ProtectedRoute></ProtectedRoute>} />
      </Routes>
      <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
    </>
  );
}

export default App;
