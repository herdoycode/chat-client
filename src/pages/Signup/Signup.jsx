import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { registerUser } from "../../services/userSercice";
import "./Signup.css";
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      const { headers } = await registerUser(formData);
      localStorage.setItem("token", headers["x-auth-token"]);
      toast.success("Account Created");
      setTimeout(() => (window.location = "/"), 1000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <form className="signup__box">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form__input"
        />
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

        <button onClick={handleSubmit} className="signup__btn">
          {loading ? <Loading /> : "Signup"}
        </button>
        <span onClick={() => navigate("/login")} className="login__hint">
          Already hava account? Login
        </span>
      </form>
    </div>
  );
};

export default Signup;
