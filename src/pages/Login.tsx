import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  username: string;
  setUsername: (value: string) => void;
  login: () => void;
}

const Login: React.FC<Props> = ({ username, setUsername, login }) => {
  return (
    <LoginWrapper>
      <TextField
        placeholder="Username"
        value={username}
        size="small"
        onChange={(event) => setUsername(event?.target.value)}
      />
      <Button type="submit" onClick={() => login()}>
        Log In
      </Button>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
