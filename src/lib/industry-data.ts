
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
      { name: 'Xây dựng', slug: 'xay-dung-tts', keywords: ['xây dựng', 'giàn giáo', 'cốp pha', 'hoàn thiện nội thất', 'bê tông', 'buộc thép', 'chống thấm', 'chống thấm trần nhà', 'công trình chống nóng, lạnh', 'cốp pha công trình', 'dán tường', 'đổ bê tông áp lực', 'đổ nhựa đường', 'dựng giàn giáo', 'đường ống', 'đường ống điều hoà', 'đường ống nhà máy', 'đường ống nước', 'đường ống xây dựng', 'gia công đường ống', 'gia công khung thép', 'gia công khung thép trong xưởng', 'gia công sắt trong xưởng', 'gia công vật liệu đá', 'hàn khung thép trên cao', 'hoàn thiện nội thất', 'hoàn thiện sàn nhựa', 'hoàn thiện sàn thảm', 'hoàn thiện ván', 'hút nước ngầm công trình', 'khoan giếng máy dập', 'khoan giếng máy khoan', 'khung chắn toà nhà', 'lái máy ủi', 'lái máy xây dựng', 'lái máy xúc', 'lái máy xúc lật', 'lái xe lu', 'làm nền, móng', 'lắp bồn tắm', 'lắp đặt đường ống', 'lắp đặt lò nung-xây dựng', 'lắp đặt pin năng lượng', 'lắp điện lạnh, điều hòa', 'lắp ghép cốt thép', 'lát đá', 'lợp mái nhà', 'lợp ngói', 'mộc cốp pha', 'nội thất gỗ-xây dựng', 'ốp lát gạch', 'phá dỡ', 'san lấp mặt bằng', 'sản xuất bê tông', 'sơn xây dựng', 'tấm kim loại kiến trúc', 'tấm kim loại ống gió', 'thi công dán tường', 'thi công lắp rèm', 'thi công móng thép', 'thợ mộc xây dựng', 'trát vữa', 'xây dựng tổng hợp'] },
      { name: 'May mặc', slug: 'may-mac-tts', keywords: ['may mặc', 'dệt', 'may công nghiệp', 'Chăn ga gối đệm', 'Công việc trước kéo sợi', 'Công việc trước khi dệt', 'Dệt hoàn thiện', 'Dệt kim máy sợi dọc', 'Dệt may', 'Gia công dệt', 'Gia công sợi hỗn hợp', 'Kéo sợi tinh', 'May khăn mặt', 'May mặc', 'May quần áo', 'May quần áo nam', 'Nhuộm chỉ', 'Nhuộm vải, đan len', 'Quần áo phụ nữ, trẻ em', 'Quấn sợi', 'Sản xuất áo sơ mi', 'Sản xuất đồ lót', 'Sản xuất ghế ngồi ô tô', 'Sản xuất máy dệt kim tròn', 'Sản xuất tất', 'Sản xuất thảm dệt', 'Sản xuất thảm đục lỗ', 'Sản xuất thảm nhung nổi', 'Sản xuất vải bạt'] },
    ],
    'Kỹ năng đặc định': [
      { name: 'Ngư nghiệp', slug: 'ngu-nghiep-tokutei', keywords: ['ngư nghiệp', 'nuôi trồng', 'chế biến thủy sản', 'Câu cá ngừ cần và dây', 'Câu mực', 'Câu tôm, cua bằng lồng', 'Đánh cá dây câu dài', 'Đánh cá lưới kéo', 'Đánh cá lưới rê', 'Đánh cá lưới sào', 'Đánh cá lưới thả', 'Đặt lưới đánh cá', 'Nuôi sò điệp'] },
      { name: 'Nông nghiệp', slug: 'nong-nghiep-tokutei', keywords: ['nông nghiệp', 'trồng trọt', 'chăn nuôi', 'Chăn nuôi bò', 'Chăn nuôi bò sữa', 'Chăn nuôi gà', 'Chăn nuôi lợn', 'Nhặt trứng gà', 'Nông nghiệp chăn nuôi', 'Nông nghiệp trồng trọt', 'Thu hoạch bắp cải', 'Thu hoạch cà chua', 'Thu hoạch dâu tây', 'Thu hoạch hoa', 'Thu hoạch hoa quả', 'Thu hoạch rau củ', 'Trồng cây ăn quả', 'Trồng nấm', 'Trồng nấm công nghệ cao', 'Trồng rau củ', 'Trồng trọt nhà kính'] },
      { name: 'Nhà hàng', slug: 'nha-hang-tokutei', keywords: ['nhà hàng', 'dịch vụ ăn uống', 'phục vụ', 'nấu ăn', 'chạy bàn', 'mua hàng', 'nấu bếp', 'phụ bếp', 'quản lý', 'rửa bát', 'thu ngân'] },
      { name: 'Thực phẩm', slug: 'thuc-pham-tokutei', keywords: ['thực phẩm', 'sản xuất đồ uống', 'chế biến', 'Bánh gạo', 'Bánh kẹo', 'Bánh ngọt', 'Bếp viện', 'Chế biến cá', 'Chế biến đồ ăn sẵn', 'Chế biến gia cầm', 'Chế biến sushi', 'Chế biến thịt bò, lợn', 'Chế biến thuỷ sản sống', 'Chiết xuất thuỷ sản', 'Cơm hộp', 'Cơm nắm', 'Cửa hàng siêu thị', 'Đậu hũ', 'Đồ ăn kèm', 'Đồ konbini', 'Đóng gói bánh kẹo', 'Đóng gói cafe', 'Đóng gói gạo', 'Đóng gói rau', 'Đóng gói rau củ', 'Đóng gói rong biển', 'Đóng gói thanh cua', 'Đóng hộp thực phẩm', 'Gia công đồ ăn liền', 'Giăm bông, xúc xích', 'Há cảo', 'Làm bánh kẹo', 'Mỳ tôm', 'Salad', 'Sản xuất bánh mì', 'Sản xuất dưa muối', 'Sản xuất mắm cá', 'Sản xuất mỳ', 'Siêu thị', 'Tẩm ướp thuỷ sản', 'Thái cá sashimi', 'Thịt bò', 'Thịt gà', 'Thịt lợn', 'Thức ăn cơ sở y tế', 'Thực phẩm', 'Thực phẩm sữa', 'Thực phẩm trứng', 'Thuỷ sản gia công chế biến', 'Thuỷ sản khô', 'Thuỷ sản lên men', 'Thuỷ sản sấy khô', 'Thuỷ sản ủ muối', 'Thuỷ sản xông khói'] },
      { name: 'Sản xuất, dịch vụ tổng hợp', slug: 'san-xuat-dich-vu-tong-hop-tokutei', keywords: ['sản xuất', 'dịch vụ', 'giấy', 'in ấn', 'nhựa', 'Bảo trì đường sắt', 'Công việc cưa gỗ', 'Đóng gói', 'Đóng gói công nghiệp', 'Đóng gói mỹ phẩm', 'Đóng sách', 'Đúc gốm bằng áp lực', 'Đúc khuôn cao su', 'Đục lỗ hộp in', 'Đúc nhựa', 'Đúc nhựa cán xếp chồng', 'Đúc nhựa ép phun', 'Đúc nhựa nén', 'Đúc nhựa thổi định hình', 'Đúc nhựa thổi phồng', 'Gia công đồ gia dụng', 'Gia công ép đùn cao su', 'Gia công sản phẩm gỗ', 'Gỗ ép', 'In gốm', 'In offset', 'In ống đồng', 'In vỏ bánh kẹo', 'Kiểm tra sản phẩm nhựa', 'Nặn gốm bằng bánh xoay', 'Nhiên liệu rắn từ rác', 'Sản xuất hộp bìa cứng', 'Sản xuất hộp in', 'Sản xuất hộp nhãn dán', 'Sản xuất linh kiện', 'Sản xuất pin năng lượng', 'Sản xuất vải lanh', 'Thiết bị khí nén đường sắt', 'Trộn và cán cao su', 'Vật liệu composite nhiều lớp'] },
      { name: 'Điện, điện tử', slug: 'dien-dien-tu-tokutei', keywords: ['điện', 'điện tử', 'lắp ráp', 'gia công', 'Bản mạch in', 'Cuộn dây máy điện quay', 'Lắp ráp điện', 'Lắp ráp điện tử', 'Lắp ráp linh kiện bán dẫn', 'Lắp ráp máy biến áp', 'Lắp ráp thiết bị điện khí', 'Lắp ráp thiết bị điện quay', 'Lắp ráp thiết bị điện tử', 'Lắp thiết bị đóng, mở', 'Lắp tủ điện, tủ điều khiển', 'Sản xuất bảng mạch in', 'Sửa chữa dụng cụ', 'Sửa chữa tủ điện', 'Thi công điện', 'Thiết kế bảng mạch in'] },
      { name: 'Chế tạo Vật liệu', slug: 'che-tao-vat-lieu-tokutei', keywords: ['chế tạo', 'vật liệu', 'đúc', 'rèn', 'sơn', 'Xử lý nhiệt bề mặt', 'Xử lý nhiệt một phần', 'Xử lý nhiệt tổng thể'] },
      { name: 'Cơ khí, chế tạo máy', slug: 'co-khi-che-tao-may-tokutei', keywords: ['cơ khí', 'chế tạo máy', 'hoàn thiện', 'kiểm tra máy móc', 'Bảo trì máy móc', 'Chế tạo kim loại tấm', 'Chế tạo máy', 'Cơ khí', 'Dập khuôn kim loại', 'Đóng tàu', 'Đúc', 'Đúc gang', 'Đúc khuôn', 'Đúc khuôn buồng lạnh', 'Đúc khuôn buồng nóng', 'Đúc kim loại màu', 'Ép dập kim loại', 'Gia công cơ khí', 'Gia công ép đùn', 'Gia công kim loại - Tekko', 'Gia công tinh', 'Hàn', 'Hàn bán tự động', 'Hàn kết cấu', 'Hàn khí', 'Hàn khung thép', 'Hàn tàu', 'Hàn thủ công', 'Hàn tủ điện', 'Hàn xì', 'Hoàn thiện dụng cụ nung chảy', 'Hoàn thiện khuôn', 'Hoàn thiện sản phẩm ép đùn', 'Kiểm tra máy móc', 'Lắp đặt điều hoà', 'Lắp đặt máy móc', 'Lắp đặt tủ lạnh', 'Lắp ráp máy móc', 'Mạ điện', 'Mạ kẽm nhúng nóng', 'Máy sản xuất tấm kim loại', 'Rèn', 'Rèn bằng búa', 'Sơn', 'Sơn cầu thép', 'Sơn công trình xây dựng', 'Sơn kim loại', 'Sơn phun', 'Sử dụng máy phay', 'Sử dụng máy tiện số', 'Sử dụng máy tiện thường', 'Thi công kết cấu thép', 'Vận hành máy', 'Vận hành máy CNC', 'Vận hành máy ép', 'Vận hành máy ép nhựa', 'Vận hành máy gia công', 'Xử lý điện hóa nhôm'] },
      { name: 'Ô tô', slug: 'o-to-tokutei', keywords: ['ô tô', 'bảo dưỡng', 'sửa chữa', 'Bảo dưỡng ô tô', 'Kiểm tra linh kiện ô tô', 'Lắp ráp linh kiện ô tô', 'Linh kiện ô tô', 'Sửa chữa ô tô'] },
      { name: 'Hàng không', slug: 'hang-khong-tokutei', keywords: ['hàng không', 'sân bay', 'dịch vụ mặt đất', 'Dọn dẹp khoang hành khách', 'Hàng hóa hàng không', 'Hỗ trợ mặt đất máy bay'] },
      { name: 'Vận tải', slug: 'van-tai-tokutei', keywords: ['vận tải', 'logistics', 'bốc dỡ', 'lái xe', 'Hậu cần vận tải', 'Lái xe buýt cỡ lớn', 'Lái xe buýt cỡ trung', 'Lái xe nâng', 'Lái xe tải cỡ lớn', 'Lái xe tải cỡ nhỏ', 'Lái xe tải cỡ trung', 'Lái xe taxi', 'Phụ xe', 'Quản lý kho vận tải', 'Thực tập lái xe'] },
      { name: 'Xây dựng', slug: 'xay-dung-tokutei', keywords: ['xây dựng', 'giàn giáo', 'cốp pha', 'mộc', 'bê tông', 'buộc thép', 'chống thấm', 'chống thấm trần nhà', 'công trình chống nóng, lạnh', 'cốp pha công trình', 'dán tường', 'đổ bê tông áp lực', 'đổ nhựa đường', 'dựng giàn giáo', 'đường ống', 'đường ống điều hoà', 'đường ống nhà máy', 'đường ống nước', 'đường ống xây dựng', 'gia công đường ống', 'gia công khung thép', 'gia công khung thép trong xưởng', 'gia công sắt trong xưởng', 'gia công vật liệu đá', 'hàn khung thép trên cao', 'hoàn thiện nội thất', 'hoàn thiện sàn nhựa', 'hoàn thiện sàn thảm', 'hoàn thiện ván', 'hút nước ngầm công trình', 'khoan giếng máy dập', 'khoan giếng máy khoan', 'khung chắn toà nhà', 'lái máy ủi', 'lái máy xây dựng', 'lái máy xúc', 'lái máy xúc lật', 'lái xe lu', 'làm nền, móng', 'lắp bồn tắm', 'lắp đặt đường ống', 'lắp đặt lò nung-xây dựng', 'lắp đặt pin năng lượng', 'lắp điện lạnh, điều hòa', 'lắp ghép cốt thép', 'lát đá', 'lợp mái nhà', 'lợp ngói', 'mộc cốp pha', 'nội thất gỗ-xây dựng', 'ốp lát gạch', 'phá dỡ', 'san lấp mặt bằng', 'sản xuất bê tông', 'sơn xây dựng', 'tấm kim loại kiến trúc', 'tấm kim loại ống gió', 'thi công dán tường', 'thi công lắp rèm', 'thi công móng thép', 'thợ mộc xây dựng', 'trát vữa', 'xây dựng tổng hợp'] },
      { name: 'Vệ sinh toà nhà', slug: 've-sinh-toa-nha-tokutei', keywords: ['vệ sinh', 'tòa nhà', 'làm sạch', 'Buồng phòng khách sạn', 'Vệ sinh toà nhà'] },
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
