
import { JobRecommendationResponse } from "@/ai/schemas/recommend-jobs-schema";

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  dataAiHint?: string;
  isBot?: boolean;
  mainExpertise?: string;
  experience?: string;
  successfulCandidates?: number;
  strengths?: string[];
};

export type Message = {
  id: string;
  sender: User;
  text: string;
  timestamp: string;
  isLoading?: boolean;
  recommendations?: JobRecommendationResponse['recommendations'];
};

export type Conversation = {
  id: string;
  participants: User[];
  messages: Message[];
};

export const currentUser: User = {
  id: 'user-0',
  name: 'Lê Ngọc Hân',
  avatarUrl: 'https://placehold.co/100x100.png?text=Me',
};

// Real consultants
export const consultants: User[] = [
    {
    id: 'consultant-1',
    name: 'Lê Xuân Long',
    avatarUrl: '/img/long.jpg',
    dataAiHint: 'professional man portrait',
    experience: '5 năm',
    mainExpertise: 'Tư vấn việc làm Kỹ năng đặc định (Tokutei)',
    successfulCandidates: 412,
    strengths: ['Tận tình', 'Nhiều đơn', 'Hiểu rõ ngành'],
  },
  {
    id: 'consultant-2',
    name: 'Nguyễn Thị Minh Anh',
    avatarUrl: '/img/minhanh.jpg',
    dataAiHint: 'professional woman portrait',
    experience: '3 năm',
    mainExpertise: 'Chuyên gia tư vấn ngành thực phẩm',
    successfulCandidates: 280,
    strengths: ['Chuyên môn cao', 'Tỷ lệ đỗ cao', 'Hỗ trợ nhanh'],
  },
   {
    id: 'consultant-3',
    name: 'Phạm Thị Hà',
    avatarUrl: '/img/chiha.jpg',
    dataAiHint: 'professional woman portrait',
    experience: '2 năm',
    mainExpertise: 'Tư vấn ngành điều dưỡng & chăm sóc sức khỏe',
    successfulCandidates: 220,
    strengths: ['Tận tâm', 'Am hiểu thủ tục', 'Hỗ trợ chi tiết'],
  },
];

// AI Bot persona
export const helloJobBot: User = {
    id: 'bot-hellojob',
    name: 'HelloJob AI',
    avatarUrl: '/img/logo.png',
    dataAiHint: 'friendly robot mascot',
    isBot: true,
};


// Initial conversations data
export const conversations: Conversation[] = [
  {
    id: 'convo-bot-hellojob',
    participants: [currentUser, helloJobBot],
    messages: [
      { 
        id: 'msg-bot-1', 
        sender: helloJobBot, 
        text: 'Chào bạn, tôi là trợ lý AI của HelloJob. Bạn đang tìm kiếm loại công việc nào? Hãy mô tả mong muốn của bạn nhé!', 
        timestamp: '2024-07-29T10:00:00Z' 
      },
    ],
  },
];

// Legacy users array for other parts of the app if needed
export const users: User[] = [ ...consultants ];
