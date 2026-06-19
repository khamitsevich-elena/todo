import { useState } from "react";
import { useNavigate } from "react-router";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";

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
  const submit = async ({ email, password }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_LOGIN_URL}`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data1 = await response.json();
      localStorageHelpers.set(data1["access_token"]);
      if (response.ok) {
        linkTotask();
      }
      return data1;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input name="email" placeholder="email" onChange={(e) => func(e)}></input>
      <input
        name="password"
        placeholder="password"
        onChange={(e) => func(e)}
      ></input>
      <button onClick={() => submit(data)}>Submit</button>
      <Link to="/registration">Регистрация</Link>
    </>
  );
};

export default Login;
