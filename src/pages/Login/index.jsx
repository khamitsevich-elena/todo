import { useState } from "react";
import { useNavigate } from "react-router";
import { submitLogin } from "../../api/login";
import { Link } from "react-router";

const Login = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const linkTotask = () => {
    navigate("/Tasks");
  };
  const func = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <input name="email" placeholder="email" onChange={(e) => func(e)} />
      <input name="password" placeholder="password" onChange={(e) => func(e)} />
      <button onClick={() => submitLogin(data, linkTotask)}>Submit</button>
      <Link to="/registration">Регистрация</Link>
    </>
  );
};
export default Login;
