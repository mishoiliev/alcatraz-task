import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Button, TextareaAutosize, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { Thread } from "../../types/thread";
import { useStore } from "../context/Context";
import { useThread } from "../utils/useThread";

interface Props {
  thread: Thread;
  addComment: any;
  level: number;
  commentsOpened?: boolean;
}

const FunctionalThread: React.FC<Props> = ({
  thread,
  addComment,
  level,
  commentsOpened = false,
}) => {
  const [comment, setComment] = useState<string>();
  const [addingComment, setAddingComment] = useState(false);
  const username = useStore((state) => state.username);
  const { upvote, downvote } = useThread();

  return (
    <Container>
      <ThreadHeader>
        <Typography variant="caption">
          Thread id: <b>{thread.id}</b> posted by <b>{thread.username}</b>
        </Typography>
      </ThreadHeader>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <LikesDisplikes
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button onClick={() => upvote(username, thread.id)}>
              <ArrowDropUp
                color={
                  thread.upvote?.includes(username) ? "primary" : "disabled"
                }
              />
              {thread.upvote?.length}
            </Button>
            <Button onClick={() => downvote(username, thread.id)}>
              <ArrowDropDown
                color={
                  thread.downvote?.includes(username) ? "primary" : "disabled"
                }
              />
              {thread.downvote?.length}
            </Button>
          </LikesDisplikes>
          <div>
            <ThreadContent>
              <Typography
                style={{
                  wordBreak: "break-word",
                }}
                variant="body1"
              >
                {thread.text}
              </Typography>
            </ThreadContent>
          </div>
        </div>
        {commentsOpened && (
          <div>
            {addingComment ? (
              <ThreadActions>
                <TextareaAutosize
                  autoFocus
                  style={{ width: "50%", padding: 6 }}
                  minRows={3}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div>
                  <ButtonStyled
                    variant="text"
                    onClick={() => setAddingComment(false)}
                  >
                    Cancel
                  </ButtonStyled>
                  <ButtonStyled
                    variant="text"
                    onClick={() => {
                      if (comment) {
                        addComment(comment, username, thread.id);
                      }
                    }}
                  >
                    Add Comment
                  </ButtonStyled>
                </div>
              </ThreadActions>
            ) : (
              <ActionsRow>
                <ScoreSection></ScoreSection>
                <Button
                  style={{ marginTop: "10px" }}
                  onClick={() => setAddingComment(true)}
                >
                  Reply
                </Button>
              </ActionsRow>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default FunctionalThread;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
`;

const ScoreSection = styled.div`
  display: flex;
`;

const ThreadHeader = styled.div`
  background: #eee;
  padding: 10px;
  border-radius: 2px;
`;

const ThreadContent = styled.div`
  padding: 15px 10px;
`;

const ThreadActions = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  align-items: end;
`;

const ButtonStyled = styled(Button)`
  font-size: 14px;
  text-transform: none !important;
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: end;
`;

const LikesDisplikes = styled.div`
  display: flex;
  flex-direction: column;
`;
