
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
  'data-ai-hint': string;
  instructor: {
    name: string;
    avatar: string;
    'data-ai-hint': string;
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
    'data-ai-hint': 'Japanese language class',
    instructor: {
      name: 'Dung Mochi',
      avatar: 'https://placehold.co/100x100.png',
      'data-ai-hint': 'Japanese teacher',
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
    id: 'ung-xu-cong-ty-nhat',
    title: 'Cách ứng xử trong công ty Nhật',
    category: 'Kỹ năng làm việc',
    description: 'Nắm vững các quy tắc ứng xử nơi công sở Nhật Bản, từ cách chào hỏi, trao đổi danh thiếp đến văn hóa báo cáo "Hou-Ren-Sou".',
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'Japanese office meeting',
    instructor: {
        name: 'Tanaka Kenji',
        avatar: 'https://placehold.co/100x100.png',
        'data-ai-hint': 'Japanese manager',
        title: 'Quản lý Nhân sự',
    },
    stats: {
        students: 950,
        rating: 4.7,
        lessons: 10,
        level: 'Mọi cấp độ',
    },
    curriculum: [
      { title: 'Bài 1: Nguyên tắc nền tảng trong công ty Nhật', duration: '12:30', videoId: 'placeholder01' },
      { title: 'Bài 2: Chào hỏi và giao tiếp hằng ngày', duration: '14:05', videoId: 'placeholder02' },
      { title: 'Bài 3: Ứng xử trong giờ làm việc', duration: '10:15', videoId: 'placeholder03' },
      { title: 'Bài 4: Văn hoá báo cáo – liên lạc – thảo luận (Ho-Ren-So)', duration: '15:45', videoId: 'placeholder04' },
      { title: 'Bài 5: Ứng xử với cấp trên & đồng nghiệp', duration: '13:20', videoId: 'placeholder05' },
      { title: 'Bài 6: Ứng xử trong các cuộc họp', duration: '11:50', videoId: 'placeholder06' },
      { title: 'Bài 7: Ứng xử trong các buổi tiệc công ty (Nomikai)', duration: '12:00', videoId: 'placeholder07' },
      { title: 'Bài 8: Những lỗi người Việt thường mắc & cách khắc phục', duration: '16:10', videoId: 'placeholder08' },
      { title: 'Bài 9: Bài tập tình huống thực tế', duration: '18:00', videoId: 'placeholder09' },
      { title: 'Bài 10: Kết nối & hội nhập lâu dài', duration: '9:30', videoId: 'placeholder10' },
    ]
  },
  {
    id: 'ky-nang-thang-tien',
    title: 'Kỹ năng để Thăng tiến tại Nhật Bản',
    category: 'Phát triển sự nghiệp',
    description: 'Tìm hiểu về tư duy kaizen, kỹ năng quản lý và những yếu tố then chốt giúp bạn không chỉ hoàn thành công việc mà còn thăng tiến.',
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'career growth ladder',
    instructor: {
        name: 'Lê Minh Cường',
        avatar: 'https://placehold.co/100x100.png',
        'data-ai-hint': 'career coach',
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
  {
    id: 'van-hoa-nhat-ban',
    title: 'Hiểu về Văn hoá Nhật Bản',
    category: 'Văn hóa & Xã hội',
    description: 'Khám phá những nét đặc trưng trong văn hóa Nhật Bản, từ các lễ hội truyền thống, ẩm thực đa dạng đến các quy tắc ứng xử trong cuộc sống hàng ngày để bạn tự tin hòa nhập.',
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'Japanese cultural symbols',
    instructor: {
        name: 'Suzuki Yui',
        avatar: 'https://placehold.co/100x100.png',
        'data-ai-hint': 'Japanese cultural expert',
        title: 'Chuyên gia Văn hóa Nhật Bản',
    },
    stats: {
        students: 810,
        rating: 4.9,
        lessons: 15,
        level: 'Mọi cấp độ',
    },
    curriculum: [
      { title: 'Bài 1: Tổng quan về văn hoá Nhật Bản', duration: '14:50', videoId: 'placeholder_vh_01' },
      { title: 'Bài 2: Văn hoá giao tiếp trong công việc', duration: '16:20', videoId: 'placeholder_vh_02' },
      { title: 'Bài 3: Quy tắc trong môi trường làm việc', duration: '13:40', videoId: 'placeholder_vh_03' },
      { title: 'Bài 4: Văn hoá sinh hoạt hằng ngày', duration: '15:00', videoId: 'placeholder_vh_04' },
      { title: 'Bài 5: Văn hoá ăn uống', duration: '12:15', videoId: 'placeholder_vh_05' },
      { title: 'Bài 6: Những cú sốc văn hoá thường gặp', duration: '11:30', videoId: 'placeholder_vh_06' },
      { title: 'Bài 7: Thực hành & tình huống minh hoạ', duration: '17:55', videoId: 'placeholder_vh_07' },
      { title: 'Bài 8: Hỗ trợ hội nhập lâu dài', duration: '10:00', videoId: 'placeholder_vh_08' }
    ]
  },
];
