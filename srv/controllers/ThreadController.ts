import { Context } from "koa";
import { Thread } from "../../types/thread";

export class ThreadController {
  threadsAndComments: Thread[] = [];

  constructor() {
    this.threadsAndComments;
  }

  //This function is used to make sure that a person has only 1 vote - either like or dislike
  private manageLikesDislikes = (
    userId: string,
    threadId: string,
    type: "upvote" | "downvote"
  ) => {
    let newThreads: string[];

    if (type === "upvote") {
      newThreads = this.threadsAndComments
        .find((currThred) => currThred.id === threadId)
        .downvote.filter((id) => id != userId);
      return newThreads;
    } else if (type === "downvote") {
      newThreads = this.threadsAndComments
        .find((currThred) => currThred.id === threadId)
        .upvote.filter((id) => id != userId);
      return newThreads;
    }
  };

  public upvote = async (ctx: Context) => {
    const { userId, threadId } = (ctx.request as any).body;

    //making sure that the username is not already inside the array
    this.threadsAndComments
      .find(
        (thread) => thread.id === threadId && !thread.upvote?.includes(userId)
      )
      ?.upvote.push(userId);

    const newDownvotes = this.manageLikesDislikes(userId, threadId, "upvote");

    if (newDownvotes) {
      this.threadsAndComments.find(
        (currThred) => currThred.id === threadId
      ).downvote = newDownvotes;
    }

    ctx.response.body = this.threadsAndComments;
    ctx.response.status = 200;
  };

  public downvote = async (ctx: Context) => {
    const { userId, threadId } = (ctx.request as any).body;

    //making sure that the username is not already inside the array
    this.threadsAndComments
      .find(
        (thread) => thread.id === threadId && !thread.downvote?.includes(userId)
      )
      ?.downvote.push(userId);

    const newUpvotes = this.manageLikesDislikes(userId, threadId, "downvote");

    if (newUpvotes) {
      this.threadsAndComments.find(
        (currThred) => currThred.id === threadId
      ).upvote = newUpvotes;
    }

    ctx.response.status = 200;
    ctx.response.body = this.threadsAndComments;
  };

  //creating the thread object to be added to out threadsAndComments array
  public addThread = async (ctx: Context) => {
    let thread: Thread = (ctx.request as any).body;

    if (thread) {
      const id =
        this.threadsAndComments.filter((thread) => !thread.id.includes("."))
          .length || 0;
      thread.id = id.toString();
      thread.downvote = [];
      thread.upvote = [];
      ctx.res.statusCode = 200;
      this.threadsAndComments.push(thread);
      ctx.response.body = thread;
    }
  };

  //creating the comment object to be added to out threadsAndComments array
  public addComment = async (ctx: Context) => {
    let comment: Thread = (ctx.request as any).body;

    if (comment) {
      const parentId = comment.id;
      comment.id =
        parentId +
        "." +
        (this.threadsAndComments.filter(
          (thread) =>
            thread.id.startsWith(parentId + ".") &&
            thread.id.length == parentId.length + 2
        )?.length || 0);
      comment.downvote = [];
      comment.upvote = [];

      ctx.res.statusCode = 200;
      ctx.response.body = comment;
      this.threadsAndComments.push(comment);
    }
  };

  //not being used
  public getThreadComments = async (ctx: Context) => {
    const level = ctx.request.query.toString();
    const comments = this.threadsAndComments.filter(
      (threads) =>
        threads.id.startsWith(level.toString()) &&
        level.length < threads.id.length + 2
    );
    ctx.response.body = comments;
    ctx.response.status = 200;
  };

  public resetThreads = async (ctx: Context) => {
    this.threadsAndComments = [];
    ctx.response.status = 200;
  };
}
