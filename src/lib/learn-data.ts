
export type CourseLesson = {
  title: string;
  duration: string;
  videoId: string;
};

export type Course = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  dataAiHint: string;
  instructor: {
    name: string;
    avatar: string;
    dataAiHint: string;
    title: string;
  };
  stats: {
    students: number;
    rating: number;
    lessons: number;
    level: string;
  };
  curriculum: CourseLesson[];
};

export const courses: Course[] = [
  {
    id: 'tieng-nhat-giao-tiep',
    title: 'Tiếng Nhật giao tiếp cho người đi làm (Minna no Nihongo)',
    category: 'Ngoại ngữ',
    description: 'Khóa học được thiết kế đặc biệt cho người lao động, bám sát giáo trình Minna no Nihongo uy tín, tập trung vào các mẫu câu giao tiếp và từ vựng chuyên ngành thường dùng trong môi trường nhà máy Nhật Bản.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'Japanese language class',
    instructor: {
      name: 'Dung Mochi',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'Japanese teacher',
      title: 'Giáo viên tiếng Nhật',
    },
    stats: {
      students: 1258,
      rating: 4.8,
      lessons: 25,
      level: 'N5',
    },
    curriculum: [
      { title: 'Bài 1: Giới thiệu bản thân', duration: '15:20', videoId: 'e-kFz1d4kE8' },
      { title: 'Bài 2: Cái này, cái đó, cái kia', duration: '18:45', videoId: 'zUo2N2pG0qI' },
      { title: 'Bài 3: Địa điểm, nơi chốn', duration: '20:10', videoId: '5p2sVqGgE_I' },
      { title: 'Bài 4: Động từ và thời gian', duration: '22:55', videoId: 'zFzOqkUG4Ow' },
      { title: 'Bài 5: Di chuyển', duration: '19:30', videoId: 'V92_uXn2o5o' },
    ]
  },
  {
    id: 'van-hoa-nhat-ban',
    title: 'Hiểu về Văn hóa Nhật Bản',
    category: 'Văn hóa & Xã hội',
    description: 'Khám phá những nét đặc trưng trong văn hóa, từ giao tiếp hàng ngày đến các lễ hội truyền thống, giúp bạn hòa nhập nhanh chóng và tự tin trong môi trường làm việc và sinh sống tại Nhật Bản.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'Japanese culture collage',
    instructor: {
      name: 'Akira Watanabe',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'culture expert',
      title: 'Chuyên gia Văn hóa Nhật Bản',
    },
    stats: {
      students: 830,
      rating: 4.9,
      lessons: 8,
      level: 'Cơ bản',
    },
    curriculum: [
        { title: 'Bài 1: Tổng quan về văn hoá Nhật Bản', duration: '12:30', videoId: 'VIDEO_ID_1' },
        { title: 'Bài 2: Văn hoá giao tiếp trong công việc', duration: '15:00', videoId: 'VIDEO_ID_2' },
        { title: 'Bài 3: Quy tắc trong môi trường làm việc', duration: '14:15', videoId: 'VIDEO_ID_3' },
        { title: 'Bài 4: Văn hoá sinh hoạt hằng ngày', duration: '11:40', videoId: 'VIDEO_ID_4' },
        { title: 'Bài 5: Văn hoá ăn uống', duration: '10:55', videoId: 'VIDEO_ID_5' },
        { title: 'Bài 6: Sự khác biệt & cú sốc văn hoá', duration: '13:00', videoId: 'VIDEO_ID_6' },
        { title: 'Bài 7: Thực hành & tình huống minh hoạ', duration: '18:20', videoId: 'VIDEO_ID_7' },
        { title: 'Bài 8: Hỗ trợ hội nhập lâu dài', duration: '09:50', videoId: 'VIDEO_ID_8' },
    ]
  },
   {
    id: 'ung-xu-cong-ty-nhat',
    title: 'Cách ứng xử trong công ty Nhật',
    category: 'Kỹ năng làm việc',
    description: 'Nắm vững các quy tắc ứng xử nơi công sở Nhật Bản, từ cách chào hỏi, trao đổi danh thiếp đến văn hóa báo cáo "Hou-Ren-Sou".',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'Japanese office meeting',
    instructor: {
        name: 'Tanaka Kenji',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'Japanese manager',
        title: 'Quản lý Nhân sự',
    },
    stats: {
        students: 950,
        rating: 4.7,
        lessons: 10,
        level: 'Mọi cấp độ',
    },
    curriculum: []
  },
   {
    id: 'ky-nang-thang-tien',
    title: 'Kỹ năng để Thăng tiến tại Nhật Bản',
    category: 'Phát triển sự nghiệp',
    description: 'Tìm hiểu về tư duy kaizen, kỹ năng quản lý và những yếu tố then chốt giúp bạn không chỉ hoàn thành công việc mà còn thăng tiến.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'career growth ladder',
    instructor: {
        name: 'Lê Minh Cường',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'career coach',
        title: 'Chuyên gia Hướng nghiệp',
    },
    stats: {
        students: 720,
        rating: 4.8,
        lessons: 12,
        level: 'Nâng cao',
    },
    curriculum: []
  },
];
