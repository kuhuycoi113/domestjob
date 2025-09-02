
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
      { name: 'Ngư nghiệp', slug: 'ngu-nghiep-tts', keywords: ['ngư nghiệp', 'đánh bắt', 'nuôi trồng thủy sản'] },
      { name: 'Nông nghiệp', slug: 'nong-nghiep-tts', keywords: ['nông nghiệp', 'trồng trọt', 'chăn nuôi'] },
      { name: 'Thực phẩm', slug: 'thuc-pham-tts', keywords: ['thực phẩm', 'chế biến', 'đóng gói', 'cơm hộp'] },
      { name: 'Sản xuất, dịch vụ tổng hợp', slug: 'san-xuat-dich-vu-tong-hop-tts', keywords: ['sản xuất', 'dịch vụ', 'tổng hợp', 'đúc', 'in ấn'] },
      { name: 'Cơ khí, kim loại', slug: 'co-khi-kim-loai-tts', keywords: ['cơ khí', 'kim loại', 'hàn', 'tiện', 'phay', 'dập', 'gia công'] },
      { name: 'Xây dựng', slug: 'xay-dung-tts', keywords: ['xây dựng', 'giàn giáo', 'cốp pha', 'hoàn thiện nội thất'] },
      { name: 'May mặc', slug: 'may-mac-tts', keywords: ['may mặc', 'dệt', 'may công nghiệp'] },
    ],
    'Kỹ năng đặc định': [
      { name: 'Ngư nghiệp', slug: 'ngu-nghiep-tokutei', keywords: ['ngư nghiệp', 'đánh bắt cá', 'nuôi trồng thủy sản', 'chế biến thủy sản', 'Câu cá ngừ cần và dây', 'Câu mực', 'Câu tôm, cua bằng lồng', 'Đánh cá dây câu dài', 'Đánh cá lưới kéo', 'Đánh cá lưới rê', 'Đánh cá lưới sào', 'Đánh cá lưới thả', 'Đặt lưới đánh cá', 'Nuôi sò điệp'] },
      { name: 'Nông nghiệp', slug: 'nong-nghiep-tokutei', keywords: ['nông nghiệp', 'trồng trọt', 'chăn nuôi'] },
      { name: 'Nhà hàng', slug: 'nha-hang-tokutei', keywords: ['nhà hàng', 'dịch vụ ăn uống', 'phục vụ', 'nấu ăn'] },
      { name: 'Thực phẩm', slug: 'thuc-pham-tokutei', keywords: ['Bánh kẹo', 'Bánh ngọt', 'Bánh gạo', 'Bếp viện', 'Chế biến cá', 'Chế biến đồ ăn sẵn', 'Chế biến gia cầm', 'Chế biến sushi', 'Chế biến thịt bò, lợn', 'Chế biến thuỷ sản sống', 'Chiết xuất thuỷ sản', 'Cơm hộp', 'Cơm nắm', 'Cửa hàng siêu thị', 'Đậu hũ', 'Đồ ăn kèm', 'Đồ konbini', 'Đóng gói bánh kẹo', 'Đóng gói cafe', 'Đóng gói gạo', 'Đóng gói rau', 'Đóng gói rau củ', 'Đóng gói rong biển', 'Đóng gói thanh cua', 'Đóng hộp thực phẩm', 'Gia công đồ ăn liền', 'Giăm bông, xúc xích', 'Há cảo', 'Làm bánh kẹo', 'Mỳ tôm', 'Salad', 'Sản xuất bánh mì', 'Sản xuất dưa muối', 'Sản xuất mắm cá', 'Sản xuất mỳ', 'Siêu thị', 'Tẩm ướp thuỷ sản', 'Thái cá sashimi', 'Thịt bò', 'Thịt gà', 'Thịt lợn', 'Thức ăn cơ sở y tế', 'Thực phẩm', 'Thực phẩm sữa', 'Thực phẩm trứng', 'Thuỷ sản gia công chế biến', 'Thuỷ sản khô', 'Thuỷ sản lên men', 'Thuỷ sản sấy khô', 'Thuỷ sản xông khói', 'sản xuất đồ uống', 'chế biến'] },
      { name: 'Sản xuất, dịch vụ tổng hợp', slug: 'san-xuat-dich-vu-tong-hop-tokutei', keywords: ['Bảo trì đường sắt', 'Công việc cưa gỗ', 'Đóng gói', 'Đóng gói công nghiệp', 'Đóng gói mỹ phẩm', 'Đóng sách', 'Đúc gốm bằng áp lực', 'Đúc khuôn cao su', 'Đục lỗ hộp in', 'Đúc nhựa', 'Đúc nhựa cán xếp chồng', 'Đúc nhựa ép phun', 'Đúc nhựa nén', 'Đúc nhựa thổi định hình', 'Đúc nhựa thổi phồng', 'Gia công đồ gia dụng', 'Gia công ép đùn cao su', 'Gia công sản phẩm gỗ', 'Gỗ ép', 'In gốm', 'In offset', 'In ống đồng', 'In vỏ bánh kẹo', 'Kiểm tra sản phẩm nhựa', 'Nặn gốm bằng bánh xoay', 'Nhiên liệu rắn từ rác', 'Sản xuất hộp bìa cứng', 'Sản xuất hộp in', 'Sản xuất hộp nhãn dán', 'Sản xuất linh kiện', 'Sản xuất pin năng lượng', 'Sản xuất vải lanh', 'Thiết bị khí nén đường sắt', 'Trộn và cán cao su', 'Vật liệu composite nhiều lớp', 'sản xuất', 'dịch vụ', 'giấy', 'in ấn', 'nhựa'] },
      { name: 'Điện, điện tử', slug: 'dien-dien-tu-tokutei', keywords: ['Bản mạch in', 'Cuộn dây máy điện quay', 'Lắp ráp điện', 'Lắp ráp điện tử', 'Lắp ráp linh kiện bán dẫn', 'Lắp ráp máy biến áp', 'Lắp ráp thiết bị điện khí', 'Lắp ráp thiết bị điện quay', 'Lắp ráp thiết bị điện tử', 'Lắp thiết bị đóng, mở', 'Lắp tủ điện, tủ điều khiển', 'Sản xuất bảng mạch in', 'Sửa chữa dụng cụ', 'Sửa chữa tủ điện', 'Thi công điện', 'Thiết kế bảng mạch in', 'điện', 'điện tử', 'lắp ráp', 'gia công'] },
      { name: 'Chế tạo Vật liệu', slug: 'che-tao-vat-lieu-tokutei', keywords: ['Xử lý nhiệt bề mặt', 'Xử lý nhiệt một phần', 'Xử lý nhiệt tổng thể', 'chế tạo', 'vật liệu', 'đúc', 'rèn', 'sơn'] },
      { name: 'Cơ khí, chế tạo máy', slug: 'co-khi-che-tao-may-tokutei', keywords: ['Bảo trì máy móc', 'Chế tạo kim loại tấm', 'Chế tạo máy', 'Cơ khí', 'Dập khuôn kim loại', 'Đóng tàu', 'Đúc', 'Đúc gang', 'Đúc khuôn', 'Đúc khuôn buồng lạnh', 'Đúc khuôn buồng nóng', 'Đúc kim loại màu', 'Ép dập kim loại', 'Gia công cơ khí', 'Gia công ép đùn', 'Gia công kim loại - Tekko', 'Gia công tinh', 'Hàn', 'Hàn bán tự động', 'Hàn kết cấu', 'Hàn khí', 'Hàn khung thép', 'Hàn tàu', 'Hàn thủ công', 'Hàn tủ điện', 'Hàn xì', 'Hoàn thiện dụng cụ nung chảy', 'Hoàn thiện khuôn', 'Hoàn thiện sản phẩm ép đùn', 'Kiểm tra máy móc', 'Lắp đặt điều hoà', 'Lắp đặt máy móc', 'Lắp đặt tủ lạnh', 'Lắp ráp máy móc', 'Mạ điện', 'Mạ kẽm nhúng nóng', 'Máy sản xuất tấm kim loại', 'Rèn', 'Rèn bằng búa', 'Sơn', 'Sơn cầu thép', 'Sơn công trình xây dựng', 'Sơn kim loại', 'Sơn phun', 'Sử dụng máy phay', 'Sử dụng máy tiện số', 'Sử dụng máy tiện thường', 'Thi công kết cấu thép', 'Vận hành máy', 'Vận hành máy CNC', 'Vận hành máy ép', 'Vận hành máy ép nhựa', 'Xử lý điện hóa nhôm', 'cơ khí', 'chế tạo máy', 'hoàn thiện', 'kiểm tra máy móc'] },
      { name: 'Ô tô', slug: 'o-to-tokutei', keywords: ['Bảo dưỡng ô tô', 'Kiểm tra linh kiện ô tô', 'Lắp ráp linh kiện ô tô', 'Linh kiện ô tô', 'Sửa chữa ô tô', 'ô tô', 'bảo dưỡng', 'sửa chữa'] },
      { name: 'Hàng không', slug: 'hang-khong-tokutei', keywords: ['Dọn dẹp khoang hành khách', 'Hàng hóa hàng không', 'Hỗ trợ mặt đất máy bay', 'hàng không', 'sân bay', 'dịch vụ mặt đất'] },
      { name: 'Vận tải', slug: 'van-tai-tokutei', keywords: ['Hậu cần vận tải', 'Lái xe buýt cỡ lớn', 'Lái xe buýt cỡ trung', 'Lái xe tải cỡ lớn', 'Lái xe tải cỡ nhỏ', 'Lái xe tải cỡ trung', 'Lái xe taxi', 'Phụ xe', 'Quản lý kho vận tải', 'Thực tập lái xe', 'vận tải', 'logistics', 'bốc dỡ', 'lái xe'] },
      { name: 'Xây dựng', slug: 'xay-dung-tokutei', keywords: ['bê tông', 'buộc thép', 'chống thấm', 'chống thấm trần nhà', 'công trình chống nóng, lạnh', 'cốp pha công trình', 'dán tường', 'đổ bê tông áp lực', 'đổ nhựa đường', 'dựng giàn giáo', 'đường ống', 'đường ống điều hoà', 'đường ống nhà máy', 'đường ống nước', 'đường ống xây dựng', 'gia công đường ống', 'gia công khung thép', 'gia công khung thép trong xưởng', 'gia công sắt trong xưởng', 'gia công vật liệu đá', 'hàn khung thép trên cao', 'hoàn thiện nội thất', 'hoàn thiện sàn nhựa', 'hoàn thiện sàn thảm', 'hoàn thiện ván', 'hút nước ngầm công trình', 'khoan giếng máy dập', 'khoan giếng máy khoan', 'khung chắn toà nhà', 'lái máy ủi', 'lái máy xúc', 'lái máy xúc lật', 'lái xe lu', 'làm nền, móng', 'lắp bồn tắm', 'lắp đặt đường ống', 'lắp đặt lò nung-xây dựng', 'lắp đặt pin năng lượng', 'lắp điện lạnh, điều hòa', 'lắp ghép cốt thép', 'lát đá', 'lợp mái nhà', 'lợp ngói', 'mộc cốp pha', 'nội thất gỗ-xây dựng', 'ốp lát gạch', 'phá dỡ', 'san lấp mặt bằng', 'sản xuất bê tông', 'sơn xây dựng', 'tấm kim loại kiến trúc', 'tấm kim loại ống gió', 'thi công dán tường', 'thi công lắp rèm', 'thi công móng thép', 'thợ mộc xây dựng', 'trát vữa', 'xây dựng', 'giàn giáo', 'cốp pha', 'mộc'] },
      { name: 'Vệ sinh toà nhà', slug: 've-sinh-toa-nha-tokutei', keywords: ['Buồng phòng khách sạn', 'Vệ sinh toà nhà', 'vệ sinh', 'tòa nhà', 'làm sạch'] },
      { name: 'Lưu trú, khách sạn', slug: 'luu-tru-khach-san-tokutei', keywords: ['hành lý khách sạn', 'lễ tân', 'phục vụ', 'quản lý vệ sinh', 'tiếp khách', 'lưu trú', 'khách sạn'] },
      { name: 'Điều dưỡng', slug: 'dieu-duong-tokutei', keywords: ['điều dưỡng', 'chăm sóc người già', 'hộ lý'] },
    ],
    'Kỹ sư, tri thức': [
      { name: 'Nông lâm ngư nghiệp', slug: 'nong-lam-ngu-nghiep-ks', keywords: ['Nông nghiệp', 'Lâm nghiệp', 'Ngư nghiệp', 'Chăn nuôi', 'Công nghệ nông, lâm, ngư nghiệp', 'Công nhân chăn nuôi đặc khu', 'Công nhân Nông, Lâm, Ngư nghiệp', 'Công nhân trồng trọt đặc khu'] },
      { name: 'Thực phẩm', slug: 'thuc-pham-ks', keywords: ['Công nghệ sinh học', 'Công nghệ thực phẩm', 'Đóng gói rau', 'Quản lý sản xuất thực phẩm', 'thực phẩm', 'đồ uống'] },
      { name: 'Sản xuất, chế tạo, công nghệ', slug: 'san-xuat-cong-nghe-ks', keywords: ['Công nghệ môi trường', 'Công nghệ sản xuất', 'Công nhân sản xuất, gia công sản phẩm (trừ kim loại)', 'Gia công đồ xa xỉ', 'Hoá học làm xưởng', 'In ấn', 'IT làm xưởng', 'Khoan khảo sát dầu mỏ, năng lượng', 'Kinh tế làm xưởng', 'Lao động nước ngoài lĩnh vực sản xuất', 'May mặc', 'Môi trường làm xưởng', 'Nhân viên sân bay', 'Quản lý sản xuất tổng hợp', 'Rác thải, phế liệu, tái chế', 'Sản xuất sản phẩm', 'Sản xuất sản phẩm cho nước ngoài', 'Thiết kế thời trang', 'sản xuất', 'chế tạo', 'công nghệ'] },
      { name: 'Cơ khí, máy móc', slug: 'co-khi-may-moc-ks', keywords: ['cơ khí', 'máy móc', 'Bảo trì hệ thống điện', 'Bảo trì máy móc', 'Chế tạo máy', 'Công nghệ cơ khí', 'Công nhân đóng tàu nước ngoài', 'Công nhân sản xuất, gia công kim loại', 'Điện cơ khí hỗ trợ chuyển nhà', 'Điện nội thất', 'Điện, kỹ thuật điện', 'Gia công cơ khí', 'Kiểm tra máy móc', 'Lắp đặt điều hoà', 'Lắp đặt máy móc', 'Lắp đặt tủ lạnh', 'Lắp ráp máy móc', 'Phân tích CAE', 'Quản lý sản xuất máy', 'Thiết kế Auto CAD', 'Thiết kế cơ khí', 'Thiết kế điện', 'Tự động hoá', 'Vận hành máy', 'Vận hành máy CNC', 'Vận hành máy ép', 'Vận hành máy ép nhựa', 'Vận hành robot', 'Viễn thông'] },
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
      { name: 'Giáo dục, đào tạo', slug: 'giao-duc-dao-tao-ks', keywords: ['giáo dục', 'đào tạo'] },
      { name: 'Hành chính, văn phòng', slug: 'hanh-chinh-van-phong-ks', keywords: ['hành chính', 'văn phòng'] },
      { name: 'Pháp lý', slug: 'phap-ly-ks', keywords: ['pháp lý', 'luật sư'] },
      { name: 'Nghệ thuật, nghệ sĩ', slug: 'nghe-thuat-ks', keywords: ['nghệ thuật', 'nghệ sĩ'] },
      { name: 'Thể dục thể thao', slug: 'the-thao-ks', keywords: ['thể dục', 'thể thao'] },
      { name: 'Nghề có kỹ năng chuyên nghiệp', slug: 'nghe-chuyen-nghiep-ks', keywords: ['chuyên nghiệp', 'kỹ năng'] },
      { name: 'Việc làm bán chuyên nghiệp', slug: 'viec-lam-ban-chuyen-nghiep-ks', keywords: ['bán chuyên nghiệp'] }
    ],
    'Default': defaultIndustries,
};
