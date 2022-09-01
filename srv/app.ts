import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import bodyparser from "koa-bodyparser";
import { ThreadController } from "./controllers/ThreadController";

const router = new Router();
const controller = new ThreadController();

router.get("/", (ctx) => {
  ctx.body = controller.threadsAndComments;
});

//add a thread
router.post("/threads/add", controller.addThread);

//add a comment to a thread
router.post("/threads/comments/add", controller.addComment);

//get all threads and comments
/***
 * Getting threads and comments can be done in different ways. In this case I decided to not pursue performance, 
 * but look at the simplest way possible, since time was tight. As I have created the endpoints, there can be 2
 * different ones- for threads and comments, which would get each respectively. Then comments would be linked to
 * threads in a better way - for example in a relational db and each would be fetched when needed, instead of all
 * being fetched on initial load
 */ 
router.get("/threads/getAll", (ctx) => {
  ctx.response.body = controller.threadsAndComments;
});

//delete all threads and comments, resetting the data on the server
router.delete("/threads/resetAll", controller.resetThreads);

//not being used
router.get("/threads/comments/:threadId", controller.getThreadComments);

//these can be grouped in a single endpoint
router.post("/upvote", controller.upvote);
router.post("/downvote", controller.downvote);

const app = new Koa();

app
  .use(cors())
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3030, () => console.log("Server running on port 3030..."));
