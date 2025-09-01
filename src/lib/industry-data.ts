
export type Industry = {
    name: string;
    slug: string;
    keywords: string[];
};

const defaultIndustries: Industry[] = [
    { name: 'Công nghệ thông tin', slug: 'it', keywords: ['it', 'công nghệ thông tin', 'software', 'phần mềm', 'developer', 'lập trình'] },
    { name: 'Cơ khí', slug: 'co-khi', keywords: ['cơ khí', 'chế tạo máy', 'tiện', 'phay', 'bào', 'hàn', 'hàn xì', 'CNC', 'vận hành máy', 'bảo trì', 'sửa chữa', 'đứng máy', 'luyện kim'] },
    { name: 'Dệt may', slug: 'det-may', keywords: ['dệt may', 'may mặc', 'thời trang', 'sợi', 'nhuộm', 'hoàn tất vải'] },
    { name: 'Điện tử', slug: 'dien-tu', keywords: ['điện tử', 'lắp ráp', 'linh kiện', 'kiểm tra', 'QC', 'QA', 'sản xuất'] },
    { name: 'Logistics', slug: 'logistics', keywords: ['logistics', 'vận tải', 'kho bãi', 'xuất nhập khẩu', 'supply chain', 'chuỗi cung ứng'] }
];

export const industriesByJobType: { [key: string]: Industry[] } = {
    'Thực tập sinh': [
        { name: 'Ngư nghiệp', slug: 'ngu-nghiep-tts', keywords: ['ngư nghiệp', 'đánh bắt cá', 'nuôi trồng thủy sản'] },
        { name: 'Xây dựng', slug: 'xay-dung-tts', keywords: ['xây dựng', 'giàn giáo', 'cốp pha', 'hoàn thiện nội thất', 'xây trát', 'sơn'] },
        { name: 'Cơ khí', slug: 'co-khi-tts', keywords: ['cơ khí', 'kim loại', 'hàn', 'tiện', 'phay', 'dập', 'gia công', 'đúc', 'rèn'] },
        { name: 'Nông nghiệp', slug: 'nong-nghiep-tts', keywords: ['nông nghiệp', 'trồng trọt', 'chăn nuôi'] },
        { name: 'Thực phẩm', slug: 'thuc-pham-tts', keywords: ['thực phẩm', 'chế biến', 'đóng gói', 'cơm hộp', 'làm bánh'] },
        { name: 'May mặc', slug: 'may-mac-tts', keywords: ['may mặc', 'dệt', 'may công nghiệp', 'thời trang'] },
        { name: 'Lắp ráp điện tử', slug: 'lap-rap-dien-tu-tts', keywords: ['lắp ráp', 'điện tử', 'linh kiện', 'kiểm tra'] },
        { name: 'In ấn', slug: 'in-an-tts', keywords: ['in ấn', 'đóng sách'] },
        { name: 'Vệ sinh tòa nhà', slug: 've-sinh-toa-nha-tts', keywords: ['vệ sinh', 'tòa nhà', 'làm sạch', 'building cleaning'] },
        { name: 'Điều dưỡng', slug: 'dieu-duong-tts', keywords: ['điều dưỡng', 'chăm sóc người già', 'hộ lý'] },
    ],
    'Kỹ năng đặc định': [
      { name: 'Ngư nghiệp', slug: 'ngu-nghiep-tokutei', keywords: ['ngư nghiệp', 'nuôi trồng', 'chế biến thủy sản'] },
      { name: 'Nông nghiệp', slug: 'nong-nghiep-tokutei', keywords: ['nông nghiệp', 'trồng trọt', 'chăn nuôi'] },
      { name: 'Nhà hàng', slug: 'nha-hang-tokutei', keywords: ['nhà hàng', 'dịch vụ ăn uống', 'phục vụ', 'nấu ăn'] },
      { name: 'Thực phẩm', slug: 'thuc-pham-tokutei', keywords: ['thực phẩm', 'sản xuất đồ uống', 'chế biến'] },
      { name: 'Sản xuất, dịch vụ tổng hợp', slug: 'san-xuat-dich-vu-tong-hop-tokutei', keywords: ['sản xuất', 'dịch vụ', 'giấy', 'in ấn', 'nhựa'] },
      { name: 'Điện, điện tử', slug: 'dien-dien-tu-tokutei', keywords: ['điện', 'điện tử', 'lắp ráp', 'gia công'] },
      { name: 'Chế tạo Vật liệu', slug: 'che-tao-vat-lieu-tokutei', keywords: ['chế tạo', 'vật liệu', 'đúc', 'rèn', 'sơn'] },
      { name: 'Cơ khí, chế tạo máy', slug: 'co-khi-che-tao-may-tokutei', keywords: ['cơ khí', 'chế tạo máy', 'hoàn thiện', 'kiểm tra máy móc'] },
      { name: 'Ô tô', slug: 'o-to-tokutei', keywords: ['ô tô', 'bảo dưỡng', 'sửa chữa'] },
      { name: 'Hàng không Vận tải Xây dựng', slug: 'hang-khong-van-tai-xay-dung-tokutei', keywords: ['hàng không', 'vận tải', 'xây dựng', 'sân bay', 'bốc dỡ'] },
      { name: 'Vệ sinh toà nhà', slug: 've-sinh-toa-nha-tokutei', keywords: ['vệ sinh', 'tòa nhà', 'làm sạch'] },
      { name: 'Lưu trú, khách sạn', slug: 'luu-tru-khach-san-tokutei', keywords: ['lưu trú', 'khách sạn', 'lễ tân', 'phục vụ'] },
      { name: 'Điều dưỡng', slug: 'dieu-duong-tokutei', keywords: ['điều dưỡng', 'chăm sóc người già', 'hộ lý'] },
    ],
    'Kỹ sư, tri thức': [
      { name: 'Nông lâm ngư nghiệp', slug: 'nong-lam-ngu-nghiep-ks', keywords: ['nông nghiệp', 'lâm nghiệp', 'ngư nghiệp'] },
      { name: 'Thực phẩm', slug: 'thuc-pham-ks', keywords: ['thực phẩm', 'đồ uống'] },
      { name: 'Sản xuất, chế tạo, công nghệ', slug: 'san-xuat-cong-nghe-ks', keywords: ['sản xuất', 'chế tạo', 'công nghệ'] },
      { name: 'Cơ khí, máy móc', slug: 'co-khi-may-moc-ks', keywords: ['cơ khí', 'máy móc'] },
      { name: 'Công nghệ ô tô', slug: 'cong-nghe-o-to-ks', keywords: ['ô tô', 'công nghệ'] },
      { name: 'Vận chuyển hàng hóa', slug: 'van-chuyen-hang-hoa-ks', keywords: ['vận chuyển', 'hàng hóa'] },
      { name: 'Xây dựng', slug: 'xay-dung-ks', keywords: ['xây dựng', 'kỹ sư xây dựng', 'giám sát'] },
      { name: 'Khách sạn, lưu trú', slug: 'khach-san-luu-tru-ks', keywords: ['khách sạn', 'lưu trú'] },
      { name: 'Y tế, điều dưỡng', slug: 'y-te-dieu-duong-ks', keywords: ['y tế', 'điều dưỡng'] },
      { name: 'Kinh doanh, kinh tế', slug: 'kinh-doanh-kinh-te-ks', keywords: ['kinh doanh', 'kinh tế'] },
      { name: 'Tài chính, kế toán, bảo hiểm', slug: 'tai-chinh-ke-toan-ks', keywords: ['tài chính', 'kế toán', 'bảo hiểm'] },
      { name: 'Báo chí, truyền thông, marketing', slug: 'bao-chi-marketing-ks', keywords: ['báo chí', 'truyền thông', 'marketing'] },
      { name: 'Công nghệ thông tin', slug: 'it-ks', keywords: ['công nghệ thông tin', 'IT', 'lập trình', 'phần mềm'] },
      { name: 'Nghiên cứu, phân tích', slug: 'nghien-cuu-phan-tich-ks', keywords: ['nghiên cứu', 'phân tích'] },
      { name: 'Giáo dục, đào tạo Hành chính, văn phòng', slug: 'giao-duc-van-phong-ks', keywords: ['giáo dục', 'đào tạo', 'hành chính', 'văn phòng'] },
      { name: 'Pháp lý', slug: 'phap-ly-ks', keywords: ['pháp lý', 'luật sư'] },
      { name: 'Nghệ thuật, nghệ sĩ', slug: 'nghe-thuat-ks', keywords: ['nghệ thuật', 'nghệ sĩ'] },
      { name: 'Thể dục thể thao', slug: 'the-thao-ks', keywords: ['thể dục', 'thể thao'] },
      { name: 'Nghề có kỹ năng chuyên nghiệp', slug: 'nghe-chuyen-nghiep-ks', keywords: ['chuyên nghiệp', 'kỹ năng'] },
      { name: 'Việc làm bán chuyên nghiệp', slug: 'viec-lam-ban-chuyen-nghiep-ks', keywords: ['bán chuyên nghiệp'] }
    ],
    'Default': defaultIndustries,
};
