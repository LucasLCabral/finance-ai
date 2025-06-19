import { z } from "zod";
import { isMatch } from "date-fns";

export const generateAIReportSchema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM")),
});

export type GenerateAIReportSchema = z.infer<typeof generateAIReportSchema>;
