/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notfound";
import router from "./app/routes/indext";

//parsers
app.use(express.json());
app.use(cors());
app.use(cors({ origin: ["http://localhost:5173"] }));
// // application routes
app.use("/api", router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
};
app.get("/", test);

app.use(globalErrorHandler);

//not found
app.use(notFound);

export default app;
