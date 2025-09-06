
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
  requiresClarification: z.boolean().describe('Set to true if the user\'s query is too general and they need to be asked about their visa knowledge. If true, do not provide recommendations.'),
  recommendations: z.array(RecommendedJobSchema).describe('A list of up to 3 recommended jobs. This should be an empty array if requiresClarification is true.'),
  message: z.string().describe("A friendly, conversational, and helpful summary message in Vietnamese to the user. If requiresClarification is true, this message should be a question to gauge the user's knowledge. Otherwise, it should introduce the job recommendations."),
  suggestedReplies: z.array(z.string()).optional().describe('A list of short, suggested replies for the user to click on to continue the conversation.'),
});

export type JobRecommendationResponse = z.infer<typeof JobRecommendationResponseSchema>;
