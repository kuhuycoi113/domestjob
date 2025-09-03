
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, PieChart } from 'lucide-react';
import Link from 'next/link';

const consultants = [
  {
    id: 'le-xuan-long',
    name: 'Lê Xuân Long',
    avatarUrl: 'https://placehold.co/200x200.png',
    dataAiHint: 'professional man portrait',
    experience: '5 năm',
    mainExpertise: 'Tư vấn việc làm Kỹ năng đặc định (Tokutei)',
    subExpertise: 'Thực tập sinh Nhật Bản',
    successfulCandidates: 412,
    managedJobs: 250,
    strengths: ['Tận tình', 'Nhiều đơn', 'Hiểu rõ ngành'],
  },
  {
    id: 'nguyen-thi-phuong-loan',
    name: 'Nguyễn Thị Phương Loan',
    avatarUrl: 'https://placehold.co/200x200.png',
    dataAiHint: 'professional woman portrait',
    experience: '4 năm',
    mainExpertise: 'Tư vấn việc làm Kỹ sư & Trí thức',
    subExpertise: 'Thị trường lao động tại Aichi',
    successfulCandidates: 350,
    managedJobs: 210,
    strengths: ['Nhiệt tình', 'Hỗ trợ 24/7', 'Quan hệ rộng'],
  },
  {
    id: 'nguyen-thi-minh-anh',
    name: 'Nguyễn Thị Minh Anh',
    avatarUrl: 'https://placehold.co/200x200.png',
    dataAiHint: 'professional woman portrait',
    experience: '3 năm',
    mainExpertise: 'Chuyên gia tư vấn ngành thực phẩm',
    subExpertise: 'Các đơn hàng tại Fukuoka',
    successfulCandidates: 280,
    managedJobs: 180,
    strengths: ['Chuyên môn cao', 'Tỷ lệ đỗ cao', 'Hỗ trợ nhanh'],
  },
  {
    id: 'nguyen-thi-ngoc-oanh',
    name: 'Nguyễn Thị Ngọc Oanh',
    avatarUrl: 'https://placehold.co/200x200.png',
    dataAiHint: 'professional woman portrait',
    experience: '3 năm',
    mainExpertise: 'Tư vấn ngành xây dựng & cơ khí',
    subExpertise: 'Các đơn hàng gấp, bay nhanh',
    successfulCandidates: 310,
    managedJobs: 190,
    strengths: ['Nhiều đơn gấp', 'Hỗ trợ nhiệt tình', 'Kinh nghiệm'],
  },
  {
    id: 'pham-thi-ha',
    name: 'Phạm Thị Hà',
    avatarUrl: 'https://placehold.co/200x200.png',
    dataAiHint: 'professional woman portrait',
    experience: '2 năm',
    mainExpertise: 'Tư vấn ngành điều dưỡng & chăm sóc sức khỏe',
    subExpertise: 'Thủ tục visa & giấy tờ',
    successfulCandidates: 220,
    managedJobs: 150,
    strengths: ['Tận tâm', 'Am hiểu thủ tục', 'Hỗ trợ chi tiết'],
  }
];

const ConsultantCard = ({ consultant }: { consultant: typeof consultants[0] }) => (
    <Link href={`/consultant-profile/${consultant.id}`} className="block h-full">
        <Card className="shadow-xl text-center p-6 flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <Avatar className="h-24 w-24 mx-auto border-4 border-primary shadow-lg">
                <AvatarImage src={consultant.avatarUrl} alt={consultant.name} data-ai-hint={consultant.dataAiHint} />
                <AvatarFallback>{consultant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-headline font-bold mt-4">{consultant.name}</h2>
            <p className="text-primary font-semibold text-sm flex-grow">{consultant.mainExpertise}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
                {consultant.strengths.map(strength => (
                    <Badge key={strength} variant="secondary" className="bg-green-100 text-green-800 border-green-200">{strength}</Badge>
                ))}
            </div>
            <div className="mt-4 border-t pt-4 text-sm space-y-2 text-left">
                <p className="flex items-start gap-2"><PieChart className="h-4 w-4 mt-1 text-muted-foreground"/> <strong>Kinh nghiệm:</strong> {consultant.experience}</p>
                <p className="flex items-start gap-2"><Star className="h-4 w-4 mt-1 text-muted-foreground"/> <strong>Đã hỗ trợ:</strong> {consultant.successfulCandidates}+ ứng viên</p>
            </div>
        </Card>
    </Link>
);

export default function ConsultantListPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold text-accent">Đội ngũ tư vấn viên chuyên nghiệp</h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                Những chuyên gia tận tâm sẽ đồng hành cùng bạn trên con đường chinh phục sự nghiệp tại Nhật Bản.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
            {consultants.map((consultant) => (
                <ConsultantCard key={consultant.name} consultant={consultant} />
            ))}
        </div>
      </div>
    </div>
  );
}
