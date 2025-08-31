
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
      hourly?: string;
      annualIncome?: string;
      annualBonus?: string;
    };
    title: string;
    recruiter: {
      name: string;
      avatar: string;
      company: string;
    };
    status: 'Đang tuyển' | 'Tạm dừng';
    interviewDate: string;
    interviewRounds: number;
    netFee?: string;
    target: string;
    backFee?: string;
    tags: string[];
    applicants?: {
        count: number;
        avatars: string[];
    };
    postedTime: string;

    // Level 1 Fields
    visaType: 'Thực tập sinh kỹ năng' | 'Kỹ năng đặc định' | 'Kỹ sư, tri thức';
    visaDetail: 'Thực tập sinh 3 năm' | 'Thực tập sinh 1 năm' | 'Thực tập sinh 3 Go' | 'Đặc định đầu Việt' | 'Đặc định đầu Nhật' | 'Đặc định đi mới' | 'Kỹ sư, tri thức đầu Việt' | 'Kỹ sư, tri thức đầu Nhật';
    industry: string;
    workLocation: string;
    interviewLocation?: string;
    gender: 'Nam' | 'Nữ' | 'Cả nam và nữ';
    quantity: number;
    ageRequirement: string;
    languageRequirement?: string;
    specialConditions: string;
    notes?: string;

    // Level 2 Fields
    educationRequirement?: string;
    experienceRequirement?: string;
    yearsOfExperience?: string;
    companyTimeRequirement?: string;
    remainingGinouTime?: string;
    otherSkillRequirement?: string;
    workShift?: string;
    visionRequirement?: string;
    interviewFormat?: string;
    heightRequirement?: string;
    weightRequirement?: string;
    dominantHand?: string;
    tattooRequirement?: string;
    hepatitisBRequirement?: string;


    details: {
        description: string;
        requirements: string;
        benefits: string;
        images?: { src: string; alt: string; dataAiHint: string; }[];
        videoUrl?: string;
    };
}
  
