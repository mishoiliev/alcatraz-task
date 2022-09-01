import { ArrowDownward } from "@mui/icons-material";
import { Button, Link } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Thread } from "../../types/thread";
import FunctionalThread from "./FunctionalThread";

interface Props {
  level?: number;
  threads?: Thread[];
  addComment: (text: string, username: string, parentId: string) => void;
  groupComments?: boolean;
}

const OpenedThread: React.FC<Props> = ({
  threads,
  level = 0,
  addComment,
  groupComments = false,
}) => {
  const [revealLevel, setRevealLevel] = useState(0);

  //getting the number of comments to the current thread
  const getCommentsNumber = () => {
    return (
      threads?.filter((thread) => thread.id?.split(".").length - 1 === level)
        .length ?? 0
    );
  };

  return (
    <OpenedThreadsWrapper level={level}>
      {/* if enabled - onClick sets the level 1 higher each time, so shows comments 
      on action instead of all being there on load */}
      {level > revealLevel && getCommentsNumber() > 0 && groupComments ? (
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            textDecoration: "none",
            paddingBottom: "30px",
            justifyContent: "end",
          }}
          onClick={() => {
            setRevealLevel(level);
          }}
        >
          See comments ({getCommentsNumber()})
          <ArrowDownward />
        </Link>
      ) : (
        // using recursion we are able to render infinite amount of depth of comments
        <div>
          {threads?.map(
            (thread, index) =>
              thread.id?.split(".").length - 1 === level && (
                <ThreadsContainer level={level} key={index}>
                  <ConversationContainer>
                    <FunctionalThread
                      commentsOpened={true}
                      thread={thread}
                      addComment={addComment}
                      level={level}
                    />
                    <OpenedThread
                      groupComments={groupComments}
                      addComment={addComment}
                      level={level + 1}
                      threads={threads.filter((comment) =>
                        comment?.id?.startsWith(thread.id)
                      )}
                    />
                  </ConversationContainer>
                </ThreadsContainer>
              )
          )}
        </div>
      )}
    </OpenedThreadsWrapper>
  );
};

export default OpenedThread;

interface StyleProps {
  level: number;
}

const OpenedThreadsWrapper = styled.div<StyleProps>`
  ${(props) => props.level > 0 && "margin-left: 16px;"}
  flex: 2;
`;

const ThreadsContainer = styled.div<StyleProps>`
  ${(props) =>
    props.level > 0
      ? `border-left: 1px solid #eef;`
      : `margin-bottom: 60px; padding: 30px;
    border: 1px solid gray;
    border-radius: 3px;
    box-shadow: 5px;
    `}
`;

const ConversationContainer = styled.div``;
