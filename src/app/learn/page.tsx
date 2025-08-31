
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-Learning: Chinh phục tiếng Nhật và Kỹ năng làm việc',
  description: 'Nâng cao kỹ năng, mở rộng cơ hội với các khóa học E-learning được thiết kế riêng cho người lao động Việt Nam muốn làm việc tại Nhật Bản.',
};


const courses = [
  {
    id: 'tieng-nhat-giao-tiep',
    title: 'Tiếng Nhật giao tiếp cho người đi làm',
    category: 'Ngoại ngữ',
    description: 'Khóa học tiếng Nhật bám sát giáo trình Minna no Nihongo, tập trung vào các mẫu câu giao tiếp và từ vựng chuyên ngành.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'Japanese language class',
  },
  {
    id: 'van-hoa-nhat-ban',
    title: 'Hiểu về Văn hóa Nhật Bản',
    category: 'Văn hóa & Xã hội',
    description: 'Khám phá những nét đặc trưng trong văn hóa, từ giao tiếp hàng ngày đến các lễ hội truyền thống, giúp bạn hòa nhập nhanh chóng.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'Japanese culture collage',
  },
  {
    id: 'ung-xu-cong-ty-nhat',
    title: 'Cách ứng xử trong công ty Nhật',
    category: 'Kỹ năng làm việc',
    description: 'Nắm vững các quy tắc ứng xử nơi công sở Nhật Bản, từ cách chào hỏi, trao đổi danh thiếp đến văn hóa báo cáo "Hou-Ren-Sou".',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'Japanese office meeting',
  },
   {
    id: 'ky-nang-thang-tien',
    title: 'Kỹ năng để Thăng tiến tại Nhật Bản',
    category: 'Phát triển sự nghiệp',
    description: 'Tìm hiểu về tư duy kaizen, kỹ năng quản lý và những yếu tố then chốt giúp bạn không chỉ hoàn thành công việc mà còn thăng tiến.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'career growth ladder',
  },
];

export default function LearnPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <BookOpen className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            E-Learning: Chinh phục tiếng Nhật & Kỹ năng
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Nâng cao kỹ năng, mở rộng cơ hội. Học mọi lúc, mọi nơi với các khóa học được thiết kế riêng cho người lao động.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map(course => (
                 <Card key={course.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                    <CardHeader className="p-0">
                       <Link href={`/learn/${course.id}`} className="block relative aspect-video">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover"
                            data-ai-hint={course.dataAiHint}
                          />
                       </Link>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <p className="text-sm font-bold mb-2 text-primary">{course.category}</p>
                      <Link href={`/learn/${course.id}`} className="flex-grow">
                          <CardTitle className="font-headline text-xl mb-2 group-hover:text-primary transition-colors">{course.title}</CardTitle>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{course.description}</p>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                       <Button asChild className="w-full">
                           <Link href={`/learn/${course.id}`}>
                                Bắt đầu học <ArrowRight className="ml-2" />
                           </Link>
                       </Button>
                    </div>
                  </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
