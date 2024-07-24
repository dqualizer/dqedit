import { z } from "zod";

export const ACCEPTED_FILE_TYPES = ["application/octet-stream"];

export const formSchema = z.object({
  files: z
    .instanceof(File, { message: "Please upload a file." })
    .refine((f) => f.size < 100_000, "Max 100 kB upload size.")
    .array(),
});

export type FormSchema = typeof formSchema;
