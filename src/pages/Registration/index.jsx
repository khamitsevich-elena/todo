import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";

const Registration = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const linkToEnter = () => {
    navigate("/login");
  };
  const func = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
  const submit = async ({ username, email, password }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REGISTRATION_URL}`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      const data1 = await response.json();
      localStorageHelpers.set(data1["access_token"]);
      if (localStorageHelpers.set()) {
        linkToEnter();
      }
      return data1;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        name="username"
        placeholder="name"
        onChange={(e) => func(e)}
      ></input>
      <input name="email" placeholder="email" onChange={(e) => func(e)}></input>
      <input
        name="password"
        placeholder="password"
        onChange={(e) => func(e)}
      ></input>
      <button onClick={() => submit(data)}>Submit</button>
    </>
  );
};

export default Registration;
