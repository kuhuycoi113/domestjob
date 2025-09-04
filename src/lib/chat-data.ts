
export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  isBot?: boolean;
};

export type Message = {
  id: string;
  sender: User;
  text: string;
  timestamp: string;
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
    avatarUrl: 'https://placehold.co/100x100.png?text=L',
  },
  {
    id: 'consultant-2',
    name: 'Nguyễn Thị Minh Anh',
    avatarUrl: 'https://placehold.co/100x100.png?text=A',
  },
   {
    id: 'consultant-3',
    name: 'Phạm Thị Hà',
    avatarUrl: 'https://placehold.co/100x100.png?text=H',
  },
];

// AI Bot persona
export const helloJobBot: User = {
    id: 'bot-hellojob',
    name: 'HelloJob',
    avatarUrl: 'https://placehold.co/100x100.png?text=HJ',
    isBot: true,
};


export const conversations: Conversation[] = [
  {
    id: 'convo-1',
    participants: [currentUser, helloJobBot, ...consultants], // All potential participants
    messages: [
      { id: 'msg-1', sender: consultants[0], text: 'Chào bạn, tôi là Long, tư vấn viên của HelloJob. Bạn cần hỗ trợ tìm việc hay có câu hỏi nào không ạ?', timestamp: '2024-07-28T10:00:00Z' },
      { id: 'msg-2', sender: currentUser, text: 'Chào bạn, tôi muốn tìm việc ngành cơ khí ở Aichi.', timestamp: '2024-07-28T10:01:00Z' },
      { id: 'msg-3', sender: consultants[0], text: 'Chào bạn Hân, tôi thấy bạn đang quan tâm đến ngành cơ khí tại Aichi. Hiện tại chúng tôi có một vài đơn hàng rất tốt, bạn muốn tìm hiểu thêm không?', timestamp: '2024-07-28T10:02:00Z' },

    ],
  },
];

// Legacy users array for other parts of the app if needed
export const users: User[] = [ ...consultants ];
