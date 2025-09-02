
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
      { name: 'Ngư nghiệp', slug: 'ngu-nghiep-tts', keywords: ['ngư nghiệp', 'đánh bắt', 'nuôi trồng thủy sản', 'đánh bắt cá', 'câu cá ngừ', 'câu mực', 'câu tôm', 'câu cua', 'đánh cá dây câu dài', 'đánh cá lưới kéo', 'đánh cá lưới rê', 'đánh cá lưới sào', 'đánh cá lưới thả', 'đặt lưới đánh cá', 'nuôi sò điệp'] },
      { name: 'Nông nghiệp', slug: 'nong-nghiep-tts', keywords: ['nông nghiệp', 'trồng trọt', 'chăn nuôi', 'chăn nuôi bò', 'chăn nuôi bò sữa', 'chăn nuôi gà', 'chăn nuôi lợn', 'nhặt trứng gà', 'nông nghiệp chăn nuôi', 'nông nghiệp trồng trọt', 'thu hoạch bắp cải', 'thu hoạch cà chua', 'thu hoạch dâu tây', 'thu hoạch hoa', 'thu hoạch hoa quả', 'thu hoạch rau củ', 'trồng cây ăn quả', 'trồng nấm', 'trồng nấm công nghệ cao', 'trồng rau củ', 'trồng trọt nhà kính'] },
      { name: 'Thực phẩm', slug: 'thuc-pham-tts', keywords: ['thực phẩm', 'chế biến', 'đóng gói', 'cơm hộp', 'làm bánh', 'bánh gạo', 'bánh kẹo', 'bánh ngọt', 'bếp viện', 'chế biến cá', 'chế biến đồ ăn sẵn', 'chế biến gia cầm', 'chế biến sushi', 'chế biến thịt bò, lợn', 'chế biến thuỷ sản sống', 'chiết xuất thuỷ sản', 'cơm nắm', 'cửa hàng siêu thị', 'đậu hũ', 'đồ ăn kèm', 'đồ konbini', 'đóng gói bánh kẹo', 'đóng gói cafe', 'đóng gói gạo', 'đóng gói rau', 'đóng gói rau củ', 'đóng gói rong biển', 'đóng gói thanh cua', 'đóng hộp thực phẩm', 'gia công đồ ăn liền', 'giăm bông, xúc xích', 'há cảo', 'làm bánh kẹo', 'mỳ tôm', 'salad', 'sản xuất bánh mì', 'sản xuất dưa muối', 'sản xuất mắm cá', 'sản xuất mỳ', 'siêu thị', 'tẩm ướp thuỷ sản', 'thái cá sashimi', 'thịt bò', 'thịt gà', 'thịt lợn', 'thức ăn cơ sở y tế', 'thực phẩm sữa', 'thực phẩm trứng', 'thuỷ sản gia công chế biến', 'thuỷ sản khô', 'thuỷ sản lên men', 'thuỷ sản sấy khô', 'thuỷ sản ủ muối', 'thuỷ sản xông khói'] },
      { name: 'Sản xuất, dịch vụ tổng hợp', slug: 'san-xuat-dich-vu-tong-hop-tts', keywords: ['sản xuất', 'dịch vụ', 'tổng hợp', 'đúc', 'in ấn', 'bảo dưỡng ô tô', 'bảo trì đường sắt', 'buồng phòng khách sạn', 'công việc cưa gỗ', 'điều dưỡng, hộ lý', 'dọn dẹp khoang hành khách', 'đóng gói', 'đóng gói công nghiệp', 'đóng gói mỹ phẩm', 'đóng sách', 'đúc gốm bằng áp lực', 'đúc khuôn cao su', 'đục lỗ hộp in', 'đúc nhựa', 'đúc nhựa cán xếp chồng', 'đục nhựa ép phun', 'đúc nhựa nén', 'đúc nhựa thổi định hình', 'đúc nhựa thổi phồng', 'gia công đồ gia dụng', 'gia công ép đùn cao su', 'gia công sản phẩm gỗ', 'gỗ ép', 'hàng hóa hàng không', 'hỗ trợ mặt đất máy bay', 'in gốm', 'in offset', 'in ống đồng', 'in vỏ bánh kẹo', 'kiểm tra linh kiện ô tô', 'kiểm tra sản phẩm nhựa', 'lắp ráp linh kiện ô tô', 'linh kiện ô tô', 'nặn gốm bằng bánh xoay', 'nhiên liệu rắn từ rác', 'sản xuất hộp bìa cứng', 'sản xuất hộp in', 'sản xuất hộp nhãn dán', 'sản xuất linh kiện', 'sản xuất pin năng lượng', 'sản xuất vải lanh', 'sửa chữa ô tô', 'thiết bị khí nén đường sắt', 'trộn và cán cao su', 'vật liệu composite nhiều lớp', 'vệ sinh phòng học', 'vệ sinh toà nhà', 'vệ sinh văn phòng', '(khách sạn) tiếp khách, quản lý vệ sinh'] },
      { name: 'Cơ khí, kim loại', slug: 'co-khi-kim-loai-tts', keywords: ['cơ khí', 'kim loại', 'hàn', 'tiện', 'phay', 'dập', 'gia công'] },
      { name: 'Xây dựng', slug: 'xay-dung-tts', keywords: ['xây dựng', 'giàn giáo', 'cốp pha', 'hoàn thiện nội thất'] },
      { name: 'May mặc', slug: 'may-mac-tts', keywords: ['may mặc', 'dệt', 'may công nghiệp'] },
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
