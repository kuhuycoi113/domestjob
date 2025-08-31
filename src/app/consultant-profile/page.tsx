
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Briefcase, CheckCircle, Handshake, LineChart, MessageSquare, PieChart, Send, ShieldCheck, Sparkles, Star, Target, Users, Phone } from 'lucide-react';
import Image from 'next/image';

const consultant = {
  name: 'Nguyễn Văn A',
  avatarUrl: 'https://placehold.co/200x200.png',
  dataAiHint: 'professional man portrait',
  experience: '3 năm 2 tháng',
  mainExpertise: 'Tư vấn việc làm Kỹ năng đặc định (Tokutei) 2 đầu Nhật Việt',
  subExpertise: 'Tư vấn việc làm Thực tập sinh Nhật Bản',
  successfulCandidates: 328,
  managedJobs: 196,
  strengths: ['Tận tình', 'Nhiều đơn', 'Hiểu rõ ngành'],
};

const companyValues = [
    {
        icon: Sparkles,
        title: "Ưu điểm hệ thống",
        description: "Áp dụng công nghệ vào tìm đơn nên sẽ có hệ thống đơn rất nhiều, cho các bạn được nhiều lựa chọn và so sánh hơn thị trường."
    },
    {
        icon: Users,
        title: "Đội ngũ hỗ trợ tận tâm",
        description: "Có đội ngũ Sale và công nghệ nên luôn care giúp bạn đến lúc tìm được đơn."
    },
    {
        icon: Send,
        title: "Cập nhật thông tin liên tục",
        description: "Có hạ tầng MKT để bạn thường xuyên nhận được thông tin đơn và thông tin về TKT, thông tin về làm việc tại Nhật hữu ích nhất."
    }
]

const addedValues = [
    {
        icon: Target,
        title: "Đào tạo phỏng vấn chuyên sâu",
        description: "Tăng tỷ lệ đỗ phỏng vấn lên đến 90%."
    },
    {
        icon: Award,
        title: "Hỗ trợ phát triển tư duy và sự nghiệp",
        description: "Giúp bạn biết cần gì để có thể lên Ginou 2, ở lại Nhật lâu dài và có thăng tiến trong công việc, thu nhập tốt hơn."
    },
    {
        icon: ShieldCheck,
        title: "Đồng hành và giải quyết vấn đề",
        description: "Tư vấn giải quyết các vấn đề thắc mắc về tư duy, những khúc mắc, ứng xử, văn hoá trong cuộc sống tại Nhật."
    },
]

const ZaloIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 262 263" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M131 0C58.649 0 0 58.649 0 131C0 203.351 58.649 262 131 262C203.351 262 262 203.351 262 131C262 58.649 203.351 0 131 0ZM197.838 170.368L173.962 194.244C171.139 197.067 167.247 197.68 163.639 196.223L126.541 182.903C125.129 182.413 123.824 181.711 122.625 180.892L74.832 144.37C71.748 142.029 70.832 137.989 72.585 134.577L84.975 111.758C86.728 108.347 90.722 106.889 94.276 108.347L131.374 121.612C132.786 122.102 134.091 122.748 135.29 123.623L183.083 160.145C186.167 162.486 187.083 166.526 185.33 169.937L197.838 170.368Z" fill="#0068FF"/>
    </svg>
)

const MessengerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" {...props}>
    <path fill="#0099FF" d="M16 4c-6.627 0-12 4.477-12 10c0 4.29 2.765 7.94 6.703 9.426c-0.125-0.75-0.19-1.426-0.09-2.128c0.21-1.637 1.044-4.88 1.044-4.88s-0.278-0.556-0.278-1.373c0-1.286 0.74-2.25 1.664-2.25c0.785 0 1.157 0.588 1.157 1.288c0 0.787-0.498 1.96-0.758 3.048c-0.218 0.908 0.45 1.646 1.34 1.646c1.604 0 2.684-2.053 2.684-4.526c0-2.243-1.464-3.83-3.952-3.83c-2.784 0-4.47 1.89-4.47 4.13c0 0.79 0.25 1.39 0.636 1.86c0.088 0.11 0.1 0.196 0.076 0.294c-0.088 0.35-0.295 1.18-0.34 1.378c-0.056 0.23-0.21 0.28-0.38 0.192c-1.076-0.55-1.556-2.2-1.556-3.42c0-2.82 2.39-5.91 6.76-5.91c3.56 0 6.01 2.414 6.01 5.3c0 3.32-1.99 6.16-4.99 6.16c-1 0-1.92-0.51-2.22-1.11l-0.78 3.12C12.25 24.31 14.01 25 16 25c6.627 0 12-4.477 12-10S22.627 4 16 4z" />
  </svg>
)

