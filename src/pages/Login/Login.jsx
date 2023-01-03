import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { login } from "../../services/authService";
import "./Login.css";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const formDataClone = { ...formData };
    formDataClone[e.target.name] = e.target.value;
    setFormData(formDataClone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(formData);
      toast.success("Login Success");
      setTimeout(() => (window.location = "/"), 1000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <form className="logon__box">
        <input
          type="email"
          placeholder="Email address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form__input"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form__input"
        />
        <button onClick={handleSubmit} className="login__btn">
          {loading ? <Loading /> : "Login"}
        </button>
        <button onClick={() => navigate("/signup")} className="account__btn">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Login;
