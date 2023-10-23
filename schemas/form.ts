import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(4).max(100),
  description: z.string().max(500).optional(),
});

export type formSchemaType = z.infer<typeof formSchema>;
