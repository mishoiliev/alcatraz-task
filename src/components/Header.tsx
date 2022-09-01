import { ArrowDownward, Restore } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useStore } from "../context/Context";

interface Props {
  logout: () => void;
  reset: () => void;
}

const Header: React.FC<Props> = ({ logout, reset }) => {
  const username = useStore((state) => state.username);

  return (
    <AppBar position="sticky" title="header" color="primary">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Logged in as: {username}</Typography>
        <Button color="inherit" onClick={() => reset()}>
          <Typography variant="body1">Reset data</Typography>
          <Restore color="inherit" style={{ marginLeft: "10px" }} />
        </Button>
        <Button color="inherit" onClick={() => logout()}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