export const jobData: Job[] = [
    {
        id: 'JP-KRSBA015',
        isRecording: true,
        image: { src: 'https://placehold.co/600x400.png', type: 'minhhoa' },
        likes: '8k2',
        salary: { actual: '25,5tr', basic: '30tr', annualIncome: undefined, annualBonus: undefined },
        title: 'Thực tập sinh 3 năm, Chế biến thực phẩm, Nagasaki',
        recruiter: { name: 'Nguyễn Thị Ngân', avatar: 'https://placehold.co/32x32.png', company: 'Hoàng Long H...' },
        status: 'Đang tuyển',
        interviewDate: '19/02/2024',
        interviewRounds: 2,
        netFee: '110tr(4k2)',
        target: '5tr',
        tags: ['Thực phẩm', 'Nữ'],
        applicants: { count: 10, avatars: [] },
        postedTime: '12:58 06/10/2024',
        visaType: 'Thực tập sinh kỹ năng',
        visaDetail: 'Thực tập sinh 3 năm',
        industry: 'Chế biến thực phẩm',
        workLocation: 'Nagasaki, Nhật Bản',
        interviewLocation: 'Hà Nội, Việt Nam',
        gender: 'Nữ',
        quantity: 3,
        ageRequirement: '18 - 35 tuổi',
        languageRequirement: undefined,
        specialConditions: 'Chăm chỉ, chịu khó',
        educationRequirement: 'Tốt nghiệp THPT trở lên',
        experienceRequirement: 'Có kinh nghiệm',
        yearsOfExperience: '1 năm',
        heightRequirement: '1m50 trở lên',
        weightRequirement: '50kg trở lên',
        tattooRequirement: 'Có',
        hepatitisBRequirement: 'Có',
        visionRequirement: 'Thị lực tốt, không mù màu',
        interviewFormat: 'Online qua Zoom',
        workShift: 'Làm theo ca, xoay ca',
        dominantHand: 'Tay phải',
        otherSkillRequirement: 'Có khả năng làm việc nhóm tốt',
        details: {
            description: '<p>Công việc chính là chế biến, đóng gói các sản phẩm cơm hộp, sushi, salad cho chuỗi siêu thị và cửa hàng tiện lợi. Môi trường làm việc sạch sẽ, hiện đại, đảm bảo vệ sinh an toàn thực phẩm.</p><ul><li>Vận hành máy trộn, máy cắt rau củ, máy đóng gói tự động.</li><li>Kiểm tra chất lượng nguyên liệu và thành phẩm.</li><li>Tuân thủ nghiêm ngặt các quy định về vệ sinh cá nhân và khu vực làm việc.</li></ul><p><strong>Ghi chú:</strong> Công việc có thể yêu cầu đứng trong thời gian dài.</p>',
            requirements: '<p>Yêu cầu ứng viên chăm chỉ, cẩn thận và có trách nhiệm. Cụ thể:</p><ul><li>Độ tuổi: 18 - 35 tuổi.</li><li>Giới tính: Nữ.</li><li>Sức khỏe tốt, không mắc các bệnh truyền nhiễm.</li><li>Không yêu cầu kinh nghiệm, sẽ được đào tạo bài bản.</li><li>Ưu tiên ứng viên có kinh nghiệm làm trong ngành thực phẩm.</li></ul>',
            benefits: '<p>Mức lương và chế độ đãi ngộ hấp dẫn:</p><ul><li>Lương cơ bản: 160,000 JPY/tháng (chưa tính tăng ca).</li><li>Thực lĩnh (sau khi trừ thuế, bảo hiểm, nhà ở): Khoảng 120,000 JPY/tháng.</li><li>Được tham gia đầy đủ bảo hiểm xã hội, y tế, thất nghiệp.</li><li>Hỗ trợ nhà ở ký túc xá đầy đủ tiện nghi.</li><li>Có cơ hội gia hạn hợp đồng và phát triển lâu dài.</li></ul>',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            images: [
                { src: 'https://placehold.co/600x400.png', alt: 'Dây chuyền sản xuất', dataAiHint: 'production line' },
                { src: 'https://placehold.co/600x400.png', alt: 'Khu nhà ăn', dataAiHint: 'company cafeteria' },
            ]
        }
    },
    {
        id: 'JP-ACABA055',
        isRecording: true,
        image: { src: 'https://placehold.co/600x400.png', type: 'thucte' },
        likes: '1',
        salary: { basic: '30tr', annualBonus: "Có", annualIncome: "Có" },
        title: 'Kỹ sư cầu nối (Bridge SE) - Đầu Nhật',
        recruiter: { name: 'Của bạn', avatar: 'https://placehold.co/32x32.png', company: '<chưa rõ>' },
        status: 'Tạm dừng',
        interviewDate: '19/02/2024',
        interviewRounds: 3,
        netFee: undefined, 
        target: '',
        backFee: '12tr',
        tags: ['IT', 'Kỹ sư', 'N2'],
        applicants: {
            count: 3,
            avatars: ['https://placehold.co/24x24.png', 'https://placehold.co/24x24.png', 'https://placehold.co/24x24.png'],
        },
        postedTime: '12:58 06/10/2024',
        visaType: 'Kỹ sư, tri thức',
        visaDetail: 'Kỹ sư, tri thức đầu Nhật',
        industry: 'Công nghệ thông tin',
        workLocation: 'Tokyo, Nhật Bản',
        gender: 'Cả nam và nữ',
        quantity: 2,
        ageRequirement: '22 - 32 tuổi',
        languageRequirement: 'Tiếng Nhật N2',
        specialConditions: 'Có kinh nghiệm làm việc với khách hàng Nhật',
        educationRequirement: 'Tốt nghiệp Đại học chuyên ngành CNTT hoặc tương đương',
        experienceRequirement: 'Có kinh nghiệm BrSE',
        yearsOfExperience: 'Ít nhất 2 năm',
        companyTimeRequirement: 'Có',
        details: { description: 'Chi tiết công việc đang được cập nhật.', requirements: 'Chi tiết yêu cầu đang được cập nhật.', benefits: 'Chi tiết quyền lợi đang được cập nhật.', images: [], videoUrl: '' }
    },
    {
        id: 'JP-ATXAA015',
        isRecording: true,
        image: { src: 'https://placehold.co/600x400.png', type: 'minhhoa' },
        likes: '5k1',
        salary: { actual: '26tr', basic: '31tr' },
        title: 'Tuyển 10 nữ dán giấy tường nội thất tại Fukuoka',
        recruiter: { name: 'Trần Văn Mạnh', avatar: 'https://placehold.co/32x32.png', company: 'Vinamex' },
        status: 'Đang tuyển',
        interviewDate: '25/02/2024',
        interviewRounds: 2,
        netFee: '100tr',
        target: '10tr',
        tags: ['Xây dựng', 'Nữ'],
        applicants: { count: 12, avatars: [] },
        postedTime: '11:30 06/10/2024',
        visaType: 'Thực tập sinh kỹ năng',
        visaDetail: 'Thực tập sinh 1 năm',
        industry: 'Hoàn thiện nội thất',
        workLocation: 'Fukuoka, Nhật Bản',
        gender: 'Nữ',
        quantity: 10,
        ageRequirement: '20 - 30 tuổi',
        specialConditions: 'Khéo tay, cẩn thận',
        educationRequirement: 'Tốt nghiệp THPT',
        experienceRequirement: 'Có',
        yearsOfExperience: 'Không yêu cầu',
        details: { description: 'Chi tiết công việc đang được cập nhật.', requirements: 'Chi tiết yêu cầu đang được cập nhật.', benefits: 'Chi tiết quyền lợi đang được cập nhật.', images: [], videoUrl: '' }
    },
    {
        id: 'JP-KBSBA045',
        isRecording: false,
        image: { src: 'https://placehold.co/600x400.png', type: 'thucte' },
        likes: '12k',
        salary: { basic: '29tr' },
        title: 'Kỹ sư cơ khí vận hành máy phay CNC',
        recruiter: { name: 'Lê Thuỳ Trang', avatar: 'https://placehold.co/32x32.png', company: 'Esuhai' },
        status: 'Đang tuyển',
        interviewDate: '05/03/2024',
        interviewRounds: 2,
        netFee: 'Liên hệ',
        target: '2tr',
        tags: ['Cơ khí', 'Kỹ sư', 'N4'],
        applicants: {
            count: 5,
            avatars: ['https://placehold.co/24x24.png', 'https://placehold.co/24x24.png', 'https://placehold.co/24x24.png'],
        },
        postedTime: '10:05 06/10/2024',
        visaType: 'Kỹ năng đặc định',
        visaDetail: 'Đặc định đi mới',
        industry: 'Cơ khí',
        workLocation: 'Osaka, Nhật Bản',
        gender: 'Nam',
        quantity: 1,
        ageRequirement: '21 - 35 tuổi',
        languageRequirement: 'Tiếng Nhật N4',
        specialConditions: 'Có kinh nghiệm vận hành máy phay',
        educationRequirement: undefined,
        experienceRequirement: 'Có kinh nghiệm',
        yearsOfExperience: '1 năm vận hành máy phay CNC',
        details: { description: 'Chi tiết công việc đang được cập nhật.', requirements: 'Chi tiết yêu cầu đang được cập nhật.', benefits: 'Chi tiết quyền lợi đang được cập nhật.', images: [], videoUrl: '' }
    },
    {
      id: 'JP-XYZ001',
      isRecording: false,
      image: { src: 'https://placehold.co/600x400.png', type: 'minhhoa'},
      likes: '3k5',
      salary: { actual: '28tr', basic: '33tr'},
      title: 'Tuyển dụng 5 Nam TTS Hàn xì làm việc tại Aichi.',
      recruiter: { name: 'Hoàng An', avatar: 'https://placehold.co/32x32.png', company: 'JapanWorks'},
      status: 'Đang tuyển',
      interviewDate: '15/03/2024',
      interviewRounds: 2,
      netFee: '105tr',
      target: '8tr',
      tags: ['Cơ khí', 'Hàn', 'Nam'],
       applicants: { count: 8, avatars: [] },
      postedTime: '09:00 07/10/2024',
      visaType: 'Thực tập sinh kỹ năng',
      visaDetail: 'Thực tập sinh 3 Go',
      industry: 'Hàn',
      workLocation: 'Aichi, Nhật Bản',
      gender: 'Nam',
      quantity: 5,
      ageRequirement: '19 - 28 tuổi',
      specialConditions: 'Có chứng chỉ hàn 3G trở lên',
      experienceRequirement: 'Có kinh nghiệm',
      yearsOfExperience: 'Ít nhất 1 năm',
      companyTimeRequirement: 'Có',
      details: { description: 'Chi tiết công việc đang được cập nhật.', requirements: 'Chi tiết yêu cầu đang được cập nhật.', benefits: 'Chi tiết quyền lợi đang được cập nhật.', images: [], videoUrl: '' }
    }
];
