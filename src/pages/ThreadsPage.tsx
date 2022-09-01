import { Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import NewThread from "../components/NewThread";
import OpenedThreads from "../components/OpenedThreads";
import { useStore } from "../context/Context";
import { useThread } from "../utils/useThread";

interface Props {}

const ThreadsPage: React.FC<Props> = () => {
  const loggedIn = useStore((state) => state.loggedIn);
  const setLoggedIn = useStore((state) => state.setLoggedIn);
  const { addThread, addComment, resetThreads } = useThread();
  const threads = useStore((state) => state.threads);

  const [groupComments, setGroupComments] = useState(false);

  return (
    <ThreadsWrapper>
      <Header logout={() => setLoggedIn(false)} reset={resetThreads} />
      <Button
        onClick={() => setGroupComments((bool) => !bool)}
        style={{ padding: "16px" }}
      >
        Group comments and hide them
      </Button>
      <PageContainer>
        <OpenedThreads
          threads={threads}
          addComment={addComment}
          groupComments={groupComments}
        />
        <NewThread addThread={addThread} />
      </PageContainer>
    </ThreadsWrapper>
  );
};

export default ThreadsPage;

const PageContainer = styled.div`
  margin: 32px 16px;
  gap: 16px;
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const ThreadsWrapper = styled.div``;
