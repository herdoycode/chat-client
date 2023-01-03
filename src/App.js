import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { addUser } from "./store/user";
import { getCurrentUser } from "./services/authService";
import Logout from "./components/Logout/Logout";

const App = () => {
  const dispatch = useDispatch();
  dispatch(addUser(getCurrentUser()));

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
