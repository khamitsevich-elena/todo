import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { submiRegistration } from "../../api/registration";

const Registration = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const linkToEnter = () => {
    navigate("/login");
  };

  const func = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <input name="username" placeholder="name" onChange={(e) => func(e)} />
      <input name="email" placeholder="email" onChange={(e) => func(e)} />
      <input name="password" placeholder="password" onChange={(e) => func(e)} />
      <button onClick={() => submiRegistration(data, linkToEnter)}>
        Submit
      </button>
      <Link to="/login">Залогиниться</Link>
    </>
  );
};

export default Registration;
