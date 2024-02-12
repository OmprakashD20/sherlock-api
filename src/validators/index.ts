import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        body: req.body,
      });
      next();
    } catch (err: any) {
      if (err instanceof ZodError)
        return res.status(422).json({
          error: err.errors[0].message,
        });
      res.status(422).json({
        error: err.message,
      });
    }
  };

export * from "./user.validator";
export * from "./team.validator";
