import { globalErrorMiddleWare } from "../middleware/globalErrorMiddleware.js";
import { AppError } from "../utils/AppError.js";
import { authRouter } from "./auth/auth.router.js";
import { contactRouter } from "./contacts/contact.router.js";
export const init = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/contacts", contactRouter);
  app.all("*", (req, res, next) => {
    next(new AppError(`can't find this route:${req.originalUrl}`, 404));
  });
  app.use(globalErrorMiddleWare);
};
