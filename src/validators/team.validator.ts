import * as z from "zod";

//schema for validating the request params of GET /:qn endpoint and GET /:qn/clue endpoint
export const QnSchema = z.object({
  params: z.object({
    qn: z.string({
      required_error: "Question number is required",
    }),
  }),
});

export type QnSchemaType = z.TypeOf<typeof QnSchema>["params"];

//schema for validating the request body of POST /:qn endpoint
export const AnswerSchema = z.object({
  params: z.object({
    qn: z.string({
      required_error: "Question number is required",
    }),
  }),
  body: z.object({
    answer: z.string({
      required_error: "Answer is required",
    }),
  }),
});

export type AnswerSchemaParamsType = z.TypeOf<typeof AnswerSchema>["params"];

export type AnswerSchemaBodyType = z.TypeOf<typeof AnswerSchema>["body"];
