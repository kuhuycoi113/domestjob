
export type User = {
  id: string;
  name: string;
  avatarUrl: string;
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

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Nguyễn Văn A',
    avatarUrl: 'https://placehold.co/100x100.png?text=A',
  },
  {
    id: 'user-2',
    name: 'Trần Thị B',
    avatarUrl: 'https://placehold.co/100x100.png?text=B',
  },
   {
    id: 'user-3',
    name: 'Công ty TNHH ABC',
    avatarUrl: 'https://placehold.co/100x100.png?text=C',
  },
];

export const conversations: Conversation[] = [
  {
    id: 'convo-1',
    participants: [currentUser, users[0]],
    messages: [
      { id: 'msg-1', sender: users[0], text: 'Chào bạn, tôi thấy hồ sơ của bạn rất phù hợp với vị trí Kỹ sư Cơ khí bên công ty tôi.', timestamp: '2024-07-28T10:00:00Z' },
      { id: 'msg-2', sender: currentUser, text: 'Chào anh, cảm ơn anh đã quan tâm. Anh có thể cho tôi biết thêm chi tiết về công việc không ạ?', timestamp: '2024-07-28T10:01:00Z' },
    ],
  },
  {
    id: 'convo-2',
    participants: [currentUser, users[1]],
    messages: [
      { id: 'msg-3', sender: users[1], text: 'Em ơi, đơn hàng đi Osaka bên chị vẫn còn nhận hồ sơ nhé.', timestamp: '2024-07-27T15:30:00Z' },
    ],
  },
    {
    id: 'convo-3',
    participants: [currentUser, users[2]],
    messages: [
      { id: 'msg-4', sender: users[2], text: 'Cảm ơn bạn đã ứng tuyển vào vị trí Vận hành máy CNC. Chúng tôi sẽ xem xét hồ sơ và phản hồi trong thời gian sớm nhất.', timestamp: '2024-07-26T09:00:00Z' },
    ],
  },
];
