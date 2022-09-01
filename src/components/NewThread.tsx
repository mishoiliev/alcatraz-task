import { Button, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useStore } from "../context/Context";

interface Props {
  addThread: (text: string, username: string) => void;
}

const NewThread: React.FC<Props> = ({ addThread }) => {
  const [text, setText] = useState("");
  const username = useStore((state) => state.username);

  return (
    <NewThreadWrapper>
      <TextareaAutosize
        minRows={4}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%" }}
      />
      <Button type="submit" onClick={() => addThread(text, username)}>
        Open new thread
      </Button>
    </NewThreadWrapper>
  );
};

export default NewThread;

const NewThreadWrapper = styled.div`
  display: flex;
  position: sticky;
  top: 96px;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  width: 25vw;
`;
