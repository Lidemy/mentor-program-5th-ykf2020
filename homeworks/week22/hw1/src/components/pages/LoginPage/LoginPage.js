import React, { useState, useContext } from "react";
import styled from "styled-components";
import { login, getMe } from "../../../WebAPI.js";
import { setAuthToken } from "../../../utils.js";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts.js";

const ErrorMessage = styled.div`
  color: red;
`;
export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);

      getMe().then((data) => {
        if (data.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(data.toString());
        }
        setUser(data.data);
        history.push("/");
      });
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:{" "}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>登入</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
