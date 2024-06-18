import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import router from "./app/routes/indext";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notfound";

//parsers
app.use(express.json());
app.use(cors());

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
