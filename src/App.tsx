import { useEffect } from "react";
import styled from "styled-components";
import NewThread from "./components/NewThread";
import OpenedThreads from "./components/OpenedThreads";
import Login from "./pages/Login";
import { CircularProgress } from "@mui/material";
import { useThread } from "./utils/useThread";
import { useStore } from "./context/Context";
import Header from "./components/Header";
import ThreadsPage from "./pages/ThreadsPage";

function App() {
  const loggedIn = useStore((state) => state.loggedIn);
  const setLoggedIn = useStore((state) => state.setLoggedIn);
  const { loading, getThreads, addThread, addComment, resetThreads } =
    useThread();
  const threads = useStore((state) => state.threads);
  const username = useStore((state) => state.username);
  const setUsername = useStore((state) => state.setUsername);

  useEffect(() => {
    getThreads();
  }, [threads.length]);

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          style={{
            height: "150px",
            width: "150px",
          }}
        />
      </div>
    );
  }

  if (loggedIn) {
    return <ThreadsPage />;
  }

  return (
    <Login
      username={username}
      setUsername={setUsername}
      login={() => (username.length > 0 ? setLoggedIn(true) : false)}
    />
  );
}

export default App;
