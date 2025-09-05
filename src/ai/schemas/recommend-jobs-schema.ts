
import { z } from 'zod';

// Define the schema for a single recommended job
export const RecommendedJobSchema = z.object({
  id: z.string().describe('The unique ID of the job from the provided list.'),
  title: z.string().describe('The title of the job.'),
  reason: z.string().describe('A brief, friendly, and encouraging reason in Vietnamese explaining why this job is a good match for the user, based on their query and the job details.'),
});

export type RecommendedJob = z.infer<typeof RecommendedJobSchema>;

// Define the schema for the flow's output
export const JobRecommendationResponseSchema = z.object({
  recommendations: z.array(RecommendedJobSchema).describe('A list of up to 3 recommended jobs.'),
  message: z.string().describe("A friendly, conversational, and helpful summary message in Vietnamese to the user. Start by acknowledging their request, then briefly introduce the recommendations. For example: 'Chào bạn, dựa trên mong muốn của bạn, HelloJob AI đã tìm thấy một vài cơ hội có thể phù hợp. Cùng xem qua nhé!'"),
});

export type JobRecommendationResponse = z.infer<typeof JobRecommendationResponseSchema>;
