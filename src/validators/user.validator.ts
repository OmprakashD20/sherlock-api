import * as z from "zod";

//schema for validating the request body of /sign-up endpoint
export const SignUpSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Team name is required",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    sherlock: z.string().length(8, {
      message: "Your K! ID must be 8 characters long",
    }),
    watson: z.string().length(8, {
      message: "Your K! ID must be 8 characters long",
    }),
    sherlockMail: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
    watsonMail: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
  }),
});

export type SignUpSchemaType = z.TypeOf<typeof SignUpSchema>["body"];

//schema for validating the request body of /sign-in endpoint
export const SignInSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Team name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
    password: z.string(),
    kid: z.string().length(8, {
      message: "Your K! ID must be 8 characters long",
    }),
    character: z.enum(["sherlock", "watson"]),
  }),
});

export type SignInSchemaType = z.TypeOf<typeof SignInSchema>["body"];

//schema for validating the request body of /team/character endpoint
export const CharacterSchema = z.object({
  query: z.object({
    character: z.enum(["sherlock", "watson"]),
  }),
});

export type CharacterSchemaType = z.TypeOf<typeof CharacterSchema>["query"];
