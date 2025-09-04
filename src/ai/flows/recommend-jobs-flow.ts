
'use server';
/**
 * @fileOverview An AI flow to recommend jobs to candidates based on a query.
 *
 * - recommendJobs - A function that handles the job recommendation process.
 * - JobRecommendationResponse - The return type for the recommendJobs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {jobData} from '@/lib/mock-data';
import { JobRecommendationResponseSchema, type JobRecommendationResponse } from '@/ai/schemas/recommend-jobs-schema';


export async function recommendJobs(query: string): Promise<JobRecommendationResponse> {
  return recommendJobsFlow(query);
}

// Simplify job data to only include relevant fields for the AI model
const simplifiedJobList = jobData.map(job => ({
    id: job.id,
    title: job.title,
    industry: job.industry,
    workLocation: job.workLocation,
    tags: job.tags,
    description: job.details.description.replace(/<[^>]*>/g, ' ').substring(0, 200) + '...', // Strip HTML and truncate
    requirements: job.details.requirements.replace(/<[^>]*>/g, ' ').substring(0, 200) + '...' // Strip HTML and truncate
}));


const prompt = ai.definePrompt({
  name: 'recommendJobsPrompt',
  input: {schema: z.string()},
  output: {schema: JobRecommendationResponseSchema},
  prompt: `Bạn là một chuyên gia tư vấn việc làm thông minh và thân thiện của HelloJob.
Nhiệm vụ của bạn là gợi ý những công việc phù hợp nhất cho ứng viên dựa trên yêu cầu của họ.

Đây là danh sách các công việc hiện có (định dạng JSON):
{{json jobList}}

Dựa vào yêu cầu của ứng viên: "{{{input}}}", hãy thực hiện các bước sau:

1.  **Phân tích yêu cầu:** Đọc kỹ yêu cầu của ứng viên để hiểu rõ họ muốn tìm việc gì (ví dụ: ngành nghề, địa điểm, loại visa, kinh nghiệm, v.v.).
2.  **Lọc và chọn lọc:** Từ danh sách công việc ở trên, chọn ra tối đa 3 công việc phù hợp nhất. Ưu tiên những công việc khớp với nhiều tiêu chí nhất.
3.  **Tạo phản hồi:**
    *   **message:** Viết một tin nhắn tổng hợp thân thiện bằng tiếng Việt. Bắt đầu bằng cách chào ứng viên, sau đó thông báo rằng bạn đã tìm thấy một vài gợi ý.
    *   **recommendations:** Đối với mỗi công việc bạn chọn, hãy tạo một đối tượng JSON chứa:
        *   "id": ID của công việc.
        *   "title": Chức danh của công việc.
        *   "reason": Một câu ngắn gọn, thân thiện bằng tiếng Việt giải thích TẠI SAO công việc này lại phù hợp với yêu cầu của ứng viên.

Ví dụ: Nếu ứng viên nói "tìm việc cơ khí ở Osaka", một lý do tốt có thể là "Công việc này đúng chuyên ngành cơ khí và lại ở Osaka, rất hợp với mong muốn của bạn."
`,
});

const recommendJobsFlow = ai.defineFlow(
  {
    name: 'recommendJobsFlow',
    inputSchema: z.string(),
    outputSchema: JobRecommendationResponseSchema,
  },
  async (query) => {
    if (!query) {
      throw new Error("A query must be provided.");
    }

    const {output} = await prompt(query, {
        custom: {
            jobList: JSON.stringify(simplifiedJobList)
        }
    });

    if (!output) {
      throw new Error("The AI failed to generate recommendations. Please try again.");
    }
    
    return output;
  }
);
