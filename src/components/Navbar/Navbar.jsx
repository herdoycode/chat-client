import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createChat } from "../../services/chatService";
import "./Navbar.css";

const Navbar = ({ users, value, onChange }) => {
  const { user } = useSelector((state) => state.auth);
  const [navToggle, setNavToggle] = useState("nav__items");
  const [openSearch, setOpenSearch] = useState(false);

  const handleToggle = () => {
    navToggle === "nav__items"
      ? setNavToggle("nav__items show")
      : setNavToggle("nav__items");
  };

  const handleCreateChate = async (friendId) => {
    try {
      await createChat({ userId: user._id, friendId });
      toast.success("Conversation Started..");
      setTimeout(() => (window.location = "/"), 1000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
    setTimeout(() => (window.location = "/"), 1000);
  };

  return (
    <div className="navbar__wrapper">
      <img src="https://i.ibb.co/s6x3nHs/asda.png" className="nav__brand" />

      <div onClick={() => setOpenSearch(true)} className="nav__search">
        <i className="fa fa-search"></i>
        <input
          type="text"
          className="form-control my-3"
          placeholder="Search users..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <nav className="navbar">
        <ul className="nav__menu">
          <img className="nav__avatar" src={user?.avatar} alt="" />
          <div className="nav__icon">
            <i onClick={handleToggle} className="fa fa-caret-down"></i>
          </div>
          <li className={navToggle}>
            <Link to="logout" className="nav__link">
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      {openSearch && (
        <div className="search__result">
          <div className="users__box">
            <button onClick={() => setOpenSearch(false)} className="close__btn">
              <i className="fa fa-close"></i>
            </button>
            {users.map((user) => (
              <div
                onClick={() => handleCreateChate(user._id)}
                key={user._id}
                className="single__user"
              >
                <img src={user.avatar} alt="" />
                <div className="user__info">
                  <h4> {user.name} </h4>
                  <p> {user.email} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
