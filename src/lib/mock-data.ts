
export interface Job {
    id: string;
    isRecording: boolean;
    image: {
      src: string;
      type: 'minhhoa' | 'thucte';
    };
    likes: string;
    salary: {
      actual?: string;
      basic: string;
    };
    title: string;
    support?: string[];
    recruiter: {
      name: string;
      avatar: string;
      company: string;
    };
    status: 'Đang tuyển' | 'Tạm dừng';
    interviewDate: string;
    interviewRounds: number;
    netFee: string;
    target: string;
    backFee?: string;
    tags: string[];
    applicants?: {
        count: number;
        avatars: string[];
    };
    postedTime: string;
}
  
export const jobData: Job[] = [
    {
        id: 'JP-KRSBA015',
        isRecording: true,
        image: { src: 'https://placehold.co/600x400.png', type: 'minhhoa' },
        likes: '8k2',
        salary: { actual: '25,5tr', basic: '30tr' },
        title: 'Thực tập sinh 3 năm, Chế biến thực phẩm, Nagasaki, 3 Nữ, 18 - 35 tuổ...',
        support: ['lành nghề'],
        recruiter: { name: 'Nguyễn Thị Ngân', avatar: 'https://placehold.co/32x32.png', company: 'Hoàng Long H...' },
        status: 'Đang tuyển',
        interviewDate: '19/02/2024',
        interviewRounds: 3,
        netFee: '110tr(4k2)',
        target: '5tr',
        tags: ['Cặp đôi', 'Có bằng lái', 'Hỗ trợ chỗ ở'],
        postedTime: '12:58 06/10/2024',
    },
    {
        id: 'JP-ACABA055',
        isRecording: true,
        image: { src: 'https://placehold.co/600x400.png', type: 'thucte' },
        likes: '1',
        salary: { basic: '30tr' },
        title: 'Kỹ sư, tri thức đầu Nhật có tiếng, N3, N2, Công nghệ thông tin, Kỹ sư cầu nối, Nam, 22-32 tuổi, Tuyển nhân viê...',
        support: ['lành nghề'],
        recruiter: { name: 'Của bạn', avatar: 'https://placehold.co/32x32.png', company: '<chưa rõ>' },
        status: 'Tạm dừng',
        interviewDate: '19/02/2024',
        interviewRounds: 3,
        netFee: 'Liên hệ',
        target: '',
        backFee: '12tr',
        tags: ['Cặp đôi', 'Có bằng lái'],
        applicants: {
            count: 3,
            avatars: ['https://placehold.co/24x24.png', 'https://placehold.co/24x24.png', 'https://placehold.co/24x24.png'],
        },
        postedTime: '12:58 06/10/2024',
    },
    {
        id: 'JP-ATXAA015',
        isRecording: true,
        image: { src: 'https://placehold.co/600x400.png', type: 'minhhoa' },
        likes: '5k1',
        salary: { actual: '26tr', basic: '31tr' },
        title: 'Tuyển 10 nữ dán giấy tường nội thất tại Fukuoka, Nhật Bản. Lương 32tr/tháng.',
        support: [],
        recruiter: { name: 'Trần Văn Mạnh', avatar: 'https://placehold.co/32x32.png', company: 'Vinamex' },
        status: 'Đang tuyển',
        interviewDate: '25/02/2024',
        interviewRounds: 2,
        netFee: '100tr',
        target: '10tr',
        tags: ['Hỗ trợ chỗ ở'],
        postedTime: '11:30 06/10/2024',
    },
    {
        id: 'JP-KBSBA045',
        isRecording: false,
        image: { src: 'https://placehold.co/600x400.png', type: 'thucte' },
        likes: '12k',
        salary: { basic: '29tr' },
        title: 'Kỹ sư cơ khí làm việc tại Osaka, yêu cầu N4, có kinh nghiệm vận hành máy phay CNC.',
        support: ['lành nghề'],
        recruiter: { name: 'Lê Thuỳ Trang', avatar: 'https://placehold.co/32x32.png', company: 'Esuhai' },
        status: 'Đang tuyển',
        interviewDate: '05/03/2024',
        interviewRounds: 2,
        netFee: 'Liên hệ',
        target: '2tr',
        tags: ['Có bằng lái'],
        applicants: {
            count: 5,
            avatars: ['https://placehold.co/24x24.png', 'https://placehold.co/24x24.png', 'https://placehold.co/24x24.png'],
        },
        postedTime: '10:05 06/10/2024',
    },
    {
      id: 'JP-XYZ001',
      isRecording: false,
      image: { src: 'https://placehold.co/600x400.png', type: 'minhhoa'},
      likes: '3k5',
      salary: { actual: '28tr', basic: '33tr'},
      title: 'Tuyển dụng 5 Nam TTS Hàn xì làm việc tại Aichi. Yêu cầu có kinh nghiệm.',
      support: [],
      recruiter: { name: 'Hoàng An', avatar: 'https://placehold.co/32x32.png', company: 'JapanWorks'},
      status: 'Đang tuyển',
      interviewDate: '15/03/2024',
      interviewRounds: 2,
      netFee: '105tr',
      target: '8tr',
      tags: ['Tay nghề cao'],
      postedTime: '09:00 07/10/2024',
    }
];
