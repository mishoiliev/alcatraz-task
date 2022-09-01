import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Thread } from "../../types/thread";
import { useStore } from "../context/Context";

export interface UseThread {
  loading: boolean;
  getThreads: () => void;
  addThread: (text: string, username: string) => void;
  addComment: (text: string, username: string, parentId: string) => void;
  resetThreads: () => void;
  upvote: (userId: string, threadId: string) => void;
  downvote: (userId: string, threadId: string) => void;
}

//custom hook that encapsulates all api calls and loding state
export const useThread = (): UseThread => {
  const [loading, setLoading] = useState(false);
  const threads = useStore((state) => state.threads);
  const setThreads = useStore((state) => state.setThreads);

  const getThreads = useCallback(() => {
    const get = async () => {
      setLoading(true);
      try {
        //gets a list of all threads and comments left by users
        const res = await axios.get("http://localhost:3030/threads/getAll");
        setThreads(res.data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };

    //since we cannot call async functions from the components, we use this
    get();
  }, []);

  useEffect(() => {
    getThreads();
  }, [getThreads]);

  const addThread = (text: string, username: string) => {
    const add = async () => {
      setLoading(true);
      try {
        //adds a new thread
        const res = await axios.post("http://localhost:3030/threads/add", {
          text,
          username,
        });
        let newThreads = threads;
        newThreads.push(res.data as Thread);
        setThreads(newThreads);
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    };

    add();
  };

  const addComment = (text: string, username: string, parentId: string) => {
    const add = async () => {
      setLoading(true);
      try {
        //adds a comment to a thread or another comment
        const res = await axios.post(
          "http://localhost:3030/threads/comments/add",
          {
            text,
            username,
            id: parentId,
          }
        );

        let newThreads = threads;
        newThreads.push(res.data as Thread);
        setThreads(newThreads);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    add();
  };

  const resetThreads = () => {
    const reset = async () => {
      setLoading(true);
      try {
        //deletes all threads and comments
        axios.delete("http://localhost:3030/threads/resetAll");
        setThreads([]);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    reset();
  };

  const upvote = (userId: string, threadId: string) => {
    const up = async () => {
      setLoading(true);
      try {
        //deletes all threads and comments
        const res = await axios.post("http://localhost:3030/upvote", {
          userId,
          threadId,
          type: "upvote",
        });
        setThreads(res.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    up();
  };

  const downvote = (userId: string, threadId: string) => {
    const down = async () => {
      setLoading(true);
      try {
        //deletes all threads and comments
        const res = await axios.post("http://localhost:3030/downvote", {
          userId,
          threadId,
          type: "downvote",
        });
        setThreads(res.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    down();
  };

  return {
    loading,
    getThreads,
    addThread,
    addComment,
    resetThreads,
    upvote,
    downvote,
  };
};
