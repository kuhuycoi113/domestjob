
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
      annualIncome?: string;
      annualBonus?: string;
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
    netFee?: string; // Made optional
    target: string;
    backFee?: string;
    tags: string[];
    applicants?: {
        count: number;
        avatars: string[];
    };
    postedTime: string;
    // New detailed fields based on your schema
    visaType?: string;
    visaDetail?: string;
    industry: string;
    workLocation: string;
    interviewLocation?: string;
    gender?: 'Nam' | 'Nữ' | 'Cả nam và nữ';
    quantity: number;
    ageRequirement?: string;
    languageRequirement?: string;
    educationRequirement?: string;
    experienceRequirement?: string;
    yearsOfExperience?: string;
    heightRequirement?: string;
    weightRequirement?: string;
    visionRequirement?: string;
    tattooRequirement?: string;
    hepatitisBRequirement?: string;
    interviewFormat?: string;
    specialConditions?: string;
    details: {
        description: string;
        requirements: string;
        benefits: string;
        videoUrl?: string;
        images?: { src: string; alt: string; dataAiHint: string }[];
    }
}

const recruiters = [
    { name: 'Nguyễn Thị Ngân', avatar: 'https://placehold.co/32x32.png', company: 'Hoàng Long CMS' },
    { name: 'Trần Văn Mạnh', avatar: 'https://placehold.co/32x32.png', company: 'Vinamex' },
    { name: 'Lê Thuỳ Trang', avatar: 'https://placehold.co/32x32.png', company: 'Esuhai' },
    { name: 'Hoàng An', avatar: 'https://placehold.co/32x32.png', company: 'JapanWorks' },
    { name: 'Phạm Minh Tuấn', avatar: 'https://placehold.co/32x32.png', company: 'Kaizen Yoshida' },
    { name: 'Vũ Thị Lan', avatar: 'https://placehold.co/32x32.png', company: 'TTC Việt Nam' },
];

const industries = ['Chế biến thực phẩm', 'Cơ khí', 'Xây dựng', 'Nông nghiệp', 'Điện tử', 'Dệt may', 'Điều dưỡng', 'Nhà hàng'];
const locations = ['Tokyo', 'Osaka', 'Aichi', 'Fukuoka', 'Hokkaido', 'Kanagawa', 'Saitama', 'Chiba', 'Hyogo', 'Hiroshima'];
const visaTypes = ['Thực tập sinh 3 năm', 'Kỹ năng đặc định', 'Kỹ sư, tri thức'];
const jobTitles = {
    'Chế biến thực phẩm': ['Chế biến cơm hộp', 'Đóng gói bánh kẹo', 'Làm sushi', 'Chế biến thủy sản'],
    'Cơ khí': ['Vận hành máy CNC', 'Hàn xì', 'Lắp ráp linh kiện', 'Bảo trì máy móc'],
    'Xây dựng': ['Lắp đặt giàn giáo', 'Hoàn thiện nội thất', 'Lái máy xúc', 'Thợ mộc'],
    'Nông nghiệp': ['Trồng rau nhà kính', 'Chăn nuôi gia cầm', 'Thu hoạch hoa quả', 'Làm nông nghiệp công nghệ cao'],
    'Điện tử': ['Lắp ráp bảng mạch', 'Kiểm tra chất lượng (QC)', 'Vận hành dây chuyền SMT', 'Sửa chữa thiết bị'],
    'Dệt may': ['May công nghiệp', 'Vận hành máy dệt', 'Nhuộm vải', 'Cắt vải tự động'],
    'Điều dưỡng': ['Chăm sóc người cao tuổi', 'Hộ lý tại viện dưỡng lão', 'Hỗ trợ sinh hoạt', 'Nhân viên chăm sóc'],
    'Nhà hàng': ['Phục vụ bàn', 'Phụ bếp', 'Lễ tân nhà hàng', 'Pha chế đồ uống']
};

const generateRandomJob = (index: number): Job => {
    const industry = industries[index % industries.length];
    const visaDetail = visaTypes[index % visaTypes.length];
    const location = locations[index % locations.length];
    const recruiter = recruiters[index % recruiters.length];
    const gender = ['Nam', 'Nữ', 'Cả nam và nữ'][index % 3] as 'Nam' | 'Nữ' | 'Cả nam và nữ';
    const quantity = (index % 10) + 1;
    const title = `${jobTitles[industry as keyof typeof jobTitles][index % 4]}, ${location}, ${quantity} ${gender}`;

    // Deterministic generation of likes to avoid hydration errors
    const deterministicLikesK = (index * 7) % 10;
    const deterministicLikesHundred = (index * 3) % 10;

    return {
        id: `JP-DEMO${1000 + index}`,
        isRecording: index % 5 === 0,
        image: { src: `https://placehold.co/600x400.png?text=Job+${index}`, type: 'minhhoa' },
        likes: `${deterministicLikesK}k${deterministicLikesHundred}`,
        salary: {
            actual: `${(12 + (index % 10)) * 10000} JPY`,
            basic: `${(18 + (index % 12)) * 10000} JPY`,
            annualIncome: 'Khoảng ' + (250 + index % 50) + ' vạn Yên',
            annualBonus: index % 3 === 0 ? 'Có (1-2 lần/năm)' : 'Không có'
        },
        title: title,
        recruiter: recruiter,
        status: index % 10 === 0 ? 'Tạm dừng' : 'Đang tuyển',
        interviewDate: `2024-08-${(index % 28) + 1}`,
        interviewRounds: (index % 3) + 1,
        netFee: visaDetail.includes('Thực tập sinh') ? `${90 + (index % 20)}tr` : 'Không',
        target: `${(index % 5) + 1}tr`,
        tags: [industry, visaDetail.split(' ')[0], gender === 'Cả nam và nữ' ? 'Nam/Nữ' : gender],
        postedTime: `10:00 01/08/2024`,
        visaType: visaDetail,
        visaDetail: visaDetail,
        industry: industry,
        workLocation: location,
        gender: gender,
        quantity: quantity,
        ageRequirement: `${18 + (index % 5)}-${35 + (index % 10)}`,
        languageRequirement: index % 4 === 0 ? 'Không yêu cầu' : 'Tiếng Nhật',
        specialConditions: 'Chăm chỉ, chịu khó.',
        details: {
            description: `<p>Mô tả chi tiết cho công việc <strong>${title}</strong>. Công việc đòi hỏi sự cẩn thận và trách nhiệm cao.</p>`,
            requirements: `<ul><li>Yêu cầu: Tốt nghiệp THPT trở lên.</li><li>Sức khỏe tốt.</li><li>Có khả năng làm việc nhóm.</li></ul>`,
            benefits: `<ul><li>Hưởng đầy đủ chế độ bảo hiểm theo quy định của Nhật Bản.</li><li>Hỗ trợ nhà ở và đi lại.</li><li>Có cơ hội được đào tạo và nâng cao tay nghề.</li></ul>`
        }
    };
};
  
export const jobData: Job[] = Array.from({ length: 100 }, (_, i) => generateRandomJob(i));
