import { renderHook } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { Thread } from "../types/thread";
import { useThread } from "./utils/useThread";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const newThread: Thread = {
  id: "0",
  username: "some-username",
  text: "some text",
  upvote: [],
  downvote: [],
};

const testHook = () => renderHook(() => useThread());

describe("my api calls", () => {
  test("creating a new thread", async () => {
    const mockedResponse: AxiosResponse = {
      data: newThread,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    mockedAxios.post.mockResolvedValue(mockedResponse);

    expect(axios.post).not.toHaveBeenCalled();
    testHook().result.current.addThread(newThread.text, newThread.username);
    expect(axios.post).toHaveBeenCalled();
  });

  test("creating a new comment", async () => {
    testHook().result.current.addComment(
      newThread.text,
      newThread.username,
      newThread.id
    );
    expect(axios.post).toHaveBeenCalled();
  });

  test("getting all threads and comments", async () => {
    expect(axios.get).not.toHaveBeenCalled();
    testHook().result.current.getThreads();
    expect(axios.get).toHaveBeenCalled();
  });

  test("deleting all threads and comments", async () => {
    expect(axios.get).not.toHaveBeenCalled();
    testHook().result.current.resetThreads();
    expect(axios.delete).toHaveBeenCalled();
  });
});