export default function ConsultantProfilePage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Consultant Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-xl text-center p-6">
                <Avatar className="h-32 w-32 mx-auto border-4 border-primary shadow-lg">
                    <AvatarImage src={consultant.avatarUrl} alt={consultant.name} data-ai-hint={consultant.dataAiHint} />
                    <AvatarFallback>{consultant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-headline font-bold mt-4">{consultant.name}</h1>
                <p className="text-primary font-semibold">Tư vấn viên</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {consultant.strengths.map(strength => (
                        <Badge key={strength} variant="secondary" className="bg-green-100 text-green-800 border-green-200">{strength}</Badge>
                    ))}
                </div>
            </Card>

            <Card className="shadow-xl">
              <CardHeader><CardTitle className="font-headline text-xl">Thông tin chuyên môn</CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p className="flex items-start gap-3"><PieChart className="h-5 w-5 mt-0.5 text-muted-foreground"/> <span><strong>Kinh nghiệm:</strong> {consultant.experience}</span></p>
                <p className="flex items-start gap-3"><Star className="h-5 w-5 mt-0.5 text-muted-foreground"/> <span><strong>Lĩnh vực chính:</strong> {consultant.mainExpertise}</span></p>
                <p className="flex items-start gap-3"><Briefcase className="h-5 w-5 mt-0.5 text-muted-foreground"/> <span><strong>Lĩnh vực phụ:</strong> {consultant.subExpertise}</span></p>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
                <CardHeader><CardTitle className="font-headline text-xl">Thành tích nổi bật</CardTitle></CardHeader>
                <CardContent className="flex justify-around text-center">
                    <div>
                        <p className="text-3xl font-bold text-primary">{consultant.successfulCandidates}</p>
                        <p className="text-muted-foreground text-sm mt-1">Ứng viên thành công</p>
                    </div>
                     <div>
                        <p className="text-3xl font-bold text-primary">{consultant.managedJobs}</p>
                        <p className="text-muted-foreground text-sm mt-1">Việc làm đang quản lý</p>
                    </div>
                </CardContent>
            </Card>

            <div className="w-full bg-accent-blue text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-center gap-3">
                <a href="#" aria-label="Chat on Messenger" className="bg-white rounded-full p-1.5 hover:opacity-90 transition-opacity">
                    <MessengerIcon className="h-8 w-8"/>
                </a>
                <a href="#" aria-label="Call" className="bg-white rounded-full p-1.5 hover:opacity-90 transition-opacity">
                    <Phone className="h-8 w-8 text-green-500"/>
                </a>
                 <a href="#" aria-label="Chat on Zalo" className="bg-white rounded-full p-1.5 hover:opacity-90 transition-opacity">
                    <ZaloIcon className="h-8 w-8"/>
                </a>
                <span className="text-lg font-semibold">Liên hệ tư vấn viên</span>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-8">
             <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Ưu điểm hệ thống</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {companyValues.map(item => (
                    <div key={item.title} className="flex gap-4">
                        <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center">
                             <item.icon className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                    </div>
                )))}
              </CardContent>
            </Card>
             <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Giá trị gia tăng khi sử dụng dịch vụ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {addedValues.map(item => (
                    <div key={item.title} className="flex gap-4 items-start">
                         <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center">
                             <item.icon className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                    </div>
                )))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
