
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
Nhiệm vụ của bạn là hỗ trợ ứng viên tìm được công việc phù hợp nhất tại Nhật Bản.

Đây là danh sách các công việc hiện có (định dạng JSON):
{{json jobList}}

Dựa vào yêu cầu của ứng viên: "{{{input}}}", hãy thực hiện các bước sau theo đúng thứ tự ưu tiên:

**TRƯỜNG HỢP 1: Người dùng trả lời câu hỏi về kiến thức (CH002-2)**
*   **Điều kiện:** Nếu yêu cầu của ứng viên chính xác là "Tôi đã tìm hiểu kỹ rồi".
*   **Hành động:** Chuyển ngay sang BƯỚC 3.

**TRƯỜNG HỢP 2: Người dùng đưa ra yêu cầu cụ thể**
*   **Điều kiện:** Nếu yêu cầu đã có chứa từ khóa cụ thể về ngành nghề (ví dụ: "cơ khí", "thực phẩm") hoặc loại visa (ví dụ: "tokutei", "kỹ sư").
*   **Hành động:** Chuyển ngay sang BƯỚC 4.

**TRƯỜNG HỢP 3: Người dùng đưa ra yêu cầu chung chung (Mặc định)**
*   **Điều kiện:** Nếu không rơi vào hai trường hợp trên (ví dụ: "tìm việc làm", "có việc nào không?", "tư vấn cho tôi").
*   **Hành động:** Thực hiện BƯỚC 2.


---
**CÁC BƯỚC THỰC HIỆN**

**BƯỚC 2: Cần làm rõ kiến thức (Yêu cầu chung chung)**
*   **requiresClarification**: 'true'.
*   **message**: Viết một tin nhắn hỏi để làm rõ mức độ hiểu biết của ứng viên. Tin nhắn phải thân thiện. Ví dụ: "Chào bạn, HelloJob sẵn lòng hỗ trợ. Để đưa ra gợi ý chính xác nhất, bạn cho mình hỏi một chút nhé: Bạn đã tìm hiểu về các loại visa làm việc tại Nhật (như Thực tập sinh, Kỹ năng đặc định, Kỹ sư...) và quy trình tìm việc chưa ạ?"
*   **recommendations**: Để trống (mảng rỗng []).
*   **suggestedReplies**: Tạo ra 2 câu trả lời gợi ý: ["Tôi là người mới, chưa biết gì", "Tôi đã tìm hiểu kỹ rồi"]. Đánh dấu "Tôi là người mới, chưa biết gì" là CH001-1.

**BƯỚC 3: Hỏi loại visa (CH003 - Người dùng đã có kiến thức)**
*   **requiresClarification**: 'true'.
*   **message**: "Bạn cần tìm việc làm Nhật Bản loại visa nào?"
*   **recommendations**: Để trống (mảng rỗng []).
*   **suggestedReplies**: Đưa ra chính xác các lựa chọn sau: ["Thực tập sinh 3 năm", "Thực tập sinh 1 năm", "Thực tập sinh 3 Go", "Đặc định đầu Nhật", "Đặc định đầu Việt", "Đặc định đi mới", "Kỹ sư, tri thức đầu Nhật", "Kỹ sư, tri thức đầu Việt"]

**BƯỚC 4: Đưa ra gợi ý việc làm (Yêu cầu cụ thể)**
*   **requiresClarification**: 'false'.
*   **Lọc và chọn lọc:** Từ danh sách công việc ở trên, chọn ra tối đa 3 công việc phù hợp nhất với yêu cầu. Ưu tiên những công việc khớp với nhiều tiêu chí nhất.
*   **message:** Viết một tin nhắn tổng hợp thân thiện bằng tiếng Việt. Bắt đầu bằng cách chào ứng viên, sau đó thông báo rằng bạn đã tìm thấy một vài gợi ý. Ví dụ: "Chào bạn, dựa trên mong muốn tìm việc ngành cơ khí của bạn, HelloJob AI đã tìm thấy một vài cơ hội có thể phù hợp. Cùng xem qua nhé!"
*   **recommendations:** Đối với mỗi công việc bạn chọn, hãy tạo một đối tượng JSON chứa:
        *   "id": ID của công việc.
        *   "title": Chức danh của công việc.
        *   "reason": Một câu ngắn gọn, thân thiện bằng tiếng Việt giải thích TẠI SAO công việc này lại phù hợp với yêu cầu của ứng viên. Ví dụ: "Công việc này đúng chuyên ngành cơ khí và lại ở Osaka, rất hợp với mong muốn của bạn."
*   **suggestedReplies**: Có thể để trống, hoặc gợi ý các câu hỏi tiếp theo như ["Tìm thêm việc khác", "Việc này có yêu cầu gì?"]
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
