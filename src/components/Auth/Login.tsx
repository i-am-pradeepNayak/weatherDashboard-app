import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slice/authSlice";
import { RootState, AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Input,
  Button,
  Message,
  LoginContainer
} from "./styles/Login.styles";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate("/weather");
  }, [auth.isAuthenticated]);

  const handleLogin = async () => {
    await dispatch(login({ username, password }));
  };

  return (
    <Container>
      <LoginContainer>
      <Title>Login</Title>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      {/* {auth.loading && <Message>Loading...</Message>} */}
      {!auth.loading && auth.error && <Message>{auth.error}</Message>}
      </LoginContainer>
    </Container>
  );
};

export default Login;
